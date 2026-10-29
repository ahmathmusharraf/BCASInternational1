import React from 'react';
import { useApp } from '../context/AppContext';
import { BCAS_CAMPUSES } from '../data/mockData';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import {
  Building2,
  GraduationCap,
  ShieldCheck,
  Award,
  Globe2,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MapPin,
  Clock,
  ExternalLink,
  BookOpen,
  FileCheck2,
  HeartHandshake,
  Compass,
  Check
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-10 sm:space-y-16 py-6 sm:py-10 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* 1. HERO SECTION: Institutional Prestige & Direct BCAS Campus Affiliation */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00103a] via-[#00239C] to-[#001452] text-white p-6 sm:p-10 lg:p-14 border border-blue-900 shadow-xl">
        {/* Ambient Radial Highlights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6">
          {/* Official Affiliation Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-[11px] sm:text-xs font-bold backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AN INTEGRAL PART OF BCAS CAMPUS (BRITISH COLLEGE OF APPLIED STUDIES)</span>
            <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-[10px] text-white">
              Estd. 1999
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-tight">
            About BCAS International <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-amber-200">
              University Placements
            </span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-3xl">
            <strong>BCAS International University Placements</strong> operates as the specialized, official overseas university admissions and credit articulation wing of <strong>BCAS Campus (British College of Applied Studies)</strong>. For over 25 years, we have guided more than 25,000 Sri Lankan students into premier institutions across the United Kingdom, Australia, Canada, Europe, New Zealand, Malaysia, and the UAE with <strong>100% free counseling and 0% agency fees</strong>.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3 border-t border-white/15">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">25+ Years</span>
              <span className="text-[11px] sm:text-xs text-blue-200">Excellence Since 1999</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-amber-300 block">25,000+</span>
              <span className="text-[11px] sm:text-xs text-blue-200">Students Placed</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 block">4 Campuses</span>
              <span className="text-[11px] sm:text-xs text-blue-200">Islandwide Hubs</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-white block">100% Free</span>
              <span className="text-[11px] sm:text-xs text-blue-200">Zero Agency Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTITUTIONAL FOUNDATION & BCAS CAMPUS CONNECTION */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#00239C] text-[11px] font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>OUR INSTITUTIONAL IDENTITY</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            Part of BCAS Campus (British College of Applied Studies)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Understanding who we are and why having an established higher education college behind your placement makes all the difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Founded in 1999, <strong>BCAS Campus (British College of Applied Studies)</strong> is one of Sri Lanka&apos;s most venerable tertiary education institutes, registered under the <strong>Tertiary and Vocational Education Commission (TVEC) Sri Lanka</strong>. Over the last two and a half decades, BCAS has delivered world-recognized UK Pearson BTEC Higher National Diplomas (HNDs) and direct British university degree pathways in Biomedical Sciences, Computing & Software Engineering, Business Administration, Civil Engineering, Law, and Quantity Surveying.
            </p>
            <p>
              Unlike conventional, commercial migration agents who operate purely as commercial brokerages, <strong>BCAS International University Placements</strong> is an organic, institutional division embedded inside BCAS Campus. Our academic board, senior faculty, and admissions counselors work collectively to evaluate student transcripts, recommend genuine credit transfers, and liaise directly with university international offices.
            </p>
            <p>
              Students who begin their foundation, diploma, or undergraduate studies locally at BCAS enjoy guaranteed credit-transfer articulations into the 2nd year or final top-up year of world-ranked British, Australian, and Canadian universities — saving Sri Lankan families millions of rupees in overseas living and tuition expenses.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl p-5 sm:p-6 border border-blue-200/80 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00239C]" />
              <span>The BCAS Institutional Guarantee</span>
            </h3>
            
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>TVEC Registered Institution:</strong> Full regulatory compliance and recognition under Sri Lanka&apos;s vocational and higher education framework.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Pearson UK Premier Partner:</strong> 25+ years delivering globally benchmarked British BTEC qualifications.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Direct Articulation Agreements:</strong> Institutional credit transfers without third-party commission middle-men.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Agency Fees:</strong> All consultations, application submissions, and visa counseling are 100% free of charge.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. OUR 4 ISLANDWIDE CAMPUS NETWORK */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#00239C] text-[11px] font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>4 REGIONAL CAMPUS HUBS</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
            Islandwide Reach Across Sri Lanka
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Students and parents can walk into any of our full-fledged regional campuses for in-person document evaluations and face-to-face admissions counseling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BCAS_CAMPUSES.map((campus) => (
            <div
              key={campus.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all p-4 sm:p-5 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#00239C] font-bold text-xs flex items-center justify-center group-hover:bg-[#00239C] group-hover:text-white transition-colors">
                    <Building2 className="w-4 h-4" />
                  </span>
                  {campus.isMain && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      City Campus
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#00239C] transition-colors">
                    {campus.name}
                  </h3>
                  <p className="text-[11px] text-[#00239C] font-semibold">
                    {campus.role}
                  </p>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                  {campus.address.map((line, idx) => (
                    <p key={idx} className="line-clamp-1">{line}</p>
                  ))}
                  <div className="flex items-center gap-1.5 text-slate-500 pt-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mon – Sun: 08:00 AM – 06:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`https://wa.me/${campus.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20BCAS,%20I%20would%20like%20to%20visit%20the%20${encodeURIComponent(campus.name)}%20for%20admissions%20counseling.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                  <span>WhatsApp Desk</span>
                </a>

                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="text-[11px] font-semibold text-slate-400 hover:text-[#00239C] flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MISSION, VISION & GUIDING PRINCIPLES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-[#00239C] text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            To provide transparent, ethical, and fee-free overseas admissions and scholarship advocacy to every aspiring Sri Lankan scholar, bridging raw potential with top-tier international qualifications.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#00239C] to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            To be South Asia&apos;s benchmark higher-education placement division, renowned for academic integrity, genuine student-centered care, and unprecedented global university partnership corridors.
          </p>
        </div>

        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#00239C]">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-slate-900">Core Values</h3>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5">
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>0% Agency Fees:</strong> No hidden costs or consultation fees.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>Academic Merit First:</strong> Matching students to true-fit programs.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>Financial Prudence:</strong> Aggressive pursuit of bursaries & grants.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 5. CALL TO ACTION STRIP */}
      <section className="bg-gradient-to-r from-[#00239C] via-[#001c7d] to-slate-900 rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] sm:text-xs font-bold text-amber-300 uppercase tracking-wider">
            START YOUR STUDY ABROAD JOURNEY WITH BCAS
          </span>
          <h2 className="text-xl sm:text-3xl font-bold font-display text-white">
            Ready for a 100% Free Profile Assessment?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Book an appointment with an official BCAS counselor at our Colombo, Kandy, Jaffna, or Kalmunai campuses, or call directly at +94 76 141 5273.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigateTo('apply')}
            className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-[#00239C] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Book Free Counseling</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="tel:+94761415273"
            className="w-full sm:w-auto px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+94 76 141 5273</span>
          </a>
        </div>
      </section>

    </div>
  );
};
