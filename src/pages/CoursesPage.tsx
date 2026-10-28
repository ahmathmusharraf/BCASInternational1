import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/mockData';
import { Course } from '../types';
import {
  BookOpen,
  Search,
  Bookmark,
  Clock,
  Globe,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Trash2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const {
    savedCourses,
    toggleSaveCourse,
    setActiveCourseModal,
    navigateTo,
    prefilledEnquiry
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = [
    'All',
    'High School & Pre-University',
    'English Proficiency',
    'Computing',
    'Business',
    'Engineering',
    'Health',
    'Hospitality',
    'Law'
  ];

  const levels = ['All', 'Foundation', 'Diploma / HND', 'Bachelor’s', 'Postgraduate'];

  const filteredCourses = useMemo(() => {
    return COURSES.filter(course => {
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.keyModules.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
        course.careerOpportunities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  const handleEnquireWithShortlist = () => {
    navigateTo('apply', {
      subject: savedCourses.join(', ')
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12 space-y-6 sm:space-y-10 lg:space-y-12">
      {/* Header */}
      <div className="space-y-2 sm:space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#00239C] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
          <span>ACADEMIC CATALOGUE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
          Course Search & Shortlist
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
          Browse study disciplines, compare career outcomes, and bookmark subjects of interest. Your saved courses stay stored in your browser so you can revisit them anytime or transfer them into your application enquiry.
        </p>

        {/* OSSD Canadian High School Spotlight Ribbon */}
        <div className="bg-gradient-to-r from-[#001869] to-[#00239C] text-white p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-blue-400/30">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              🍁
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-200">
                  Canadian High School Qualification
                </span>
                <span className="px-1.5 py-0.2 rounded bg-white/20 text-[9px] font-semibold">
                  Cambridge International Academy (CIA)
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                Ontario Secondary School Diploma (OSSD) — Fast Track After O/Levels
              </h3>
            </div>
          </div>
          <button
            onClick={() => navigateTo('ossd')}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
          >
            <span>View OSSD Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 sm:space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by programme, module (e.g. AI, Software, Finance), or career outcome..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] text-slate-900"
          />
        </div>

        {/* Categories Pills */}
        <div className="space-y-1.5 sm:space-y-2">
          <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Subject Discipline:
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00239C] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filters & Counter */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Qualification Level:</span>
            <div className="flex flex-wrap gap-1">
              {levels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] sm:text-xs transition-colors cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <span className="text-slate-500 text-[11px] sm:text-xs">
            Showing <strong className="text-slate-900">{filteredCourses.length}</strong> course area{filteredCourses.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* 2-Column Split: Courses Grid + Saved Shortlist Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Main Courses Grid (8 Cols) - Rendered with Compact Small Cards */}
        <div className="lg:col-span-8 space-y-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {filteredCourses.map(course => {
                const isSaved = savedCourses.includes(course.title);
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Small Compact Image Header */}
                      <div className="relative h-24 sm:h-28 bg-slate-950 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-white border border-white/20">
                          {course.category}
                        </div>

                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => toggleSaveCourse(course.title)}
                            aria-label={isSaved ? 'Remove from saved' : 'Save course'}
                            className={`p-1.5 rounded-md backdrop-blur-md transition-colors cursor-pointer ${
                              isSaved
                                ? 'bg-[#BA141A] text-white shadow-xs'
                                : 'bg-black/50 text-white hover:bg-black/70'
                            }`}
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                          </button>
                        </div>

                        <div className="absolute bottom-1.5 left-2 text-amber-300 text-[10px] font-mono">
                          {course.duration} · {course.level}
                        </div>
                      </div>

                      {/* Small Compact Text Body */}
                      <div className="p-2.5 sm:p-3 space-y-1">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-display leading-snug line-clamp-1 group-hover:text-[#00239C] transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {course.overview}
                        </p>
                      </div>
                    </div>

                    {/* Compact Actions Bar */}
                    <div className="p-2.5 pt-0">
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        {course.id === 'ossd-cambridge' ? (
                          <button
                            onClick={() => navigateTo('ossd')}
                            className="text-[#BA141A] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                          >
                            <span>OSSD Page</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ) : course.id === 'bcas-ielts-prep' ? (
                          <button
                            onClick={() => navigateTo('ielts')}
                            className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                          >
                            <span>IELTS Page</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveCourseModal(course)}
                            className="text-[#00239C] font-semibold hover:underline cursor-pointer"
                          >
                            Syllabus ↗
                          </button>
                        )}
                        <button
                          onClick={() =>
                            navigateTo('apply', {
                              subject: course.category === 'Computing' ? 'Computing & IT' : course.title,
                              level: course.level === 'Bachelor’s' ? 'Bachelor’s' : 'Diploma'
                            })
                          }
                          className="px-2.5 py-1 bg-[#00239C] hover:bg-[#001869] text-white font-semibold rounded text-[10px] transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Enquire</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <p className="text-sm font-semibold text-slate-800">
                No matching study areas found.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
                className="px-4 py-2 bg-[#00239C] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Shortlist Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#BA141A] fill-[#BA141A]" />
                <h3 className="font-bold text-sm text-slate-900 font-display">
                  Your Saved Shortlist
                </h3>
              </div>
              <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums">
                {savedCourses.length}
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Saved courses persist in this browser across sessions. You can discuss them directly during your consultation.
            </p>

            {savedCourses.length > 0 ? (
              <div className="space-y-3">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {savedCourses.map(title => (
                    <div
                      key={title}
                      className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs"
                    >
                      <span className="font-semibold text-slate-800 truncate">{title}</span>
                      <button
                        onClick={() => toggleSaveCourse(title)}
                        title="Remove"
                        className="text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleEnquireWithShortlist}
                  className="w-full py-3 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enquire With Saved Courses ({savedCourses.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 space-y-1">
                <span className="font-medium text-slate-700 block">No saved courses yet</span>
                <p>Click the bookmark icon on any course card to add it to your planning list.</p>
              </div>
            )}
          </div>

          {/* Need a Second Opinion Box */}
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
            <h4 className="font-bold text-sm text-blue-950 font-display">
              Unsure which subject to pursue?
            </h4>
            <p className="text-xs text-blue-900 leading-relaxed">
              Book a 15-minute diagnostic session with a BCAS academic counselor. We evaluate your G.C.E. O/L or A/L results and recommend matching undergraduate pathways.
            </p>
            <button
              onClick={() => navigateTo('apply')}
              className="text-xs font-bold text-[#00239C] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Schedule free academic counseling</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
