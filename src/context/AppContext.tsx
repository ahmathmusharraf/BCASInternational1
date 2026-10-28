import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PageId,
  Course,
  University,
  BlogPost,
  SubmittedApplication,
  StudentPortalProfile
} from '../types';
import { COURSES, UNIVERSITIES, BLOG_POSTS, DEMO_STUDENT_PROFILE } from '../data/mockData';

interface ToastState {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  currentPage: PageId;
  navigateTo: (page: PageId, params?: Record<string, string>) => void;
  savedCourses: string[];
  toggleSaveCourse: (courseTitle: string) => void;
  isCourseSaved: (courseTitle: string) => boolean;
  prefilledEnquiry: {
    subject?: string;
    destination?: string;
    level?: string;
    university?: string;
  };
  setPrefilledEnquiry: React.Dispatch<React.SetStateAction<{
    subject?: string;
    destination?: string;
    level?: string;
    university?: string;
  }>>;
  submittedApplications: SubmittedApplication[];
  addSubmittedApplication: (app: SubmittedApplication) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  activeUniversityModal: University | null;
  setActiveUniversityModal: (uni: University | null) => void;
  activeCourseModal: Course | null;
  setActiveCourseModal: (course: Course | null) => void;
  activeBlogModal: BlogPost | null;
  setActiveBlogModal: (post: BlogPost | null) => void;
  isCounselingModalOpen: boolean;
  setIsCounselingModalOpen: (open: boolean) => void;
  studentUser: StudentPortalProfile | null;
  setStudentUser: (user: StudentPortalProfile | null) => void;
  universityComparisonList: University[];
  toggleUniversityComparison: (uni: University) => void;
  isUniversityCompared: (uniId: string) => boolean;
  clearUniversityComparison: () => void;
  customLogoUrl: string;
  setCustomLogoUrl: (url: string) => void;
  resetLogoToDefault: () => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VALID_PAGES: PageId[] = [
  'home',
  'destinations',
  'universities',
  'courses',
  'ossd',
  'ielts',
  'apply',
  'inquiry',
  'stories',
  'blogs',
  'events',
  'portal',
  'contact',
  'privacy',
  'terms',
  'cookie-policy',
  'cookie-preferences'
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [savedCourses, setSavedCourses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bcas_saved_courses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [prefilledEnquiry, setPrefilledEnquiry] = useState<{
    subject?: string;
    destination?: string;
    level?: string;
    university?: string;
  }>({});

  const [submittedApplications, setSubmittedApplications] = useState<SubmittedApplication[]>(() => {
    try {
      const saved = localStorage.getItem('bcas_submitted_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [activeUniversityModal, setActiveUniversityModal] = useState<University | null>(null);
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [activeBlogModal, setActiveBlogModal] = useState<BlogPost | null>(null);
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState<boolean>(false);
  const [studentUser, setStudentUser] = useState<StudentPortalProfile | null>(DEMO_STUDENT_PROFILE);
  const [universityComparisonList, setUniversityComparisonList] = useState<University[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [customLogoUrl, setCustomLogoUrlState] = useState<string>(() => {
    try {
      return localStorage.getItem('bcas_custom_logo') || '/assets/bcas-logo.png';
    } catch {
      return '/assets/bcas-logo.png';
    }
  });

  const setCustomLogoUrl = (url: string) => {
    setCustomLogoUrlState(url);
    try {
      localStorage.setItem('bcas_custom_logo', url);
    } catch {
      // ignore
    }
  };

  const resetLogoToDefault = () => {
    setCustomLogoUrlState('/assets/bcas-logo.png');
    try {
      localStorage.removeItem('bcas_custom_logo');
    } catch {
      // ignore
    }
  };

  // Parse URL hash on load and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const [path, queryString] = hash.split('?');
      const cleanPath = path?.toLowerCase() as PageId;

      let rawPath = (path?.toLowerCase() || '').trim();
      if (rawPath === 'blog') rawPath = 'blogs';
      if (rawPath === 'course') rawPath = 'courses';
      if (rawPath === 'university') rawPath = 'universities';
      if (rawPath === 'destination') rawPath = 'destinations';

      if (VALID_PAGES.includes(rawPath as PageId)) {
        setCurrentPage(rawPath as PageId);
      } else {
        setCurrentPage('home');
      }

      if (queryString) {
        const params = new URLSearchParams(queryString);
        const subject = params.get('subject') || undefined;
        const destination = params.get('country') || params.get('destination') || undefined;
        const level = params.get('level') || undefined;
        const university = params.get('university') || undefined;
        const blogId = params.get('blog') || params.get('article') || undefined;

        if (subject || destination || level || university) {
          setPrefilledEnquiry({ subject, destination, level, university });
        }

        if (blogId) {
          const foundBlog = BLOG_POSTS.find(b => b.id === blogId || b.slug === blogId);
          if (foundBlog) {
            setActiveBlogModal(foundBlog);
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic High-Level SEO Title & Meta Tag Synchronization
  useEffect(() => {
    const seoData: Record<PageId, { title: string; description: string }> = {
      home: {
        title: 'Study Abroad, IELTS & Canadian OSSD | BCAS International Placements',
        description: 'Official portal for BCAS Sri Lanka. Direct admissions, IELTS preparation classes, Canadian OSSD high school diploma & scholarships for UK, Australia, Canada, Europe & UAE.'
      },
      destinations: {
        title: 'Study Abroad Destinations (UK, Australia, Canada, Europe, UAE) | BCAS',
        description: 'Explore top study destinations for Sri Lankan students. Compare tuition, post-study work rights, living costs, and entry pathways.'
      },
      universities: {
        title: 'Partner Universities & Global Rankings | BCAS Placements',
        description: 'Browse 150+ accredited world universities partnered with BCAS Sri Lanka. Fast-track offer letters, credit transfers, and scholarship shortlists.'
      },
      courses: {
        title: 'International Courses & Degree Pathways | BCAS Sri Lanka',
        description: 'Discover undergraduate degrees, Master’s programs, and Pearson BTEC HND top-up routes in Computing, Business, Engineering, Law, and Health.'
      },
      ossd: {
        title: 'Canadian High School (OSSD) in Sri Lanka | Cambridge International Academy & BCAS',
        description: 'Study Canadian OSSD in Sri Lanka (BSID: 669463). Fast-track pathway to world top universities in Canada, UK, and Australia without foundation.'
      },
      ielts: {
        title: 'Study IELTS | The Qualification You Need to Go Abroad | BCAS Campus',
        description: 'IELTS preparation classes & mock exams in Sri Lanka. Online & hybrid mode, expert certified trainers, guaranteed band scores, and free visa counselling.'
      },
      apply: {
        title: 'Start Your Study Abroad Enquiry & Pre-Assessment | BCAS',
        description: 'Submit your international study enquiry to receive a free academic eligibility check, scholarship estimate, and university shortlisting from BCAS.'
      },
      inquiry: {
        title: 'Direct Admissions Inquiry & Lead Capture (Google Sheets) | BCAS',
        description: 'Submit your international study inquiry. Automatically captured and synced directly into our Google Sheets admissions pipeline with zero backend.'
      },
      stories: {
        title: 'Student Visa Success Stories & Testimonials | BCAS Placements',
        description: 'Read and watch genuine success stories and student visa approvals from BCAS alumni now studying in the UK, Australia, Sweden, Canada, and UAE.'
      },
      blogs: {
        title: 'Study Abroad Guides, Visa Policies & Student Life | BCAS',
        description: 'Expert guides on UK Graduate Route, Australia migration changes, Pearson BTEC credit transfers, proof of funds, and IELTS preparation.'
      },
      events: {
        title: 'BCAS Event & Campus Gallery | University Fairs & Delegations',
        description: 'Explore photo highlights from BCAS World Education Fairs, Embassy visa briefings, and partner university visits in Sri Lanka.'
      },
      portal: {
        title: 'Student Application & Document Tracker Portal | BCAS',
        description: 'Access your international admissions profile, track visa document milestones, and schedule one-on-one appointments with BCAS advisors.'
      },
      contact: {
        title: 'Contact BCAS Admissions & 4 Campuses (Colombo, Kandy, Jaffna, Kalmunai)',
        description: 'Get in touch with BCAS counselors for personalized guidance. Visit our physical campuses or message us directly on WhatsApp.'
      },
      privacy: {
        title: 'Privacy Policy | BCAS International University Placements',
        description: 'Review how BCAS International University Placements protects applicant personal information and academic records.'
      },
      terms: {
        title: 'Terms of Service | BCAS International University Placements',
        description: 'Official terms and conditions for using the BCAS international education guidance and university placement services.'
      },
      'cookie-policy': {
        title: 'Cookie Policy | BCAS International University Placements',
        description: 'Details on cookie usage, analytics, and session preferences on the BCAS international portal.'
      },
      'cookie-preferences': {
        title: 'Cookie Preferences | BCAS International University Placements',
        description: 'Manage and update your browser cookie and tracking preferences for the BCAS portal.'
      },
      faq: {
        title: 'Frequently Asked Questions (FAQ) | Study Abroad & Visa Guidance | BCAS',
        description: 'Find clear answers to questions on free counseling, university requirements, IELTS waivers, HND top-up degrees, visas, and scholarships.'
      }
    };

    const currentSeo = seoData[currentPage] || seoData.home;
    document.title = currentSeo.title;

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSeo.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', currentSeo.description);
    }
  }, [currentPage]);

  const navigateTo = (page: PageId, params?: Record<string, string>) => {
    setIsMobileMenuOpen(false);
    setCurrentPage(page);
    let hashStr = `#/${page}`;
    if (params) {
      const search = new URLSearchParams(params).toString();
      if (search) hashStr += `?${search}`;
      setPrefilledEnquiry(prev => ({
        ...prev,
        ...params
      }));
    }
    window.location.hash = hashStr;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const toggleSaveCourse = (courseTitle: string) => {
    setSavedCourses(prev => {
      const exists = prev.includes(courseTitle);
      const updated = exists ? prev.filter(c => c !== courseTitle) : [...prev, courseTitle];
      try {
        localStorage.setItem('bcas_saved_courses', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save shortlist to localStorage', e);
      }
      showToast(
        exists ? `Removed "${courseTitle}" from shortlist` : `Saved "${courseTitle}" to shortlist`,
        exists ? 'info' : 'success'
      );
      return updated;
    });
  };

  const isCourseSaved = (courseTitle: string) => savedCourses.includes(courseTitle);

  const addSubmittedApplication = (app: SubmittedApplication) => {
    setSubmittedApplications(prev => {
      const updated = [app, ...prev];
      try {
        localStorage.setItem('bcas_submitted_enquiries', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save enquiry to localStorage', e);
      }
      return updated;
    });
    showToast('Enquiry saved to your browser session!', 'success');
  };

  const toggleUniversityComparison = (uni: University) => {
    setUniversityComparisonList(prev => {
      const exists = prev.some(u => u.id === uni.id);
      if (exists) {
        showToast(`Removed ${uni.name} from comparison`, 'info');
        return prev.filter(u => u.id !== uni.id);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare up to 3 universities at a time', 'warning');
          return prev;
        }
        showToast(`Added ${uni.name} to comparison`, 'success');
        return [...prev, uni];
      }
    });
  };

  const isUniversityCompared = (uniId: string) =>
    universityComparisonList.some(u => u.id === uniId);

  const clearUniversityComparison = () => {
    setUniversityComparisonList([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        savedCourses,
        toggleSaveCourse,
        isCourseSaved,
        prefilledEnquiry,
        setPrefilledEnquiry,
        submittedApplications,
        addSubmittedApplication,
        toasts,
        showToast,
        activeUniversityModal,
        setActiveUniversityModal,
        activeCourseModal,
        setActiveCourseModal,
        activeBlogModal,
        setActiveBlogModal,
        isCounselingModalOpen,
        setIsCounselingModalOpen,
        studentUser,
        setStudentUser,
        universityComparisonList,
        toggleUniversityComparison,
        isUniversityCompared,
        clearUniversityComparison,
        customLogoUrl,
        setCustomLogoUrl,
        resetLogoToDefault,
        isMobileMenuOpen,
        setIsMobileMenuOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
