import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Toast } from './components/common/Toast';
import { UniversityModal } from './components/common/UniversityModal';
import { CourseModal } from './components/common/CourseModal';
import { BlogModal } from './components/common/BlogModal';
import { UniversityCompareDrawer } from './components/common/UniversityCompareDrawer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';

import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { CoursesPage } from './pages/CoursesPage';
import { OSSDPage } from './pages/OSSDPage';
import { IELTSPage } from './pages/IELTSPage';
import { ApplyPage } from './pages/ApplyPage';
import { InquiryPage } from './pages/InquiryPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { BlogsPage } from './pages/BlogsPage';
import { EventGalleryPage } from './pages/EventGalleryPage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { CookiePreferencesPage } from './pages/CookiePreferencesPage';
import { FAQPage } from './pages/FAQPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'destinations':
        return <DestinationsPage />;
      case 'universities':
        return <UniversitiesPage />;
      case 'courses':
        return <CoursesPage />;
      case 'ossd':
        return <OSSDPage />;
      case 'ielts':
        return <IELTSPage />;
      case 'apply':
        return <ApplyPage />;
      case 'inquiry':
        return <InquiryPage />;
      case 'stories':
        return <SuccessStoriesPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'events':
        return <EventGalleryPage />;
      case 'portal':
        return <HomePage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsOfServicePage />;
      case 'cookie-policy':
        return <CookiePolicyPage />;
      case 'cookie-preferences':
        return <CookiePreferencesPage />;
      case 'faq':
        return <FAQPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-[#00239C] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Skip to Main Content Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00239C] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Primary Top Bar & Navigation */}
      <Header />

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        <div key={currentPage} className="animate-fade-in">
          {renderPage()}
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals & Notifications */}
      <UniversityModal />
      <CourseModal />
      <BlogModal />
      <UniversityCompareDrawer />
      <WhatsAppFloatingButton />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
