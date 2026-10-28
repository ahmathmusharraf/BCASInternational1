import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
  MapPin,
  Sparkles,
  Clock,
  Globe2,
  HelpCircle,
  Building2,
  ShieldCheck,
  Layers,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Check,
  Calculator,
  Compass,
  Briefcase,
  Cpu,
  Microscope,
  MessageCircle
} from 'lucide-react';

interface ModuleItem {
  code: string;
  name: string;
  grade: string;
  hours: string;
  summary: string;
  stream: string;
}

const COMPULSORY_MODULES: ModuleItem[] = [
  {
    code: 'ENG3U',
    name: 'Year 11 English (University Preparation)',
    grade: 'Grade 11 / Year 11',
    hours: '110 Hours',
    stream: 'All Streams',
    summary: 'Focuses on critical literacy, academic essay argumentation, oral communication, and analytical text interpretations essential for university success.'
  },
  {
    code: 'ENG4U',
    name: 'Year 12 English (University Preparation)',
    grade: 'Grade 12 / Year 12',
    hours: '110 Hours',
    stream: 'All Streams',
    summary: 'The prerequisite for almost every university program globally. Emphasizes advanced literary analysis, rigorous academic research papers, and media literacy.'
  },
  {
    code: 'MHF4U',
    name: 'Advanced Functions (University Preparation)',
    grade: 'Grade 12 / Year 12',
    hours: '110 Hours',
    stream: 'All Streams',
    summary: 'Extends knowledge of polynomial, rational, logarithmic, and trigonometric functions; essential foundation for engineering, computer science, and business.'
  },
  {
    code: 'MCV4U',
    name: 'Calculus and Vectors (University Preparation)',
    grade: 'Grade 12 / Year 12',
    hours: '110 Hours',
    stream: 'All Streams',
    summary: 'Develops understanding of rates of change, derivative rules, optimization, and geometric vectors. Mandatory for STEM, quantitative finance, and computing.'
  }
];

const STREAM_MODULES: Record<string, { title: string; icon: React.ComponentType<{ className?: string }>; description: string; modules: ModuleItem[] }> = {
  science: {
    title: 'Science Stream',
    icon: Microscope,
    description: 'Designed for medicine, biomedical science, biotechnology, pharmacy, and environmental science degrees.',
    modules: [
      {
        code: 'SBI4U',
        name: 'Biology (Grade 12)',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'Science',
        summary: 'In-depth exploration of biochemistry, metabolic processes, molecular genetics, homeostasis, and population dynamics.'
      },
      {
        code: 'SCH4U',
        name: 'Chemistry (Grade 12)',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'Science',
        summary: 'Organic chemistry, atomic structure, chemical equilibria, thermochemistry, and electrochemistry aligned with university lab standards.'
      },
      {
        code: 'SPH4U',
        name: 'Physics (Grade 12)',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'Science',
        summary: 'Principles of dynamics, energy transformations, gravitational & electromagnetic fields, light waves, and modern quantum physics.'
      }
    ]
  },
  business: {
    title: 'Business Stream',
    icon: Briefcase,
    description: 'Ideal for Commerce, Accounting, International Finance, Marketing, Economics, and Management degrees worldwide.',
    modules: [
      {
        code: 'BBB4M',
        name: 'International Business Fundamentals',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'Business',
        summary: 'Explores global trade agreements, multinational enterprise operations, foreign direct investment, and international marketing dynamics.'
      },
      {
        code: 'BOH4M',
        name: 'Business Leadership: Management Fundamentals',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'Business',
        summary: 'Focuses on leadership theories, organizational structures, strategic human resource management, and ethical corporate decision-making.'
      },
      {
        code: 'CIA4U',
        name: 'Analyzing Current Economic Issues',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'Business',
        summary: 'Investigates microeconomic market forces, macro monetary policies, inflation, fiscal stability, and contemporary world financial systems.'
      }
    ]
  },
  it_engineering: {
    title: 'IT & Engineering Stream',
    icon: Cpu,
    description: 'Direct entry into Software Engineering, Computer Science, AI, Mechanical, Civil, and Electrical Engineering programs.',
    modules: [
      {
        code: 'MDM4U',
        name: 'Mathematics for Data Management',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'IT/Engineering',
        summary: 'Combinatorics, probability distributions, statistical matrices, regression analysis, and modern computational data handling.'
      },
      {
        code: 'SCH4U',
        name: 'Chemistry (Grade 12)',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'IT/Engineering',
        summary: 'Essential chemistry concepts required for materials engineering, biomedical computing, and chemical engineering programs.'
      },
      {
        code: 'SPH4U',
        name: 'Physics (Grade 12)',
        grade: 'Grade 12',
        hours: '110 Hours',
        stream: 'IT/Engineering',
        summary: 'Classical mechanics, Newtonian dynamics, electromagnetic induction, circuits, and wave mechanics foundational for all engineering degrees.'
      }
    ]
  }
};

const STUDENT_TESTIMONIALS = [
  {
    quote: 'I chose OSSD because it gives me a globally recognized qualification and opens the door to universities around the world.',
    name: 'Duvaraksha Kangeyan',
    status: 'OSSD — Undergraduate',
    destination: 'Canada Bound'
  },
  {
    quote: 'OSSD was the right choice for me because it offers flexibility while preparing me for my future university studies.',
    name: 'Wadha Arulthas',
    status: 'OSSD — Undergraduate',
    destination: 'Direct Degree Entry'
  },
  {
    quote: 'I chose OSSD because the subjects and learning approach are closely connected to my future career goals.',
    name: 'Surendrajith Abijith',
    status: 'OSSD — Undergraduate',
    destination: 'Tech & Engineering'
  },
  {
    quote: 'Studying OSSD has given me the confidence, knowledge, and academic foundation to take the next step toward my future.',
    name: 'Sivaneshan Nirushan',
    status: 'OSSD — Undergraduate',
    destination: 'Global University'
  }
];

export const OSSDPage: React.FC = () => {
  const { navigateTo, setPrefilledEnquiry, showToast } = useApp();
  const [activeStream, setActiveStream] = useState<'science' | 'business' | 'it_engineering'>('science');
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(COMPULSORY_MODULES[0]);

  const handleApplyClick = () => {
    setPrefilledEnquiry({
      subject: 'Ontario Secondary School Diploma (OSSD) - Canadian High School',
      destination: 'Canada',
      level: 'Foundation / High School Diploma',
      university: 'Cambridge International Academy (CIA)'
    });
    navigateTo('apply');
    showToast('Redirected to OSSD fast-track application enquiry form.', 'info');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Banner / Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1536] via-[#00239C] to-[#BA141A] text-white pt-10 pb-16 md:pt-14 md:pb-20">
        {/* Subtle decorative mesh */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb & Institutional tag */}
          <div className="flex flex-wrap items-center gap-2 text-xs mb-4 text-blue-200">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
            <button
              onClick={() => navigateTo('courses')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Academic Pathways
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-white font-medium">OSSD Canadian High School</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span>🇨🇦 ONTARIO SECONDARY SCHOOL DIPLOMA</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-blue-100 text-xs font-semibold border border-white/20">
                  Cambridge International Academy (CIA) × BCAS
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-300/30">
                  ★ Fully Regulated Public Qualification
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
                After O/Levels, Join the One True <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-white to-amber-200">Global Qualification</span>
              </h1>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
                Study the world-renowned <strong>Ontario Secondary School Diploma (OSSD)</strong> delivered in Sri Lanka through <strong>Cambridge International Academy (CIA)</strong>. Earn a direct pathway to top Canadian, UK, Australian, and European universities without spending an extra year on local foundation courses!
              </p>

              {/* 4 Core Pillars Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Direct Admission</div>
                  <div className="text-xs font-bold text-white mt-0.5">Top Global Unis</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Fast-Track</div>
                  <div className="text-xs font-bold text-white mt-0.5">7 Total Modules</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Cost Effective</div>
                  <div className="text-xs font-bold text-white mt-0.5">Affordable in SL</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Entry Criteria</div>
                  <div className="text-xs font-bold text-white mt-0.5">After or Pending O/L</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={handleApplyClick}
                  className="px-5 py-3 rounded-xl bg-[#BA141A] hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-900/40 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for OSSD Intake</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:0761415273"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call CIA: 076 141 5273</span>
                </a>
              </div>
            </div>

            {/* Right Column: Pathway Banner Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-2xl border border-white/40">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-red-100 text-[#BA141A] flex items-center justify-center font-bold text-sm">
                      🍁
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fast Progression</h4>
                      <p className="text-[11px] text-slate-500">From School to Degree</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    Recognized Worldwide
                  </span>
                </div>

                {/* 3 Step Visual Progression */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">After or Pending O/L&apos;s</div>
                      <div className="text-[11px] text-slate-500">Local or Cambridge/Edexcel O/Levels</div>
                    </div>
                  </div>

                  <div className="ml-3.5 pl-4 border-l-2 border-dashed border-red-300 py-1">
                    <div className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">
                      ➔ Direct Admission to OSSD Sri Lanka
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">OSSD Qualification (CIA Colombo)</div>
                      <div className="text-[11px] text-slate-500">Complete 7 Modules (4 Compulsory + 3 Stream)</div>
                    </div>
                  </div>

                  <div className="ml-3.5 pl-4 border-l-2 border-dashed border-blue-300 py-1">
                    <div className="text-[10px] font-semibold text-[#00239C] uppercase tracking-wider">
                      ➔ Direct Canadian High School Diploma
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">1st Year of Global University</div>
                      <div className="text-[11px] text-slate-500">Canada, UK, Australia, Europe & USA</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    356, Galle Rd, Colombo 03
                  </span>
                  <a
                    href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20am%20interested%20in%20the%20Canadian%20OSSD%20(Ontario%20Secondary%20School%20Diploma)%20program."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp: 076 141 5273
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PROGRAM STRUCTURE & MODULES (Page 2 of leaflet) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#BA141A] text-xs font-bold rounded-full border border-red-200">
            <Layers className="w-3.5 h-3.5 text-[#BA141A]" />
            <span>CANADIAN CURRICULUM ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            Program Structure &amp; Graduation Requirements
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To complete the qualification, student must study and pass at least <strong>seven (7)* modules</strong> which includes four (4) compulsory modules and three (3) recommended modules in your chosen stream.
          </p>
          <div className="text-[11px] text-slate-500 italic">
            *Subjects might increase and vary depending on the University selection and the subjects completed during schooling.
          </div>
        </div>

        {/* 4 Compulsory Modules Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#BA141A] text-white flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Compulsory Modules (Universal Foundation)
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Mandatory for all 4 academic streams
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPULSORY_MODULES.map((m) => (
              <div
                key={m.code}
                onClick={() => setSelectedModule(m)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedModule?.code === m.code
                    ? 'bg-blue-50/70 border-[#00239C] shadow-md ring-2 ring-[#00239C]/20'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-[#00239C] font-mono font-bold text-xs">
                      {m.code}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{m.hours}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">
                    {m.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {m.summary}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{m.grade}</span>
                  <span className="font-semibold text-[#00239C] hover:underline flex items-center gap-0.5">
                    Details <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stream Selector & 3 Recommended Modules */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#00239C] text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Recommended Stream Modules (Select Your Career Pathway)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose 3 specialized subjects tailored for your targeted university major.
              </p>
            </div>

            {/* Stream Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
              {(['science', 'business', 'it_engineering'] as const).map((key) => {
                const stream = STREAM_MODULES[key];
                const Icon = stream.icon;
                const isActive = activeStream === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveStream(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#00239C] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{stream.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stream Info Header */}
          <div className="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <Compass className="w-5 h-5 text-[#BA141A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Targeted Progression: {STREAM_MODULES[activeStream].title}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {STREAM_MODULES[activeStream].description}
              </p>
            </div>
          </div>

          {/* Stream Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STREAM_MODULES[activeStream].modules.map((m) => (
              <div
                key={m.code}
                onClick={() => setSelectedModule(m)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedModule?.code === m.code
                    ? 'bg-red-50/70 border-red-400 shadow-md ring-2 ring-red-400/20'
                    : 'bg-white border-slate-200 hover:border-red-200 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-red-100 text-[#BA141A] font-mono font-bold text-xs">
                      {m.code}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">{m.hours}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1.5">
                    {m.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {m.summary}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{m.grade}</span>
                  <span className="font-semibold text-[#BA141A] hover:underline flex items-center gap-0.5">
                    Explore Syllabus <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Module Deep Dive Drawer/Box */}
          {selectedModule && (
            <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-xs">
                    {selectedModule.code}
                  </span>
                  <span className="text-xs font-semibold text-blue-200">{selectedModule.name}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedModule.summary}
                </p>
              </div>
              <button
                onClick={handleApplyClick}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Enrol in this Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: WHY STUDY OSSD AT CAMBRIDGE INTERNATIONAL ACADEMY (CIA)? (Page 3 of leaflet) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#00239C] text-xs font-bold rounded-full border border-blue-200">
              <Award className="w-3.5 h-3.5 text-[#00239C]" />
              <span>THE BCAS × CIA ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Why Study OSSD at Cambridge International Academy?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Four verified institutional advantages directly extracted from the official program handbook.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Advantage 1 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00239C] flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Direct Admission to Any Global University
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students with the Ontario Secondary School Diploma are guaranteed direct entry to all the universities in Canada (Toronto, Waterloo, UBC, McGill) and other destinations without any prerequisite foundation years.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <Check className="w-3.5 h-3.5" />
                <span>100% Recognized Globally</span>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BA141A] flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Affordable Program Cost
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When compared with the other transnational university pathway programs available in Sri Lanka, the tuition cost is comparatively low, affordable, and paired with flexible local installment options.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#BA141A]">
                <Check className="w-3.5 h-3.5" />
                <span>Save Up To 60% vs Studying Abroad</span>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Experienced Academic Staff
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CIA constitutes a panel of professional and experienced academic lecturers with real-world practical experience tasked to deliver the program aligned with Ontario regulatory and quality standards.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                <Check className="w-3.5 h-3.5" />
                <span>Certified Ontario Educators</span>
              </div>
            </div>

            {/* Advantage 4 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Dedicated Student Support
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CIA academic and non-academic staff provides personalized attention and continues to support our students for academic development, university visa profiling, and career guidance.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                <span>1-on-1 Mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INSTITUTIONAL BACKGROUND & ABOUT CIA (Page 4 of leaflet) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1536] to-[#00239C] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-blue-200 border border-white/20">
                <Building2 className="w-3.5 h-3.5 text-blue-300" />
                <span>ABOUT CAMBRIDGE INTERNATIONAL ACADEMY (CIA)</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Committed to Delivering the Highest Standard of Transnational Higher Education
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                The Cambridge International Academy (CIA) commenced its journey with the primary objective of facilitating pathways in education to students in fields essential in today&apos;s global corporate environment.
              </p>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                In fulfilling this objective, Cambridge International Academy has partnered with internationally recognized academic institutions including a <strong>leading mainstream secondary school in Canada</strong>, enabling both local and international students to explore diverse areas of study supported by a robust international network and academic framework that ensures success.
              </p>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Today, Cambridge International Academy offers a wide range of much-needed educational qualifications in Sri Lanka&apos;s private tertiary education sector, partnering directly with BCAS International University Placements to guarantee seamless overseas transfer.
              </p>

              {/* Location & Contact Bar */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 text-blue-200">
                  <MapPin className="w-4 h-4 text-red-400" />
                  <span>356, Galle Road, Colombo 03, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>076 141 5273</span>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Admission Checklist */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>OSSD Enrolment Checklist</span>
              </h3>

              <ul className="space-y-2.5 text-xs text-blue-100">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Eligibility:</strong> Students with completed or pending Sri Lankan / Cambridge / Edexcel O/Levels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Duration:</strong> 10 to 12 months full-time / hybrid accelerated format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Delivery Campus:</strong> CIA Colombo 03 Campus with interactive digital learning suites.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Placement:</strong> Official BCAS visa processing, University of Toronto, Waterloo, UBC & UK applications.</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-white/15">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Free Academic Counseling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: STUDENT VOICES & TESTIMONIALS (Page 5 of leaflet) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#BA141A] text-xs font-bold rounded-full border border-red-200">
            <Sparkles className="w-3.5 h-3.5 text-[#BA141A]" />
            <span>ALUMNI PERSPECTIVES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            What Our Students Say About OSSD
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real feedback from CIA OSSD undergraduates on their path to global university degrees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STUDENT_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <span className="text-3xl font-serif text-red-400 leading-none block">“</span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900">{t.name}</div>
                <div className="text-[11px] text-[#00239C] font-semibold">{t.status}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.destination}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: DOWNLOAD LEAFLET & EMBEDDED CTA FOOTER */}
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            <span>OFFICIAL LEAFLET &amp; ENROLMENT RESOURCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display">
            Ready to Begin Your Canadian High School Journey?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Consult directly with our senior admission counselors in Colombo or submit your application online.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleApplyClick}
              className="px-6 py-3 rounded-xl bg-[#BA141A] hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Submit OSSD Online Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20am%20interested%20in%20enrolling%20in%20the%20Canadian%20OSSD%20program."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: 076 141 5273</span>
            </a>
          </div>

          <div className="pt-6 text-slate-400 text-[11px]">
            Cambridge International Academy (CIA) · 356, Galle Road, Colombo 03, Sri Lanka · In Partnership with BCAS International University Placements
          </div>
        </div>
      </section>
    </div>
  );
};
