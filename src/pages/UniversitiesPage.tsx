import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { UNIVERSITIES } from '../data/mockData';
import { University } from '../types';
import {
  GraduationCap,
  Search,
  MapPin,
  ArrowRight,
  RotateCcw,
  Plus,
  Check,
  Building2
} from 'lucide-react';

export const UniversitiesPage: React.FC = () => {
  const {
    navigateTo,
    toggleUniversityComparison,
    isUniversityCompared,
    prefilledEnquiry,
    setActiveUniversityModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>(prefilledEnquiry.destination || 'All');
  const [selectedSubject, setSelectedSubject] = useState<string>(prefilledEnquiry.subject || 'All');
  const [selectedLevel, setSelectedLevel] = useState<string>(prefilledEnquiry.level || 'All');

  const countries = [
    'All',
    'United Kingdom',
    'Canada',
    'Australia',
    'New Zealand',
    'Sweden',
    'Finland',
    'Malta',
    'United Arab Emirates',
    'Malaysia',
    'United States of America',
    'Germany',
    'Ireland',
    'Spain',
    'Singapore'
  ];
  const subjects = [
    'All',
    'Computing & IT',
    'Business & Management',
    'Engineering',
    'Health & Applied Science',
    'Psychology',
    'Law & Legal Studies',
    'Biological & Physical Sciences',
    'Education & Teaching',
    'Social Work',
    'Triple Crown Schools',
    'Hospitality & Tourism',
    'Creative Technologies & Media'
  ];
  const levels = ['All', 'Foundation', 'Diploma', 'Bachelor’s', 'Postgraduate'];

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter(uni => {
      const matchesSearch =
        searchQuery === '' ||
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry =
        selectedCountry === 'All' ||
        uni.country.toLowerCase() === selectedCountry.toLowerCase();

      const matchesSubject =
        selectedSubject === 'All' ||
        uni.popularSubjects.some(s => {
          const sLower = s.toLowerCase();
          const selLower = selectedSubject.toLowerCase();
          if (selLower.includes('triple crown')) return sLower.includes('triple crown') || uni.type.toLowerCase().includes('triple crown');
          if (selLower.includes('business')) return sLower.includes('business') || sLower.includes('mba') || sLower.includes('finance') || sLower.includes('management');
          if (selLower.includes('computing') || selLower.includes('it')) return sLower.includes('computing') || sLower.includes('it') || sLower.includes('computer') || sLower.includes('cyber');
          if (selLower.includes('health') || selLower.includes('nursing')) return sLower.includes('health') || sLower.includes('nursing');
          if (selLower.includes('law')) return sLower.includes('law') || sLower.includes('legal');
          if (selLower.includes('psychology')) return sLower.includes('psychology');
          if (selLower.includes('education') || selLower.includes('teaching')) return sLower.includes('education') || sLower.includes('teaching');
          if (selLower.includes('social work')) return sLower.includes('social work');
          if (selLower.includes('science')) return sLower.includes('science') || sLower.includes('biological') || sLower.includes('biomedical');
          if (selLower.includes('creative') || selLower.includes('media') || selLower.includes('film')) return sLower.includes('creative') || sLower.includes('media') || sLower.includes('film');
          if (selLower.includes('tourism') || selLower.includes('hospitality')) return sLower.includes('tourism') || sLower.includes('hospitality');
          return sLower.includes(selLower);
        });

      const matchesLevel =
        selectedLevel === 'All' ||
        uni.level.some(lvl => lvl.toLowerCase().includes(selectedLevel.toLowerCase()));

      return matchesSearch && matchesCountry && matchesSubject && matchesLevel;
    });
  }, [searchQuery, selectedCountry, selectedSubject, selectedLevel]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All');
    setSelectedSubject('All');
    setSelectedLevel('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12 space-y-6 sm:space-y-10">
      {/* Page Header */}
      <div className="space-y-2 sm:space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#00239C] uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
          <span>INSTITUTIONAL PARTNERSHIPS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
          Partner Universities
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
          Explore world-recognized global universities partnering with BCAS for credit transfer and direct international admissions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3 sm:space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search universities by name, city, or destination..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] text-slate-900"
          />
        </div>

        {/* Dropdown Filters (No Scholarship Filter) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-[11px] sm:text-xs">Country / Destination</label>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#00239C] text-xs"
            >
              {countries.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-[11px] sm:text-xs">Subject Area</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#00239C] text-xs"
            >
              {subjects.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-[11px] sm:text-xs">Education Level</label>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#00239C] text-xs"
            >
              {levels.map(l => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="pt-2 flex items-center justify-between text-[11px] sm:text-xs text-slate-500 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-900">{filteredUniversities.length}</strong>{' '}
            universit{filteredUniversities.length === 1 ? 'y' : 'ies'}
          </span>
          {(searchQuery || selectedCountry !== 'All' || selectedSubject !== 'All' || selectedLevel !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[#00239C] hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* University Grid: Minimalist, Name Only, No Details */}
      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUniversities.map(uni => {
            const isCompared = isUniversityCompared(uni.id);
            return (
              <div
                key={uni.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:border-blue-400 transition-all duration-200 flex flex-col justify-between group"
              >
                <div
                  onClick={() => setActiveUniversityModal(uni)}
                  className="cursor-pointer"
                  title={`Click to view full details for ${uni.name}`}
                >
                  {/* Photo with City & Country Badge */}
                  <div className="relative h-32 sm:h-36 bg-slate-950 overflow-hidden">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-slate-900 flex items-center gap-1 shadow-xs">
                      <MapPin className="w-3 h-3 text-[#BA141A]" />
                      <span>{uni.city}, {uni.country}</span>
                    </div>
                  </div>

                  {/* University Name Only - Prominent and Clean */}
                  <div className="p-3.5 sm:p-4 space-y-1">
                    <h3 className="font-bold text-sm sm:text-base font-display text-slate-900 group-hover:text-[#00239C] transition-colors leading-snug">
                      {uni.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{uni.country}</span>
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-3.5 sm:p-4 pt-0">
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleUniversityComparison(uni)}
                      className={`px-2 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                        isCompared
                          ? 'bg-blue-100 text-[#00239C] border-blue-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                      title={isCompared ? 'Remove from compare' : 'Add to compare'}
                    >
                      {isCompared ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                    </button>

                    <button
                      onClick={() =>
                        navigateTo('apply', {
                          university: uni.name,
                          country: uni.country
                        })
                      }
                      className="px-3 py-1.5 bg-[#00239C] hover:bg-[#001869] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
          <p className="text-base font-semibold text-slate-800">
            No universities found matching your active filter criteria.
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search query or selecting &quot;All&quot; for destination and study level.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#00239C] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Show All Universities
          </button>
        </div>
      )}

      {/* Advisory Banner */}
      <div className="p-5 sm:p-6 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Looking for a specific university not listed above?
          </h4>
          <p className="text-xs text-slate-600">
            BCAS maintains direct partnerships with over 100 accredited universities worldwide.
          </p>
        </div>
        <button
          onClick={() => navigateTo('apply')}
          className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xs cursor-pointer"
        >
          Ask an Adviser ↗
        </button>
      </div>
    </div>
  );
};
