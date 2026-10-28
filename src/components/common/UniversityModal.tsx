import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  X,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Award,
  CheckCircle2,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const UniversityModal: React.FC = () => {
  const {
    activeUniversityModal,
    setActiveUniversityModal,
    navigateTo,
    toggleUniversityComparison,
    isUniversityCompared
  } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveUniversityModal(null);
    };
    if (activeUniversityModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeUniversityModal, setActiveUniversityModal]);

  if (!activeUniversityModal) return null;

  const uni = activeUniversityModal;
  const isCompared = isUniversityCompared(uni.id);

  const handleEnquire = () => {
    setActiveUniversityModal(null);
    navigateTo('apply', {
      university: uni.name,
      country: uni.country
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="uni-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header Media & Scrim */}
        <div className="relative h-48 sm:h-56 bg-slate-800 shrink-0">
          <img
            src={uni.image}
            alt={uni.name}
            className="w-full h-full object-cover"
            onError={e => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setActiveUniversityModal(null)}
            aria-label="Close university details"
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Media */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 mb-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>{uni.city}, {uni.country}</span>
              </span>
              <span>·</span>
              <span>{uni.type}</span>
            </div>
            <h2 id="uni-modal-title" className="text-xl sm:text-2xl font-bold font-display text-white">
              {uni.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs">
            <div>
              <span className="text-slate-600 block">Typical Tuition</span>
              <span className="font-semibold text-slate-900 font-mono text-[13px]">
                {uni.tuitionRange}
              </span>
            </div>
            <div>
              <span className="text-slate-600 block">Intakes</span>
              <span className="font-semibold text-slate-900">
                {uni.intakes.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-slate-600 block">English Req.</span>
              <span className="font-semibold text-slate-900 font-mono text-[13px]">
                {uni.minIELTS}
              </span>
            </div>
            <div>
              <span className="text-slate-600 block">Scholarship</span>
              <span className="font-semibold text-emerald-700">
                {uni.scholarshipAvailable ? 'Available (Up to £4,000)' : 'Case by case'}
              </span>
            </div>
          </div>

          {/* Overview Prose */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Institution Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {uni.description}
            </p>
          </div>

          {/* Key Advantages / BCAS Pathway Highlights */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
              Key Advantages & Transfer Pathways
            </h3>
            <ul className="space-y-2">
              {uni.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#00239C] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Subject Areas */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Popular Fields of Study
            </h3>
            <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
              {uni.popularSubjects.map(sub => (
                <span key={sub} className="px-2.5 py-1 bg-slate-100 rounded-md font-medium">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Advice Notice */}
          <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed">
            <strong>Admissions Notice:</strong> Specific entry criteria and scholarship deadlines depend on your latest qualification and intake semester. BCAS offers free guidance to secure your conditional and unconditional offer.
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => toggleUniversityComparison(uni)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              isCompared
                ? 'bg-blue-100 text-[#00239C] border-blue-300 font-semibold'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {isCompared ? '✓ Added to Comparison' : '+ Compare with other universities'}
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20am%20interested%20in%20applying%20to%20${encodeURIComponent(uni.name)}%20in%20${encodeURIComponent(uni.country)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>Ask on WhatsApp</span>
            </a>
            <button
              onClick={handleEnquire}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#00239C] hover:bg-[#001869] rounded-lg flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Enquire for this Uni</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
