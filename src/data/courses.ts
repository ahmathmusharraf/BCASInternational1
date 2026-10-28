/**
 * ============================================================================
 * BCAS INTERNATIONAL UNIVERSITY PLACEMENTS - COURSES & PROGRAMMES DATA
 * ============================================================================
 * 
 * HOW TO EDIT OR ADD A COURSE:
 * ----------------------------------------------------------------------------
 * 1. To EDIT an existing course, simply locate its entry below and change title,
 *    overview, modules, duration, or entry requirements.
 * 
 * 2. To ADD A NEW COURSE, copy this template and paste it into COURSES:
 * 
 *    {
 *      id: 'unique-course-slug',                    // unique slug (e.g. 'ai-data-science')
 *      title: 'Artificial Intelligence & Data Science',
 *      category: 'Computing',                       // 'Computing' | 'Business' | 'Engineering' | 'Health' | 'Hospitality' | 'Law' | 'High School & Pre-University' | 'English Proficiency'
 *      level: 'Bachelor’s',                         // 'Foundation' | 'Diploma / HND' | 'Bachelor’s' | 'Postgraduate'
 *      duration: '3 Years (or 1-Year Top-Up)',
 *      popularDestinations: ['United Kingdom', 'Australia', 'Canada', 'Sweden'],
 *      overview: 'Comprehensive summary of what students will learn in this programme...',
 *      keyModules: [
 *        'Module 1: Machine Learning Foundations',
 *        'Module 2: Deep Neural Networks & NLP',
 *        'Module 3: Big Data Engineering',
 *        'Module 4: Ethical AI & Governance'
 *      ],
 *      careerOpportunities: [
 *        'AI Engineer',
 *        'Data Scientist',
 *        'Machine Learning Researcher'
 *      ],
 *      entryRequirements: 'G.C.E. A/L (2 passes) or BCAS Foundation; IELTS 6.0.',
 *      image: 'https://images.unsplash.com/...'     // Relevant course image URL
 *    },
 * ============================================================================
 */

import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'ossd-cambridge',
    title: 'Ontario Secondary School Diploma (OSSD) - BCAS International University Placements',
    category: 'High School & Pre-University',
    level: 'Foundation',
    duration: '10 - 12 Months (Fast-Track available)',
    popularDestinations: ['Canada', 'United Kingdom', 'Australia', 'United States'],
    overview: 'Earn the prestigious Canadian High School Diploma delivered in Sri Lanka through the official partnership between Cambridge International Academy and BCAS International University Placements. Fully recognized by the Ontario Ministry of Education, the OSSD provides direct admission to premier universities across Canada (University of Toronto, Waterloo, UBC, McGill) and worldwide without requiring a local foundation year.',
    keyModules: [
      'Grade 12 University Preparation English (ENG4U)',
      'Advanced Functions (MHF4U)',
      'Calculus & Vectors (MCV4U)',
      'Mathematics of Data Management (MDM4U)',
      'Business Leadership & Management Fundamentals',
      'Computer Science & Information Technology',
      'Canadian & International Law'
    ],
    careerOpportunities: [
      'Direct Canadian University Admissions (U of T, Waterloo, UBC, McGill)',
      'Direct Entry to UK Russell Group & Australian Group of Eight (Go8)',
      'Higher Eligibility for High-Tier Canadian Entrance Scholarships',
      'Smooth Study Permit & Canadian Student Visa Processing'
    ],
    entryRequirements: 'G.C.E. O/L completed with minimum 5 passes/credits including English and Mathematics, or partial G.C.E. A/L studies. Direct assessment available.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bcas-ielts-prep',
    title: 'IELTS Academic Preparation & Official Testing Coaching',
    category: 'English Proficiency',
    level: 'Foundation',
    duration: '6 - 8 Weeks (Regular & Fast-Track Intensive Batches)',
    popularDestinations: ['United Kingdom', 'Australia', 'Canada', 'Sweden', 'Finland', 'Malta', 'United Arab Emirates'],
    overview: 'Master the IELTS Academic exam with BCAS certified language instructors. Comprehensive training across Listening, Reading, Writing, and Speaking with timed mock examinations, individual diagnostic rubrics, official British Council / IDP test registration support, and Band 7.0+ score guarantees for student visa requirements.',
    keyModules: [
      'Academic Writing Task 1 (Data Synthesis, Charts, Diagrams & Process Maps)',
      'Academic Writing Task 2 (Discursive Essays, Balanced Arguments & Stances)',
      'Advanced Academic Reading Tactics (Skimming, Scanning & Speed Inference)',
      'Interactive Accent & Fluency Speaking Drills with Native Examiner Rubrics',
      'Listening Comprehension Across All 4 Real Exam Formats',
      'Weekly Full-Length Timed Computer-Delivered & Paper Mock Tests'
    ],
    careerOpportunities: [
      'Fulfill UKVI / Australian / Canadian Student Visa Language Standards',
      'Secure Unconditional University Admission Offers Without Pre-Sessional Fees',
      'Attain Band 7.0+ to Unlock Merit & International Excellence Scholarships',
      'Direct Exemption from Foundation English Requirements'
    ],
    entryRequirements: 'Open to all students preparing for overseas study or professional migration. Free initial placement assessment test provided on registration.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'computing-it',
    title: 'Computing, Software Engineering & AI',
    category: 'Computing',
    level: 'Bachelor’s',
    duration: '3 Years (or 1-Year Top-Up after BCAS HND)',
    popularDestinations: ['United Kingdom', 'Australia', 'Canada', 'Sweden', 'Finland'],
    overview: 'Gain comprehensive mastery of modern software development, data structures, algorithms, cybersecurity, cloud architecture, and artificial intelligence.',
    keyModules: [
      'Object-Oriented Programming (Java / Python)',
      'Database Architecture & SQL/NoSQL',
      'Cloud Computing & Distributed Systems',
      'Full-Stack Web & Mobile App Development',
      'Machine Learning & Artificial Intelligence Principles',
      'Cybersecurity & Network Defense'
    ],
    careerOpportunities: [
      'Software Engineer',
      'Full-Stack Developer',
      'Data Analyst & Engineer',
      'Cybersecurity Specialist',
      'Cloud Systems Architect'
    ],
    entryRequirements: 'G.C.E. A/L (2 passes) or BCAS International Foundation Diploma; IELTS 6.0 or equivalent English proficiency.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'business-mgmt',
    title: 'Business Administration & International Management',
    category: 'Business',
    level: 'Bachelor’s',
    duration: '3 Years (or 1-Year Top-Up after BCAS HND)',
    popularDestinations: ['United Kingdom', 'Australia', 'Canada', 'Malta', 'United Arab Emirates'],
    overview: 'Equip yourself for global corporate leadership, modern strategic management, digital marketing, business analytics, and global trade operations.',
    keyModules: [
      'Strategic Corporate Management',
      'Digital Marketing & Consumer Psychology',
      'Financial Accounting & Corporate Valuation',
      'International Business Strategy & Trade',
      'Human Resource Management & Leadership',
      'Business Analytics & Data-Driven Decision Making'
    ],
    careerOpportunities: [
      'Business Development Manager',
      'Management Consultant',
      'Digital Marketing Strategist',
      'Operations & Supply Chain Lead',
      'Corporate Financial Analyst'
    ],
    entryRequirements: 'G.C.E. A/L (2 passes) or BCAS Foundation; IELTS 6.0.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'engineering-construction',
    title: 'Civil & Construction Engineering',
    category: 'Engineering',
    level: 'Bachelor’s',
    duration: '3 to 4 Years (Transferable from BCAS HND in Civil Engineering)',
    popularDestinations: ['United Kingdom', 'Australia', 'Canada', 'Finland', 'United Arab Emirates'],
    overview: 'Design, build and maintain resilient infrastructure. Learn structural mechanics, geotechnical engineering, sustainable construction materials, and BIM.',
    keyModules: [
      'Structural Analysis & Design (Concrete & Steel)',
      'Fluid Mechanics & Hydraulics',
      'Geotechnical Engineering & Soil Mechanics',
      'Construction Project Management & Contract Law',
      'Building Information Modelling (BIM) & CAD',
      'Environmental Engineering & Sustainable Infrastructure'
    ],
    careerOpportunities: [
      'Structural Design Engineer',
      'Site Construction Engineer',
      'Project Planning Engineer',
      'Geotechnical Consultant',
      'Infrastructure Project Manager'
    ],
    entryRequirements: 'G.C.E. A/L in Mathematics stream (or BCAS Engineering Foundation); IELTS 6.0.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'health-biomedical',
    title: 'Biomedical Science & Applied Health',
    category: 'Health',
    level: 'Bachelor’s',
    duration: '3 Years',
    popularDestinations: ['United Kingdom', 'Australia', 'Canada', 'Sweden'],
    overview: 'Explore human biology, pathology, biochemistry, pharmacology, and medical laboratory diagnostics. Ideal preparation for clinical, research, or diagnostic laboratory careers.',
    keyModules: [
      'Human Anatomy & Clinical Physiology',
      'Cellular Pathology & Diagnostic Cytology',
      'Medical Microbiology & Immunology',
      'Clinical Biochemistry & Hematology',
      'Molecular Genetics & Genomic Medicine',
      'Pharmacology & Therapeutics'
    ],
    careerOpportunities: [
      'Biomedical Diagnostic Scientist',
      'Clinical Research Associate',
      'Pharmaceutical Specialist',
      'Public Health Officer',
      'Laboratory Diagnostics Manager'
    ],
    entryRequirements: 'G.C.E. A/L Biology and Chemistry; IELTS 6.5.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hospitality-tourism',
    title: 'International Hospitality & Tourism Management',
    category: 'Hospitality',
    level: 'Bachelor’s',
    duration: '3 Years with Built-in Industry Internship',
    popularDestinations: ['United Kingdom', 'Australia', 'Malta', 'United Arab Emirates'],
    overview: 'Prepare for leadership in luxury hotel management, resort operations, global events, destination marketing, and airline passenger services.',
    keyModules: [
      'Hospitality Operational Management',
      'Global Tourism Marketing & Branding',
      'Revenue Management & Hotel Analytics',
      'Event Planning, Conferencing & Exhibition (MICE)',
      'Customer Experience & Service Quality Management',
      'Sustainable Tourism & Eco-Resort Development'
    ],
    careerOpportunities: [
      'Hotel & Resort General Manager',
      'International Events Director',
      'Guest Experience & Operations Manager',
      'Tourism Destination Consultant',
      'Airline & Cruise Operations Specialist'
    ],
    entryRequirements: 'G.C.E. A/L (2 passes in any stream) or BCAS Foundation; IELTS 5.5 – 6.0.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'law-legal-studies',
    title: 'Law & International Legal Studies (LLB Pathways)',
    category: 'Law',
    level: 'Bachelor’s',
    duration: '3 Years (Qualifying Law Degree)',
    popularDestinations: ['United Kingdom', 'Australia'],
    overview: 'Master foundational legal reasoning, criminal law, constitutional governance, contract law, human rights, and international commercial arbitration.',
    keyModules: [
      'Contract Law & Commercial Obligations',
      'Constitutional & Administrative Law',
      'Criminal Law & Evidence',
      'Law of Torts & Civil Liability',
      'International Commercial Law & Arbitration',
      'Human Rights & International Law'
    ],
    careerOpportunities: [
      'Legal Adviser / Corporate Counsel',
      'Compliance Officer',
      'Arbitration & Dispute Specialist',
      'Advocate / Solicitor Pathway',
      'International NGO Policy Officer'
    ],
    entryRequirements: 'G.C.E. A/L (3 passes with good English grade); IELTS 6.5.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80'
  }
];
