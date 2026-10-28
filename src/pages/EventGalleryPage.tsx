import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Camera,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Facebook,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';

interface GalleryEvent {
  id: string;
  title: string;
  category: 'University Fairs' | 'Spot Admissions' | 'Embassy Sessions' | 'Pre-Departure' | 'Campus Life';
  date: string;
  location: string;
  attendees: string;
  image: string;
  facebookUrl: string;
  description: string;
  highlights: string[];
}

// ============================================================================
// OFFICIAL BCAS INTERNATIONAL FACEBOOK POSTS & EVENT GALLERY ARCHIVE
// Exact Facebook posts provided for university delegations, spot admissions & fairs
// ============================================================================
const GALLERY_EVENTS: GalleryEvent[] = [
  {
    id: 'york-st-john-delegation',
    title: 'York St John University UK Delegate Visit | BCAS International',
    category: 'University Fairs',
    date: 'October 2026',
    location: 'BCAS International Center, Colombo',
    attendees: 'Official University Delegate Meeting',
    image: '/assets/events/event-1.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1MtASTRJFJ/',
    description: 'It was a pleasure meeting Ms. Thanuja Raveendren, Country Manager at York St John University! A valuable opportunity to connect, exchange insights, and strengthen our shared commitment to opening world-class UK degree pathways for Sri Lankan students.',
    highlights: ['Country Manager Delegate Meeting', 'York St John UK Admissions & Entry Criteria', 'Direct Progression & Scholarships']
  },
  {
    id: 'post-university-usa',
    title: 'Post University USA Global Partnership Meet | BCAS Campus',
    category: 'University Fairs',
    date: 'September 2026',
    location: 'BCAS Campus Colombo',
    attendees: 'Faculty & Academic Board',
    image: '/assets/events/event-2.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1EDqndEfcY/',
    description: 'We were pleased to welcome Shikha Singh, Global Partnership Manager at Post University, USA, to the BCAS Campus. A high-level strategic meeting with Prof. Ruvan Abeysekara exploring accelerated US bachelor’s & master’s credit pathways and scholarship packages.',
    highlights: ['US Higher Education Expansion', 'STEM Degree Opportunities', 'Credit Transfer Partnerships']
  },
  {
    id: 'laurentian-university-canada',
    title: 'Laurentian University Canada Recruitment & Pathways Session',
    category: 'Spot Admissions',
    date: 'August 2026',
    location: 'BCAS International Center',
    attendees: 'Prospective Canadian Undergrads & Postgrads',
    image: '/assets/events/event-3.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1PnPMTwhft/',
    description: 'We had the pleasure of hosting Xuan Zhao, Manager of International Recruitment at Laurentian University, Canada, to discuss expanding global education pathways, bilingual Ontario campus perks, and post-graduation work permits (PGWP).',
    highlights: ['Laurentian University Recruitment Team', 'Ontario University Application Assistance', 'Co-op Work Terms & PGWP Guidance']
  },
  {
    id: 'kent-state-university-usa',
    title: 'Kent State University USA Admissions & STEM Briefing',
    category: 'Embassy Sessions',
    date: 'July 2026',
    location: 'BCAS Campus',
    attendees: 'US University Aspirants',
    image: '/assets/events/event-4.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1F7H2ZMFZ8/',
    description: 'Building bridges to the US! Fantastic meeting with Zeeshan Ansari, official representative from Kent State University, USA, unlocking top aviation, engineering, computing, and business degrees for Sri Lankan scholars with direct application support.',
    highlights: ['Kent State Official Delegate Consultations', 'US F-1 Visa Guidelines', 'Global Merit Scholarship Allocations']
  },
  {
    id: 'union-bank-education-loans',
    title: 'BCAS & Union Bank Strategic Partnership for Student Education Loans',
    category: 'Campus Life',
    date: 'June 2026',
    location: 'Union Bank Head Office & BCAS Campuses',
    attendees: 'Islandwide Students & Families',
    image: '/assets/events/event-5.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1HFgqEUmci/',
    description: 'We are delighted to partner with Union Bank of Sri Lanka to make quality higher education and overseas university studies affordable. Students benefit from concessionary interest rates, fast loan approvals, and flexible repayment terms for tuition and living funds.',
    highlights: ['Affordable Education Financing', 'Concessionary Interest Rates', 'Fast Processing for Visa Proof of Funds']
  },
  {
    id: 'uniworld-jaffna-2026',
    title: 'UniWorld Jaffna 2026 – Northern International Education Fair',
    category: 'University Fairs',
    date: 'May 2026',
    location: 'BCAS Jaffna Campus, Jaffna',
    attendees: '1,000+ Students & Parents',
    image: '/assets/events/event-6.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1HorpPYGYt/',
    description: 'UniWorld Jaffna 2026 was a resounding success! Hundreds of ambitious students and parents met face-to-face with representatives from leading universities across the UK, Canada, Australia, and New Zealand right here in Jaffna.',
    highlights: ['1,000+ Northern Region Visitors', 'Instant Document Eligibility Audits', 'Free IELTS & Visa Assessment Desks']
  },
  {
    id: 'nottingham-trent-uk',
    title: 'Nottingham Trent University (NTU) UK Pathways & Spot Assessment',
    category: 'Spot Admissions',
    date: 'April 2026',
    location: 'BCAS International Center',
    attendees: 'Over 150 Registered Candidates',
    image: '/assets/events/event-7.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/14sLVWTx2he/',
    description: 'Students explored prestigious study pathways with Nottingham Trent University (NTU), a Top 25 UK University renowned for graduate employability, industry placements, and generous regional scholarships for undergraduate and postgraduate programs.',
    highlights: ['Top 25 UK Modern University', 'Year-in-Industry Work Placements', 'Direct Spot Offer Letters']
  },
  {
    id: 'university-of-chester-open-day',
    title: 'University of Chester UK Exclusive Open Day & Admissions Forum',
    category: 'Spot Admissions',
    date: 'March 2026',
    location: 'BCAS City Campus Colombo',
    attendees: '200+ Students & Parents',
    image: '/assets/events/event-8.jpg',
    facebookUrl: 'https://www.facebook.com/share/p/1A83ft8fSJ/',
    description: 'A successful and informative open day hosted by BCAS International with Ms. Inhama Ifthikar, Country Manager at University of Chester UK. Direct consultations covered bachelor’s and master’s degree intakes, CAS processing, and post-study work rights.',
    highlights: ['Chester Country Manager Direct Access', 'CAS & Visa Guidance Protocols', 'Undergraduate & Master’s Fast Track']
  }
];

export const EventGalleryPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalEvent, setActiveModalEvent] = useState<GalleryEvent | null>(null);
  const [copiedFbLink, setCopiedFbLink] = useState<boolean>(false);

  const categories = [
    'All',
    'University Fairs',
    'Spot Admissions',
    'Embassy Sessions',
    'Pre-Departure',
    'Campus Life'
  ];

  const filteredEvents = GALLERY_EVENTS.filter(e => {
    if (activeCategory === 'All') return true;
    return e.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10 animate-in fade-in duration-300">
      {/* Top Banner / Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#00239C] uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
          <span>CAMPUS ACTIVITY & GLOBAL ADMISSIONS ARCHIVE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
          BCAS Event & Seminar Gallery
        </h1>
        <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
          Explore photographic coverage and official Facebook posts from university recruitment fairs, visa compliance seminars, spot admissions days, and pre-departure orientations across BCAS campuses.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#00239C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredEvents.map(event => {
          const fbLink = event.facebookUrl;
          return (
            <div
              key={event.id}
              onClick={() => setActiveModalEvent(event)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Frame with Zoom Effect */}
                <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white border border-white/20">
                    {event.category}
                  </div>

                  {/* Facebook Link Chip on Thumbnail */}
                  <a
                    href={fbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 bg-[#1877F2] hover:bg-[#0d65d9] text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-md transition-colors"
                    title="Open Facebook post"
                  >
                    <Facebook className="w-3 h-3 fill-white" />
                    <span>Facebook Post</span>
                    <ExternalLink className="w-2.5 h-2.5 text-white/80" />
                  </a>

                  {/* Bottom Meta */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 text-[11px] text-blue-200">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 truncate text-slate-200">
                        <MapPin className="w-3 h-3 text-[#BA141A]" />
                        <span className="truncate">{event.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Info */}
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display group-hover:text-[#00239C] transition-colors leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Highlights tags */}
                  <div className="pt-2 flex flex-wrap gap-1">
                    {event.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar with Facebook Link */}
              <div className="p-4 pt-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
                <a
                  href={fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-bold text-[#1877F2] hover:underline"
                >
                  <Facebook className="w-3.5 h-3.5 fill-current" />
                  <span>View on Facebook ↗</span>
                </a>

                <span className="text-slate-500 font-semibold group-hover:text-[#00239C] flex items-center gap-1">
                  <span>Photo Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Image & Facebook Modal */}
      {activeModalEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
          onClick={() => setActiveModalEvent(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-slate-800 flex flex-col border border-slate-200 max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Image Header with Close Button */}
            <div className="relative aspect-video max-h-72 bg-slate-950 overflow-hidden">
              <img
                src={activeModalEvent.image}
                alt={activeModalEvent.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <button
                type="button"
                onClick={() => setActiveModalEvent(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                aria-label="Close image modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                  {activeModalEvent.category}
                </span>
                <h3 className="text-base sm:text-xl font-bold font-display leading-tight">
                  {activeModalEvent.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#00239C]" />
                  <span className="font-semibold text-slate-700">{activeModalEvent.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#BA141A]" />
                  <span className="font-semibold text-slate-700">{activeModalEvent.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-700">{activeModalEvent.attendees}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {activeModalEvent.description}
              </p>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Highlights & Outcomes:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalEvent.highlights.map((h, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated Facebook Post Link Section */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Facebook className="w-4 h-4 text-[#1877F2] fill-[#1877F2]" />
                    <span className="font-bold text-slate-900">Official Facebook Post:</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(activeModalEvent.facebookUrl);
                        setCopiedFbLink(true);
                        setTimeout(() => setCopiedFbLink(false), 2000);
                        showToast('Facebook post link copied to clipboard!', 'success');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedFbLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedFbLink ? 'Copied' : 'Copy Link'}</span>
                    </button>

                    <a
                      href={activeModalEvent.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1 bg-[#1877F2] hover:bg-[#0d65d9] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>Open on Facebook</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[#1877F2] hover:underline truncate">
                  <a href={activeModalEvent.facebookUrl} target="_blank" rel="noopener noreferrer">
                    {activeModalEvent.facebookUrl}
                  </a>
                </div>
              </div>

              {/* Bottom Action Buttons in Modal */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                  Attend our upcoming campus session or seminar:
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalEvent(null);
                      navigateTo('apply', { notes: `Registered for next ${activeModalEvent.title}` });
                    }}
                    className="w-full sm:w-auto px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Register for Next Event
                  </button>
                  <a
                    href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20register%20for%20the%20${encodeURIComponent(activeModalEvent.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
