import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATIONS, UNIVERSITIES, COURSES } from '../data/mockData';
import { Destination } from '../types';
import {
  Globe,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  DollarSign,
  Briefcase,
  Calendar,
  Building2,
  Clock,
  Sparkles,
  Search,
  Filter,
  GraduationCap,
  BookOpen,
  MapPin,
  ChevronLeft
} from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const { navigateTo, prefilledEnquiry, setActiveUniversityModal } = useApp();
  const [activeTab, setActiveTab] = useState<'grid' | 'compare'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPreference, setFilterPreference] = useState<string>('all');

  // Find destination matching prefilledEnquiry.destination if provided
  const findDestinationByParam = (param?: string): Destination | null => {
    if (!param || param === 'All') return null;
    const clean = param.toLowerCase().trim();
    return (
      DESTINATIONS.find(
        d =>
          d.id.toLowerCase() === clean ||
          d.name.toLowerCase() === clean ||
          d.name.toLowerCase().includes(clean) ||
          clean.includes(d.name.toLowerCase()) ||
          clean.includes(d.id.toLowerCase())
      ) || null
    );
  };

  const [viewingDestination, setViewingDestination] = useState<Destination | null>(() =>
    findDestinationByParam(prefilledEnquiry.destination)
  );

  // Sync if prefilledEnquiry changes
  useEffect(() => {
    if (prefilledEnquiry.destination) {
      const match = findDestinationByParam(prefilledEnquiry.destination);
      if (match) {
        setViewingDestination(match);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [prefilledEnquiry.destination]);

  // Filtered universities for the active destination
  const destinationUniversities = useMemo(() => {
    if (!viewingDestination) return [];
    const destName = viewingDestination.name.toLowerCase();
    return UNIVERSITIES.filter(u => {
      const uCountry = u.country.toLowerCase();
      if (destName.includes('kingdom') || destName.includes('uk')) {
        return uCountry.includes('kingdom') || uCountry.includes('uk');
      }
      if (destName.includes('emirates') || destName.includes('uae')) {
        return uCountry.includes('emirates') || uCountry.includes('uae') || uCountry.includes('dubai');
      }
      return uCountry.includes(destName) || destName.includes(uCountry);
    });
  }, [viewingDestination]);

  // Available courses (compact for destination view)
  const destinationCourses = useMemo(() => {
    if (!viewingDestination) return COURSES;
    const destName = viewingDestination.name.toLowerCase();
    const destId = viewingDestination.id.toLowerCase();
    return COURSES.filter(c => {
      return c.popularDestinations.some(d => {
        const dLow = d.toLowerCase();
        if (destName.includes('kingdom') || destId === 'uk') {
          return dLow.includes('kingdom') || dLow.includes('uk');
        }
        if (destName.includes('emirates') || destId === 'uae') {
          return dLow.includes('emirates') || dLow.includes('uae');
        }
        return dLow.includes(destName) || destName.includes(dLow) || dLow.includes(destId);
      });
    });
  }, [viewingDestination]);

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch =
      searchQuery === '' ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.popularCities.some(city => city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterPreference === 'europe') {
      return ['uk', 'sweden', 'finland', 'malta'].includes(dest.id);
    }
    if (filterPreference === 'north-america') {
      return ['canada'].includes(dest.id);
    }
    if (filterPreference === 'asia-me') {
      return ['uae'].includes(dest.id);
    }
    if (filterPreference === 'australia') {
      return ['australia'].includes(dest.id);
    }
    if (filterPreference === 'post-study') {
      return ['uk', 'australia', 'canada', 'sweden', 'finland'].includes(dest.id);
    }
    if (filterPreference === 'budget') {
      return ['malta', 'sweden', 'finland', 'uae'].includes(dest.id);
    }
    return true;
  });

  const handleSelectDestination = (dest: Destination) => {
    setViewingDestination(dest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12 space-y-6 sm:space-y-10 lg:space-y-12">
      {/* If a Destination is Selected: Show that Destination Page with Courses & Universities */}
      {viewingDestination ? (
        <div className="space-y-8 sm:space-y-12 animate-in fade-in duration-300">
          {/* Top Bar: Back Button & Quick Destination Selector Pills */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setViewingDestination(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← View All Destinations</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1 scrollbar-none">
                <span className="text-slate-400 font-medium text-[11px] hidden sm:inline mr-1">Switch country:</span>
                {DESTINATIONS.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleSelectDestination(d)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                      viewingDestination.id === d.id
                        ? 'bg-[#00239C] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{d.flag}</span>
                    <span>{d.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-950 text-white">
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <img
                  src={viewingDestination.heroImage}
                  alt={viewingDestination.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl sm:text-3xl">{viewingDestination.flag}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {viewingDestination.currency}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        Official Partner Destination
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
                      Study in {viewingDestination.name}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                      {viewingDestination.tagline}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <a
                      href={viewingDestination.officialImmigrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Immigration Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => navigateTo('apply', { destination: viewingDestination.name })}
                      className="px-5 py-2.5 rounded-xl bg-[#BA141A] hover:bg-[#910e13] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply for {viewingDestination.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Destination Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Typical Tuition / Yr</span>
              <span className="text-sm sm:text-base font-bold font-mono text-[#00239C] block">
                {viewingDestination.avgTuitionPerYear}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Living Expenses / Yr</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                {viewingDestination.avgLivingPerYear}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Term-Time Work Rights</span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-700 block">
                {viewingDestination.workDuringStudy}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Post-Study Visa Rights</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 block">
                {viewingDestination.postStudyWorkVisa}
              </span>
            </div>
          </div>

          {/* Overview & Why Sri Lankan Students Choose This Country */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-3">
              <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                Destination Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {viewingDestination.overview}
              </p>
              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                <span className="font-semibold text-slate-700">Primary Intakes:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#00239C] font-semibold">
                  {viewingDestination.primaryIntakes}
                </span>
                <span className="font-semibold text-slate-700 ml-2">Key Student Hubs:</span>
                {viewingDestination.popularCities.map(city => (
                  <span key={city} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Key Advantages for Sri Lankan Students
              </h3>
              <div className="space-y-2">
                {viewingDestination.topReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 1: UNIVERSITIES FOR THIS DESTINATION (UNIVERSITY NAME ONLY, NO NEED DETAILS) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-blue-100 text-[#00239C] rounded-lg">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                    Partner Universities in {viewingDestination.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct admissions and credit transfer recognition with BCAS qualifications.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {destinationUniversities.length} {destinationUniversities.length === 1 ? 'University' : 'Universities'} Listed
              </span>
            </div>

            {destinationUniversities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {destinationUniversities.map(uni => (
                  <div
                    key={uni.id}
                    className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div
                      onClick={() => setActiveUniversityModal(uni)}
                      className="cursor-pointer"
                      title={`Click to view details for ${uni.name}`}
                    >
                      <div className="relative h-28 sm:h-32 bg-slate-950 overflow-hidden">
                        <img
                          src={uni.image}
                          alt={uni.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-900 flex items-center gap-1 shadow-xs">
                          <MapPin className="w-3 h-3 text-[#BA141A]" />
                          <span>{uni.city}</span>
                        </div>
                      </div>

                      {/* University Name Only - Clean and Minimal */}
                      <div className="p-3 sm:p-3.5 space-y-1">
                        <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-[#00239C] transition-colors">
                          {uni.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>{uni.city}, {uni.country}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-3 pt-0 sm:p-3.5 sm:pt-0">
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => navigateTo('apply', { destination: uni.country, notes: `Interest in ${uni.name}` })}
                          className="w-full py-1.5 px-3 rounded-lg bg-[#00239C] hover:bg-[#001869] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Enquire for {uni.name}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  Direct partner representation available for all accredited institutions across {viewingDestination.name}.
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo('apply', { destination: viewingDestination.name })}
                  className="px-4 py-2 bg-[#00239C] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Request Institution Shortlist
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: AVAILABLE COURSES FOR THIS DESTINATION (COURSES SMALL) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-red-100 text-[#BA141A] rounded-lg">
                  <BookOpen className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                    Available Courses for {viewingDestination.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    High-demand academic disciplines offering top credit transfer and job demand.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigateTo('courses')}
                className="text-xs font-bold text-[#00239C] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>View Full Academic Catalogue</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Compact Small Course Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {destinationCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Small image header */}
                    <div className="relative h-24 sm:h-28 bg-slate-950 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[9px] font-bold text-white border border-white/20">
                        {course.level}
                      </div>
                      <div className="absolute bottom-1.5 left-2 text-[10px] text-amber-300 font-mono">
                        {course.duration}
                      </div>
                    </div>

                    {/* Small compact body */}
                    <div className="p-2.5 space-y-1">
                      <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1 group-hover:text-[#00239C] transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {course.overview}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 pt-0">
                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-600 truncate max-w-[110px]">
                        {course.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigateTo('apply', { destination: viewingDestination.name, subject: course.title })}
                        className="px-2.5 py-1 rounded bg-[#00239C] hover:bg-[#001869] text-white font-semibold text-[10px] transition-colors cursor-pointer"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ALL DESTINATIONS GRID VIEW */
        <>
          {/* Page Header */}
          <div className="space-y-2 sm:space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#00239C] uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
              <span>7 FOCUS STUDY DESTINATIONS & GLOBAL REACH</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
              Study Abroad Destinations
            </h1>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
              Click any destination to see dedicated partner universities, admission guidelines, post-study work rights, and available courses for Sri Lankan graduates.
            </p>

            {/* Search Bar for Destinations */}
            <div className="relative pt-1 sm:pt-2">
              <Search className="w-4 h-4 absolute left-3.5 top-[19px] sm:top-[23px] text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search destination country or university city (e.g. UK, Melbourne, Toronto, Stockholm, Helsinki, Malta, Dubai)..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#00239C] text-slate-900 shadow-2xs"
              />
            </div>

            {/* View Switcher & Regional Filter Pills */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveTab('grid')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'grid'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Overview Cards ({filteredDestinations.length})
                </button>
                <button
                  onClick={() => setActiveTab('compare')}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'compare'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Comparison Matrix
                </button>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
                {[
                  { id: 'all', label: 'All 7 Destinations' },
                  { id: 'europe', label: 'UK & Europe' },
                  { id: 'australia', label: 'Australia' },
                  { id: 'north-america', label: 'Canada' },
                  { id: 'asia-me', label: 'UAE / Dubai' },
                  { id: 'post-study', label: 'Post-Study Visas' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFilterPreference(f.id)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      filterPreference === f.id
                        ? 'bg-[#00239C] text-white font-semibold'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Tab */}
          {activeTab === 'grid' && (
            <div className="space-y-6 sm:space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredDestinations.map(dest => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectDestination(dest)}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="relative h-40 sm:h-52 bg-slate-900 overflow-hidden">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={e => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-sm">
                          <span className="text-sm sm:text-base">{dest.flag}</span>
                          <span>{dest.name}</span>
                        </div>

                        <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 text-white">
                          <span className="text-[10px] sm:text-[11px] font-semibold text-blue-200 block uppercase tracking-wider">
                            Primary Intakes
                          </span>
                          <p className="text-[11px] sm:text-xs font-medium">{dest.primaryIntakes}</p>
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-6 space-y-2.5 sm:space-y-4">
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 font-display group-hover:text-[#00239C] transition-colors">
                          {dest.tagline}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {dest.overview}
                        </p>

                        {/* Quick Specs */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                          <div className="p-2.5 bg-slate-50 rounded-xl">
                            <span className="text-slate-500 block text-[11px]">Avg. Tuition / Yr</span>
                            <span className="font-bold text-slate-900 font-mono text-[12px]">
                              {dest.avgTuitionPerYear}
                            </span>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded-xl">
                            <span className="text-slate-500 block text-[11px]">Work Rights</span>
                            <span className="font-bold text-slate-900 text-[11px] truncate block" title={dest.workDuringStudy}>
                              {dest.workDuringStudy}
                            </span>
                          </div>
                        </div>

                        {/* Top Reasons Checklist */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            Why Sri Lankan Students Choose {dest.name}:
                          </span>
                          {dest.topReasons.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00239C] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="p-4 sm:p-6 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                      <span className="text-[#00239C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Universities & Courses</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}

                {/* And Many More Destinations Card */}
                <div className="bg-gradient-to-br from-[#00239C] to-slate-900 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-blue-800 shadow-md">
                  <div className="space-y-3.5">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>GLOBAL ADMISSIONS PARTNER</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      ... And Many More Destinations!
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                      Looking to study in the United States, Ireland, Germany, New Zealand, Malaysia, Singapore, or elsewhere? BCAS International Placements maintains official direct admissions representation with 100+ accredited universities globally.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['United States 🇺🇸', 'Ireland 🇮🇪', 'Germany 🇩🇪', 'New Zealand 🇳🇿', 'Malaysia 🇲🇾', 'Singapore 🇸🇬', 'Switzerland 🇨🇭'].map(c => (
                        <span key={c} className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-medium border border-white/15">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-blue-200">
                      Custom visa compliance & university shortlisting
                    </span>
                    <button
                      onClick={() => navigateTo('apply', { destination: 'Other / Global Destinations' })}
                      className="px-4 py-2 bg-white hover:bg-blue-50 text-[#00239C] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Enquire for Other Countries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Matrix Tab */}
          {activeTab === 'compare' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Cross-Country Comparison Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Objective benchmark for Sri Lankan passport holders evaluating international destinations.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <th className="py-3.5 px-4 font-bold text-slate-900 w-36">Destination</th>
                      <th className="py-3.5 px-4 font-semibold">Typical Tuition / Yr</th>
                      <th className="py-3.5 px-4 font-semibold">Living Costs Guidance</th>
                      <th className="py-3.5 px-4 font-semibold">Work Rights (Term-time)</th>
                      <th className="py-3.5 px-4 font-semibold">Post-Study Work Visa</th>
                      <th className="py-3.5 px-4 font-semibold">Major Intakes</th>
                      <th className="py-3.5 px-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {DESTINATIONS.map(dest => (
                      <tr key={dest.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900 text-sm whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleSelectDestination(dest)}
                            className="flex items-center gap-2 hover:text-[#00239C] cursor-pointer"
                          >
                            <span className="text-xl">{dest.flag}</span>
                            <span>{dest.name}</span>
                          </button>
                        </td>
                        <td className="py-4 px-4 font-mono font-medium text-slate-900">
                          {dest.avgTuitionPerYear}
                        </td>
                        <td className="py-4 px-4 max-w-xs leading-relaxed text-slate-600">
                          {dest.avgLivingPerYear}
                        </td>
                        <td className="py-4 px-4 max-w-xs leading-relaxed text-slate-600">
                          {dest.workDuringStudy}
                        </td>
                        <td className="py-4 px-4 max-w-xs leading-relaxed font-semibold text-slate-900">
                          {dest.postStudyWorkVisa}
                        </td>
                        <td className="py-4 px-4 text-slate-600">
                          {dest.primaryIntakes}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <button
                            onClick={() => handleSelectDestination(dest)}
                            className="px-3 py-1.5 bg-[#00239C] hover:bg-[#001869] text-white font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>View Page</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Pre-Departure Checklist Callout */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            STEP-BY-STEP ADVICE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Not sure which country matches your profile?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Book an appointment with a BCAS international education counselor. We analyze your academic background, IELTS score, and budget to shortlist institutions.
          </p>
        </div>
        <button
          onClick={() => navigateTo('apply')}
          className="px-6 py-3.5 bg-[#BA141A] hover:bg-[#910e13] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
        >
          Book Free Counseling Session ↗
        </button>
      </div>
    </div>
  );
};
