import {
  Campus,
  University,
  Course,
  Destination,
  Scholarship,
  SuccessStory,
  BlogPost,
  StudentPortalProfile,
  StudyAbroadEvent,
  TestimonialVideo
} from '../types';

export const BCAS_CAMPUSES: Campus[] = [
  {
    id: 'colombo',
    name: 'Colombo Campus',
    role: 'Colombo Regional Campus & Placement Center',
    title: 'BCAS Colombo Regional Campus',
    address: ['356, Galle Road', 'Colombo 03, Sri Lanka'],
    city: 'Colombo',
    phone: '+94 76 141 5273',
    whatsapp: 'https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20study%20abroad%20pathways%20at%20the%20Colombo%20Campus.',
    mapQuery: 'BCAS City Campus 356 Galle Road Colombo 03',
    email: 'Digital_Int@bcas.lk',
    hours: 'Monday – Sunday: 08:00 AM – 06:00 PM'
  },
  {
    id: 'jaffna',
    name: 'Jaffna Campus',
    role: 'Jaffna Regional Campus & Placement Center',
    title: 'BCAS Northern Regional Campus',
    address: ['16, Point Pedro Road', 'Jaffna, Sri Lanka'],
    city: 'Jaffna',
    phone: '+94 76 141 5273',
    whatsapp: 'https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20study%20abroad%20pathways%20at%20the%20Jaffna%20Campus.',
    mapQuery: 'BCAS Northern Regional Campus 16 Point Pedro Road Jaffna',
    email: 'Digital_Int@bcas.lk',
    hours: 'Monday – Sunday: 08:00 AM – 06:00 PM'
  },
  {
    id: 'kalmunai',
    name: 'Kalmunai Campus',
    role: 'Kalmunai Regional Campus & Placement Center',
    title: 'BCAS Eastern Regional Campus',
    address: ['392/1, Main Street', 'Kalmunai, Sri Lanka'],
    city: 'Kalmunai',
    phone: '+94 76 141 5273',
    whatsapp: 'https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20study%20abroad%20pathways%20at%20the%20Kalmunai%20Campus.',
    mapQuery: 'BCAS Eastern Regional Campus 392/1 Main Street Kalmunai',
    email: 'Digital_Int@bcas.lk',
    hours: 'Monday – Sunday: 08:00 AM – 06:00 PM'
  },
  {
    id: 'kandy',
    name: 'Kandy Campus',
    role: 'Kandy Regional Campus & Placement Center',
    title: 'BCAS Central Province Campus',
    address: ['344, Peradeniya Road', 'Kandy, Sri Lanka'],
    city: 'Kandy',
    phone: '+94 76 141 5273',
    whatsapp: 'https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20study%20abroad%20pathways%20at%20the%20Kandy%20Campus.',
    mapQuery: 'BCAS Central Province Campus 344 Peradeniya Road Kandy',
    email: 'Digital_Int@bcas.lk',
    hours: 'Monday – Sunday: 08:00 AM – 06:00 PM'
  }
];

export const BCAS_SOCIAL_LINKS = [
  {
    name: 'Facebook',
    handle: '@bcasinternationalcentre',
    url: 'https://www.facebook.com/bcasinternationalcentre',
    icon: 'facebook'
  },
  {
    name: 'Instagram',
    handle: '@bcasinternational',
    url: 'https://www.instagram.com/bcasinternational/',
    icon: 'instagram'
  },
  {
    name: 'LinkedIn',
    handle: 'BCAS International University Placements',
    url: 'https://www.linkedin.com/company/bcasinternationaluniversityplacements/',
    icon: 'linkedin'
  },
  {
    name: 'TikTok',
    handle: '@bcasstudyabroad',
    url: 'https://www.tiktok.com/@bcasstudyabroad',
    icon: 'tiktok'
  },
  {
    name: 'YouTube',
    handle: 'BCAS International Placements',
    url: 'https://www.youtube.com/@bcasinternationalplacements',
    icon: 'youtube'
  },
  {
    name: 'Official BCAS Website',
    handle: 'bcas.lk',
    url: 'https://bcas.lk/',
    icon: 'external'
  }
];

// ============================================================================
// DEDICATED MODULAR DATA FILES (FOR EASY CODE EDITING):
// - To edit or add DESTINATIONS -> open src/data/destinations.ts
// - To edit or add UNIVERSITIES -> open src/data/universities.ts
// - To edit or add COURSES      -> open src/data/courses.ts
// ============================================================================
export { DESTINATIONS } from './destinations';
export { UNIVERSITIES } from './universities';
export { COURSES } from './courses';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'institution-merit',
    title: 'University Vice-Chancellor’s & International Merit Awards',
    provider: 'Partner Universities (UK, Australia, Canada, Malaysia)',
    destination: 'United Kingdom / Australia / Canada',
    type: 'Merit-Based',
    coverage: '£1,500 – £5,000 / AUD 5,000 – 10,000 tuition fee reduction',
    eligibility: 'Awarded to applicants with strong academic performance in A/Levels, BCAS HND, or bachelor’s degree.',
    deadline: 'Varies by university; recommended application 3–4 months prior to intake',
    requirements: [
      'Official academic transcripts demonstrating high academic grades (e.g., Distinction or Merit)',
      'Unconditional or conditional admission offer from the university',
      'Strong Personal Statement detailing academic ambition and leadership',
      'English proficiency results (IELTS/PTE) meeting university direct entry criteria'
    ]
  },
  {
    id: 'early-acceptance',
    title: 'Early Bird Acceptance & Deposit Fee Reductions',
    provider: 'Selected UK & Australian Universities',
    destination: 'United Kingdom / Australia',
    type: 'Early Acceptance',
    coverage: '£1,000 – £2,000 direct tuition deduction upon early deposit',
    eligibility: 'Available to students who accept their offer and pay their initial tuition deposit before early cut-off dates.',
    deadline: 'Usually June (for September intake) / November (for January intake)',
    requirements: [
      'Valid offer letter issued by the partner university',
      'Payment of tuition deposit before university stipulated deadline',
      'No separate essay required; applied automatically upon fee confirmation'
    ]
  },
  {
    id: 'south-asia-grant',
    title: 'South Asian Regional Bursaries',
    provider: 'Participating UK & Australian Institutions',
    destination: 'United Kingdom / Australia',
    type: 'Institutional Award',
    coverage: '10% – 25% recurring tuition reduction per year of study',
    eligibility: 'All qualified passport holders residing in Sri Lanka and South Asian region applying for eligible degree programmes.',
    deadline: 'Assessed on rolling basis alongside standard degree application',
    requirements: [
      'Citizen and resident of Sri Lanka',
      'Accepted into full-time undergraduate or postgraduate taught programme',
      'Maintain satisfactory academic progress during degree for annual renewal'
    ]
  },
  {
    id: 'chevening',
    title: 'Chevening Scholarships (UK Government)',
    provider: 'UK Foreign, Commonwealth & Development Office (FCDO)',
    destination: 'United Kingdom',
    type: 'Government',
    coverage: 'Fully funded: 100% Tuition fees, monthly living stipend, return flights & visa costs',
    eligibility: 'Sri Lankan professionals with minimum 2 years of work experience pursuing a 1-year master’s degree in the UK.',
    deadline: 'Early November annually for the following academic year',
    requirements: [
      'Undergraduate degree (2:1 equivalent or above)',
      'Minimum 2 years (2,800 hours) of demonstrable work experience',
      'Application to three eligible UK master’s courses',
      'Four detailed essays on leadership, networking, studying in the UK, and long-term career goals'
    ],
    officialUrl: 'https://www.chevening.org/scholarship/sri-lanka/'
  },
  {
    id: 'australia-awards',
    title: 'Australia Awards Scholarships',
    provider: 'Australian Department of Foreign Affairs and Trade (DFAT)',
    destination: 'Australia',
    type: 'Government',
    coverage: 'Full tuition, return air travel, establishment allowance, contribution to living expenses, health cover',
    eligibility: 'Sri Lankan mid-career professionals committed to contributing to national development priorities upon return.',
    deadline: 'End of April annually for the following year intake',
    requirements: [
      'Minimum bachelor’s degree qualification',
      'Professional experience in target development sectors',
      'Return to Sri Lanka for at least two years following graduation',
      'Official application submitted via Australian Government portal'
    ],
    officialUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards'
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-1',
    studentName: 'Dinuk Senanayake',
    fromCampus: 'BCAS Colombo Campus',
    currentUniversity: 'University of East London, UK',
    destination: 'United Kingdom',
    degreeProgramme: 'BSc (Hons) Cloud Computing & Software Systems',
    graduationYear: '2025 Graduate',
    currentRole: 'Associate Cloud Engineer at London Fintech',
    storyQuote: 'Completing my HND at BCAS Colombo and transferring directly into the final year in London was the most cost-effective and seamless path to a UK career.',
    fullJourney: 'Dinuk began his journey by studying the BTEC HND in Computing at BCAS City Campus in Colombo. Upon completion with Distinction, the BCAS International Placements team secured him an unconditional offer with significant credit transfer into the final year (Top-Up) at UEL in London. After excelling in his final project, he transitioned to the Graduate Route visa and now works in London.',
    adviceForStudents: 'Start your visa and document preparation early. BCAS helped me organize my bank statements properly so I experienced zero delays in my visa grant.',
    category: 'Computing & IT',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-2',
    studentName: 'Fathima Risma',
    fromCampus: 'BCAS Kalmunai Campus',
    currentUniversity: 'Deakin University, Australia',
    destination: 'Australia',
    degreeProgramme: 'Master of International Business Analytics',
    graduationYear: '2024 Graduate',
    currentRole: 'Business Intelligence Consultant, Melbourne',
    storyQuote: 'The counselors at BCAS understood my aspirations and walked me through every scholarship option until I secured a 25% Vice-Chancellor award.',
    fullJourney: 'Coming from Kalmunai, Risma wanted a globally recognized master’s degree in Australia. BCAS guided her through course selection, IELTS preparation advice, and scholarship essays. She completed her degree at Deakin’s Melbourne campus and now works as a BI consultant.',
    adviceForStudents: 'Do not be intimidated by the paperwork. Ask every question, be honest about your financial budget, and trust the guidance provided by experienced counselors.',
    category: 'Business & Management',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-3',
    studentName: 'Karthik Sivakumar',
    fromCampus: 'BCAS Jaffna Campus',
    currentUniversity: 'University of Wollongong, Australia',
    destination: 'Australia',
    degreeProgramme: 'Bachelor of Civil & Structural Engineering',
    graduationYear: '2025 Graduate',
    currentRole: 'Graduate Site Engineer, New South Wales',
    storyQuote: 'Studying in a designated regional university city gave me world-class engineering education and an additional year of post-study work rights.',
    fullJourney: 'Karthik started with the BCAS Foundation in Science and Technology in Jaffna, then applied through BCAS to UOW Australia. BCAS managed his GTE (Genuine Student) statement review and financial documentation with precision.',
    adviceForStudents: 'Look closely at regional universities in Australia. The campus community is tight-knit, living costs are lower, and post-study opportunities are tremendous.',
    category: 'Engineering & Construction',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-4',
    studentName: 'Nipuni Wickramasinghe',
    fromCampus: 'BCAS Kandy Campus',
    currentUniversity: 'Brock University, Canada',
    destination: 'Canada',
    degreeProgramme: 'BSc in Biomedical Sciences & Biotechnology',
    graduationYear: '2024 Graduate',
    currentRole: 'Clinical Research Laboratory Associate, Ontario',
    storyQuote: 'The Co-op work term was the highlight of my degree. I graduated with 12 months of Canadian work experience already on my resume.',
    fullJourney: 'Nipuni began her consultations at the BCAS Kandy Campus. The team helped her evaluate Canadian universities offering paid Co-op education. She secured admission at Brock University in Ontario, completed two paid research terms, and transitioned seamlessly into a clinical laboratory position.',
    adviceForStudents: 'Always check if your Canadian programme includes Co-op. It makes transitioning from student life to professional employment so much easier.',
    category: 'Health & Applied Science',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-5',
    studentName: 'Malsha Fernando',
    fromCampus: 'BCAS Colombo Campus',
    currentUniversity: 'KTH Royal Institute of Technology, Sweden',
    destination: 'Sweden',
    degreeProgramme: 'MSc in Software Engineering of Distributed Systems',
    graduationYear: '2025 Graduate',
    currentRole: 'Backend Developer at Stockholm Tech Unicorn',
    storyQuote: 'Studying in Sweden opened the door to Europe’s most innovative tech ecosystem. BCAS guided my admissions portfolio and Swedish migration application flawlessly.',
    fullJourney: 'After excelling in the Computing HND at BCAS Colombo, Malsha aimed for Scandinavian research excellence. BCAS advisers evaluated Sweden’s unique admissions system (Universityadmissions.se) and helped compile her academic dossier. She received an offer from KTH in Stockholm and graduated with immediate job placement.',
    adviceForStudents: 'Sweden values practical critical thinking. Apply during the early Swedish Autumn window and take advantage of the 1-year job search permit.',
    category: 'Computing & IT',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-6',
    studentName: 'Tharindu Alwis',
    fromCampus: 'BCAS Kandy Campus',
    currentUniversity: 'Aalto University, Finland',
    destination: 'Finland',
    degreeProgramme: 'Master in Sustainable Clean Technologies',
    graduationYear: '2025 Graduate',
    currentRole: 'Green Energy Systems Analyst, Helsinki',
    storyQuote: 'Finland is ranked #1 in happiness for a reason. With a 2-year post-study job seeker visa and 30 hours per week working rights, studying here has been life-changing.',
    fullJourney: 'Starting his academic inquiries at BCAS Kandy Campus, Tharindu explored Nordic clean technology programmes. The BCAS team guided him through Finland’s Migri electronic residence permit and scholarship application, securing a 50% tuition waiver at Aalto University.',
    adviceForStudents: 'Finland’s tech sector is hungry for international talent. The work-life balance is incredible and student support is the best in the world.',
    category: 'Engineering & Construction',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-7',
    studentName: 'Ayesha Zahra',
    fromCampus: 'BCAS Kalmunai Campus',
    currentUniversity: 'Heriot-Watt University Dubai, UAE',
    destination: 'United Arab Emirates',
    degreeProgramme: 'MSc in International Financial Technology',
    graduationYear: '2024 Graduate',
    currentRole: 'Fintech Compliance Officer, Dubai DIFC',
    storyQuote: 'BCAS provided a swift 4-week turnaround from my Kalmunai counseling session to my Dubai university visa stamp. Dubai offers high tax-free earning potential.',
    fullJourney: 'Ayesha sought a high-prestige UK degree without European winters and long flight times. BCAS Placements recommended Heriot-Watt’s Dubai International Academic City campus. She secured a 20% academic merit bursary and is now employed in the Dubai International Financial Centre (DIFC).',
    adviceForStudents: 'UAE is just a 4-hour flight from Sri Lanka and the economy is booming. It is one of the quickest and smoothest visa pathways available.',
    category: 'Business & Management',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-8',
    studentName: 'Jeremy Rodrigo',
    fromCampus: 'BCAS Jaffna Campus',
    currentUniversity: 'Global College Malta / University of Chester',
    destination: 'Malta',
    degreeProgramme: 'Bachelor of International Business Management',
    graduationYear: '2024 Graduate',
    currentRole: 'Operations Analyst, Valletta',
    storyQuote: 'Affordable tuition, English-speaking environment, and Schengen visa travel across Europe made Malta the ideal European starting point for me.',
    fullJourney: 'Jeremy visited the BCAS Jaffna campus looking for European degree options on a sensible budget. BCAS matched him with Global College Malta in SmartCity. He completed his degree with European accreditation and leveraged the 9-month post-study visa.',
    adviceForStudents: 'Do not overlook Malta. It is completely English-speaking, remarkably welcoming, and offers Schengen access throughout Europe.',
    category: 'Business & Management',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-9',
    studentName: 'Kasun Rathnayake',
    fromCampus: 'BCAS Colombo Campus',
    currentUniversity: 'Coventry University, UK',
    destination: 'United Kingdom',
    degreeProgramme: 'BSc (Hons) Automotive & Mechanical Engineering',
    graduationYear: '2025 Graduate',
    currentRole: 'Junior Design Engineer, West Midlands',
    storyQuote: 'BCAS Colombo transferred all my Pearson BTEC credits directly to Coventry. I completed my final year with First Class Honours.',
    fullJourney: 'Starting his engineering foundation at BCAS Colombo Campus, Kasun progressed through the Higher National Diploma before transferring into Coventry University with direct credit recognition. The BCAS visa advisory team provided complete bank verification and interview coaching.',
    adviceForStudents: 'Make the most of the Pearson BTEC HND pathway. It cuts your overseas tuition fees by more than half while graduating with the exact same prestigious degree.',
    category: 'Engineering & Construction',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'story-10',
    studentName: 'Zainab Mansoor',
    fromCampus: 'BCAS Colombo Campus',
    currentUniversity: 'University of Portsmouth, UK',
    destination: 'United Kingdom',
    degreeProgramme: 'BSc (Hons) Cybersecurity & Digital Forensics',
    graduationYear: '2025 Graduate',
    currentRole: 'SOC Analyst at Cyber Defense Lab, Hampshire',
    storyQuote: 'BCAS prepared me with practical lab certifications and handled my UK CAS and priority visa in just 3 weeks.',
    fullJourney: 'Zainab completed the Computing HND at BCAS Colombo with distinction before topping up into University of Portsmouth. BCAS Placements supervised her compliance documents and secured her an early payment scholarship.',
    adviceForStudents: 'Build practical project portfolios during your HND years. It guarantees fast-track job interviews in the UK.',
    category: 'Computing & IT',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-plan',
    slug: 'study-abroad-plan-made-simple',
    title: 'Your Study-Abroad Plan, Made Simple: 5 Actionable Milestones',
    category: 'Study abroad',
    readTime: '6 min read',
    publishedDate: 'October 2026',
    excerpt: 'Not sure where to begin? Break a major life decision into smaller, stress-free milestones: goals, course options, budget realities, documents, and key questions to ask.',
    heroImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ahmath Musharraf',
      role: 'BCAS International University Placements'
    },
    relatedPostIds: ['blog-documents', 'blog-destination'],
    content: [
      {
        heading: '01. Start with Your Personal Goals, Not Just the Country',
        paragraphs: [
          'It is common for students to pick a country because a friend or family member lives there. While community matters, your chosen programme should first align with your academic aptitude, career aspirations, and long-term residency goals.',
          'Ask yourself: What field genuinely engages me? Do I want an accelerated 1-year master’s (like in the UK) or a programme with 48 hours per fortnight working flexibility and 2 to 4 years post-study rights (like Australia)?'
        ],
        bulletPoints: [
          'List 2 or 3 career roles you would love to step into after graduating.',
          'Verify whether the professional qualification requires specific accreditation in Sri Lanka (e.g., IESL for engineers or Sri Lanka Law College for law).'
        ]
      },
      {
        heading: '02. Compare Total Cost, Not Just Headline Tuition',
        paragraphs: [
          'Tuition is only one part of your study-abroad budget. Living expenses vary dramatically depending on whether you live in London/Sydney or student towns like Wolverhampton, Newcastle, or Geelong.',
          'Always account for initial visa application fees, immigration healthcare surcharges (IHS in the UK), mandatory overseas student health cover (OSHC in Australia), flights, and an emergency cushion.'
        ],
        proTip: 'Student towns located 1–2 hours away from capital cities typically offer 30%–45% lower rental costs with identical quality of education.'
      },
      {
        heading: '03. Understand Realistic Timelines',
        paragraphs: [
          'The biggest mistake students make is leaving visa and financial paperwork until the last month. We recommend starting your consultations 6 to 9 months before your target intake.',
          'This provides sufficient time to sit for your English proficiency test (IELTS Academic or PTE Academic), obtain certified academic transcripts, and maintain financial evidence in your bank account for the legally required duration.'
        ]
      }
    ]
  },
  {
    id: 'blog-documents',
    slug: 'application-documents-checklist',
    title: 'Application Documents: The Definitive Checklist Before You Apply',
    category: 'Applications',
    readTime: '4 min read',
    publishedDate: 'October 2026',
    excerpt: 'Know exactly what paperwork to gather early, how to format your certified translations, and how to write a compelling Statement of Purpose.',
    heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ahmath Musharraf',
      role: 'BCAS International University Placements'
    },
    relatedPostIds: ['blog-visa', 'blog-plan'],
    content: [
      {
        heading: 'The Core Document Dossier',
        paragraphs: [
          'Every university application requires a verified bundle of official records. Preparing clean, high-resolution color scans in PDF format speeds up offer turnaround by weeks.'
        ],
        bulletPoints: [
          'Valid Passport (with at least 18 months remaining validity)',
          'G.C.E. O/L and A/L Official Certificates issued by the Department of Examinations',
          'BCAS Diploma or HND Transcripts and Completion Certificates (if applying for Top-Up)',
          'Valid IELTS Academic, PTE Academic, or TOEFL iBT test report form',
          'Two Academic or Professional Reference Letters on official letterhead',
          'Detailed Curriculum Vitae (CV) outlining education, projects, and work history'
        ]
      },
      {
        heading: 'Crafting Your Statement of Purpose (SOP)',
        paragraphs: [
          'Your SOP or Personal Statement is your direct voice to the university admissions committee. Avoid generic templates found online. Focus on three essential questions:',
          'Why this specific course? Why this specific institution? And how will this qualification empower your return to your professional career?'
        ],
        proTip: 'Admissions tutors spot AI-generated copy immediately. Authentic, personal stories about what ignited your interest in the subject always win offers.'
      }
    ]
  },
  {
    id: 'blog-scholarships',
    slug: 'how-to-start-looking-for-scholarships',
    title: 'How to Win University Merit Scholarships in 2026/2027',
    category: 'Scholarships',
    readTime: '5 min read',
    publishedDate: 'October 2026',
    excerpt: 'Where to search, what eligibility criteria actually mean, and how to structure your scholarship application to stand out from thousands of global applicants.',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ahmath Musharraf',
      role: 'BCAS International University Placements'
    },
    relatedPostIds: ['blog-budget', 'blog-plan'],
    content: [
      {
        heading: 'Demystifying International Scholarships',
        paragraphs: [
          'Many students believe scholarships are reserved only for top 1% academic geniuses. In reality, most international scholarships take the form of automatic institutional tuition fee discounts ranging from £1,500 to £5,000.',
          'Universities offer these discounts to encourage cultural diversity and reward motivated students from countries like Sri Lanka.'
        ]
      },
      {
        heading: 'Three Types of Funding to Target',
        bulletPoints: [
          'Automatic Regional Bursaries: Applied directly to your tuition if you meet minimum academic entry standards.',
          'Merit Scholarships: Competitive awards (20% to 50% tuition reduction) requiring a separate scholarship application essay and interview.',
          'Early Bird Acceptance Incentives: Direct fee reductions given to students who pay their deposit by the university early deadline.'
        ]
      },
      {
        heading: 'Golden Rule: Beware of Unverified Promises',
        paragraphs: [
          'Never pay anyone who promises or guarantees you a 100% scholarship. Genuine scholarships are awarded solely by the universities or accredited government bodies (like Chevening or Australia Awards).'
        ]
      }
    ]
  },
  {
    id: 'blog-destination',
    slug: 'choosing-a-destination-beyond-the-photos',
    title: 'Choosing a Destination Beyond the Photos: Cost, Climate & Reality',
    category: 'Study abroad',
    readTime: '5 min read',
    publishedDate: 'September 2026',
    excerpt: 'Compare the day-to-day realities of studying in the UK, Australia, Canada, New Zealand and Malaysia before making your final commitment.',
    heroImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ahmath Musharraf',
      role: 'BCAS International University Placements'
    },
    relatedPostIds: ['blog-budget', 'blog-plan'],
    content: [
      {
        heading: 'Everyday Details Matter',
        paragraphs: [
          'It is easy to get dazzled by pictures of Sydney Harbour or the London Eye. But when choosing where you will live for 1 to 4 years, everyday factors will govern your daily happiness.',
          'Consider public transportation networks, local part-time job markets, winter climate extremes, and accommodation availability.'
        ],
        bulletPoints: [
          'United Kingdom: Compact geography, extensive train network, rich history, mild maritime climate.',
          'Australia: Warm sunny weather, outdoor lifestyle, higher minimum wage, larger geographical distances.',
          'Canada: Welcoming community, paid Co-op opportunities, cold winters requiring good preparation.',
          'Malaysia: Warm tropical climate, familiar food culture, exceptionally low living expenses.'
        ]
      }
    ]
  },
  {
    id: 'blog-visa',
    slug: 'visa-preparation-start-with-official-guidance',
    title: 'Student Visa Preparation: Start with Official Government Guidance',
    category: 'Applications',
    readTime: '4 min read',
    publishedDate: 'September 2026',
    excerpt: 'Learn how to verify the latest immigration criteria, organize your financial proof, and avoid common application traps.',
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ahmath Musharraf',
      role: 'BCAS International University Placements'
    },
    relatedPostIds: ['blog-documents', 'blog-plan'],
    content: [
      {
        heading: 'Official Sources Are Your Only Source of Truth',
        paragraphs: [
          'Immigration policies change periodically. Social media rumors or outdated forum threads are the fastest route to visa refusal. Always verify rules directly on official portals like GOV.UK, HomeAffairs.gov.au, or Canada.ca.'
        ],
        bulletPoints: [
          'Financial Evidence: Funds must be held in acceptable financial institutions for the mandatory period (e.g. 28 consecutive days for the UK) prior to application date.',
          'Tuberculosis (TB) Testing: Required for UK visa applicants from Sri Lanka; must be completed at the designated IOM clinic in Colombo.',
          'Biometrics & Passport Submission: Book your appointment at VFS Global Colombo or the relevant visa center.'
        ]
      }
    ]
  },
  {
    id: 'blog-budget',
    slug: 'building-a-realistic-student-budget',
    title: 'Building a Realistic Student Budget: Beyond Tuition Fees',
    category: 'Student life',
    readTime: '5 min read',
    publishedDate: 'August 2026',
    excerpt: 'Calculate accommodation, groceries, transport, utilities, mobile plans, and emergency funds so you start your international journey with peace of mind.',
    heroImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
    author: {
      name: 'Ahmath Musharraf',
      role: 'BCAS International University Placements'
    },
    relatedPostIds: ['blog-scholarships', 'blog-destination'],
    content: [
      {
        heading: 'The 4 Pillars of a Student Budget',
        paragraphs: [
          'When planning funding with your family or sponsor, divide your budget into 4 distinct buckets to prevent unexpected shortfalls.'
        ],
        bulletPoints: [
          'Accommodation (40% - 50% of living budget): University halls or private student shared flats.',
          'Food & Groceries (20%): Cooking at home vs eating out can save up to £250 / AUD 400 per month.',
          'Transport & Connectivity (10%): Student discounted travel cards and SIM-only mobile plans.',
          'Health Insurance & Personal (15%): Mandatory health covers, clothing, books, and social activities.',
          'Emergency Buffer (5% - 10%): Reserved strictly for unexpected travel or health needs.'
        ]
      }
    ]
  }
];

export const DEMO_STUDENT_PROFILE: StudentPortalProfile = {
  id: 'bcas-std-2026-084',
  studentId: 'BCAS-INT-9428',
  fullName: 'Kasun Bandara Perera',
  email: 'kasun.perera@bcas.edu.lk',
  phone: '+94 77 348 2910',
  registeredCampus: 'Colombo Campus',
  targetUniversity: 'University of East London, UK',
  chosenCourse: 'BSc (Hons) Cloud Computing & Software Systems',
  destination: 'United Kingdom',
  applicationProgress: 65,
  currentStage: 'Conditional Offer Received & Financial Verification',
  checklist: [
    {
      title: 'Valid Passport Bio-Page Scan',
      completed: true,
      mandatory: true,
      description: 'Submitted & verified by BCAS admissions'
    },
    {
      title: 'G.C.E. A/L Official Results Certificate',
      completed: true,
      mandatory: true,
      description: 'Department of Examinations certified copy uploaded'
    },
    {
      title: 'BCAS HND Transcript & Completion Letter',
      completed: true,
      mandatory: true,
      description: 'Submitted for university credit exemption evaluation'
    },
    {
      title: 'IELTS Academic / PTE Test Report Form',
      completed: true,
      mandatory: true,
      description: 'Overall 6.5 with no band below 6.0 achieved'
    },
    {
      title: 'Statement of Purpose (SOP)',
      completed: true,
      mandatory: true,
      description: 'Reviewed and finalized with BCAS counselor'
    },
    {
      title: '28-Day Bank Statement for Visa CAS',
      completed: false,
      mandatory: true,
      description: 'Bank balance seasoning in progress (Day 18 of 28)'
    },
    {
      title: 'TB Clearance Certificate (IOM Colombo)',
      completed: false,
      mandatory: true,
      description: 'Appointment scheduled for upcoming Tuesday'
    }
  ],
  counselor: {
    name: 'Mrs. Shani Jayawardena',
    role: 'Senior International Placements Adviser',
    campus: 'Colombo City Campus',
    whatsapp: 'https://wa.me/94761415273?text=Hi%20Mrs.%20Shani,%20I%20have%20a%20question%20regarding%20my%20university%20application.'
  }
};

export const STUDY_ABROAD_EVENTS: StudyAbroadEvent[] = [
  {
    id: 'world-education-fair-colombo',
    title: 'BCAS World Education Fair & Spot Assessment Day',
    type: 'World Education Fair',
    date: 'Saturday, 15 November 2026',
    time: '10:00 AM – 4:30 PM',
    location: 'BCAS Colombo Regional Campus, 356 Galle Road',
    city: 'Colombo',
    participatingUniversities: [
      'Coventry University (UK)',
      'University of Portsmouth (UK)',
      'Deakin University (Australia)',
      'University of Wollongong (Australia)',
      'Cambridge International Academy (Canada)'
    ],
    description: 'Meet official university international admission officers face-to-face. Bring academic transcripts for instant eligibility checks, up to 50% scholarship evaluations, and on-the-spot offer letters.',
    badge: 'Spot Assessment Open',
    isVirtual: false
  },
  {
    id: 'spot-assessment-kandy',
    title: 'UK & Australia Spot Admission Sessions',
    type: 'Spot Assessment',
    date: 'Wednesday, 19 November 2026',
    time: '10:00 AM – 3:30 PM',
    location: 'BCAS Kandy Regional Campus, 344 Peradeniya Road',
    city: 'Kandy',
    participatingUniversities: [
      'Northumbria University (UK)',
      'University of Greenwich (UK)',
      'Swinburne University of Technology (Australia)'
    ],
    description: 'Direct 1-on-1 counseling with university delegates. Free application fee waivers and priority visa guidance for upcoming major intakes.',
    badge: 'Priority Intake',
    isVirtual: false
  },
  {
    id: 'spot-assessment-jaffna',
    title: 'Northern Province Global Study & Visa Forum',
    type: 'Spot Assessment',
    date: 'Saturday, 22 November 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'BCAS Jaffna Regional Campus, 16 Point Pedro Road',
    city: 'Jaffna',
    participatingUniversities: [
      'University of Hertfordshire (UK)',
      'Edith Cowan University (Australia)',
      'Middlesex University Dubai (UAE)'
    ],
    description: 'Comprehensive pathway seminar and document review for G.C.E. A/L and diploma students looking to complete degrees in the UK, Australia, or UAE.',
    badge: 'Free Entry & Profiling',
    isVirtual: false
  },
  {
    id: 'spot-assessment-kalmunai',
    title: 'Eastern Province Study Abroad Open Day & IELTS Diagnostic',
    type: 'University Open Day',
    date: 'Tuesday, 25 November 2026',
    time: '9:30 AM – 3:30 PM',
    location: 'BCAS Kalmunai Regional Campus, 392/1 Main Street',
    city: 'Kalmunai',
    participatingUniversities: [
      'University of the West of England (UK)',
      'Murdoch University (Australia)',
      'Cambridge International Academy (Canada)'
    ],
    description: 'Free IELTS diagnostic assessment, course matching, and budget breakdown session for students and parents from the Eastern Province.',
    badge: 'IELTS Mock Included',
    isVirtual: false
  },
  {
    id: 'canadian-ossd-webinar',
    title: 'Canadian High School OSSD & University Direct Entry Webinar',
    type: 'Webinar',
    date: 'Thursday, 27 November 2026',
    time: '6:30 PM – 8:00 PM (IST)',
    location: 'Online via Zoom / Live Stream',
    city: 'Online',
    participatingUniversities: [
      'Cambridge International Academy (Ontario)',
      'University of Toronto (Canada)',
      'University of Waterloo (Canada)'
    ],
    description: 'Discover how studying the Ontario Secondary School Diploma (OSSD) in Sri Lanka unlocks direct entrance into top Canadian and global universities without foundation years.',
    badge: 'Live Virtual Session',
    isVirtual: true
  }
];

export const TESTIMONIAL_VIDEOS: TestimonialVideo[] = [
  {
    id: 'video-1',
    studentName: 'Dinuka Jayasuriya',
    fromCampus: 'Colombo Campus',
    currentUniversity: 'Coventry University, UK',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    degreeProgramme: 'BSc (Hons) Computer Science & Cloud Computing',
    currentRole: 'Cloud Systems Engineer at TechCorp, London',
    thumbnail: 'https://img.youtube.com/vi/VmKpPRvvoJ8/hqdefault.jpg',
    videoDuration: '2:15',
    storyHighlight: 'Saved 2 years of living expenses by completing Pearson BTEC at BCAS Colombo before progressing to the UK.',
    caption: 'Saved 2 years of living expenses by completing Pearson BTEC at BCAS before progressing to the UK.',
    youtubeId: 'VmKpPRvvoJ8',
    youtubeUrl: 'https://youtu.be/VmKpPRvvoJ8?si=4lwmXfRLWbv9QDir',
    viewsCount: '4.8k'
  },
  {
    id: 'video-2',
    studentName: 'Fathima Rishada',
    fromCampus: 'Kandy Campus',
    currentUniversity: 'Deakin University, Melbourne',
    destination: 'Australia',
    flag: '🇦🇺',
    degreeProgramme: 'Bachelor of Biomedical Science',
    currentRole: 'Clinical Research Associate, Melbourne Health',
    thumbnail: 'https://img.youtube.com/vi/V_jLJpa3vbs/hqdefault.jpg',
    videoDuration: '1:48',
    storyHighlight: 'Secured an AUD 10,000 international student merit scholarship through BCAS Kandy counseling and cleared the Australian visa in 14 days.',
    caption: 'Secured an AUD 10,000 merit scholarship through BCAS Kandy and cleared Australian visa in 14 days.',
    youtubeId: 'V_jLJpa3vbs',
    youtubeUrl: 'https://youtu.be/V_jLJpa3vbs?si=IRbEuwtN_HbNIZ33',
    viewsCount: '6.2k'
  },
  {
    id: 'video-3',
    studentName: 'Kavishka Wickramasinghe',
    fromCampus: 'Jaffna Campus',
    currentUniversity: 'University of Toronto',
    destination: 'Canada',
    flag: '🇨🇦',
    degreeProgramme: 'Ontario Secondary School Diploma ➔ BSc Software Eng',
    currentRole: 'Software Developer, Toronto Tech Hub',
    thumbnail: 'https://img.youtube.com/vi/WBRO7qeYf5o/hqdefault.jpg',
    videoDuration: '2:40',
    storyHighlight: 'Completed the international pathway at BCAS and received direct Canadian admission without foundation.',
    caption: 'Completed international pathway at BCAS and received direct Canadian admission without foundation.',
    youtubeId: 'WBRO7qeYf5o',
    youtubeUrl: 'https://youtu.be/WBRO7qeYf5o?si=AU94HycLWvPb5h0t',
    viewsCount: '5.1k'
  },
  {
    id: 'video-4',
    studentName: 'Mohamed Aashif',
    fromCampus: 'Kalmunai Campus',
    currentUniversity: 'Middlesex University Dubai & UK',
    destination: 'United Arab Emirates',
    flag: '🇦🇪',
    degreeProgramme: 'BA (Hons) Business Management & Finance',
    currentRole: 'Financial Operations Associate, DIFC Dubai',
    thumbnail: 'https://img.youtube.com/vi/IO6UGECSz20/hqdefault.jpg',
    videoDuration: '0:55',
    storyHighlight: 'Studied from BCAS Eastern Campus in Kalmunai. BCAS managed my entire offer letter, student visa, and accommodation in Dubai.',
    caption: 'Studied from BCAS Eastern Campus in Kalmunai. BCAS managed entire offer letter, visa, and Dubai housing.',
    youtubeId: 'IO6UGECSz20',
    youtubeUrl: 'https://youtube.com/shorts/IO6UGECSz20?si=bj3NxPyF684VS1-U',
    viewsCount: '3.9k'
  },
  {
    id: 'video-5',
    studentName: 'Shehani Mendis',
    fromCampus: 'Colombo Campus',
    currentUniversity: 'University of Hertfordshire, UK',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    degreeProgramme: 'LLB (Hons) Law & International Commercial Practice',
    currentRole: 'Paralegal Associate, London Legal chambers',
    thumbnail: 'https://img.youtube.com/vi/sWZXt7SZvDU/hqdefault.jpg',
    videoDuration: '0:50',
    storyHighlight: 'Direct overseas progression from BCAS Campus with professional student visa and documentation guidance.',
    caption: 'Direct overseas progression from BCAS Campus with fast-track student visa clearance.',
    youtubeId: 'sWZXt7SZvDU',
    youtubeUrl: 'https://youtube.com/shorts/sWZXt7SZvDU?si=FS-J9E611C0U6jkH',
    viewsCount: '4.4k'
  },
  {
    id: 'video-6',
    studentName: 'Navin Perera',
    fromCampus: 'Kandy Campus',
    currentUniversity: 'University of Wollongong',
    destination: 'Australia',
    flag: '🇦🇺',
    degreeProgramme: 'Bachelor of Civil & Structural Engineering',
    currentRole: 'Junior Site Engineer, New South Wales Infrastructure',
    thumbnail: 'https://img.youtube.com/vi/HqC_QoXNP_c/hqdefault.jpg',
    videoDuration: '0:45',
    storyHighlight: 'Direct accredited transfer from BCAS diploma into Year 2 in Australia. Post-study work visa secured.',
    caption: 'Direct accredited transfer from BCAS diploma into Year 2 in Australia. Post-study work visa secured.',
    youtubeId: 'HqC_QoXNP_c',
    youtubeUrl: 'https://youtube.com/shorts/HqC_QoXNP_c?si=6TMuh-J7hcVoNvet',
    viewsCount: '5.8k'
  },
  {
    id: 'video-7',
    studentName: 'Thilina Senanayake',
    fromCampus: 'Colombo Campus',
    currentUniversity: 'Jönköping University, Sweden',
    destination: 'Sweden',
    flag: '🇸🇪',
    degreeProgramme: 'MSc International Logistics & Supply Chain Management',
    currentRole: 'Supply Chain Analyst, Gothenburg',
    thumbnail: 'https://img.youtube.com/vi/JAUonrQCFkA/hqdefault.jpg',
    videoDuration: '0:58',
    storyHighlight: 'Explored European Schengen study opportunities with BCAS. Secured 1-year post-study job seeker visa in Sweden.',
    caption: 'Explored European Schengen study opportunities with BCAS. Secured 1-year post-study visa in Sweden.',
    youtubeId: 'JAUonrQCFkA',
    youtubeUrl: 'https://youtube.com/shorts/JAUonrQCFkA?si=otyO3GaVZNekY9Xy',
    viewsCount: '4.1k'
  },
  {
    id: 'video-8',
    studentName: 'Priyanka Nadesan',
    fromCampus: 'Jaffna Campus',
    currentUniversity: 'University of Malta',
    destination: 'Malta',
    flag: '🇲🇹',
    degreeProgramme: 'BSc International Hospitality & Tourism Management',
    currentRole: 'Guest Relations Specialist, St. Julians Malta',
    thumbnail: 'https://img.youtube.com/vi/9IJg7yM5PEc/hqdefault.jpg',
    videoDuration: '0:52',
    storyHighlight: 'Affordable English-speaking European island education. BCAS processed my visa without Schengen travel complications.',
    caption: 'Affordable English-speaking EU island education in Malta. BCAS processed visa without complications.',
    youtubeId: '9IJg7yM5PEc',
    youtubeUrl: 'https://youtube.com/shorts/9IJg7yM5PEc?si=2BhKzBSCY3fixgMY',
    viewsCount: '3.6k'
  },
  {
    id: 'video-9',
    studentName: 'Ashan Rodrigo',
    fromCampus: 'Colombo Campus',
    currentUniversity: 'University of Portsmouth, UK',
    destination: 'United Kingdom',
    flag: '🇬🇧',
    degreeProgramme: 'BSc (Hons) Cybersecurity & Forensics',
    currentRole: 'Security Operations Analyst, Hampshire UK',
    thumbnail: 'https://img.youtube.com/vi/wdg6UrfbiNQ/hqdefault.jpg',
    videoDuration: '0:48',
    storyHighlight: 'Direct UK transfer after completing Pearson BTEC credentials at BCAS Colombo Campus.',
    caption: 'Direct UK transfer after completing Pearson BTEC credentials at BCAS Colombo Campus.',
    youtubeId: 'wdg6UrfbiNQ',
    youtubeUrl: 'https://youtube.com/shorts/wdg6UrfbiNQ?si=ORT2viiXXkAApUsW',
    viewsCount: '4.7k'
  }
];

