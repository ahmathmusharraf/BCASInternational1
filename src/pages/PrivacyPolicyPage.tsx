import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Phone,
  Mail,
  ArrowLeft,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateTo } = useApp();
  const lastUpdated = 'October 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb & Navigation */}
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00239C] hover:text-[#001869] cursor-pointer mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#00239C] uppercase tracking-wider block">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
          <span>LEGAL & DATA PROTECTION POLICY</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-1">
          BCAS Privacy Policy & Student Data Protection
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Effective Date: {lastUpdated} · BCAS International University Placements
        </p>
      </div>

      {/* Trust Summary Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3.5">
        <Lock className="w-5 h-5 text-[#00239C] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-slate-700">
          <strong className="block text-slate-900 font-bold">
            Our Commitment to Student Confidentiality
          </strong>
          <p className="leading-relaxed">
            BCAS International University Placements respects your privacy and is dedicated to protecting the personal, academic, and financial information shared with our admissions counselors and official placement desks. We never sell, rent, or trade student information.
          </p>
        </div>
      </div>

      {/* Main Policy Content */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center">
              1
            </span>
            <span>Information We Collect</span>
          </h2>
          <p>
            When you register an application enquiry, request a pre-assessment, sit for an IELTS diagnostic test, or enroll in the Ontario Secondary School Diploma (OSSD) with Cambridge International Academy, we may collect the following details:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Personal Identifiers:</strong> Full name, telephone/WhatsApp number, email address, date of birth, and nearest regional campus.</li>
            <li><strong>Academic History:</strong> G.C.E. O/L and A/L qualifications, BCAS foundation/HND transcripts, university degree certificates, and predicted grades.</li>
            <li><strong>Language Readiness:</strong> IELTS, PTE, or English waiver qualification status.</li>
            <li><strong>Study Preferences:</strong> Desired destinations (UK, Australia, Canada, Sweden, Finland, Malta, UAE), intake semester, and budget preferences.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center">
              2
            </span>
            <span>How We Use Your Information</span>
          </h2>
          <p>Your information is processed strictly for legitimate educational placement purposes, including:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Evaluating eligibility for direct university entry, top-up degrees, or foundation programs.</li>
            <li>Transmitting applications to our recognized international university partners and awarding institutions.</li>
            <li>Coordinating academic admission offers, scholarship allocations, and CAS / COE visa documentation.</li>
            <li>Facilitating IELTS test preparation courses and Cambridge International Academy OSSD registrations.</li>
            <li>Providing real-time application updates via phone, email, or WhatsApp.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center">
              3
            </span>
            <span>Third-Party Disclosure & Partnerships</span>
          </h2>
          <p>
            BCAS works directly with globally recognized universities, Pearson BTEC awarding bodies, and official educational collaborators such as the <strong>Cambridge International Academy</strong> (for the Ontario Secondary School Diploma). Data is shared only with certified admissions offices under strict data confidentiality agreements.
          </p>
          <p className="font-semibold text-slate-800">
            We will never sell or monetize your contact or academic information to commercial marketing brokers.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center">
              4
            </span>
            <span>Data Security & Storage</span>
          </h2>
          <p>
            We implement administrative, physical, and technical security safeguards to prevent unauthorized access, accidental alteration, or disclosure of your academic records. Shortlisted courses and active enquiry drafts are stored securely on your browser local session.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center">
              5
            </span>
            <span>Your Rights as an Applicant</span>
          </h2>
          <p>Under applicable personal data protection regulations, you retain the right to:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Request a copy of the personal and academic records stored with our admissions office.</li>
            <li>Request correction of outdated or inaccurate personal details.</li>
            <li>Withdraw consent for WhatsApp or email communications at any time.</li>
            <li>Request deletion of your application history where legal retention obligations permit.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
            Contact Our Data Protection Officer
          </h2>
          <p>
            For privacy inquiries, data deletion requests, or questions regarding this policy, please contact our international admissions compliance desk:
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00239C]" />
              <span><strong>BCAS International University Placements</strong> — Head Office & Regional Campuses</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Telephone Hotline: <a href="tel:+94761415273" className="font-bold text-[#00239C] hover:underline">+94 76 141 5273</a></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00239C]" />
              <span>Email: <a href="mailto:Digital_Int@bcas.lk" className="font-bold text-[#00239C] hover:underline">Digital_Int@bcas.lk</a></span>
            </div>
          </div>
        </section>
      </div>

      {/* Return to Application CTA */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigateTo('apply')}
          className="px-6 py-2.5 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm"
        >
          Proceed to Application Pre-Assessment →
        </button>
      </div>

      {/* Cross-Page Legal Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs">
        <button
          onClick={() => navigateTo('terms')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          View Terms of Service ➔
        </button>
        <button
          onClick={() => navigateTo('cookie-policy')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          View Cookie Policy ➔
        </button>
        <button
          onClick={() => navigateTo('cookie-preferences')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          Manage Cookie Preferences ➔
        </button>
      </div>
    </div>
  );
};
