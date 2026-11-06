import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  Phone,
  MapPin,
  Sparkles,
  Clock,
  Globe2,
  HelpCircle,
  Building2,
  ShieldCheck,
  Layers,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Check,
  Calculator,
  Compass,
  Briefcase,
  Cpu,
  Microscope,
  MessageCircle,
  Laptop,
  HeartHandshake,
  FileCheck2
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

const ENROLLMENT_STEPS = [
  {
    step: '01',
    title: 'Submit an Enquiry',
    description:
      'Complete our online enquiry form or contact a BCAS counselor in Colombo, Kandy, Jaffna, or Kalmunai to express your interest in the OSSD pathway.'
  },
  {
    step: '02',
    title: 'Academic Qualification Assessment',
    description:
      'Our academic advisors review your completed or pending Sri Lankan, Cambridge, or Edexcel O/Level results and guide you on the best university stream.'
  },
  {
    step: '03',
    title: 'Credit Evaluation',
    description:
      'Your previous high school transcripts are formally evaluated through CIA and Canadian Cross International School (CCIS) to award prior credit equivalencies.'
  },
  {
    step: '04',
    title: 'Complete Registration',
    description:
      'Confirm your chosen stream modules, submit required identification and academic documents, and finalize your official OSSD enrolment.'
  },
  {
    step: '05',
    title: 'Begin Your OSSD Journey',
    description:
      'Gain access to flexible learning with Ontario-certified Canadian teachers, complete your modules and 40 community hours, and prepare for direct university entry.'
  }
];

const GRADUATION_REQUIREMENTS = [
  {
    badge: '30 Credits Total',
    title: 'Credit Evaluation + 7 Core & Stream Modules',
    description:
      'Students earn the 30-credit Ontario Secondary School Diploma by receiving credit recognition for prior secondary studies alongside 4 compulsory modules and 3 stream modules.'
  },
  {
    badge: '40 Hours Mandatory',
    title: 'Community Involvement Hours',
    description:
      'Completion of 40 hours of approved community service or volunteer activities—such as school initiatives, charity drives, tutoring, or social projects—guided by our advisors.'
  },
  {
    badge: 'Ontario Literacy',
    title: 'Secondary School Literacy Requirement',
    description:
      'Fulfilled by successfully completing the Ontario Secondary School Literacy Test (OSSLT) or the accredited Ontario Secondary School Literacy Course (OLC4O).'
  },
  {
    badge: '70% / 30% Model',
    title: 'Continuous Coursework Assessment',
    description:
      'Evaluated through 70% ongoing assignments, projects, and lab work plus 30% final evaluation—eliminating reliance on a single high-stakes exam.'
  }
];

const OSSD_FAQS = [
  {
    id: 'ossd-overview',
    question: 'What is the Canadian OSSD and how do CIA and CCIS deliver it?',
    answer:
      'The Ontario Secondary School Diploma (OSSD) is the official high school graduation qualification of the Province of Ontario, Canada. Through the partnership between Cambridge International Academy (CIA), Canadian Cross International School (CCIS) in Ontario, Canada, and BCAS International University Placements, Sri Lankan students can earn this globally recognized qualification after or pending O/Levels without completing a separate foundation year.'
  },
  {
    id: 'ossd-canadian-teachers',
    question: 'Who teaches and evaluates OSSD students?',
    answer:
      'Courses are taught and assessed by qualified Canadian teachers (Ontario-certified educators) through Canadian Cross International School (CCIS) and CIA, supported locally by BCAS academic mentors. All coursework and grades follow Ontario Ministry of Education standards.'
  },
  {
    id: 'ossd-flexible-learning',
    question: 'How does flexible learning work for Sri Lankan students?',
    answer:
      'The OSSD features a flexible online and hybrid learning structure designed around continuous assessment (70% coursework and 30% final evaluation). Students receive structured digital learning materials, live teacher guidance, and academic support across BCAS campuses in Colombo, Kandy, Jaffna, and Kalmunai.'
  },
  {
    id: 'ossd-graduation-community',
    question: 'What are the OSSD graduation requirements, including community hours?',
    answer:
      'To graduate with an OSSD, students must fulfill three core Ontario requirements: (1) earn 30 secondary school credits (combining credit evaluation from prior O/Level or Year 10–11 studies with 7 required Grade 11–12 modules), (2) complete 40 hours of community involvement activities, and (3) satisfy the Ontario Secondary School Literacy requirement (OSSLT or OLC4O).'
  },
  {
    id: 'ossd-university-recognition',
    question: 'Which universities accept the OSSD for direct undergraduate entry?',
    answer:
      'OSSD graduates are recognized worldwide as Ontario high school diploma holders and can apply directly to leading universities in Canada (such as University of Toronto, University of Waterloo, UBC, and McGill), the United Kingdom (Russell Group universities), Australia (Group of Eight), Europe, Malaysia, UAE, and the United States.'
  },
  {
    id: 'ossd-enrollment-process',
    question: 'How do I enrol in the OSSD program at BCAS?',
    answer:
      'Enrolment follows five clear steps: (1) Submit an Enquiry, (2) Academic Qualification Assessment of your O/Level or secondary results, (3) Formal Credit Evaluation with CIA & CCIS, (4) Complete Registration with your chosen subject stream, and (5) Begin Your OSSD Journey.'
  }
];

const STUDENT_TESTIMONIALS = [
  {
    quote:
      'I chose OSSD because it gives me a globally recognized qualification and opens the door to top universities in Canada and around the world.',
    name: 'Duvaraksha Kangeyan',
    status: 'OSSD — Undergraduate',
    destination: 'Canada'
  },
  {
    quote:
      'OSSD was the right choice for me because the science modules and continuous assessment prepared me thoroughly for university Medicine studies.',
    name: 'Wadha Arulthas',
    status: 'OSSD — Undergraduate',
    destination: 'Medicine'
  },
  {
    quote:
      'I chose OSSD because the Science stream subjects, Canadian teachers, and academic guidance aligned directly with my Medicine career goal.',
    name: 'Surendrajith Abijith',
    status: 'OSSD — Undergraduate',
    destination: 'Medicine'
  },
  {
    quote:
      'Studying OSSD gave me the mathematics, physics, and engineering foundation needed to pursue Automobile Engineering at university.',
    name: 'Sivaneshan Nirushan',
    status: 'OSSD — Undergraduate',
    destination: 'Automobile Engineering'
  }
];

export const OSSDPage: React.FC = () => {
  const { navigateTo, setPrefilledEnquiry, showToast } = useApp();
  const [activeStream, setActiveStream] = useState<'science' | 'business' | 'it_engineering'>('science');
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(COMPULSORY_MODULES[0]);
  const [openFaqId, setOpenFaqId] = useState<string | null>('ossd-overview');

  const handleApplyClick = () => {
    setPrefilledEnquiry({
      subject: 'Ontario Secondary School Diploma (OSSD) - Canadian High School',
      destination: 'Canada',
      level: 'Foundation / High School Diploma',
      university: 'Cambridge International Academy (CIA) & Canadian Cross International School (CCIS)'
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
                  CIA × Canadian Cross International School (CCIS) × BCAS
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-300/30">
                  ★ Accredited Canadian High School Pathway
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
                After O/Levels, Join the One True <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-white to-amber-200">Global Qualification</span>
              </h1>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
                Study the world-renowned <strong>Ontario Secondary School Diploma (OSSD)</strong> delivered through <strong>Cambridge International Academy (CIA)</strong> in academic partnership with <strong>Canadian Cross International School (CCIS), Ontario, Canada</strong>. Learn with <strong>Canadian teachers</strong> through <strong>flexible learning</strong> and earn a direct pathway to top Canadian, UK, Australian, and European universities without a foundation year.
              </p>

              {/* 4 Core Pillars Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Canadian Faculty</div>
                  <div className="text-xs font-bold text-white mt-0.5">Certified Teachers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Study Mode</div>
                  <div className="text-xs font-bold text-white mt-0.5">Flexible Learning</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/15">
                  <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Curriculum</div>
                  <div className="text-xs font-bold text-white mt-0.5">7 Modules + 40 Hrs</div>
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
                  <span>Submit an OSSD Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:0761415273"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Admissions: 076 141 5273</span>
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
                      <p className="text-[11px] text-slate-500">CIA × CCIS Canada Pathway</p>
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
                      <div className="text-[11px] text-slate-500">Local, Cambridge, or Edexcel O/Levels</div>
                    </div>
                  </div>

                  <div className="ml-3.5 pl-4 border-l-2 border-dashed border-red-300 py-1">
                    <div className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">
                      ➔ Credit Evaluation &amp; Flexible Learning
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">OSSD Qualification (CIA × CCIS)</div>
                      <div className="text-[11px] text-slate-500">7 Core &amp; Stream Modules + 40 Community Hours</div>
                    </div>
                  </div>

                  <div className="ml-3.5 pl-4 border-l-2 border-dashed border-blue-300 py-1">
                    <div className="text-[10px] font-semibold text-[#00239C] uppercase tracking-wider">
                      ➔ Official Canadian High School Diploma
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">1st Year of Global University</div>
                      <div className="text-[11px] text-slate-500">Canada, UK, Australia, Europe &amp; USA</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    Colombo · Kandy · Jaffna · Kalmunai
                  </span>
                  <a
                    href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20am%20interested%20in%20the%20Canadian%20OSSD%20(Ontario%20Secondary%20School%20Diploma)%20program."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PROGRAM STRUCTURE & MODULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#BA141A] text-xs font-bold rounded-full border border-red-200">
            <Layers className="w-3.5 h-3.5 text-[#BA141A]" />
            <span>CANADIAN CURRICULUM ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            Program Structure &amp; Graduation Requirements
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
            To complete the qualification, students must study and pass at least <strong>seven (7)* Ontario modules</strong>—including four (4) compulsory modules and three (3) recommended modules in their chosen stream—alongside <strong>40 hours of community involvement</strong> and the Ontario literacy requirement.
          </p>
          <div className="text-xs text-slate-500 italic">
            *Subjects might increase and vary depending on the University selection and the subjects completed during schooling.
          </div>
        </div>

        {/* Official OSSD Graduation Requirements Summary Grid (Including 40 Community Hours) */}
        <div className="mb-12 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Official OSSD Graduation Requirements
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Includes 40 Community Involvement Hours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GRADUATION_REQUIREMENTS.map((req, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
              >
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-[#00239C] font-bold text-[11px] uppercase tracking-wider">
                  {req.badge}
                </span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {req.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {req.description}
                </p>
              </div>
            ))}
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

      {/* SECTION 2: WHY STUDY OSSD THROUGH CIA & CCIS? */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#00239C] text-xs font-bold rounded-full border border-blue-200">
              <Award className="w-3.5 h-3.5 text-[#00239C]" />
              <span>THE BCAS × CIA × CCIS ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Why Study OSSD Through CIA &amp; CCIS?
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600">
              Accredited Canadian secondary education supported by Canadian teachers, flexible learning, and direct BCAS university placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Advantage 1: Direct Admission */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00239C] flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Direct Admission to Top Global Universities
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Students graduating with the Ontario Secondary School Diploma gain direct entry into leading universities in Canada (Toronto, Waterloo, UBC, McGill), the UK, Australia, Europe, and the USA without an extra foundation year.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <Check className="w-3.5 h-3.5" />
                <span>Recognized Worldwide</span>
              </div>
            </div>

            {/* Advantage 2: Canadian Teachers */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Qualified Canadian Teachers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Instruction and academic evaluation are delivered by Ontario-certified Canadian teachers through Canadian Cross International School (CCIS) and CIA, ensuring authentic Canadian curriculum standards.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                <Check className="w-3.5 h-3.5" />
                <span>Ontario-Certified Educators</span>
              </div>
            </div>

            {/* Advantage 3: Flexible Learning */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#00239C] flex items-center justify-center font-bold">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Flexible Learning &amp; Continuous Assessment
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Study through flexible online and hybrid learning schedules with 70% continuous coursework and 30% final evaluation—allowing students to excel without high-stakes final exam pressure.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#00239C]">
                <Check className="w-3.5 h-3.5" />
                <span>Online &amp; Hybrid Flexibility</span>
              </div>
            </div>

            {/* Advantage 4: Graduation Requirements & Community Hours */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Holistic Graduation &amp; 40 Community Hours
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Alongside credit transfer and 7 core/stream modules, students complete 40 hours of guided community involvement and the Ontario literacy requirement—building a strong profile for university admissions.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <Check className="w-3.5 h-3.5" />
                <span>Includes 40 Community Hours</span>
              </div>
            </div>

            {/* Advantage 5: Affordable Program Cost */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BA141A] flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Affordable Program Cost
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Compared to completing a foundation year overseas, earning your Canadian high school diploma from Sri Lanka offers significant tuition and living cost savings with flexible installment options.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#BA141A]">
                <Check className="w-3.5 h-3.5" />
                <span>Cost-Effective Pathway</span>
              </div>
            </div>

            {/* Advantage 6: Dedicated Student Support */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Dedicated BCAS Counseling &amp; Placement
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  BCAS academic mentors and placement counselors across Colombo, Kandy, Jaffna, and Kalmunai provide personalized study support, university shortlisting, and student visa guidance.
                </p>
              </div>
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Check className="w-3.5 h-3.5" />
                <span>End-to-End University Placement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INSTITUTIONAL BACKGROUND (ABOUT CIA & CCIS) + ENROLMENT CHECKLIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-gradient-to-r from-slate-900 via-[#0B1536] to-[#00239C] text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-blue-200 border border-white/20">
                <Building2 className="w-3.5 h-3.5 text-blue-300" />
                <span>ABOUT CAMBRIDGE INTERNATIONAL ACADEMY (CIA) &amp; CCIS</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Delivering Accredited Canadian Secondary Education in Partnership with BCAS
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-blue-100 leading-relaxed">
                Cambridge International Academy (CIA) was established to create structured international education pathways that prepare students for leading global universities and modern careers.
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-blue-100 leading-relaxed">
                Through academic collaboration with <strong>Canadian Cross International School (CCIS)</strong> in Ontario, Canada, CIA enables students to complete Ontario Secondary School Diploma (OSSD) credits taught by Canadian teachers under an internationally recognized curriculum and academic framework.
              </p>

              <p className="text-xs sm:text-sm lg:text-base text-blue-100 leading-relaxed">
                Working alongside <strong>BCAS International University Placements</strong>, CIA supports Sri Lankan students with academic mentoring, credit evaluation, and direct university applications across Canada, the UK, Australia, Europe, and beyond.
              </p>

              {/* Location & Contact Bar */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 text-blue-200">
                  <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                  <span>BCAS Campuses: Colombo 03, Kandy, Jaffna &amp; Kalmunai · Online / Hybrid</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+94 76 141 5273</span>
                </div>
              </div>
            </div>

            {/* Right Card: OSSD Enrolment Checklist */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/20 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>OSSD Enrolment Checklist</span>
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-blue-100">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Eligibility:</strong> Completed or pending Sri Lankan G.C.E. O/Levels, Cambridge, or Edexcel O/Levels (or equivalent secondary transcripts).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Duration &amp; Learning Mode:</strong> 10 to 12 months flexible online / hybrid learning with Canadian teachers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Delivery Campuses:</strong> Online / Hybrid via CIA &amp; Canadian Cross International School (CCIS), with student counseling and academic support across BCAS Campuses (Colombo 03, Kandy, Jaffna &amp; Kalmunai).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Graduation Requirements:</strong> Required OSSD credits (7 core &amp; stream modules after credit evaluation), Ontario literacy requirement, and <strong>40 hours of community involvement</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Required Documents:</strong> O/Level results sheet / school transcripts, NIC or Passport copy, and completed enrolment form.
                  </span>
                </li>
              </ul>

              <div className="pt-3 border-t border-white/15">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Free Academic Counseling</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 5-STEP OSSD ENROLLMENT PROCESS */}
      <section className="bg-white border-y border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#00239C] text-xs font-bold rounded-full border border-blue-200">
              <FileCheck2 className="w-3.5 h-3.5 text-[#00239C]" />
              <span>SIMPLE ADMISSIONS WORKFLOW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Steps for OSSD Enrollment
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600">
              Follow these five straightforward steps from initial enquiry to starting your Ontario Secondary School Diploma.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
            {ENROLLMENT_STEPS.map((item, idx) => (
              <div key={item.step} className="relative flex flex-col lg:flex-row items-stretch">
                <div className="flex-1 bg-slate-50 rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {idx < ENROLLMENT_STEPS.length - 1 && (
                  <>
                    <div className="hidden lg:flex items-center justify-center px-1 text-[#00239C] shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="flex lg:hidden items-center justify-center py-1 text-[#00239C]">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleApplyClick}
              className="px-6 py-3 rounded-xl bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Step 1: Submit an Enquiry Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: OSSD FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#00239C] text-xs font-bold rounded-full border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-[#00239C]" />
            <span>OSSD KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600">
            Key answers for students and parents regarding CIA &amp; CCIS accreditation, Canadian teachers, flexible learning, community hours, and university admissions.
          </p>
        </div>

        <div className="space-y-3">
          {OSSD_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#00239C] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: STUDENT FEEDBACK SECTION (BOTTOM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#BA141A] text-xs font-bold rounded-full border border-red-200">
            <Sparkles className="w-3.5 h-3.5 text-[#BA141A]" />
            <span>STUDENT FEEDBACK &amp; PATHWAYS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            What Our Students Say About OSSD
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-slate-600">
            Real feedback from CIA &amp; CCIS OSSD students pursuing global undergraduate pathways.
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
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                  {t.quote}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900">{t.name}</div>
                <div className="text-xs text-[#00239C] font-semibold">{t.status}</div>
                <div className="inline-block px-2 py-0.5 rounded-md bg-red-50 text-[#BA141A] text-xs font-bold border border-red-100">
                  {t.destination}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: DOWNLOAD LEAFLET & EMBEDDED CTA FOOTER */}
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            <span>OFFICIAL LEAFLET &amp; ENROLMENT RESOURCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display">
            Ready to Begin Your Canadian High School Journey?
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Consult directly with our senior admission counselors across Colombo, Kandy, Jaffna, and Kalmunai or submit your enquiry online.
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

          <div className="pt-6 text-slate-400 text-xs">
            Cambridge International Academy (CIA) × Canadian Cross International School (CCIS, Ontario, Canada) · In Partnership with BCAS International University Placements (Colombo, Kandy, Jaffna &amp; Kalmunai)
          </div>
        </div>
      </section>
    </div>
  );
};
