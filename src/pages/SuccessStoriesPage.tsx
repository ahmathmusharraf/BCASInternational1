import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUCCESS_STORIES } from '../data/mockData';
import { SuccessStory } from '../types';
import {
  Sparkles,
  MapPin,
  GraduationCap,
  Briefcase,
  Quote,
  ArrowRight,
  Filter,
  X,
  CheckCircle2,
  BookOpen,
  Calendar,
  Building2,
  ChevronRight
} from 'lucide-react';

const COUNTRY_FLAGS: Record<string, string> = {
  'United Kingdom': '🇬🇧',
  'Australia': '🇦🇺',
  'Canada': '🇨🇦',
  'Sweden': '🇸🇪',
  'Finland': '🇫🇮',
  'United Arab Emirates': '🇦🇪',
  'Malta': '🇲🇹',
  'Ireland': '🇮🇪',
  'Spain': '🇪🇸'
};

export const SuccessStoriesPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [activeStoryModal, setActiveStoryModal] = useState<SuccessStory | null>(null);

  const destinations = [
    'All',
    'United Kingdom',
    'Australia',
    'Canada',
    'Sweden',
    'Finland',
    'United Arab Emirates',
    'Malta'
  ];

  const filteredStories = SUCCESS_STORIES.filter(story => {
    if (selectedDestination === 'All') return true;
    return story.destination === selectedDestination;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#00239C] text-xs font-bold border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>STUDENT JOURNEYS & MILESTONES</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-slate-900 tracking-tight">
          Student Success Stories
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Alumni who started their academic pathways at BCAS campuses in Colombo, Kandy, Jaffna, and Kalmunai and successfully transitioned into world-ranked universities.
        </p>

        {/* Filter Navigation */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Destination:</span>
          </span>
          {destinations.map(dest => {
            const count = dest === 'All' ? SUCCESS_STORIES.length : SUCCESS_STORIES.filter(s => s.destination === dest).length;
            const flag = COUNTRY_FLAGS[dest] || '';
            return (
              <button
                key={dest}
                onClick={() => setSelectedDestination(dest)}
                className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center gap-1 ${
                  selectedDestination === dest
                    ? 'bg-[#00239C] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {flag && <span>{flag}</span>}
                <span>{dest}</span>
                <span className={`text-[10px] px-1 rounded-full ${selectedDestination === dest ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5-in-One-Line Compact Grid (1 col on mobile, 2 on small tablet, 3 on tablet, 5 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
        {filteredStories.map(story => {
          const flag = COUNTRY_FLAGS[story.destination] || '🌍';
          return (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Media Image Header */}
                <div
                  onClick={() => setActiveStoryModal(story)}
                  className="relative h-36 bg-slate-900 overflow-hidden cursor-pointer"
                  title="Click to view full student journey"
                >
                  <img
                    src={story.image}
                    alt={story.studentName}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <span className="bg-white/95 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-800 shadow-xs flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#BA141A]" />
                      <span className="truncate max-w-[80px]">{story.fromCampus.replace('BCAS ', '')}</span>
                    </span>

                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white border border-white/20 flex items-center gap-1">
                      <span>{flag}</span>
                      <span className="truncate max-w-[70px]">{story.destination}</span>
                    </span>
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                    <span className="text-[10px] font-medium text-blue-200 block leading-tight">
                      {story.graduationYear}
                    </span>
                    <h3 className="text-sm font-bold font-display text-white truncate drop-shadow-xs">
                      {story.studentName}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 space-y-2">
                  {/* University & Degree */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 line-clamp-1" title={story.degreeProgramme}>
                      <GraduationCap className="w-3.5 h-3.5 text-[#00239C] shrink-0" />
                      <span className="truncate">{story.degreeProgramme}</span>
                    </div>
                    <p className="text-[10.5px] font-medium text-slate-500 pl-4.5 truncate" title={story.currentUniversity}>
                      {story.currentUniversity}
                    </p>
                  </div>

                  {/* Current Role */}
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100/80">
                    <Briefcase className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate" title={story.currentRole}>{story.currentRole}</span>
                  </div>

                  {/* Short Quote */}
                  <div
                    onClick={() => setActiveStoryModal(story)}
                    className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[10.5px] text-slate-600 italic line-clamp-2 relative cursor-pointer hover:bg-blue-50/50 transition-colors"
                    title="Click to read full story"
                  >
                    &quot;{story.storyQuote}&quot;
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-2.5 pt-0 grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveStoryModal(story)}
                  className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer text-center"
                >
                  Read Story
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigateTo('apply', {
                      destination: story.destination,
                      subject: story.category
                    })
                  }
                  className="py-1.5 px-2 bg-[#00239C] hover:bg-[#001869] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">No stories found for this destination filter.</p>
          <button
            onClick={() => setSelectedDestination('All')}
            className="mt-2 text-xs text-[#00239C] font-bold hover:underline cursor-pointer"
          >
            Show All Destinations
          </button>
        </div>
      )}

      {/* Story Detail Modal */}
      {activeStoryModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setActiveStoryModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img
                src={activeStoryModal.image}
                alt={activeStoryModal.studentName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

              <button
                type="button"
                onClick={() => setActiveStoryModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close story modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs text-blue-200 font-semibold mb-1">
                  <span>{COUNTRY_FLAGS[activeStoryModal.destination] || ''} {activeStoryModal.destination}</span>
                  <span>·</span>
                  <span>{activeStoryModal.graduationYear}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  {activeStoryModal.studentName}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Origin & University */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Started At</span>
                  <span className="font-semibold text-slate-800">{activeStoryModal.fromCampus}</span>
                </div>
                <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Graduated From</span>
                  <span className="font-semibold text-[#00239C]">{activeStoryModal.currentUniversity}</span>
                </div>
              </div>

              {/* Programme & Current Career */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <GraduationCap className="w-4 h-4 text-[#00239C] shrink-0" />
                  <span><strong>Degree:</strong> {activeStoryModal.degreeProgramme}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Current Role:</strong> {activeStoryModal.currentRole}</span>
                </div>
              </div>

              {/* Quote */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 italic">
                <Quote className="w-3.5 h-3.5 text-amber-500 inline mr-1" />
                &quot;{activeStoryModal.storyQuote}&quot;
              </div>

              {/* Journey */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  The Educational Route:
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeStoryModal.fullJourney}
                </p>
              </div>

              {/* Advice */}
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-950">
                <strong className="block font-semibold mb-0.5 text-[#00239C]">Advice for Future Students:</strong>
                <span>{activeStoryModal.adviceForStudents}</span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveStoryModal(null)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const dest = activeStoryModal.destination;
                    const subj = activeStoryModal.category;
                    setActiveStoryModal(null);
                    navigateTo('apply', { destination: dest, subject: subj });
                  }}
                  className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Follow This Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#00239C] to-slate-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-md">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold font-display text-white">
            Write your own international success story.
          </h3>
          <p className="text-xs text-slate-200 max-w-xl">
            Book an appointment with a BCAS counselor to assess your academic profile and explore top-tier university placement options.
          </p>
        </div>
        <button
          onClick={() => navigateTo('apply')}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shrink-0 active:scale-95 shadow-xs"
        >
          Begin Application Enquiry ↗
        </button>
      </div>
    </div>
  );
};
