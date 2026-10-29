import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import {
  MessageCircle,
  Phone,
  Bookmark,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Layers,
  Mail,
  Search,
  Globe,
  BookOpen,
  FileText,
  Home,
  MapPin,
  ArrowRight,
  Camera,
  Award,
  HelpCircle,
  Building2
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    savedCourses,
    universityComparisonList,
    customLogoUrl,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  // Prevent background scroll when mobile navigation drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const primaryNavItems: { id: PageId; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'about', label: 'About Us', desc: 'Part of BCAS Campus (British College of Applied Studies)', icon: Building2 },
    { id: 'destinations', label: 'Study Abroad', desc: 'UK, Australia, Canada, NZ & more', icon: Globe },
    { id: 'universities', label: 'Universities', desc: '100+ partner universities worldwide', icon: GraduationCap },
    { id: 'courses', label: 'Courses', desc: 'Undergraduate, Master & Foundation', icon: BookOpen },
    { id: 'blogs', label: 'Blogs & Guides', desc: 'Visa tips, requirements & insights', icon: FileText }
  ];

  const secondaryNavItems: { id: PageId; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'about', label: 'About BCAS Placement', desc: 'Part of BCAS Campus (British College of Applied Studies)', icon: Building2 },
    { id: 'ossd', label: 'Canadian OSSD', desc: 'Direct university entry after O/Levels via CIA', icon: Award },
    { id: 'ielts', label: 'Study IELTS', desc: 'Online & hybrid classes, mock exams & band 7+ prep', icon: Sparkles },
    { id: 'events', label: 'Event Gallery', desc: 'University fairs, seminars & visa sessions', icon: Camera },
    { id: 'stories', label: 'Student Stories', desc: 'Real pathways and alumni milestones', icon: Sparkles },
    { id: 'faq', label: 'Frequent Questions', desc: 'Admissions, visas, scholarships & requirements', icon: HelpCircle },
    { id: 'contact', label: 'Campuses & Contact', desc: 'Colombo, Jaffna, Kalmunai, Kandy', icon: MapPin },
    { id: 'privacy', label: 'Privacy Policy', desc: 'Student data protection & compliance', icon: FileText }
  ];

  const handleNavClick = (pageId: PageId) => {
    navigateTo(pageId);
    setIsMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top institutional strip */}
      <div className="bg-[#00239C] text-white text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-medium">
          <div className="flex items-center gap-2 truncate">
            <span className="hidden sm:inline-block font-semibold tracking-wider text-[11px] uppercase text-blue-100">
              BCAS International University Placements
            </span>
            <span className="hidden sm:inline text-blue-300">·</span>
            <span className="text-blue-100 truncate text-[11px] sm:text-xs">
              Sri Lanka&apos;s Trusted Global Pathways Partner
            </span>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-[11px]">
            <a
              href="mailto:Digital_Int@bcas.lk"
              className="hidden md:inline-flex items-center gap-1.5 text-white hover:text-blue-200 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-blue-200" />
              <span>Digital_Int@bcas.lk</span>
            </a>
            <span className="text-blue-400/80 hidden md:inline">|</span>
            <a
              href="tel:+94761415273"
              className="inline-flex items-center gap-1 text-white hover:text-blue-200 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-200" />
              <span className="hidden xs:inline">Hotline:</span>
              <span>+94 76 141 5273</span>
            </a>
            <span className="text-blue-400/80 hidden sm:inline">|</span>
            <a
              href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20university%20admissions%20and%20visa%20guidance."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white hover:text-emerald-300 transition-colors font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar with Guaranteed Mobile & Tablet Fit */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark & Official BCAS Crest */}
        <div className="flex items-center shrink min-w-0">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00239C] focus-visible:outline-offset-4 rounded-md"
            title="Go to Home"
          >
            <img
              src={customLogoUrl}
              alt="BCAS International University Placements"
              className="h-8.5 sm:h-10 lg:h-12 w-auto max-w-[130px] sm:max-w-[210px] lg:max-w-none object-contain transition-transform duration-200 group-hover:scale-102"
              onError={e => {
                (e.currentTarget as HTMLImageElement).src = '/assets/bcas-logo.png';
              }}
            />
          </button>
        </div>

        {/* Zone 2: Navigation Links (Desktop only) */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {primaryNavItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer whitespace-nowrap transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#00239C] font-semibold'
                    : 'text-slate-600 hover:text-[#00239C]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00239C] rounded-full" />
                )}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setMoreDropdownOpen(prev => !prev);
              }}
              className="flex items-center gap-1 cursor-pointer whitespace-nowrap text-slate-600 hover:text-[#00239C] transition-colors py-1"
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  moreDropdownOpen ? 'rotate-180 text-[#00239C]' : ''
                }`}
              />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {secondaryNavItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors flex flex-col group cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-[#00239C]">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-600">{item.desc}</span>
                  </button>
                ))}
                <div className="border-t border-slate-100 my-1 pt-1">
                  <a
                    href="https://bcas.lk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-medium text-slate-600 hover:text-[#00239C]"
                  >
                    <span>Official BCAS Sri Lanka</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Action & Controls (Never clipped, fully visible on mobile & tablet) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
          {/* Saved Courses Shortlist Counter */}
          {savedCourses.length > 0 && (
            <button
              onClick={() => handleNavClick('courses')}
              title={`View ${savedCourses.length} saved course(s)`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#00239C] fill-[#00239C]" />
              <span>Saved</span>
              <span className="bg-[#BA141A] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                {savedCourses.length}
              </span>
            </button>
          )}

          {/* Compare Universities Counter */}
          {universityComparisonList.length > 0 && (
            <button
              onClick={() => handleNavClick('universities')}
              title={`Comparing ${universityComparisonList.length} universities`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#00239C] bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer shrink-0"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#00239C]" />
              <span>Compare ({universityComparisonList.length})</span>
            </button>
          )}

          {/* Find My Course CTA */}
          <button
            onClick={() => handleNavClick('courses')}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-[#00239C] transition-colors cursor-pointer border border-slate-200 shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-[#00239C]" />
            <span>Find My Course</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('apply')}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#00239C] hover:bg-[#001869] active:scale-98 rounded-lg shadow-xs hover:shadow-md transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span>Apply Online</span>
            <span aria-hidden="true">↗</span>
          </button>

          {/* Mobile & Tablet Navigation Drawer Hamburger Button: Full button styling with explicit size & zero clipping */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close navigation drawer menu' : 'Open navigation drawer menu'}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-[#00239C] border border-slate-200/90 active:scale-95 transition-all cursor-pointer shrink-0 shadow-2xs focus-visible:outline-2 focus-visible:outline-[#00239C]"
            title="Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full Navigation Drawer (Mounted via React Portal directly onto document.body to avoid backdrop-filter traps) */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-[9999] flex justify-end"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content panel (Full viewport height, zero clipping) */}
          <div className="relative w-full max-w-md bg-white h-full h-[100dvh] max-h-[100dvh] flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-250 ease-out overflow-hidden">
            {/* Top drawer header */}
            <div className="shrink-0 flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-200 bg-white">
              <button
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 text-left cursor-pointer"
              >
                <img
                  src={customLogoUrl}
                  alt="BCAS International University Placements"
                  className="h-9 sm:h-10 w-auto object-contain"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/bcas-logo.png';
                  }}
                />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body with full height and zero cut-off */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 space-y-4">
              {/* Quick Action Badges */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('courses')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-50 text-[#00239C] hover:bg-blue-100 transition-colors text-xs font-semibold cursor-pointer border border-blue-100"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Courses</span>
                </button>
                <button
                  onClick={() => handleNavClick('courses')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold cursor-pointer border border-slate-200"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#00239C] fill-[#00239C]" />
                  <span>Saved ({savedCourses.length})</span>
                </button>
              </div>

              {/* Main Navigation links */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  Main Navigation
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                      currentPage === 'home'
                        ? 'bg-blue-50/80 text-[#00239C] font-semibold border border-blue-200'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${currentPage === 'home' ? 'bg-[#00239C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Home className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Home</div>
                        <div className="text-xs text-slate-500">BCAS Placements Overview</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {primaryNavItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-blue-50/80 text-[#00239C] font-semibold border border-blue-200'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-[#00239C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{item.label}</div>
                            <div className="text-xs text-slate-500">{item.desc}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pathways & Support Resources */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  Explore & Student Support
                </span>
                <div className="space-y-1">
                  {secondaryNavItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-blue-50/80 text-[#00239C] font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#00239C]' : 'text-slate-400'}`} />
                          <span className="text-xs font-semibold">{item.label}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 truncate max-w-[140px]">{item.desc}</span>
                      </button>
                    );
                  })}

                  <a
                    href="https://bcas.lk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left p-2.5 rounded-xl flex items-center justify-between transition-colors text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ExternalLink className="w-4 h-4 text-[#00239C]" />
                      <span className="text-xs font-semibold text-[#00239C]">Official BCAS Sri Lanka</span>
                    </div>
                    <span className="text-[11px] text-slate-400">bcas.lk ↗</span>
                  </a>
                </div>
              </div>

              {/* Direct Help & Contact Information */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1 px-1">
                  Speak with an Advisor
                </span>
                <a
                  href="tel:+94761415273"
                  className="w-full py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-2.5 transition-colors border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-[#00239C] shrink-0" />
                  <div className="flex-1 text-left truncate">
                    <span className="block text-[10px] text-slate-500 font-medium">Direct Admissions Hotline</span>
                    <span>+94 76 141 5273</span>
                  </div>
                </a>
                <a
                  href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20university%20admissions%20and%20visa%20guidance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex items-center gap-2.5 transition-colors border border-emerald-200"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                  <div className="flex-1 text-left truncate">
                    <span className="block text-[10px] text-emerald-600 font-medium">Instant WhatsApp Support</span>
                    <span>Chat with Counselor</span>
                  </div>
                </a>
                <a
                  href="mailto:Digital_Int@bcas.lk"
                  className="w-full py-2 px-3 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center gap-2.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Digital_Int@bcas.lk</span>
                </a>
              </div>
            </div>

            {/* Bottom Sticky Action Drawer Footer */}
            <div className="shrink-0 p-4 border-t border-slate-200 bg-slate-50/95 backdrop-blur-xs space-y-2">
              <button
                onClick={() => handleNavClick('apply')}
                className="w-full py-3 px-4 text-sm font-bold text-white bg-[#00239C] hover:bg-[#001869] active:scale-98 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Application Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-500">
                100% Free Counseling & Admission Guidance
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
