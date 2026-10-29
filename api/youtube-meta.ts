import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const rawUrl = (req.query.url as string) || '';
    if (!rawUrl) {
      return res.status(400).json({ success: false, error: 'url query parameter is required' });
    }

    const match = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    const youtubeId = match ? match[1] : (rawUrl.length === 11 ? rawUrl : null);

    if (!youtubeId) {
      return res.status(400).json({ success: false, error: 'Invalid YouTube URL or ID' });
    }

    const standardUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    let title = '';
    let authorName = '';

    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(standardUrl)}&format=json`);
      if (oembedRes.ok) {
        const oembedData: any = await oembedRes.json();
        title = oembedData.title || '';
        authorName = oembedData.author_name || '';
      }
    } catch {
      // ignore network errors, fallback to heuristics
    }

    const textToScan = `${title} ${authorName} ${rawUrl}`.toLowerCase();

    const uniRules = [
      { name: 'Coventry University, UK', kw: ['coventry university', 'coventry'], dest: 'United Kingdom', flag: '🇬🇧' },
      { name: 'University of Hertfordshire, UK', kw: ['hertfordshire', 'herts'], dest: 'United Kingdom', flag: '🇬🇧' },
      { name: 'University of East London, UK', kw: ['east london', 'uel'], dest: 'United Kingdom', flag: '🇬🇧' },
      { name: 'University of Portsmouth, UK', kw: ['portsmouth'], dest: 'United Kingdom', flag: '🇬🇧' },
      { name: 'Northumbria University, UK', kw: ['northumbria'], dest: 'United Kingdom', flag: '🇬🇧' },
      { name: 'University of Greenwich, UK', kw: ['greenwich'], dest: 'United Kingdom', flag: '🇬🇧' },
      { name: 'Deakin University, Melbourne', kw: ['deakin university', 'deakin'], dest: 'Australia', flag: '🇦🇺' },
      { name: 'University of Wollongong, Australia', kw: ['wollongong', 'uow'], dest: 'Australia', flag: '🇦🇺' },
      { name: 'University of Toronto, Canada', kw: ['university of toronto', 'toronto'], dest: 'Canada', flag: '🇨🇦' },
      { name: 'Laurentian University, Canada', kw: ['laurentian'], dest: 'Canada', flag: '🇨🇦' },
      { name: 'Middlesex University Dubai', kw: ['middlesex university', 'middlesex', 'dubai'], dest: 'United Arab Emirates', flag: '🇦🇪' },
      { name: 'Jönköping University, Sweden', kw: ['jönköping', 'jonkoping', 'sweden'], dest: 'Sweden', flag: '🇸🇪' },
      { name: 'Hanken School of Economics, Finland', kw: ['hanken'], dest: 'Finland', flag: '🇫🇮' }
    ];

    let detectedUni = 'International Partner University';
    let detectedDest = 'United Kingdom';
    let detectedFlag = '🇬🇧';

    for (const rule of uniRules) {
      if (rule.kw.some(k => textToScan.includes(k))) {
        detectedUni = rule.name;
        detectedDest = rule.dest;
        detectedFlag = rule.flag;
        break;
      }
    }

    if (detectedUni === 'International Partner University') {
      if (textToScan.includes('australia') || textToScan.includes('melbourne')) {
        detectedDest = 'Australia';
        detectedFlag = '🇦🇺';
        detectedUni = 'Australia Partner University';
      } else if (textToScan.includes('canada') || textToScan.includes('toronto')) {
        detectedDest = 'Canada';
        detectedFlag = '🇨🇦';
        detectedUni = 'Canadian Partner University';
      } else if (textToScan.includes('dubai') || textToScan.includes('uae')) {
        detectedDest = 'United Arab Emirates';
        detectedFlag = '🇦🇪';
        detectedUni = 'Dubai Partner Campus';
      }
    }

    let studentName = title
      .replace(/^My\s+Study\s+Abroad\s+Journey[\s:-]+/i, '')
      .replace(/\|\s*BCAS.*$/i, '')
      .replace(/-\s*BCAS.*$/i, '')
      .replace(/BCAS\s+Campus/gi, '')
      .trim();
    if (!studentName) studentName = 'BCAS Student Story';

    let caption = '';
    if (title && title.includes('-')) {
      const parts = title.split('-');
      if (parts.length > 1) caption = parts.slice(1).join('-').trim();
    }
    if (caption) {
      caption = caption
        .replace(/\|\s*BCAS.*$/i, '')
        .replace(/-\s*BCAS.*$/i, '')
        .trim();
    }
    if (!caption || caption.length < 8) {
      caption = `Direct BCAS progression to ${detectedUni} (${detectedDest}) with verified credit transfer.`;
    }

    return res.json({
      success: true,
      meta: {
        youtubeId,
        youtubeUrl: standardUrl,
        title: title || 'BCAS Student Video Story',
        studentName,
        university: detectedUni,
        destination: detectedDest,
        flag: detectedFlag,
        caption,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      }
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Server error' });
  }
}
