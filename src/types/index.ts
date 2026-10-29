export type PageId =
  | 'home'
  | 'about'
  | 'destinations'
  | 'universities'
  | 'courses'
  | 'ossd'
  | 'ielts'
  | 'apply'
  | 'inquiry'
  | 'stories'
  | 'blogs'
  | 'events'
  | 'portal'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'cookie-policy'
  | 'cookie-preferences'
  | 'faq';

export interface Campus {
  id: string;
  name: string;
  role: string;
  title: string;
  address: string[];
  city: string;
  phone?: string;
  whatsapp: string;
  mapQuery: string;
  email: string;
  hours: string;
  isMain?: boolean;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  established?: number;
  rankingNote?: string;
  type: string; // e.g. "Public Research University", "Modern University"
  tuitionRange: string;
  intakes: string[];
  popularSubjects: string[];
  level: ('Foundation' | 'Diploma' | 'Diploma / HND' | 'Bachelor’s' | 'Postgraduate')[];
  minIELTS: string;
  highlights: string[];
  scholarshipAvailable: boolean;
  description: string;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  category:
    | 'Computing'
    | 'Business'
    | 'Engineering'
    | 'Health'
    | 'Hospitality'
    | 'Law'
    | 'High School & Pre-University'
    | 'English Proficiency';
  level:
    | 'Foundation'
    | 'Diploma / HND'
    | 'Bachelor’s'
    | 'Postgraduate'
    | 'Secondary Diploma'
    | 'Certification';
  duration: string;
  popularDestinations: string[];
  overview: string;
  keyModules: string[];
  careerOpportunities: string[];
  entryRequirements: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  code: string;
  flag: string;
  tagline: string;
  heroImage: string;
  overview: string;
  avgTuitionPerYear: string;
  avgLivingPerYear: string;
  workDuringStudy: string;
  postStudyWorkVisa: string;
  primaryIntakes: string;
  currency: string;
  officialImmigrationName: string;
  officialImmigrationUrl: string;
  popularCities: string[];
  topReasons: string[];
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  destination: string;
  type: 'Merit-Based' | 'Institutional Award' | 'Government' | 'Early Acceptance';
  coverage: string;
  eligibility: string;
  deadline: string;
  requirements: string[];
  officialUrl?: string;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  fromCampus: string;
  currentUniversity: string;
  destination: string;
  degreeProgramme: string;
  graduationYear: string;
  currentRole: string;
  storyQuote: string;
  fullJourney: string;
  adviceForStudents: string;
  category: string;
  image: string;
}

export interface TestimonialVideo {
  id: string;
  studentName: string;
  fromCampus: string;
  currentUniversity: string;
  destination: string;
  flag: string;
  degreeProgramme: string;
  currentRole: string;
  thumbnail: string;
  videoDuration: string;
  storyHighlight: string;
  caption?: string;
  videoUrl?: string;
  youtubeId?: string;
  youtubeUrl?: string;
  viewsCount?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'Study abroad' | 'Applications' | 'Scholarships' | 'Student life';
  readTime: string;
  publishedDate: string;
  excerpt: string;
  heroImage: string;
  content: {
    heading?: string;
    paragraphs?: string[];
    bulletPoints?: string[];
    proTip?: string;
  }[];
  author: {
    name: string;
    role: string;
  };
  relatedPostIds?: string[];
}

export interface StudyAbroadEvent {
  id: string;
  title: string;
  type: 'World Education Fair' | 'Spot Assessment' | 'Webinar' | 'University Open Day';
  date: string;
  time: string;
  location: string;
  city: string;
  participatingUniversities: string[];
  description: string;
  badge: string;
  isVirtual?: boolean;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  cityOrCampus: string;
  currentQualification: string;
  targetSubject: string;
  targetDestination: string;
  targetLevel: string;
  targetIntake: string;
  budgetStatus: string;
  englishProficiency: string;
  specificQuestions: string;
  demoConsent: boolean;
}

export interface SubmittedApplication {
  referenceNumber: string;
  submittedAt: string;
  data: ApplicationFormData;
  status: 'Received' | 'Counselor Assigned' | 'Reviewing Documents' | 'Ready for University Submission';
  assignedCounselor?: {
    name: string;
    campus: string;
    phone: string;
  };
}

export interface StudentPortalProfile {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  registeredCampus: string;
  targetUniversity: string;
  chosenCourse: string;
  destination: string;
  applicationProgress: number; // 0 to 100
  currentStage: string;
  checklist: {
    title: string;
    completed: boolean;
    mandatory: boolean;
    description: string;
  }[];
  counselor: {
    name: string;
    role: string;
    campus: string;
    whatsapp: string;
  };
}

export interface StoredLeadRecord {
  id: string;
  timestamp: string;
  submittedAt: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  leadStatus: string;
  mode: 'live' | 'simulation';
  apiMessage?: string;
  error?: string;
}
