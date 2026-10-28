import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  DESTINATIONS,
  SUCCESS_STORIES,
  TESTIMONIAL_VIDEOS
} from '../data/mockData';
import { TestimonialVideo } from '../types';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { sendLeadToGoogleSheets } from '../services/leadService';
import {
  Compass,
  ArrowRight,
  GraduationCap,
  Globe2,
  CheckCircle2,
  Award,
  ShieldCheck,
  Building2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  HelpCircle,
  Sparkles,
  Camera,
  Facebook,
  Search,
  BookOpen,
  Check,
  X,
  Percent,
  TrendingUp,
  Users,
  FileCheck,
  BadgePercent,
  Clock3,
  HeartHandshake,
  DollarSign,
  PlaneTakeoff,
  Lightbulb,
  ClipboardList,
  FileSearch,
  PieChart,
  Rocket,
  Cog,
  Quote,
  Star,
  MapPin,
  Briefcase,
  PhoneCall,
  Layers,
  Eye,
  Send,
  Calendar,
  Filter,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Youtube,
  Copy,
  ExternalLink
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    showToast,
    addSubmittedApplication
  } = useApp();

  // Written Testimonials: 5 in one line auto-advance carousel with animations
  const [writtenTestimonialPage, setWrittenTestimonialPage] = useState<number>(0);
  const [isTestimonialAutoPlay, setIsTestimonialAutoPlay] = useState<boolean>(true);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState<boolean>(false);

  const TESTIMONIALS_PER_PAGE = 5;
  const totalTestimonialPages = Math.ceil(SUCCESS_STORIES.length / TESTIMONIALS_PER_PAGE);

  useEffect(() => {
    if (!isTestimonialAutoPlay || isTestimonialHovered) return;

    const timer = setInterval(() => {
      setWrittenTestimonialPage(prev => (prev + 1) % totalTestimonialPages);
    }, 5500);

    return () => clearInterval(timer);
  }, [isTestimonialAutoPlay, isTestimonialHovered, totalTestimonialPages]);

  const handlePrevTestimonials = () => {
    setWrittenTestimonialPage(prev => (prev === 0 ? totalTestimonialPages - 1 : prev - 1));
  };

  const handleNextTestimonials = () => {
    setWrittenTestimonialPage(prev => (prev + 1) % totalTestimonialPages);
  };

  // Campus Direct style Find My Course Hero Widget State
  const [heroDestination, setHeroDestination] = useState<string>('All');
  const [heroLevel, setHeroLevel] = useState<string>('All');
  const [heroField, setHeroField] = useState<string>('All');

  // Active student testimonial video modal
  const [activeVideoModal, setActiveVideoModal] = useState<TestimonialVideo | null>(null);
  const [customYoutubeMap] = useState<Record<string, string>>({});
  const [activePathwayStep, setActivePathwayStep] = useState<number>(0);

  const getCleanYoutubeId = (rawInput?: string): string => {
    if (!rawInput) return 'VmKpPRvvoJ8';
    const trimmed = rawInput.trim();
    const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (match && match[1]) return match[1];
    if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?')) return trimmed;
    return 'VmKpPRvvoJ8';
  };


  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroDestination !== 'All') {
      const params: Record<string, string> = { destination: heroDestination };
      if (heroLevel !== 'All') params.level = heroLevel;
      if (heroField !== 'All') params.category = heroField;
      navigateTo('destinations', params);
    } else {
      navigateTo('destinations');
    }
  };

  // Destinations section active tab
  const [activeDestinationTab, setActiveDestinationTab] = useState<string>('All');

  // Quick Enquiry Form state on HomePage (compact pre-assessment)
  const [quickEnquiry, setQuickEnquiry] = useState({
    name: '',
    phone: '',
    destination: 'United Kingdom',
    campus: 'Colombo Campus',
    subject: 'Computing & IT'
  });
  const [quickEnquirySubmitted, setQuickEnquirySubmitted] = useState<boolean>(false);
  const [quickEnquiryLoading, setQuickEnquiryLoading] = useState<boolean>(false);

  // Carousel Refs for Mobile & Tablet Horizontal Rails
  const destinationsRef = useRef<HTMLDivElement>(null);
  const videoTestimonialsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right', amount = 340) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth'
      });
    }
  };

  const handleQuickEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEnquiry.name.trim() || !quickEnquiry.phone.trim()) {
      showToast('Please enter your name and contact phone number', 'warning');
      return;
    }
    setQuickEnquiryLoading(true);
    try {
      const payload = {
        fullName: quickEnquiry.name.trim(),
        email: `${quickEnquiry.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'applicant'}@enquiry.bcas.lk`,
        phone: quickEnquiry.phone.trim(),
        cityOrCampus: quickEnquiry.campus,
        currentQualification: 'G.C.E. A/L Completed',
        targetSubject: quickEnquiry.subject,
        targetDestination: quickEnquiry.destination,
        targetLevel: 'Bachelor’s',
        targetIntake: 'Upcoming 2027 Intakes',
        budgetStatus: 'Seeking Scholarship & Funding Guidance',
        englishProficiency: 'Exploring IELTS / PTE',
        specificQuestions: 'Direct website homepage quick enquiry',
        demoConsent: true
      };
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.application) {
          addSubmittedApplication(data.application);
        }
      }

      // Automatically sync inquiry directly into Google Sheets
      sendLeadToGoogleSheets({
        fullName: quickEnquiry.name.trim(),
        email: `${quickEnquiry.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'applicant'}@enquiry.bcas.lk`,
        phone: quickEnquiry.phone.trim(),
        interest: `${quickEnquiry.subject} (${quickEnquiry.destination}) - ${quickEnquiry.campus}`,
        message: 'Direct website homepage quick consultation inquiry.',
      }).catch(err => console.warn('Google Sheet lead sync notice:', err));

      setQuickEnquirySubmitted(true);
      showToast('Quick enquiry submitted! A BCAS counselor will call/WhatsApp you shortly.', 'success');
    } catch {
      setQuickEnquirySubmitted(true);
      showToast('Enquiry recorded successfully. BCAS will contact you shortly.', 'success');
    } finally {
      setQuickEnquiryLoading(false);
    }
  };


  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12">
      {/* Hero Section: Creative Center-Aligned with Cinematic Campus Background Image */}
      <section id="hero" className="relative overflow-hidden pt-7 pb-10 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 border-b border-slate-900 scroll-mt-20">
        {/* Background Image & Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
            alt="International University Campus"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          {/* Deep Royal Navy & Blue Gradient Mask ensuring perfect contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00103a]/90 via-[#001d74]/88 to-[#020b22]/96" />
          <div className="absolute inset-0 bg-radial-[at_center_top] from-transparent via-[#001869]/30 to-slate-950/80" />
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Center-Aligned Editorial Copy */}
          <div className="max-w-4xl mx-auto text-center space-y-3.5 sm:space-y-5">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-blue-900/60 text-blue-200 text-[10px] sm:text-xs font-bold rounded-full border border-blue-400/30 backdrop-blur-md shadow-md">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300 animate-pulse" />
              <span>SRI LANKA&apos;S DIRECT STUDY ABROAD PARTNER</span>
              <span className="bg-white/20 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] text-white font-semibold">
                Since 1999
              </span>
            </div>

            {/* Grand Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display text-white tracking-tight leading-[1.12] sm:leading-[1.08] drop-shadow-md">
              Find Your Dream<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-amber-200">
                University Abroad.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
              100% Free Counseling · Direct University Representation · Verified Visa Guidance. BCAS helps you explore 100+ accredited universities across the UK, Australia, Canada, Europe, and the UAE with zero agency charges.
            </p>

            {/* Center-Aligned CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => navigateTo('apply')}
                className="px-4 py-2.5 sm:px-6 sm:py-3.5 bg-white hover:bg-blue-50 text-[#00239C] font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-98"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00239C]" />
              </button>
              <a
                href="tel:+94761415273"
                className="px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-200" />
                <span>Call Desk: +94 76 141 5273</span>
              </a>
            </div>

            {/* Verified Trust Strip */}
            <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center justify-center gap-x-3.5 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 text-[10px] sm:text-xs text-blue-200">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">100% Free Processing</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">British Council Certified</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">99% Visa Grant Rate</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-white">25+ Years of Excellence</span>
              </div>
            </div>
          </div>

          {/* Campus Direct Signature Floating "Find My Course" Search Bar */}
          <div id="finder" className="mt-6 sm:mt-10 lg:mt-14 max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl p-3.5 sm:p-6 scroll-mt-28 relative z-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2.5 pb-2.5 sm:mb-4 sm:pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blue-50 text-[#00239C]">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 font-display">
                    Find My Course & University
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    Search 250+ accredited undergraduate, postgraduate, and diploma degrees worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>100% Free Processing</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 items-end">
              {/* Field 1: Target Destination */}
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Destination Country
                </label>
                <div className="relative">
                  <Globe2 className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={heroDestination}
                    onChange={e => setHeroDestination(e.target.value)}
                    className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-2 sm:py-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm font-semibold text-slate-900 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all cursor-pointer"
                  >
                    <option value="All">All 9 Destinations (Global)</option>
                    <option value="United Kingdom">United Kingdom 🇬🇧</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Canada">Canada 🇨🇦</option>
                    <option value="Sweden">Sweden 🇸🇪</option>
                    <option value="Finland">Finland 🇫🇮</option>
                    <option value="New Zealand">New Zealand 🇳🇿</option>
                    <option value="Malaysia">Malaysia 🇲🇾</option>
                    <option value="Malta">Malta 🇲🇹</option>
                    <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                  </select>
                </div>
              </div>

              {/* Field 2: Education Level */}
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Education Level
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={heroLevel}
                    onChange={e => setHeroLevel(e.target.value)}
                    className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-2 sm:py-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm font-semibold text-slate-900 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all cursor-pointer"
                  >
                    <option value="All">All Study Levels</option>
                    <option value="Bachelor’s">Bachelor’s Degree / Top-Up</option>
                    <option value="Postgraduate">Master’s / Postgraduate</option>
                    <option value="Diploma / HND">Higher National Diploma (HND)</option>
                    <option value="Foundation">University Foundation</option>
                    <option value="Secondary Diploma">Canadian OSSD High School</option>
                    <option value="Certification">IELTS Academic Prep</option>
                  </select>
                </div>
              </div>

              {/* Field 3: Field of Study */}
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Subject Area
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={heroField}
                    onChange={e => setHeroField(e.target.value)}
                    className="w-full pl-8 sm:pl-9 pr-2.5 sm:pr-3 py-2 sm:py-2.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs sm:text-sm font-semibold text-slate-900 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all cursor-pointer"
                  >
                    <option value="All">All Fields of Study</option>
                    <option value="Computing">Computing & Artificial Intelligence</option>
                    <option value="Business">Business, Finance & Management</option>
                    <option value="Engineering">Engineering & Built Environment</option>
                    <option value="Health">Biomedical & Health Sciences</option>
                    <option value="Law">Law & Legal Studies (LLB)</option>
                    <option value="Hospitality">International Hospitality & Tourism</option>
                    <option value="High School & Pre-University">Canadian High School (OSSD)</option>
                    <option value="English Proficiency">IELTS English Prep</option>
                  </select>
                </div>
              </div>

              {/* Field 4: Search Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 sm:py-2.5 px-4 sm:px-5 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer active:scale-98"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{heroDestination !== 'All' ? `Show ${heroDestination} Only` : 'Explore Destinations'}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Key Metrics / Trust Bar (Campus Direct Style) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 -mt-5 sm:-mt-8 lg:-mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-blue-50 text-[#00239C] flex items-center justify-center font-bold shrink-0">
                <Globe2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </span>
              <div>
                <span className="text-base sm:text-xl lg:text-2xl font-bold font-display text-slate-900 block leading-tight">100+</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none block mt-0.5">Partner Universities</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </span>
              <div>
                <span className="text-base sm:text-xl lg:text-2xl font-bold font-display text-emerald-700 block leading-tight">99%</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none block mt-0.5">Visa Grant Success</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </span>
              <div>
                <span className="text-base sm:text-xl lg:text-2xl font-bold font-display text-slate-900 block leading-tight">25+</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none block mt-0.5">Years of Excellence</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-4 lg:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold shrink-0">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </span>
              <div>
                <span className="text-base sm:text-xl lg:text-2xl font-bold font-display text-slate-900 block leading-tight">4</span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-none block mt-0.5">Campuses in Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-STEP STUDY ABROAD INFOGRAPHIC: EXACT MATCH TO USER REFERENCE (COMPACT LOW-HEIGHT DESIGN) */}
      <section id="roadmap" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <div className="bg-white text-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-4.5 border border-slate-200/90 shadow-xs relative overflow-hidden space-y-2 sm:space-y-2.5">
          
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-50/50 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header: Low-Profile Compact */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10 border-b border-slate-100 pb-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#00239C] text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#00239C]" />
                <span>STRUCTURED ADMISSIONS JOURNEY</span>
              </div>
              
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold font-display tracking-tight text-slate-900 mt-0.5">
                Your 6-Step Pathway
              </h2>
              
              <p className="text-[11px] sm:text-xs text-slate-500">
                From initial profile evaluation to international campus arrival in 6 transparent stages.
              </p>
            </div>

            {/* Quick Metrics & Action */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10.5px] font-bold">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>100% Free · 0% Agency Fees</span>
              </span>
              <button
                type="button"
                onClick={() => navigateTo('apply')}
                className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#00239C] hover:bg-[#001869] text-white text-[11px] font-bold rounded-lg shadow-2xs hover:shadow-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>Book Step 01 Counseling</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* INFOGRAPHIC S-CURVE WAVE PIPELINE (LOW-HEIGHT COMPACT SVG MATCHING REFERENCE) */}
          <div className="relative z-10">
            {/* Scrollable Container on Mobile, Full Width on Desktop */}
            <div className="overflow-x-auto pb-1 -mx-2 px-2 scrollbar-thin">
              <div className="min-w-[880px] max-w-[1000px] mx-auto">
                <svg
                  viewBox="0 0 1000 240"
                  className="w-full h-auto max-h-[205px] sm:max-h-[225px] select-none overflow-visible mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="badge-shadow-sm" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.18" />
                    </filter>
                    <filter id="disc-shadow-sm" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#0F172A" floodOpacity="0.07" />
                    </filter>
                  </defs>

                  {/* 1. CONTINUOUS ALTERNATING WAVE RIBBON (R=70, cy=120) */}
                  {/* Left Lead-in Line (Blue) */}
                  <line
                    x1="30"
                    y1="120"
                    x2="80"
                    y2="120"
                    stroke="#0284C7"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* STEP 01: Bottom Loop (Blue) */}
                  <path
                    d="M 80 120 A 70 70 0 0 0 220 120"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="14"
                    strokeLinecap="butt"
                  />

                  {/* STEP 02: Top Loop (Mint / Teal Green) */}
                  <path
                    d="M 220 120 A 70 70 0 0 1 360 120"
                    fill="none"
                    stroke="#00BFA5"
                    strokeWidth="14"
                    strokeLinecap="butt"
                  />

                  {/* STEP 03: Bottom Loop (Warm Amber / Yellow) */}
                  <path
                    d="M 360 120 A 70 70 0 0 0 500 120"
                    fill="none"
                    stroke="#FFA000"
                    strokeWidth="14"
                    strokeLinecap="butt"
                  />

                  {/* STEP 04: Top Loop (Coral Red) */}
                  <path
                    d="M 500 120 A 70 70 0 0 1 640 120"
                    fill="none"
                    stroke="#FF5252"
                    strokeWidth="14"
                    strokeLinecap="butt"
                  />

                  {/* STEP 05: Bottom Loop (Vibrant Purple) */}
                  <path
                    d="M 640 120 A 70 70 0 0 0 780 120"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="14"
                    strokeLinecap="butt"
                  />

                  {/* STEP 06: Top Loop (Hot Pink / Magenta) */}
                  <path
                    d="M 780 120 A 70 70 0 0 1 920 120"
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="14"
                    strokeLinecap="butt"
                  />

                  {/* Right Lead-out Line (Hot Pink) */}
                  <line
                    x1="920"
                    y1="120"
                    x2="970"
                    y2="120"
                    stroke="#EC4899"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />

                  {/* 2. CIRCULAR NODES, OUTER DARK RINGS, ICONS, APEX BADGES & INFODATA TEXT */}
                  {[
                    {
                      step: '01',
                      cx: 150,
                      isTop: false, // Ribbon is bottom, text is top
                      color: '#0284C7',
                      title: 'PROFILE AUDIT',
                      line1: 'Free academic evaluation',
                      line2: '& IELTS entry review',
                      icon: Lightbulb
                    },
                    {
                      step: '02',
                      cx: 290,
                      isTop: true, // Ribbon is top, text is bottom
                      color: '#00BFA5',
                      title: 'UNIVERSITY MATCH',
                      line1: 'Shortlist best-fit courses',
                      line2: 'across 170+ partner unis',
                      icon: Search
                    },
                    {
                      step: '03',
                      cx: 430,
                      isTop: false, // Ribbon is bottom, text is top
                      color: '#FFA000',
                      title: 'FAST ADMISSIONS',
                      line1: 'Direct priority application',
                      line2: '& fast conditional offers',
                      icon: Users
                    },
                    {
                      step: '04',
                      cx: 570,
                      isTop: true, // Ribbon is top, text is bottom
                      color: '#FF5252',
                      title: 'SCHOLARSHIP AID',
                      line1: '£1,500 – £8,000 bursaries',
                      line2: '& tuition discount grants',
                      icon: Cog
                    },
                    {
                      step: '05',
                      cx: 710,
                      isTop: false, // Ribbon is bottom, text is top
                      color: '#8B5CF6',
                      title: 'VISA CLEARANCE',
                      line1: '28-day financial audit',
                      line2: '& embassy mock interviews',
                      icon: PieChart
                    },
                    {
                      step: '06',
                      cx: 850,
                      isTop: true, // Ribbon is top, text is bottom
                      color: '#EC4899',
                      title: 'PRE-DEPARTURE',
                      line1: 'Flight booking, housing',
                      line2: '& arrival reception',
                      icon: Rocket
                    }
                  ].map((node, idx) => {
                    const isSelected = activePathwayStep === idx;
                    const IconComponent = node.icon;
                    return (
                      <g
                        key={node.step}
                        className="cursor-pointer group"
                        onClick={() => setActivePathwayStep(idx)}
                      >
                        {/* Outer Dark Navy Ring (Matching Reference Image) */}
                        <circle
                          cx={node.cx}
                          cy={120}
                          r={54}
                          fill="#FFFFFF"
                          stroke="#1E293B"
                          strokeWidth="3.5"
                          filter="url(#disc-shadow-sm)"
                          className="transition-all duration-200 group-hover:stroke-[#00239C]"
                        />

                        {/* Inner Clean White Disc */}
                        <circle
                          cx={node.cx}
                          cy={120}
                          r={49}
                          fill="#FFFFFF"
                        />

                        {/* Selected Pulsing Halo */}
                        {isSelected && (
                          <circle
                            cx={node.cx}
                            cy={120}
                            r={59}
                            fill="none"
                            stroke={node.color}
                            strokeWidth="2"
                            strokeDasharray="4 2.5"
                            className="animate-spin"
                            style={{ transformOrigin: `${node.cx}px 120px`, animationDuration: '9s' }}
                          />
                        )}

                        {/* Centered Line Icon (Matching Reference Image) */}
                        <foreignObject
                          x={node.cx - 16}
                          y={120 - 16}
                          width={32}
                          height={32}
                          className="pointer-events-none"
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <IconComponent
                              className="w-7 h-7 transition-transform duration-200 group-hover:scale-110"
                              style={{ color: node.color }}
                              strokeWidth={2.2}
                            />
                          </div>
                        </foreignObject>

                        {/* APEX CIRCULAR NUMBER BADGE (Matching Reference Image) */}
                        {!node.isTop ? (
                          /* Node 1, 3, 5: Badge at BOTTOM Peak (y=190) */
                          <g filter="url(#badge-shadow-sm)">
                            <circle
                              cx={node.cx}
                              cy={190}
                              r={16.5}
                              fill={node.color}
                              className="transition-transform group-hover:scale-105"
                              style={{ transformOrigin: `${node.cx}px 190px` }}
                            />
                            <text
                              x={node.cx}
                              y={191}
                              fill="#FFFFFF"
                              fontSize="12.5"
                              fontWeight="800"
                              fontFamily="system-ui, sans-serif"
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {node.step}
                            </text>
                          </g>
                        ) : (
                          /* Node 2, 4, 6: Badge at TOP Peak (y=50) */
                          <g filter="url(#badge-shadow-sm)">
                            <circle
                              cx={node.cx}
                              cy={50}
                              r={16.5}
                              fill={node.color}
                              className="transition-transform group-hover:scale-105"
                              style={{ transformOrigin: `${node.cx}px 50px` }}
                            />
                            <text
                              x={node.cx}
                              y={51}
                              fill="#FFFFFF"
                              fontSize="12.5"
                              fontWeight="800"
                              fontFamily="system-ui, sans-serif"
                              textAnchor="middle"
                              dominantBaseline="central"
                            >
                              {node.step}
                            </text>
                          </g>
                        )}

                        {/* INFODATA CALLOUT TEXT BLOCKS (Low-Height Compact Positioning) */}
                        {!node.isTop ? (
                          /* Node 1, 3, 5: Callout Text ABOVE */
                          <g className="transition-transform duration-200 group-hover:-translate-y-0.5">
                            <text
                              x={node.cx}
                              y={16}
                              textAnchor="middle"
                              fill={node.color}
                              fontSize="11"
                              fontWeight="800"
                              fontFamily="system-ui, sans-serif"
                              letterSpacing="0.6"
                            >
                              {node.title}
                            </text>
                            <text
                              x={node.cx}
                              y={31}
                              textAnchor="middle"
                              fill="#64748B"
                              fontSize="9.5"
                              fontWeight="500"
                              fontFamily="system-ui, sans-serif"
                            >
                              {node.line1}
                            </text>
                            <text
                              x={node.cx}
                              y={44}
                              textAnchor="middle"
                              fill="#64748B"
                              fontSize="9.5"
                              fontWeight="500"
                              fontFamily="system-ui, sans-serif"
                            >
                              {node.line2}
                            </text>
                          </g>
                        ) : (
                          /* Node 2, 4, 6: Callout Text BELOW */
                          <g className="transition-transform duration-200 group-hover:translate-y-0.5">
                            <text
                              x={node.cx}
                              y={196}
                              textAnchor="middle"
                              fill={node.color}
                              fontSize="11"
                              fontWeight="800"
                              fontFamily="system-ui, sans-serif"
                              letterSpacing="0.6"
                            >
                              {node.title}
                            </text>
                            <text
                              x={node.cx}
                              y={211}
                              textAnchor="middle"
                              fill="#64748B"
                              fontSize="9.5"
                              fontWeight="500"
                              fontFamily="system-ui, sans-serif"
                            >
                              {node.line1}
                            </text>
                            <text
                              x={node.cx}
                              y={224}
                              textAnchor="middle"
                              fill="#64748B"
                              fontSize="9.5"
                              fontWeight="500"
                              fontFamily="system-ui, sans-serif"
                            >
                              {node.line2}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Mobile Scroll Cue */}
            <div className="sm:hidden text-center mt-0.5">
              <span className="text-[9px] text-slate-400 font-medium">
                ← Swipe to explore all 6 stages →
              </span>
            </div>

            {/* Active Step Interactive Detail Bar (Compact Low-Profile Drawer) */}
            <div className="bg-slate-50/90 rounded-xl p-2 sm:p-2.5 px-3 sm:px-3.5 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-2 mt-2 sm:mt-2.5 shadow-2xs">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center shrink-0 shadow-2xs"
                  style={{
                    backgroundColor: [
                      '#0284C7', '#00BFA5', '#FFA000', '#FF5252', '#8B5CF6', '#EC4899'
                    ][activePathwayStep]
                  }}
                >
                  0{activePathwayStep + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 flex items-center gap-1.5 truncate">
                    <span className="truncate">
                      {[
                        'Step 01: Profile & Transcript Audit',
                        'Step 02: 170+ University Shortlist & Matching',
                        'Step 03: Direct Application & Fast-Track Admissions',
                        'Step 04: Regional Bursaries & Scholarship Grants',
                        'Step 05: 28-Day Funds Audit & Embassy Visa Mock',
                        'Step 06: Pre-Departure Briefing & Airport Arrival'
                      ][activePathwayStep]}
                    </span>
                    <span className="text-[9.5px] font-medium text-slate-400 hidden lg:inline">
                      (Click any node above)
                    </span>
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-600 line-clamp-1 md:line-clamp-none">
                    {[
                      'Comprehensive academic review of your G.C.E. O/L, A/L or diploma transcripts with personalized credit-transfer options and zero evaluation charges.',
                      'Selecting the best-fit programs across accredited UK, Australia, Canada, Europe, and UAE institutions based on tuition fees, location, and post-study work rights.',
                      'Direct university portal submission by official BCAS representatives to ensure expedited offer letters and priority conditional clearances.',
                      'Automatic securing of £1,500 to £8,000 South Asian regional bursaries and international merit scholarships before tuition deposits are paid.',
                      'Rigorous in-house financial vetting, genuine student SOP reviews, and realistic one-on-one embassy interview simulations ensuring a 99% visa grant rate.',
                      'Flight reservations, student hostel bookings, currency exchange guidance, and on-ground campus reception with international student networks.'
                    ][activePathwayStep]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto">
                <a
                  href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20guidance%20on%20Step%200${activePathwayStep + 1}%20for%20my%20university%20application.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10.5px] font-bold border border-emerald-200 transition-colors flex items-center gap-1"
                >
                  <WhatsAppIcon className="w-3 h-3 fill-[#25D366]" />
                  <span>Ask Counselor</span>
                </a>
                <button
                  type="button"
                  onClick={() => navigateTo('apply')}
                  className="px-2.5 py-1 rounded-md bg-[#00239C] hover:bg-[#001869] text-white text-[10.5px] font-bold transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Destinations Section: Creative Layout with Narrow Heading */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <div className="text-center max-w-lg mx-auto mb-4 sm:mb-8 space-y-1 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-0.5 bg-red-50 text-[#BA141A] text-[10px] sm:text-[11px] font-bold rounded-full border border-red-200 shadow-2xs">
            <Globe2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#BA141A]" />
            <span>GLOBAL STUDY CORRIDORS</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Top Study Abroad Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
            Direct admission & credit transfer pathways with verified post-study work rights and tuition savings.
          </p>
        </div>

        {/* Interactive Destination Filter Pills */}
        <div className="flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-2 mb-3 sm:pb-3 sm:mb-6 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          {[
            { id: 'All', label: 'All Destinations', flag: '🌐' },
            { id: 'United Kingdom', label: 'United Kingdom', flag: '🇬🇧' },
            { id: 'Australia', label: 'Australia', flag: '🇦🇺' },
            { id: 'Canada', label: 'Canada', flag: '🇨🇦' },
            { id: 'Sweden', label: 'Sweden', flag: '🇸🇪' },
            { id: 'Finland', label: 'Finland', flag: '🇫🇮' },
            { id: 'Malta', label: 'Malta', flag: '🇲🇹' },
            { id: 'United Arab Emirates', label: 'UAE', flag: '🇦🇪' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveDestinationTab(tab.id)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeDestinationTab === tab.id
                  ? 'bg-[#00239C] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tab.flag}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Creative Destination Cards Grid / Carousel */}
        <div
          ref={destinationsRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 pb-3 sm:pb-4 -mx-4 px-4 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-4 md:mx-0 md:px-0 md:overflow-visible"
        >
          {DESTINATIONS.filter(
            dest => activeDestinationTab === 'All' || dest.name.includes(activeDestinationTab)
          ).map(dest => (
            <div
              key={dest.id}
              onClick={() => navigateTo('destinations', { destination: dest.id })}
              className="w-[72vw] sm:w-[280px] md:w-auto shrink-0 snap-center md:snap-align-none group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden bg-slate-900">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                  
                  {/* Top Flag & Currency Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-slate-900 flex items-center gap-1 sm:gap-1.5 shadow-xs">
                    <span className="text-sm sm:text-base leading-none">{dest.flag}</span>
                    <span>{dest.name}</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs px-1.5 py-0.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono font-bold text-white border border-white/20">
                    {dest.currency}
                  </div>

                  {/* Post-Study Visa Ribbon */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                    <span className="text-[9px] sm:text-[10px] text-blue-200 font-bold uppercase tracking-wider block">
                      Post-Study Work Visa
                    </span>
                    <p className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1 text-white">
                      {dest.postStudyWorkVisa}
                    </p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {dest.tagline}
                  </p>

                  {/* Key Stats Matrix */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-slate-100 text-[10px] sm:text-[11px]">
                    <div className="p-1.5 sm:p-2 bg-slate-50 rounded-lg sm:rounded-xl">
                      <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Avg. Tuition</span>
                      <span className="font-bold text-slate-900 font-mono text-[10px] sm:text-[11px] truncate block">
                        {dest.avgTuitionPerYear.split('–')[0]}
                      </span>
                    </div>
                    <div className="p-1.5 sm:p-2 bg-slate-50 rounded-lg sm:rounded-xl">
                      <span className="text-slate-400 block text-[8px] sm:text-[9px] uppercase font-bold">Part-Time Work</span>
                      <span className="font-bold text-slate-900 text-[10px] sm:text-[11px] truncate block">
                        20 hrs / week
                      </span>
                    </div>
                  </div>

                  {/* Top Cities */}
                  <div className="flex flex-wrap gap-1">
                    {dest.popularCities.slice(0, 3).map((city, idx) => (
                      <span key={idx} className="text-[9px] sm:text-[10px] bg-blue-50/70 text-[#00239C] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded font-medium">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 pt-0 sm:p-4 sm:pt-0">
                <div className="pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#00239C]">
                  <span>Explore Programs & Visas</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}

          {/* Global Card */}
          {activeDestinationTab === 'All' && (
            <div
              onClick={() => navigateTo('destinations')}
              className="w-[72vw] sm:w-[280px] md:w-auto shrink-0 snap-center md:snap-align-none group bg-gradient-to-br from-[#001869] via-[#00239C] to-slate-950 text-white rounded-2xl sm:rounded-3xl border border-blue-800 p-4 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-2 sm:space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/10 text-amber-300 text-[10px] sm:text-xs font-bold border border-white/15">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>GLOBAL PARTNERSHIPS</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  ... And Many More Destinations!
                </h3>
                <p className="text-[11px] sm:text-xs text-blue-100 leading-relaxed font-normal">
                  Looking for other options? BCAS represents over 100 accredited universities with direct credit transfer agreements worldwide.
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-2">
                  {['USA 🇺🇸', 'Ireland 🇮🇪', 'Germany 🇩🇪', 'New Zealand 🇳🇿', 'Global 🌐'].map(c => (
                    <span key={c} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-white/10 text-[10px] sm:text-[11px] text-white border border-white/10 font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-amber-300 relative z-10">
                <span>View Full University Directory</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Swipe Cue Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-1.5 text-slate-400 text-[11px]">
          <span>Swipe horizontally to view all 8 destinations</span>
          <span className="text-[#00239C] font-bold">➔</span>
        </div>
      </section>

      {/* EXCLUSIVE PARTNERSHIP & LANGUAGE SPOTLIGHT: OSSD & IELTS */}
      <section id="ossd-spotlight" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
          {/* Card 1: BCAS International University Placements - OSSD */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#001869] via-[#00239C] to-slate-900 text-white p-4 sm:p-6 lg:p-7 border border-blue-400/30 shadow-xl flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-60 h-60 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-2.5 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-red-500/20 text-red-200 border border-red-400/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span>🇨🇦 CANADIAN HIGH SCHOOL QUALIFICATION</span>
                </span>
                <span className="px-2 py-0.2 sm:py-0.5 rounded-full bg-white/10 text-blue-200 text-[9px] sm:text-[10px] font-semibold">
                  Ontario Ministry of Education
                </span>
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-semibold text-blue-200 block uppercase tracking-wide">
                  BCAS International University Placements
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-white mt-0.5 leading-snug">
                  Ontario Secondary School Diploma (OSSD)
                </h3>
              </div>

              <p className="text-[11px] sm:text-xs text-blue-100 leading-relaxed font-normal">
                Study the world-renowned Canadian High School qualification in Sri Lanka. The OSSD credential grants <strong>direct admission into top universities across Canada (U of Toronto, Waterloo, UBC, McGill)</strong>, UK Russell Group, and Australia without foundation years!
              </p>

              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-white/10 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-blue-100">Enrol with G.C.E. O/L or A/L</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-blue-100">Direct Canada Study Permit</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-blue-100">High-Tier Scholarships</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-blue-100">10-12 Mo Fast-Track</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <button
                onClick={() => navigateTo('apply', { subject: 'Ontario Secondary School Diploma (OSSD)', destination: 'Canada' })}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enquire for OSSD Canada</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <button
                onClick={() => navigateTo('ossd')}
                className="text-[11px] sm:text-xs font-semibold text-blue-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>View OSSD Curriculum</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          {/* Card 2: BCAS IELTS Preparation Academy ("We Do IELTS Also") */}
          <div id="ielts" className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white text-slate-900 p-4 sm:p-6 lg:p-7 border border-slate-200/90 shadow-xl flex flex-col justify-between group scroll-mt-28">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>WE DO IELTS ALSO</span>
                </span>
                <span className="px-2 py-0.2 sm:py-0.5 rounded-full bg-blue-50 text-[#00239C] text-[9px] sm:text-[10px] font-semibold">
                  Official British Council & IDP Support
                </span>
              </div>

              <div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 block uppercase tracking-wide">
                  Official English Language Coaching & Testing Center
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-display text-slate-900 mt-0.5 leading-snug">
                  BCAS IELTS Masterclass & Testing Support
                </h3>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                Aiming for Band 6.5, 7.0, or 7.5+? BCAS certified IELTS examiners and language coaches prepare you with official British Council / IDP rubrics, timed exam mock drills, and full student visa language clearing.
              </p>

              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1.5 sm:pt-2 border-t border-slate-100 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-slate-700">Writing Task 1 & 2 Feedback</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-slate-700">1-on-1 Mock Speaking Drills</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-slate-700">Official Exam Booking</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] sm:text-[11px] text-slate-700">Band 7.0+ Target Prep</span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 sm:pt-4 sm:mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <button
                onClick={() => navigateTo('ielts')}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#00239C] hover:bg-[#001869] text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Study IELTS Preparation</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20register%20for%20the%20IELTS%20preparation%20course%20and%20diagnostic%20test."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[11px] sm:text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                  <span>Free Diagnostic</span>
                </a>
                <a
                  href="tel:+94761415273"
                  className="text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-[#00239C]"
                >
                  +94 76 141 5273
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE BCAS STRENGTHS & ADVANTAGE: Strengths Section (Matching Reference Image) */}
      <section id="why-bcas" className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8 scroll-mt-28">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg p-4 sm:p-6 lg:p-8 relative overflow-hidden">
          
          {/* Subtle Decorative Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3 mb-5 sm:mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-[#00239C] text-[10px] sm:text-[11px] font-bold rounded-full border border-blue-200 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-[#00239C]" />
                <span>THE BCAS STRENGTHS & ADVANTAGE</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-slate-900 mt-1">
                Why Choose Us ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
                Why Students & Parents Choose BCAS Placements · 25+ years in British education & direct partner representation.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-[#00239C] font-semibold">
              <span className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#00239C] shadow-2xs">
                100% Free Service · Zero Agent Fees
              </span>
            </div>
          </div>

          {/* 6 Unique Asymmetric Cutout Cards with Point Outline Animation */}
          <div
            ref={pillarsRef}
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-3.5 pb-2 -mx-3 px-3 scrollbar-none lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 relative z-10"
          >
            {[
              {
                step: '01',
                title: '0% Placement Fees',
                desc: 'University counseling, applications and visa audits are 100% free with zero agent charges.',
                badge: '100% Free',
                icon: HeartHandshake,
                bgColor: '#583D72', // Deep Purple
                accentColor: '#9333EA',
                lightColor: '#F3E8FF',
                glowColor: 'rgba(147, 51, 234, 0.45)'
              },
              {
                step: '02',
                title: 'Credit Transfer (2+1)',
                desc: 'Save Rs. 15M+ living costs with Pearson BTEC HND top-up into Year 3 for an identical UK degree.',
                badge: 'Save 60%',
                icon: BadgePercent,
                bgColor: '#E64A19', // Red-Orange
                accentColor: '#EF4444',
                lightColor: '#FFEDD5',
                glowColor: 'rgba(239, 68, 68, 0.45)'
              },
              {
                step: '03',
                title: '170+ Partner Unis',
                desc: 'Direct representation across UK, Australia, Canada, Europe & UAE with priority admissions.',
                badge: '170+ Unis',
                icon: Globe2,
                bgColor: '#F57C00', // Warm Amber/Orange
                accentColor: '#F97316',
                lightColor: '#FEF3C7',
                glowColor: 'rgba(249, 115, 22, 0.45)'
              },
              {
                step: '04',
                title: 'Direct Bursaries',
                desc: 'Automatic £1,500 – £8,000+ South Asian regional grants & merit reductions before deposit.',
                badge: 'Bursaries',
                icon: Award,
                bgColor: '#D4A017', // Golden Yellow
                accentColor: '#EAB308',
                lightColor: '#FEF9C3',
                glowColor: 'rgba(234, 179, 8, 0.45)'
              },
              {
                step: '05',
                title: 'Visa Audit & Mocks',
                desc: 'In-house 28-day financial audit, genuine student SOP vetting panel & 1-on-1 embassy mock interviews.',
                badge: '99% Visa',
                icon: ShieldCheck,
                bgColor: '#1E40AF', // Royal Blue
                accentColor: '#2563EB',
                lightColor: '#DBEAFE',
                glowColor: 'rgba(37, 99, 235, 0.45)'
              },
              {
                step: '06',
                title: '4 Islandwide Hubs',
                desc: 'Walk-in counseling in Colombo, Kandy, Jaffna & Kalmunai with senior placement advisors.',
                badge: '4 Campuses',
                icon: Building2,
                bgColor: '#0D9488', // Teal
                accentColor: '#0D9488',
                lightColor: '#CCFBF1',
                glowColor: 'rgba(13, 148, 136, 0.45)'
              }
            ].map(pillar => (
              <div
                key={pillar.step}
                className="w-[185px] sm:w-[215px] lg:w-auto shrink-0 snap-start relative rounded-2xl overflow-hidden point-outline-animated group flex flex-col justify-between cursor-pointer"
                style={{
                  backgroundColor: pillar.bgColor,
                  minHeight: '235px',
                  '--point-accent': pillar.accentColor,
                  '--point-glow': pillar.glowColor
                } as React.CSSProperties}
              >
                {/* Top-Right Number (Static, Clean Outline without Animation) */}
                <div className="absolute top-2 right-2.5 sm:top-2.5 sm:right-3 select-none pointer-events-none z-0">
                  <svg width="44" height="32" viewBox="0 0 44 32">
                    <text
                      x="22"
                      y="24"
                      textAnchor="middle"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      fontSize="23"
                      fontWeight="900"
                      fontFamily="system-ui, sans-serif"
                      letterSpacing="1"
                      opacity="0.92"
                    >
                      {pillar.step}
                    </text>
                  </svg>
                </div>

                {/* White Front Card SVG Scoop Cutout Background */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-xs"
                  viewBox="0 0 200 240"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M 0 14 C 0 6 6 0 14 0 L 118 0 C 130 0 138 8 138 20 L 138 32 C 138 44 146 52 158 52 L 186 52 C 194 52 200 58 200 66 L 200 226 C 200 234 194 240 186 240 L 14 240 C 6 240 0 234 0 226 L 0 14 Z"
                    fill="#FFFFFF"
                  />
                </svg>

                {/* Animated Outline Runner around the Scoop Border */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                  viewBox="0 0 200 240"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M 0 14 C 0 6 6 0 14 0 L 118 0 C 130 0 138 8 138 20 L 138 32 C 138 44 146 52 158 52 L 186 52 C 194 52 200 58 200 66 L 200 226 C 200 234 194 240 186 240 L 14 240 C 6 240 0 234 0 226 L 0 14 Z"
                    stroke={pillar.accentColor}
                    strokeWidth="3"
                    strokeDasharray="16 10"
                    className="point-outline-svg-runner opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </svg>

                {/* Card Content Layer Inside the White Cutout */}
                <div className="relative z-10 p-3 sm:p-3.5 flex flex-col justify-between h-full pointer-events-auto">
                  <div>
                    {/* Top Left Icon with outline ring */}
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shadow-2xs ring-2 ring-offset-1"
                      style={{
                        color: pillar.accentColor,
                        backgroundColor: pillar.lightColor
                      }}
                    >
                      <pillar.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold font-display text-[12px] sm:text-[13px] text-slate-900 leading-tight mt-2.5 group-hover:text-[#00239C] transition-colors">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[10px] sm:text-[10.5px] text-slate-600 leading-snug mt-1.5 line-clamp-3 font-normal">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Bottom Tag */}
                  <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <span
                      className="text-[8.5px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider transition-transform group-hover:scale-105"
                      style={{ color: pillar.accentColor, backgroundColor: pillar.lightColor }}
                    >
                      {pillar.badge}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#00239C] transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ENQUIRY FORM: Small, Compact Pre-Assessment Card */}
      <section id="enquiry" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <div className="bg-gradient-to-br from-[#00239C] via-[#001c7d] to-slate-900 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 shadow-lg border border-blue-800 transition-all duration-300 hover:border-blue-700">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 items-center">
            {/* Left Column: Briefing */}
            <div className="lg:col-span-5 space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-amber-300 text-[9px] sm:text-[10px] font-bold border border-white/15">
                <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                <span>FREE UNIVERSITY PRE-ASSESSMENT</span>
              </div>
              <h3 className="text-base sm:text-xl font-bold font-display text-white tracking-tight">
                Quick Admissions Enquiry
              </h3>
              <p className="text-[10px] sm:text-xs text-blue-100/90 leading-relaxed max-w-md">
                Fast eligibility assessment, direct university links, and scholarship quotes within 2 business hours.
              </p>

              <div className="pt-1 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                <a
                  href="tel:+94761415273"
                  className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-[9px] sm:text-[10px] transition-all duration-150 active:scale-95"
                  title="Direct call to BCAS Admissions Hotline"
                >
                  <PhoneCall className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Call: +94 76 141 5273</span>
                </a>
                <span className="text-[9px] sm:text-[10px] text-blue-200">100% Free · Zero Agent Fees</span>
              </div>
            </div>

            {/* Right Column: Small Compact Form */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-2.5 sm:p-3.5 lg:p-4 rounded-lg sm:rounded-xl border border-white/10 transition-all">
              {quickEnquirySubmitted ? (
                <div className="p-3 bg-emerald-900/40 border border-emerald-500/60 rounded-lg space-y-1.5 text-center animate-scale-in">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 mx-auto" />
                  <h4 className="text-xs sm:text-sm font-bold text-white">Enquiry Received!</h4>
                  <p className="text-[10px] sm:text-xs text-emerald-200">
                    A BCAS Senior Placements Officer will contact you on <strong>{quickEnquiry.phone}</strong> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickEnquirySubmitted(false);
                      setQuickEnquiry({ name: '', phone: '', destination: 'United Kingdom', campus: 'Colombo Campus', subject: 'Computing & IT' });
                    }}
                    className="text-[10px] sm:text-[11px] text-emerald-300 underline hover:text-white pt-0.5 block mx-auto cursor-pointer"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickEnquirySubmit} className="space-y-1.5 sm:space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    <div>
                      <label className="text-[9px] sm:text-[10px] font-semibold text-blue-200 block mb-0.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quickEnquiry.name}
                        onChange={e => setQuickEnquiry({ ...quickEnquiry, name: e.target.value })}
                        placeholder="e.g. Kasun Bandara"
                        className="w-full px-2 py-1 sm:px-2.5 sm:py-1.5 bg-slate-900/80 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] sm:text-[10px] font-semibold text-blue-200 block mb-0.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={quickEnquiry.phone}
                        onChange={e => setQuickEnquiry({ ...quickEnquiry, phone: e.target.value })}
                        placeholder="e.g. +94 77 123 4567"
                        className="w-full px-2 py-1 sm:px-2.5 sm:py-1.5 bg-slate-900/80 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2">
                    <div>
                      <label className="text-[9px] sm:text-[10px] font-semibold text-blue-200 block mb-0.5">
                        Destination
                      </label>
                      <select
                        value={quickEnquiry.destination}
                        onChange={e => setQuickEnquiry({ ...quickEnquiry, destination: e.target.value })}
                        className="w-full px-1.5 py-1 sm:px-2 sm:py-1.5 bg-slate-900/80 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="United Kingdom">United Kingdom 🇬🇧</option>
                        <option value="Australia">Australia 🇦🇺</option>
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="Sweden">Sweden 🇸🇪</option>
                        <option value="Finland">Finland 🇫🇮</option>
                        <option value="Malta">Malta 🇲🇹</option>
                        <option value="United Arab Emirates">UAE / Dubai 🇦🇪</option>
                        <option value="Other / Multiple">Other Hubs 🌐</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] sm:text-[10px] font-semibold text-blue-200 block mb-0.5">
                        Discipline
                      </label>
                      <select
                        value={quickEnquiry.subject}
                        onChange={e => setQuickEnquiry({ ...quickEnquiry, subject: e.target.value })}
                        className="w-full px-1.5 py-1 sm:px-2 sm:py-1.5 bg-slate-900/80 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Computing & IT">Computing & IT</option>
                        <option value="Business & Management">Business</option>
                        <option value="Engineering & Built Env.">Engineering</option>
                        <option value="Health & Applied Science">Biomedical</option>
                        <option value="Hospitality & Tourism">Hospitality</option>
                        <option value="Law & Legal Studies">Law (LLB)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[9px] sm:text-[10px] font-semibold text-blue-200 block mb-0.5">
                        Nearest Campus
                      </label>
                      <select
                        value={quickEnquiry.campus}
                        onChange={e => setQuickEnquiry({ ...quickEnquiry, campus: e.target.value })}
                        className="w-full px-1.5 py-1 sm:px-2 sm:py-1.5 bg-slate-900/80 border border-slate-700 rounded-md sm:rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Colombo Campus">Colombo Campus</option>
                        <option value="Kandy Campus">Kandy Campus</option>
                        <option value="Jaffna Campus">Jaffna Campus</option>
                        <option value="Kalmunai Campus">Kalmunai Campus</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] text-blue-300/80">
                      🔒 No spam. Data protected.
                    </span>
                    <button
                      type="submit"
                      disabled={quickEnquiryLoading}
                      className="px-3 py-1 sm:px-4 sm:py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-md sm:rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-1 shadow-xs cursor-pointer disabled:opacity-60"
                    >
                      <span>{quickEnquiryLoading ? 'Submitting...' : 'Submit Free Enquiry'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & Student Success Stories Section: Creative High-End Design with Videos & Narrow Heading */}
      <section id="testimonials" className="bg-gradient-to-b from-slate-50 via-white to-blue-50/40 py-5 sm:py-7 lg:py-9 border-y border-slate-200/80 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
          
          {/* Narrow Editorial Heading */}
          <div className="text-center max-w-lg mx-auto space-y-1 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-0.5 bg-blue-50 text-[#00239C] text-[10px] sm:text-[11px] font-bold rounded-full border border-blue-200 shadow-2xs">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
              <span>STUDENT JOURNEYS & MILESTONES</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight">
              Student Journeys & Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-normal">
              Alumni who progressed from BCAS regional campuses in Colombo, Jaffna, Kalmunai, and Kandy to world-ranked universities.
            </p>
          </div>

          {/* Student Testimonial Videos Showcase */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-200/80 pb-2 sm:pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 sm:p-1.5 bg-red-100 text-red-600 rounded-lg">
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-600" />
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Student Video Stories</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    Watch BCAS graduates share their overseas campus and career journey. Click any video to play instantly.
                  </p>
                </div>
              </div>

              {/* Slider Controls - Visible on desktop and mobile for smooth 4-by-4 pagination */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => scrollCarousel(videoTestimonialsRef, 'left', 1120)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:text-[#00239C] hover:shadow-xs cursor-pointer active:scale-95 transition-all"
                  aria-label="Previous 4 videos"
                  title="Previous 4 videos"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 px-1.5 font-mono">
                  4 by 4 View
                </span>
                <button
                  type="button"
                  onClick={() => scrollCarousel(videoTestimonialsRef, 'right', 1120)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:text-[#00239C] hover:shadow-xs cursor-pointer active:scale-95 transition-all"
                  aria-label="Next 4 videos"
                  title="Next 4 videos"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Cards Horizontal Rail - 4 by 4 strictly in ONE line (VIDEO ONLY, NO NEED TEXT) */}
            <div
              ref={videoTestimonialsRef}
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-2.5 sm:gap-3.5 pb-2 -mx-4 px-4 scrollbar-none md:mx-0 md:px-0 scroll-smooth"
            >
              {TESTIMONIAL_VIDEOS.map(video => {
                const effectiveId = getCleanYoutubeId(customYoutubeMap[video.id] || video.youtubeId);
                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setActiveVideoModal(video);
                    }}
                    className="w-[66vw] sm:w-[240px] lg:w-[calc(25%-12px)] shrink-0 snap-start bg-slate-950 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-red-500 transition-all duration-300 cursor-pointer group relative overflow-hidden aspect-[16/10] sm:aspect-[16/9.5]"
                    title="Click to watch student video story"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${effectiveId}/hqdefault.jpg`}
                      alt={video.studentName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = video.thumbnail || `https://i.ytimg.com/vi/${effectiveId}/hqdefault.jpg`;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-black/30" />

                    {/* Top Destination Badge (no duration mentioned) */}
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-white border border-white/20 flex items-center gap-1">
                        <span>{video.flag}</span>
                        <span className="truncate max-w-[120px]">{video.destination}</span>
                      </span>
                    </div>

                    {/* Center Play Button with ripple effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#BA141A]/95 text-white flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-red-600 transition-all duration-300 ring-2 sm:ring-4 ring-white/30">
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom subtle bar */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white/90 drop-shadow-sm pointer-events-none">
                      <span className="truncate text-blue-200 text-[10px] font-medium">{video.currentUniversity}</span>
                      <span className="text-red-400 font-bold shrink-0 flex items-center gap-0.5 text-[9px] sm:text-[10px]">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Watch</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Written Reviews Section: Small, Compact Cards */}
          <div
            className="pt-3 sm:pt-4 border-t border-slate-200/80 space-y-2.5 sm:space-y-3"
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-display">
                  Student Journeys & Milestones
                </h3>
              </div>

              {/* 5-in-One-Line Navigation Controls */}
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200/80 self-start sm:self-auto text-xs">
                <button
                  type="button"
                  onClick={() => setIsTestimonialAutoPlay(prev => !prev)}
                  className="px-1.5 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-semibold flex items-center gap-1 border border-slate-200 transition-colors cursor-pointer"
                  title={isTestimonialAutoPlay ? 'Pause' : 'Play'}
                >
                  {isTestimonialAutoPlay ? <Pause className="w-2.5 h-2.5 text-[#00239C]" /> : <Play className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600" />}
                  <span className="hidden sm:inline text-[10px] text-slate-600">{isTestimonialAutoPlay ? 'Auto' : 'Paused'}</span>
                </button>

                <div className="flex items-center gap-1 px-1">
                  {Array.from({ length: totalTestimonialPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setWrittenTestimonialPage(idx)}
                      aria-label={`Go to page ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        writtenTestimonialPage === idx
                          ? 'w-4 bg-[#00239C]'
                          : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handlePrevTestimonials}
                    className="w-5 h-5 rounded bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-900 cursor-pointer border border-slate-200 active:scale-95 transition-all"
                    aria-label="Previous testimonials"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextTestimonials}
                    className="w-5 h-5 rounded bg-white shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-900 cursor-pointer border border-slate-200 active:scale-95 transition-all"
                    aria-label="Next testimonials"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonial Cards: 5 In One Line */}
            <div
              key={writtenTestimonialPage}
              className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-none lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 gap-2.5 sm:gap-3 animate-in fade-in slide-in-from-right-4 duration-300 fill-mode-both"
            >
              {SUCCESS_STORIES.slice(
                writtenTestimonialPage * TESTIMONIALS_PER_PAGE,
                writtenTestimonialPage * TESTIMONIALS_PER_PAGE + TESTIMONIALS_PER_PAGE
              ).map(story => (
                <div
                  key={story.id}
                  className="w-[230px] sm:w-[250px] lg:w-auto shrink-0 snap-start bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-md transition-all p-2.5 sm:p-3 flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#00239C] bg-blue-50 px-1.5 py-0.2 rounded truncate max-w-[110px]">
                        {story.destination}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 italic line-clamp-2 leading-relaxed">
                      &ldquo;{story.storyQuote}&rdquo;
                    </p>

                    <div className="text-[10px] text-slate-500 font-medium truncate">
                      ➔ {story.currentUniversity}
                    </div>
                  </div>

                  <div className="pt-2 mt-1.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
                    <div className="flex items-center gap-1.5 truncate">
                      <img
                        src={story.image}
                        alt={story.studentName}
                        className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover ring-1 ring-blue-100 shrink-0"
                        onError={e => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="truncate">
                        <span className="text-[10.5px] font-bold text-slate-900 block truncate leading-tight">
                          {story.studentName}
                        </span>
                        <span className="text-[8.5px] text-slate-400 block truncate">
                          {story.fromCampus}
                        </span>
                      </div>
                    </div>

                    <span className="text-[8.5px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded shrink-0">
                      {story.currentRole.split(' at ')[0] || 'Alumni'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>





      {/* Campus Visit & WhatsApp Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#00239C] to-[#001869] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
          <div className="space-y-1.5 sm:space-y-3 text-center md:text-left">
            <span className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-wider">
              REAL COUNSELORS · IN-PERSON OR ONLINE
            </span>
            <h2 className="text-xl sm:text-3xl font-bold font-display text-white">
              Ready to take your next step?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg">
              Visit any of our 4 campuses in Colombo, Jaffna, Kalmunai, or Kandy (Admissions Desk: Monday – Sunday: 08:00 AM – 06:00 PM), or call directly at <a href="tel:+94761415273" className="underline font-bold text-white">+94 76 141 5273</a>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+94761415273"
              className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Call Us: +94 76 141 5273</span>
            </a>
            <a
              href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20book%20a%20campus%20counseling%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              <span>WhatsApp Advisor</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Campuses</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIAL VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Top Header Bar */}
            <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{activeVideoModal.flag}</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight flex items-center gap-2">
                    <span>{activeVideoModal.studentName}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      Verified Alumni
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {activeVideoModal.fromCampus} ➔ {activeVideoModal.currentUniversity}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Real YouTube Embed Player Container (16:9 Aspect) */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${getCleanYoutubeId(customYoutubeMap[activeVideoModal.id] || activeVideoModal.youtubeId)}?autoplay=1&rel=0&modestbranding=1`}
                title={`${activeVideoModal.studentName} - Study Abroad Story`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
