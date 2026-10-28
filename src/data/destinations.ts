/**
 * ============================================================================
 * BCAS INTERNATIONAL UNIVERSITY PLACEMENTS - STUDY DESTINATIONS DATA
 * ============================================================================
 * 
 * HOW TO EDIT OR ADD A DESTINATION:
 * ----------------------------------------------------------------------------
 * 1. To edit an existing destination, simply modify the fields below (e.g., avgTuitionPerYear,
 *    workDuringStudy, popularCities, etc.).
 * 
 * 2. To ADD A NEW DESTINATION, copy the template below and paste it into the DESTINATIONS array:
 * 
 *    {
 *      id: 'new-country',                           // lowercase unique ID (e.g. 'new-zealand')
 *      name: 'New Zealand',                         // Country display name
 *      code: 'NZ',                                  // 2-letter ISO country code
 *      flag: '🇳🇿',                                  // Flag emoji
 *      tagline: 'High quality of life, post-study work & globally ranked universities',
 *      heroImage: 'https://images.unsplash.com/...',// Landscape photo URL
 *      overview: 'Comprehensive overview of studying in this country for Sri Lankan students...',
 *      avgTuitionPerYear: 'NZD 26,000 – 38,000',
 *      avgLivingPerYear: 'NZD 20,000 / year',
 *      workDuringStudy: 'Up to 20 hours/week during semesters',
 *      postStudyWorkVisa: 'Post-Study Work Visa up to 3 years',
 *      primaryIntakes: 'February and July',
 *      currency: 'NZD ($)',
 *      officialImmigrationName: 'Immigration New Zealand Student Visa',
 *      officialImmigrationUrl: 'https://www.immigration.govt.nz/...',
 *      popularCities: ['Auckland', 'Wellington', 'Christchurch'],
 *      topReasons: [
 *        'Point 1 why Sri Lankan students choose this country',
 *        'Point 2 why Sri Lankan students choose this country',
 *        'Point 3 why Sri Lankan students choose this country'
 *      ]
 *    },
 * ============================================================================
 */

import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'UK',
    flag: '🇬🇧',
    tagline: 'World-renowned degrees, 1-year Master’s & 2-year Graduate Route visa',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    overview: 'The UK continues to be a premier choice for Sri Lankan students. Offering internationally accredited qualifications, accelerated 3-year bachelor’s and 1-year master’s programmes, and the Graduate Route visa allowing up to 2 years of post-study work.',
    avgTuitionPerYear: '£12,000 – £22,000',
    avgLivingPerYear: '£9,207 (outside London) / £12,006 (inside London)',
    workDuringStudy: 'Up to 20 hours/week during term time, full-time in holidays',
    postStudyWorkVisa: 'Graduate Route: 2 years (3 years for PhD graduates)',
    primaryIntakes: 'September/October (Major) and January/February (Secondary)',
    currency: 'GBP (£)',
    officialImmigrationName: 'GOV.UK Student Visa Guidance',
    officialImmigrationUrl: 'https://www.gov.uk/student-visa',
    popularCities: ['London', 'Birmingham', 'Manchester', 'Coventry', 'Leeds', 'Edinburgh'],
    topReasons: [
      'Fast-track completion: 1-Year Master’s save substantial living and tuition costs',
      'Graduate Route allows 2 full years of post-graduation employment in the UK',
      'Direct pathway and credit exemptions from BCAS diplomas and HND qualifications',
      'Multicultural student cities with strong Sri Lankan student communities'
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    tagline: 'High quality of life, leading research universities and post-study work',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    overview: 'Australia combines exceptional educational standards with an enviable lifestyle. Renowned for practical research, modern campuses, and regional migration incentives that reward study in vibrant regional university cities.',
    avgTuitionPerYear: 'AUD 24,000 – 42,000',
    avgLivingPerYear: 'AUD 29,710 / year (Official migration guideline)',
    workDuringStudy: 'Up to 48 hours per fortnight during study semesters',
    postStudyWorkVisa: 'Temporary Graduate Visa (Subclass 485): 2 to 4 years depending on degree level and regional location',
    primaryIntakes: 'February (Semester 1) and July (Semester 2)',
    currency: 'AUD ($)',
    officialImmigrationName: 'Department of Home Affairs Student Visa (Subclass 500)',
    officialImmigrationUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500',
    popularCities: ['Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide', 'Wollongong'],
    topReasons: [
      'Universities consistently ranked in the global top 100 with world-class facilities',
      'Flexible work rights of 48 hours per fortnight during university terms',
      'Generous post-study work visas with extra duration for regional university campuses',
      'Clear vocational and higher education progression pathways'
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    tagline: 'Co-op work placements, high safety index and Post-Graduation Work Permits',
    heroImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80',
    overview: 'Canada is celebrated for its welcoming society, safe university towns, and comprehensive Co-op work-integrated learning programmes that give students paid Canadian work experience prior to graduating.',
    avgTuitionPerYear: 'CAD 18,000 – 35,000',
    avgLivingPerYear: 'CAD 20,635 / year (Official IRCC guideline)',
    workDuringStudy: 'Up to 24 hours per week off-campus during academic sessions; full-time during scheduled breaks',
    postStudyWorkVisa: 'Post-Graduation Work Permit (PGWP): Up to 3 years based on programme length',
    primaryIntakes: 'September (Fall) and January (Winter)',
    currency: 'CAD ($)',
    officialImmigrationName: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    officialImmigrationUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html',
    popularCities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary', 'Halifax'],
    topReasons: [
      'Paid Co-op semesters provide invaluable North American work experience',
      'Post-Graduation Work Permit (PGWP) of up to 3 years',
      'High safety index and student-friendly immigration policies',
      'Strong industries in Technology, Biomedical, AI and Project Management'
    ]
  },
  {
    id: 'sweden',
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    tagline: 'Global innovation capital, English-taught degrees & 1-year job seeker residence permit',
    heroImage: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80',
    overview: 'Sweden is the birthplace of global tech giants like Spotify, Skype, and IKEA, and consistently ranks among the most innovative societies on earth. Swedish universities offer cutting-edge English-taught bachelor’s and master’s programmes with generous working rights and post-study opportunities.',
    avgTuitionPerYear: 'SEK 85,000 – 145,000 (~EUR €7,500 – €13,000)',
    avgLivingPerYear: 'SEK 9,500 – 12,000 / month (~EUR €850 – €1,050/mo)',
    workDuringStudy: 'No statutory hourly limit on working during studies for degree students with a valid residence permit',
    postStudyWorkVisa: '1-Year Residence Permit to Seek Employment or Explore Starting a Business after graduation',
    primaryIntakes: 'August/September (Autumn) and January (Spring)',
    currency: 'SEK (Swedish Krona)',
    officialImmigrationName: 'Migrationsverket (Swedish Migration Agency)',
    officialImmigrationUrl: 'https://www.migrationsverket.se/English/Private-individuals/Studying-and-researching-in-Sweden.html',
    popularCities: ['Stockholm', 'Gothenburg', 'Uppsala', 'Lund', 'Malmö'],
    topReasons: [
      'Pioneer of global technology, sustainability, and clean tech innovation',
      'Unrestricted working hours during academic semesters with a valid residence permit',
      '1-Year post-graduation residence permit to secure professional employment or launch a startup',
      'Ranked among the top 10 happiest and safest nations with over 90% English fluency'
    ]
  },
  {
    id: 'finland',
    name: 'Finland',
    code: 'FI',
    flag: '🇫🇮',
    tagline: 'World’s #1 education system, 2-year post-study job search visa & 30 hrs/wk work rights',
    heroImage: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
    overview: 'Ranked the happiest country in the world for seven consecutive years, Finland boasts the globe’s most admired education model, exceptional safety, and an advanced tech and green-energy economy. International graduates benefit from a 2-year job-search visa.',
    avgTuitionPerYear: 'EUR €8,000 – €14,000',
    avgLivingPerYear: 'EUR €8,000 – €11,000 / year',
    workDuringStudy: 'Up to 30 hours per week during term time and unrestricted hours during holidays',
    postStudyWorkVisa: '2-Year Post-Study Job Search Residence Permit (can be split or extended)',
    primaryIntakes: 'August/September (Autumn) and January (Spring)',
    currency: 'EUR (€)',
    officialImmigrationName: 'Migri (Finnish Immigration Service)',
    officialImmigrationUrl: 'https://migri.fi/en/residence-permit-application-for-studies',
    popularCities: ['Helsinki', 'Espoo', 'Tampere', 'Oulu', 'Turku'],
    topReasons: [
      'Consistently ranked #1 Happiest Country in the World with unmatched quality of life',
      'Generous 30 hours per week part-time student work rights',
      '2-Year post-study residence permit for job search or tech entrepreneurship',
      'Global pioneer in Artificial Intelligence, communications, gaming, and sustainability'
    ]
  },
  {
    id: 'malta',
    name: 'Malta',
    code: 'MT',
    flag: '🇲🇹',
    tagline: 'English-speaking EU island, affordable Schengen degrees & 9-month post-study visa',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    overview: 'Malta is an English-speaking European Union archipelago located in the sunny Mediterranean. With affordable tuition rates, recognized European bachelor’s and master’s programmes, and Schengen visa privileges, it offers unmatched value for international students.',
    avgTuitionPerYear: 'EUR €7,500 – €14,000',
    avgLivingPerYear: 'EUR €7,000 – €11,000 / year',
    workDuringStudy: 'Up to 20 hours/week after completing the first 90 days of study',
    postStudyWorkVisa: '9-Month post-study work visa for graduates to seek employment across Malta and the EU',
    primaryIntakes: 'October (Autumn) and February (Spring)',
    currency: 'EUR (€)',
    officialImmigrationName: 'Identità Malta (Central Visa Unit)',
    officialImmigrationUrl: 'https://identita.gov.mt/',
    popularCities: ['Valletta', 'Msida', 'St. Julian’s', 'Sliema'],
    topReasons: [
      'Official English-speaking nation within the European Union',
      'Highly affordable tuition and living expenses compared to Western Europe',
      'Full Schengen visa mobility to travel throughout 29 European countries',
      'Fast-growing European center for Financial Technology, iGaming, and Tourism'
    ]
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    tagline: 'Dubai Academic City, tax-free career opportunities & world-class branch campuses',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    overview: 'The UAE, specifically Dubai and Abu Dhabi, hosts the world’s largest concentration of international university branch campuses (including British, Australian, and American institutions). Study an internationally accredited degree in a dynamic, tax-free economy.',
    avgTuitionPerYear: 'AED 35,000 – 75,000 (Approx. USD 9,500 – 20,000)',
    avgLivingPerYear: 'AED 30,000 – 48,000 / year',
    workDuringStudy: 'Part-time work permitted with university No Objection Certificate (NOC)',
    postStudyWorkVisa: 'Green Visa (5 years) for skilled graduates, and Golden Visa options for outstanding academic achievers',
    primaryIntakes: 'September (Fall) and January (Spring)',
    currency: 'AED (Dh)',
    officialImmigrationName: 'Federal Authority for Identity, Citizenship & Customs (ICP)',
    officialImmigrationUrl: 'https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/student-visa',
    popularCities: ['Dubai (DIAC & Knowledge Park)', 'Abu Dhabi', 'Sharjah University City'],
    topReasons: [
      'Study at world-class British or Australian universities located in Dubai',
      'Tax-free income environment with vibrant regional employment hubs',
      'Rapid visa issuance with straightforward processing and low documentation hurdles',
      'Short 4-hour direct flight connection to Colombo'
    ]
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    code: 'NZ',
    flag: '🇳🇿',
    tagline: 'High quality of life, 3-year post-study work visa & top 3% global universities',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    overview: 'New Zealand offers world-class education with all 8 of its universities ranked in the global top 3%. Celebrated for innovation, pristine natural beauty, and a safe, welcoming multicultural society with generous 3-year post-study work rights.',
    avgTuitionPerYear: 'NZD 24,000 – 38,000',
    avgLivingPerYear: 'NZD 20,000 / year (Official INZ guideline)',
    workDuringStudy: 'Up to 20 hours/week during semesters, full-time during vacations',
    postStudyWorkVisa: 'Post-Study Work Visa (PSWV) up to 3 years depending on qualification level',
    primaryIntakes: 'February (Semester 1) and July (Semester 2)',
    currency: 'NZD ($)',
    officialImmigrationName: 'Immigration New Zealand Fee Paying Student Visa',
    officialImmigrationUrl: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/fee-paying-student-visa',
    popularCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Dunedin'],
    topReasons: [
      'All 8 New Zealand state universities rank in the global top 3% (QS Rankings)',
      'Generous 3-year open Post-Study Work Visa for bachelor and master graduates',
      'Safe, tranquil study environment ranked #2 in the Global Peace Index',
      'Straightforward credit transfer for BCAS diploma and HND holders'
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    code: 'MY',
    flag: '🇲🇾',
    tagline: 'Affordable British & Australian degrees, vibrant ASEAN hub & low living costs',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    overview: 'Malaysia is Southeast Asia’s premier higher education hub, offering UK and Australian branch campuses and dual degrees at a fraction of the cost of Western Europe, with a high standard of living and proximity to Sri Lanka.',
    avgTuitionPerYear: 'MYR 22,000 – 45,000 (Approx. USD 5,000 – 10,500)',
    avgLivingPerYear: 'MYR 14,000 – 20,000 / year',
    workDuringStudy: 'Up to 20 hours/week during semester breaks in specified hospitality sectors',
    postStudyWorkVisa: 'Employment Pass (EP) and Digital Nomad DE Rantau Pass routes for skilled graduates',
    primaryIntakes: 'January/February, May/June, and September/October',
    currency: 'MYR (RM)',
    officialImmigrationName: 'Education Malaysia Global Services (EMGS)',
    officialImmigrationUrl: 'https://educationmalaysia.gov.my/',
    popularCities: ['Kuala Lumpur & Subang', 'Penang', 'Johor Bahru (EduCity)', 'Kuching'],
    topReasons: [
      'Earn UK and Australian degrees (Nottingham, Southampton, Heriot-Watt, Swinburne) at 50% cost',
      'Ultra-affordable living costs and accommodation in metropolitan Kuala Lumpur',
      'Fast 3.5-hour direct flight connection from Colombo',
      'Smooth twinning and credit pathway progression to UK, Australia, and New Zealand'
    ]
  }
];
