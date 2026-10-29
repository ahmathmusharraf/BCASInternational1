// ============================================================================
// YouTube Auto-Detection Utility for Country & University
// Automatically extracts video ID, queries oEmbed metadata, and detects
// University and Destination Country from YouTube links.
// ============================================================================

export interface DetectedVideoMeta {
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  studentName: string;
  university: string;
  destination: string;
  flag: string;
  thumbnail: string;
  rawTitle?: string;
  authorName?: string;
  caption?: string;
}

// Destination Dictionary with Flag and University Keywords
interface DestinationRule {
  country: string;
  flag: string;
  countryKeywords: string[];
  universities: {
    name: string;
    keywords: string[];
  }[];
}

export const DESTINATION_RULES: DestinationRule[] = [
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    countryKeywords: ['uk', 'united kingdom', 'england', 'scotland', 'wales', 'london', 'birmingham', 'coventry', 'manchester', 'leeds'],
    universities: [
      { name: 'Coventry University, UK', keywords: ['coventry university', 'coventry'] },
      { name: 'University of Hertfordshire, UK', keywords: ['hertfordshire', 'herts'] },
      { name: 'University of East London, UK', keywords: ['east london', 'uel'] },
      { name: 'University of Portsmouth, UK', keywords: ['portsmouth'] },
      { name: 'Northumbria University, UK', keywords: ['northumbria'] },
      { name: 'University of Greenwich, UK', keywords: ['greenwich'] },
      { name: 'Nottingham Trent University, UK', keywords: ['nottingham trent', 'ntu'] },
      { name: 'University of Chester, UK', keywords: ['chester'] },
      { name: 'York St John University, UK', keywords: ['york st john', 'ysj'] },
      { name: 'University of the West of England, UK', keywords: ['west of england', 'uwe bristol', 'uwe'] },
      { name: 'University of South Wales, UK', keywords: ['south wales', 'usw'] },
      { name: 'Oxford Brookes University, UK', keywords: ['oxford brookes'] },
      { name: 'University of Sunderland, UK', keywords: ['sunderland'] },
      { name: 'Ulster University, UK', keywords: ['ulster'] },
      { name: 'University of Bedfordshire, UK', keywords: ['bedfordshire'] },
      { name: 'Anglia Ruskin University, UK', keywords: ['anglia ruskin', 'aru'] },
      { name: 'De Montfort University, UK', keywords: ['de montfort', 'dmu'] },
      { name: 'University of Salford, UK', keywords: ['salford'] }
    ]
  },
  {
    country: 'Australia',
    flag: '🇦🇺',
    countryKeywords: ['australia', 'aussie', 'melbourne', 'sydney', 'brisbane', 'perth', 'adelaide'],
    universities: [
      { name: 'Deakin University, Melbourne', keywords: ['deakin university', 'deakin'] },
      { name: 'University of Wollongong, Australia', keywords: ['wollongong', 'uow'] },
      { name: 'Swinburne University of Technology', keywords: ['swinburne'] },
      { name: 'Edith Cowan University, Australia', keywords: ['edith cowan', 'ecu'] },
      { name: 'Murdoch University, Australia', keywords: ['murdoch'] },
      { name: 'Western Sydney University', keywords: ['western sydney', 'wsu'] },
      { name: 'Monash University, Australia', keywords: ['monash'] },
      { name: 'Curtin University, Australia', keywords: ['curtin'] },
      { name: 'Macquarie University, Australia', keywords: ['macquarie'] },
      { name: 'La Trobe University, Australia', keywords: ['la trobe', 'latrobe'] }
    ]
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    countryKeywords: ['canada', 'canadian', 'ontario', 'toronto', 'vancouver', 'montreal', 'pgwp', 'ossd'],
    universities: [
      { name: 'University of Toronto, Canada', keywords: ['university of toronto', 'uoft', 'toronto'] },
      { name: 'Laurentian University, Canada', keywords: ['laurentian university', 'laurentian'] },
      { name: 'University of Waterloo, Canada', keywords: ['waterloo'] },
      { name: 'York University, Canada', keywords: ['york university'] },
      { name: 'University of Windsor, Canada', keywords: ['windsor'] },
      { name: 'Seneca Polytechnic, Canada', keywords: ['seneca'] },
      { name: 'Humber Polytechnic, Canada', keywords: ['humber'] },
      { name: 'George Brown College, Canada', keywords: ['george brown'] },
      { name: 'Centennial College, Canada', keywords: ['centennial'] }
    ]
  },
  {
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    countryKeywords: ['uae', 'dubai', 'emirates', 'abu dhabi', 'sharjah'],
    universities: [
      { name: 'Middlesex University Dubai', keywords: ['middlesex university', 'middlesex dubai', 'middlesex'] },
      { name: 'Heriot-Watt University Dubai', keywords: ['heriot-watt dubai', 'heriot watt'] },
      { name: 'University of Birmingham Dubai', keywords: ['birmingham dubai'] },
      { name: 'University of Wollongong in Dubai', keywords: ['uowd', 'wollongong in dubai'] },
      { name: 'Curtin University Dubai', keywords: ['curtin dubai'] }
    ]
  },
  {
    country: 'Sweden',
    flag: '🇸🇪',
    countryKeywords: ['sweden', 'swedish', 'stockholm', 'gothenburg', 'malmo', 'schengen'],
    universities: [
      { name: 'Jönköping University, Sweden', keywords: ['jönköping', 'jonkoping'] },
      { name: 'Linnaeus University, Sweden', keywords: ['linnaeus'] },
      { name: 'Halmstad University, Sweden', keywords: ['halmstad'] },
      { name: 'Karlstad University, Sweden', keywords: ['karlstad'] },
      { name: 'Kristianstad University, Sweden', keywords: ['kristianstad'] },
      { name: 'University of Skövde, Sweden', keywords: ['skövde', 'skovde'] },
      { name: 'University West, Sweden', keywords: ['university west', 'väst'] },
      { name: 'Dalarna University, Sweden', keywords: ['dalarna'] },
      { name: 'KTH Royal Institute of Technology', keywords: ['kth'] },
      { name: 'Lund University, Sweden', keywords: ['lund'] }
    ]
  },
  {
    country: 'Finland',
    flag: '🇫🇮',
    countryKeywords: ['finland', 'finnish', 'helsinki', 'tampere', 'espoo'],
    universities: [
      { name: 'Hanken School of Economics, Finland', keywords: ['hanken'] },
      { name: 'LAB University of Applied Sciences, Finland', keywords: ['lab university', 'lab uas'] },
      { name: 'Satakunta University (SAMK), Finland', keywords: ['satakunta', 'samk'] },
      { name: 'Turku University of Applied Sciences', keywords: ['turku'] },
      { name: 'Vaasa University of Applied Sciences', keywords: ['vaasa', 'vamk'] },
      { name: 'Tampere University, Finland', keywords: ['tampere'] },
      { name: 'LUT University, Finland', keywords: ['lut university', 'lut'] },
      { name: 'University of Eastern Finland', keywords: ['eastern finland', 'uef'] },
      { name: 'University of Jyväskylä, Finland', keywords: ['jyväskylä', 'jyvaskyla', 'jyu'] }
    ]
  },
  {
    country: 'New Zealand',
    flag: '🇳🇿',
    countryKeywords: ['new zealand', 'nz', 'auckland', 'wellington', 'christchurch', 'otago'],
    universities: [
      { name: 'Unitec Institute of Technology, NZ', keywords: ['unitec'] },
      { name: 'University of Otago, New Zealand', keywords: ['otago'] },
      { name: 'Victoria University of Wellington', keywords: ['victoria university of wellington'] },
      { name: 'University of Auckland, New Zealand', keywords: ['university of auckland'] },
      { name: 'University of Canterbury, NZ', keywords: ['canterbury'] },
      { name: 'University of Waikato, NZ', keywords: ['waikato'] },
      { name: 'Lincoln University, New Zealand', keywords: ['lincoln university'] },
      { name: 'Auckland University of Technology (AUT)', keywords: ['aut', 'auckland university of technology'] }
    ]
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    countryKeywords: ['usa', 'united states', 'america', 'american', 'f-1', 'stem opt'],
    universities: [
      { name: 'Post University, USA', keywords: ['post university'] },
      { name: 'Kent State University, USA', keywords: ['kent state'] },
      { name: 'New York University, USA', keywords: ['nyu', 'new york university'] },
      { name: 'University of South Florida, USA', keywords: ['usf', 'south florida'] },
      { name: 'Arizona State University, USA', keywords: ['asu', 'arizona state'] }
    ]
  },
  {
    country: 'Malaysia',
    flag: '🇲🇾',
    countryKeywords: ['malaysia', 'malaysian', 'kuala lumpur', 'penang', 'selangor'],
    universities: [
      { name: 'MILA University, Malaysia', keywords: ['mila university', 'mila'] },
      { name: 'Taylor\'s University, Malaysia', keywords: ['taylor', 'taylors'] },
      { name: 'TAR UMT, Malaysia', keywords: ['tar umt', 'tunku abdul rahman'] },
      { name: 'Universiti Sains Malaysia (USM)', keywords: ['usm', 'sains malaysia'] },
      { name: 'Sunway University, Malaysia', keywords: ['sunway'] },
      { name: 'Asia Pacific University (APU), Malaysia', keywords: ['apu', 'asia pacific university'] },
      { name: 'UCSI University, Malaysia', keywords: ['ucsi'] },
      { name: 'Swinburne University Sarawak, Malaysia', keywords: ['swinburne sarawak', 'swinburne malaysia'] }
    ]
  },
  {
    country: 'Malta',
    flag: '🇲🇹',
    countryKeywords: ['malta', 'maltese', 'valletta', 'st julians', 'gozo'],
    universities: [
      { name: 'University of Malta', keywords: ['university of malta', 'uom malta'] },
      { name: 'MCAST Malta', keywords: ['mcast'] },
      { name: 'American University of Malta', keywords: ['american university of malta', 'aum'] }
    ]
  }
];

/**
 * Extracts 11-char YouTube ID from any format (youtu.be, watch?v=, shorts/, embed/, etc.)
 */
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (match && match[1]) return match[1];
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?') && !trimmed.includes('&')) {
    return trimmed;
  }
  return '';
}

/**
 * Heuristically parses video title & metadata to detect University and Country
 */
export function parseDetailsFromText(rawText: string): { university: string; destination: string; flag: string } {
  const text = (rawText || '').toLowerCase();

  // 1. Try finding a specific university match first (most reliable indicator)
  for (const rule of DESTINATION_RULES) {
    for (const uni of rule.universities) {
      for (const kw of uni.keywords) {
        if (text.includes(kw.toLowerCase())) {
          return {
            university: uni.name,
            destination: rule.country,
            flag: rule.flag
          };
        }
      }
    }
  }

  // 2. If no university matched directly, search for country keywords
  for (const rule of DESTINATION_RULES) {
    for (const kw of rule.countryKeywords) {
      // Use word boundary check
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(text)) {
        return {
          university: `${rule.country} Partner Institution`,
          destination: rule.country,
          flag: rule.flag
        };
      }
    }
  }

  // 3. Fallback: Generic UK Partner
  return {
    university: 'International Partner University',
    destination: 'United Kingdom',
    flag: '🇬🇧'
  };
}

/**
 * Clean up video title into an automatically deduced clean Student Name
 */
export function cleanStudentName(title: string): string {
  if (!title) return 'BCAS Student Story';
  let cleaned = title
    .replace(/^My\s+Study\s+Abroad\s+Journey[\s:-]+/i, '')
    .replace(/^My\s+Journey[\s:-]+/i, '')
    .replace(/^Study\s+Abroad\s+Journey[\s:-]+/i, '')
    .replace(/^Student\s+Story[\s:-]+/i, '')
    .replace(/^Student\s+Testimonial[\s:-]+/i, '')
    .replace(/^Visa\s+Success\s+Story[\s:-]+/i, '')
    .replace(/^UK\s+Visa\s+Success[\s:-]+/i, '')
    .replace(/^Australia\s+Visa\s+Success[\s:-]+/i, '')
    .replace(/^Canada\s+Visa\s+Success[\s:-]+/i, '')
    .replace(/^Student\s+Visa\s+Grant[\s:-]+/i, '')
    .replace(/^Congratulations\s+to\s+/i, '')
    .replace(/^Congratulations\s+/i, '')
    .replace(/\|\s*BCAS.*$/i, '')
    .replace(/-\s*BCAS.*$/i, '')
    .replace(/\|\s*UK.*$/i, '')
    .replace(/\|\s*Australia.*$/i, '')
    .replace(/\|\s*Canada.*$/i, '')
    .replace(/\|\s*New\s+Zealand.*$/i, '')
    .replace(/\|\s*Dubai.*$/i, '')
    .replace(/\|\s*Sweden.*$/i, '')
    .replace(/\|\s*Finland.*$/i, '')
    .replace(/\|\s*Malta.*$/i, '')
    .replace(/BCAS\s+Campus/gi, '')
    .replace(/BCAS\s+International\s+University\s+Placements/gi, '')
    .replace(/BCAS\s+International/gi, '')
    .replace(/Study\s+Abroad\s+Story/gi, '')
    .replace(/Success\s+Story/gi, '')
    .replace(/Student\s+Testimonial/gi, '')
    .replace(/Visa\s+Grant/gi, '')
    .replace(/Visa\s+Success/gi, '')
    .replace(/Official\s+Video/gi, '')
    .trim();

  // If title was formatted like "Name - University" or "Name | University"
  if (cleaned.includes(' - ')) {
    const parts = cleaned.split(' - ');
    if (parts[0] && parts[0].trim().length > 2) {
      cleaned = parts[0].trim();
    }
  } else if (cleaned.includes(' | ')) {
    const parts = cleaned.split(' | ');
    if (parts[0] && parts[0].trim().length > 2) {
      cleaned = parts[0].trim();
    }
  }

  // Remove trailing pipes or dashes or colons
  cleaned = cleaned.replace(/[\s|:-]+$/, '').trim();

  return cleaned || 'BCAS Student Story';
}

/**
 * Automatically fetch details from YouTube link (via /api/youtube-meta or YouTube oEmbed)
 */
export async function autoDetectYouTubeDetails(inputUrlOrId: string): Promise<DetectedVideoMeta> {
  const youtubeId = extractYouTubeId(inputUrlOrId);
  if (!youtubeId) {
    throw new Error('Please enter a valid YouTube video URL or ID.');
  }

  const standardUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  let rawTitle = '';
  let authorName = '';

  // 1. Try our backend proxy route first
  try {
    const res = await fetch(`/api/youtube-meta?url=${encodeURIComponent(standardUrl)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.meta) {
        return data.meta;
      }
    }
  } catch (err) {
    console.warn('Backend youtube-meta proxy failed, trying direct oEmbed:', err);
  }

  // 2. Direct YouTube oEmbed fallback
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(standardUrl)}&format=json`;
    const oembedRes = await fetch(oembedUrl);
    if (oembedRes.ok) {
      const oembedData = await oembedRes.json();
      rawTitle = oembedData.title || '';
      authorName = oembedData.author_name || '';
    }
  } catch (err) {
    console.warn('Direct oEmbed failed, fallback to pattern detection:', err);
  }

  // 3. Extract University & Country
  const textToScan = `${rawTitle} ${authorName} ${inputUrlOrId}`;
  const { university, destination, flag } = parseDetailsFromText(textToScan);
  const studentName = cleanStudentName(rawTitle);

  // 4. Generate Applied Video Caption
  let caption = '';
  if (rawTitle) {
    if (rawTitle.includes(':')) {
      const seg = rawTitle.split(':')[1]?.trim();
      if (seg && seg.length > 8) caption = seg;
    } else if (rawTitle.includes('-')) {
      const parts = rawTitle.split('-');
      if (parts.length > 1) {
        const seg = parts.slice(1).join('-').trim();
        if (seg.length > 8) caption = seg;
      }
    } else if (rawTitle.includes('|')) {
      const seg = rawTitle.split('|')[0]?.trim();
      if (seg && seg.length > 8) caption = seg;
    }
  }

  if (caption) {
    caption = caption
      .replace(/\|\s*BCAS.*$/i, '')
      .replace(/-\s*BCAS.*$/i, '')
      .trim();
  }

  if (!caption || caption.length < 8) {
    caption = `Direct BCAS study-abroad pathway progression to ${destination} with verified credit transfer.`;
  }

  return {
    youtubeId,
    youtubeUrl: standardUrl,
    title: rawTitle || 'Student Overseas Video Story',
    studentName,
    university,
    destination,
    flag,
    caption,
    thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    rawTitle,
    authorName
  };
}
