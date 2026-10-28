import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  FileText,
  Phone,
  Sparkles,
  Globe2,
  Calendar,
  Users,
  Video,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Check,
  ChevronRight,
  Headphones,
  FileCheck,
  Mic,
  PenTool,
  Star,
  Target
} from 'lucide-react';

export const IELTSPage: React.FC = () => {
  const { navigateTo, setPrefilledEnquiry, showToast } = useApp();
  const [selectedTargetBand, setSelectedTargetBand] = useState<'6.5' | '7.0' | '7.5+'>('7.0');

  const handleRegisterClick = (batchName?: string) => {
    setPrefilledEnquiry({
      subject: batchName ? `IELTS Preparation - ${batchName}` : 'IELTS Academic Masterclass',
      level: 'Foundation / Language Proficiency',
      destination: 'United Kingdom'
    });
    navigateTo('apply');
    showToast('Redirected to IELTS registration enquiry.', 'info');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061A40] via-[#00239C] to-slate-900 text-white pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs mb-4 text-blue-200">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
            <button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors cursor-pointer">
              Courses
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-white font-medium">Study IELTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span>STUDY IELTS</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                  ★ ENGLISH FOR INTERNATIONAL OPPORTUNITY
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-blue-100 text-xs font-semibold border border-white/20">
                  British Council &amp; IDP Coaching Center
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight">
                THE QUALIFICATION YOU NEED <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-amber-200 to-emerald-200">
                  TO GO ABROAD
                </span>
              </h1>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
                Achieve your dream university admissions and student visa in the UK, Australia, Canada, Europe, or New Zealand. With <strong>expert trainers</strong>, comprehensive <strong>mock exams</strong>, flexible <strong>online &amp; hybrid mode</strong>, and <strong>guaranteed results</strong>, BCAS gets you to your targeted Band 6.5, 7.0, or 7.5+ on your first attempt.
              </p>

              {/* 4 Feature Badges from user request */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15">
                  <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                    <Video className="w-4 h-4 shrink-0" />
                    <span>ONLINE &amp; HYBRID</span>
                  </div>
                  <div className="text-[11px] text-blue-100 mt-1">Study from home or campus</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15">
                  <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>EXPERT TRAINERS</span>
                  </div>
                  <div className="text-[11px] text-blue-100 mt-1">Certified examiner coaches</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15">
                  <div className="flex items-center gap-1.5 text-blue-200 text-xs font-bold">
                    <Target className="w-4 h-4 shrink-0" />
                    <span>GUARANTEED RESULTS</span>
                  </div>
                  <div className="text-[11px] text-blue-100 mt-1">Target Band 7.0+ assurance</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15">
                  <div className="flex items-center gap-1.5 text-red-300 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>FREE VISA COUNSELLING</span>
                  </div>
                  <div className="text-[11px] text-blue-100 mt-1">Full application assistance</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => handleRegisterClick('Fast-Track Batch')}
                  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-900/40 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Register for IELTS Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20register%20for%20a%20Free%20IELTS%20Diagnostic%20Test%20and%20counselling."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Book Free Diagnostic Test</span>
                </a>

                <a
                  href="tel:+94761415273"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-200" />
                  <span>Hotline: +94 76 141 5273</span>
                </a>
              </div>
            </div>

            {/* Right Card: IELTS 4 Skills Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-slate-800 shadow-2xl border border-white/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      IELTS Preparation Classes
                    </h3>
                    <p className="text-[11px] text-slate-500">Master All 4 Official Test Modules</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#00239C] font-bold text-[10px]">
                    Academic &amp; GT
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#00239C] flex items-center justify-center">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Listening (30 mins)</div>
                        <div className="text-[11px] text-slate-500">Audio accents &amp; distraction drills</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">Band 8.0+</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Reading (60 mins)</div>
                        <div className="text-[11px] text-slate-500">Skimming, scanning &amp; speed tactics</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">Band 8.0+</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Writing (60 mins)</div>
                        <div className="text-[11px] text-slate-500">Task 1 data analysis &amp; Task 2 essays</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">Band 7.5+</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Speaking (11–14 mins)</div>
                        <div className="text-[11px] text-slate-500">1-on-1 interview simulations</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">Band 7.5+</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Free Diagnostic Placement</span>
                  <a
                    href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20inquire%20about%20IELTS%20preparation%20classes%20and%20diagnostic%20placement."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#00239C] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Enquire Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PROGRAM FEATURES & CLASS FORMATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#00239C] text-xs font-bold rounded-full border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#00239C]" />
            <span>STRUCTURED IELTS TRAINING METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            IELTS Preparation Classes, Mock Exams &amp; Group Training
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered to boost your English language proficiency for university admission and visa compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Classes & Curriculum */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00239C] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                IELTS Preparation Classes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive training covering all 4 modules. Certified British Council and IDP certified master trainers provide real-time rubric correction and vocabulary development.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#00239C]">
              <Check className="w-3.5 h-3.5" />
              <span>Full Course Materials Provided</span>
            </div>
          </div>

          {/* Card 2: Mock Exams */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Rigorous Mock Exams
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experience full-length, timed IELTS exam simulations in dedicated test lab environments. Receive detailed band score breakdowns and diagnostic feedback before your actual test date.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-red-600">
              <Check className="w-3.5 h-3.5" />
              <span>Weekly Real-Condition Drills</span>
            </div>
          </div>

          {/* Card 3: Group & Batch Formats */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Group Classes &amp; Peer Drills
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engage in interactive group classes with interactive discussions, rapid-fire speaking circles, and collaborative essay critiquing that build natural conversational confidence.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-amber-700">
              <Check className="w-3.5 h-3.5" />
              <span>Interactive Small Cohorts</span>
            </div>
          </div>

          {/* Card 4: Flexible Schedules */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Weekday / Weekend Classes
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose between intensive morning/evening weekday batches or convenient weekend executive schedules designed specifically for working professionals and university students.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <Check className="w-3.5 h-3.5" />
              <span>Flexible Class Timings</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FREE VISA COUNSELLING & APPLICATION PROCEDURES */}
      <section className="bg-gradient-to-r from-slate-900 via-[#001869] to-[#00239C] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>BEYOND IELTS: END-TO-END STUDY ABROAD</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white">
                Free Counselling on Visa &amp; Application Procedures
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Scoring high in IELTS is only step one. At BCAS, our experienced migration and university placement advisors provide <strong>100% free personalized counselling</strong> on your entire abroad journey.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1">
                  <h4 className="text-xs font-bold text-amber-300">University Offer Processing</h4>
                  <p className="text-[11px] text-blue-100 leading-relaxed">
                    Direct admission to 100+ partner universities across UK, Australia, Canada, Europe, and UAE with conditional offer clearing.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1">
                  <h4 className="text-xs font-bold text-emerald-300">Student Visa Filing</h4>
                  <p className="text-[11px] text-blue-100 leading-relaxed">
                    Step-by-step guidance on financial documentation, sponsor affidavits, CAS/eCOE issuance, and embassy interview coaching.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1">
                  <h4 className="text-xs font-bold text-red-300">Scholarship Guidance</h4>
                  <p className="text-[11px] text-blue-100 leading-relaxed">
                    Higher IELTS band scores unlock merit-based tuition grants ranging from £2,000 to £10,000 / AUD $5,000 to $15,000.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 space-y-1">
                  <h4 className="text-xs font-bold text-blue-200">Official Exam Booking</h4>
                  <p className="text-[11px] text-blue-100 leading-relaxed">
                    Direct date reservations with British Council Sri Lanka &amp; IDP with zero booking fees and free exam day orientation.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Consultation Booking */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 text-slate-800 shadow-2xl space-y-4">
              <div className="text-center pb-2 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Book Free Visa &amp; IELTS Consultation
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Speak directly with an accredited British Council / IDP IELTS Counselor
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Admissions Hotline:</span>
                  <a href="tel:+94761415273" className="font-bold text-[#00239C] hover:underline">
                    +94 76 141 5273
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">WhatsApp Desk:</span>
                  <a
                    href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20know%20more%20about%20the%20Free%20IELTS%20Diagnostic%20Test%20and%20visa%20counselling."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    +94 76 141 5273
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600">Campuses:</span>
                  <span className="font-bold text-slate-800">Colombo · Kandy · Jaffna · Kalmunai</span>
                </div>
              </div>

              <button
                onClick={() => handleRegisterClick('Free Visa & IELTS Session')}
                className="w-full py-3 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register for Upcoming Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION FOOTER */}
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            <span>OFFICIAL BRITISH COUNCIL &amp; IDP SUPPORT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display">
            Start Your IELTS Preparation Today
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join hundreds of BCAS students who cleared their language threshold and obtained their visas on the very first try.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleRegisterClick()}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Enrol in Next Batch</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20to%20register%20for%20the%20upcoming%20IELTS%20preparation%20batch."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +94 76 141 5273</span>
            </a>

            <a
              href="tel:+94761415273"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-blue-200" />
              <span>Call: +94 76 141 5273</span>
            </a>
          </div>

          <div className="pt-6 text-slate-400 text-[11px]">
            BCAS International University Placements · 25+ Years in British Higher Education &amp; Global Language Excellence
          </div>
        </div>
      </section>
    </div>
  );
};
