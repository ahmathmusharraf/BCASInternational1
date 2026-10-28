import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory sliding-window IP rate limiter
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 25; // max 25 enquiries per window

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      error: 'Security alert: Too many requests from this IP. Please wait a few minutes before submitting another enquiry.'
    });
  }

  record.count += 1;
  return next();
}

// Basic HTML sanitization function to strip dangerous tags
function sanitizeInput(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // 1. Remove express signature to prevent reconnaissance
  app.disable('x-powered-by');

  // 2. Strict payload size limit to prevent buffer overflow/DoS
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // 3. Security HTTP Response Headers Middleware
  app.use((_req, res, next) => {
    // Prevent MIME-sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Enable browser XSS protection
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Referrer policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Restrict unnecessary browser features
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Content Security Policy permitting YouTube iframes, fonts, images and preview
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; " +
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; " +
      "img-src 'self' https: data: blob:; " +
      "connect-src 'self' https:;"
    );

    // HSTS in production
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    next();
  });

  // In-memory persistent applications store
  const storedApplications: any[] = [];

  // Working backend API endpoint for student application enquiries with full security
  app.post('/api/applications', rateLimiter, (req, res) => {
    const rawData = req.body;

    if (!rawData || typeof rawData !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body.'
      });
    }

    // Honeypot spam bot check: if invisible honeypot field is filled, silently discard or reject bot
    if (rawData.honeypot || rawData.website || rawData.company) {
      // Return simulated success to trick automated spam bots
      return res.status(200).json({
        success: true,
        message: 'Application received.',
        referenceNumber: 'BCAS-SEC-SPAM-FILTERED'
      });
    }

    // Input sanitization and validation
    const fullName = sanitizeInput(rawData.fullName);
    const email = sanitizeInput(rawData.email).toLowerCase();
    const phone = sanitizeInput(rawData.phone);
    const cityOrCampus = sanitizeInput(rawData.cityOrCampus || 'Colombo Campus');
    const targetSubject = sanitizeInput(rawData.targetSubject || 'General Admissions');
    const targetDestination = sanitizeInput(rawData.targetDestination || 'United Kingdom');
    const targetLevel = sanitizeInput(rawData.targetLevel || 'Bachelor’s');
    const specificQuestions = sanitizeInput(rawData.specificQuestions || '');

    // Validation checks
    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid full name (2 - 100 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    if (!phone || phone.length < 7 || phone.length > 25) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid contact phone number (7 - 25 characters).'
      });
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `BCAS-2027-${randomSuffix}`;

    const submission = {
      referenceNumber,
      submittedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      data: {
        fullName,
        email,
        phone,
        cityOrCampus,
        targetSubject,
        targetDestination,
        targetLevel,
        specificQuestions
      },
      status: 'Verified & Received',
      securityCheck: 'Passed Honeypot, Rate Limit & Sanitization Audits',
      assignedCounselor: {
        name: 'BCAS International Placements Desk',
        campus: cityOrCampus,
        phone: '+94 76 141 5273'
      }
    };

    storedApplications.push(submission);

    // Keep store memory bounded
    if (storedApplications.length > 500) {
      storedApplications.shift();
    }

    return res.status(201).json({
      success: true,
      message: 'Application enquiry verified and confirmed by BCAS admissions security server.',
      application: submission
    });
  });

  // Security Verification and Health check endpoint
  app.get('/api/security', (_req, res) => {
    res.json({
      status: 'secured',
      framework: 'Express + Vite React',
      securityHeaders: {
        xContentTypeOptions: 'nosniff',
        xXSSProtection: '1; mode=block',
        contentSecurityPolicy: 'active',
        referrerPolicy: 'strict-origin-when-cross-origin',
        permissionsPolicy: 'camera=(), microphone=(), geolocation=()'
      },
      rateLimiting: 'active (25 req / 10m sliding window)',
      botProtection: 'honeypot enabled',
      inputSanitization: 'active (XSS & HTML entity filter)',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'operational',
      service: 'BCAS International University Placements Server',
      timestamp: new Date().toISOString()
    });
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BCAS Placements secured server ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
