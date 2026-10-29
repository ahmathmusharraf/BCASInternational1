import type { Request, Response } from 'express';

// In-memory application store for serverless instance
const storedApplications: any[] = [];

function sanitizeInput(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '')
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

export default function handler(req: Request, res: Response) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      total: storedApplications.length,
      applications: storedApplications.slice(-20).reverse()
    });
  }

  if (req.method === 'POST') {
    const rawData = req.body || {};

    // Bot honeypot check
    if (rawData.honeypot || rawData.website || rawData.company) {
      return res.status(200).json({
        success: true,
        message: 'Application received.',
        referenceNumber: 'BCAS-SEC-FILTERED'
      });
    }

    const fullName = sanitizeInput(rawData.fullName);
    const email = sanitizeInput(rawData.email).toLowerCase();
    const phone = sanitizeInput(rawData.phone);
    const cityOrCampus = sanitizeInput(rawData.cityOrCampus || 'Colombo Campus');
    const targetSubject = sanitizeInput(rawData.targetSubject || 'General Admissions');
    const targetDestination = sanitizeInput(rawData.targetDestination || 'United Kingdom');
    const targetLevel = sanitizeInput(rawData.targetLevel || 'Bachelor’s');
    const specificQuestions = sanitizeInput(rawData.specificQuestions || '');

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid full name.'
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
      assignedCounselor: {
        name: 'BCAS International Placements Desk',
        campus: cityOrCampus,
        phone: '+94 76 141 5273'
      }
    };

    storedApplications.push(submission);
    if (storedApplications.length > 200) {
      storedApplications.shift();
    }

    return res.status(201).json({
      success: true,
      message: 'Application enquiry verified and confirmed by BCAS admissions security server.',
      application: submission
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
