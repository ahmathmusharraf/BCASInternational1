import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  X,
  BookOpen,
  Clock,
  Globe,
  Briefcase,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export const CourseModal: React.FC = () => {
  const {
    activeCourseModal,
    setActiveCourseModal,
    savedCourses,
    toggleSaveCourse,
    navigateTo
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCourseModal(null);
    };
    if (activeCourseModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeCourseModal, setActiveCourseModal]);

  if (!activeCourseModal) return null;

  const course = activeCourseModal;
  const isSaved = savedCourses.includes(course.title);

  const handleEnquire = () => {
    setActiveCourseModal(null);
    navigateTo('apply', {
      subject: course.category === 'Computing' ? 'Computing & IT' : course.title,
      level: course.level === 'Bachelor’s' ? 'Bachelor’s' : 'Diploma'
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150"
      >
        {/* Header media */}
        <div className="relative h-44 sm:h-52 bg-slate-900 shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={e => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

          <button
            onClick={() => setActiveCourseModal(null)}
            aria-label="Close course details"
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1">
              <span>{course.category}</span>
              <span>·</span>
              <span>{course.level}</span>
            </div>
            <h2 id="course-modal-title" className="text-xl sm:text-2xl font-bold font-display text-white">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <div>
              <span className="text-slate-600 block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
                <span>Typical Duration</span>
              </span>
              <span className="font-semibold text-slate-900 mt-0.5 block">
                {course.duration}
              </span>
            </div>
            <div>
              <span className="text-slate-600 block flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <span>Popular Destinations</span>
              </span>
              <span className="font-semibold text-slate-900 mt-0.5 block truncate">
                {course.popularDestinations.slice(0, 2).join(', ')}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-600 block flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>Entry Qualification</span>
              </span>
              <span className="font-semibold text-slate-900 mt-0.5 block text-[11px]">
                A/L or Foundation / HND
              </span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Programme Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {course.overview}
            </p>
          </div>

          {/* Key Modules */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
              Core Modules & Subject Topics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.keyModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00239C] shrink-0 mt-0.5" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Pathways */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Career & Employment Opportunities
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
              {course.careerOpportunities.map(career => (
                <span
                  key={career}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-[#00239C] border border-blue-100 rounded-md font-medium"
                >
                  <Briefcase className="w-3 h-3 text-[#00239C]" />
                  <span>{career}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Entry Requirements Notice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">General Admission Criteria:</span>
            <p>{course.entryRequirements}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => toggleSaveCourse(course.title)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? 'bg-[#BA141A] text-white border-[#BA141A]'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
            <span>{isSaved ? 'Saved in Shortlist' : 'Save to Shortlist'}</span>
          </button>

          <div className="flex items-center gap-2">
            {course.id === 'ossd-cambridge' && (
              <button
                onClick={() => {
                  setActiveCourseModal(null);
                  navigateTo('ossd');
                }}
                className="px-3 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View OSSD Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {course.id === 'bcas-ielts-prep' && (
              <button
                onClick={() => {
                  setActiveCourseModal(null);
                  navigateTo('ielts');
                }}
                className="px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View IELTS Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <a
              href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20know%20more%20about%20studying%20${encodeURIComponent(course.title)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={handleEnquire}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#00239C] hover:bg-[#001869] rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Enquire for this Subject</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
