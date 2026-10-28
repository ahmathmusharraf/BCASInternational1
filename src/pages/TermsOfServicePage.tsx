import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Phone,
  Mail,
  ArrowLeft,
  GraduationCap,
  Scale,
  Award,
  Globe2,
  Clock,
  ExternalLink
} from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
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

        <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#00239C] uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>LEGAL TERMS & ADMISSIONS CONDITIONS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-1">
          BCAS Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Effective Date: {lastUpdated} · BCAS International University Placements Division
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-1">
          <div className="flex items-center gap-2 text-[#00239C] font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>0% Agency Fee</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            100% free student counseling and university application submissions. No hidden file-opening or placement fees.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100 space-y-1">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Direct Accreditation</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Official partner to 100+ recognized overseas institutions, Cambridge International Academy (OSSD), and Pearson UK.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#00239C]" />
            <span>Equal 4-Campus Standard</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Identical advisory, documentation, and visa audit services available across Colombo, Jaffna, Kalmunai, and Kandy.
          </p>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <span>Agreement & Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or utilizing the digital portals, application tools, pre-assessment forms, campus counseling desks, or study abroad advisory services operated by <strong>BCAS International University Placements</strong> (a division of British College of Applied Studies, Sri Lanka), you acknowledge and agree to comply with these Terms of Service. If you do not agree with any provision herein, you should discontinue use of our services.
          </p>
          <p>
            These terms govern all services provided to prospective students, enrolled applicants, parents, and legal guardians accessing counseling either virtually or physically at our campuses in <strong>Colombo, Jaffna, Kalmunai, and Kandy</strong>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <span>Scope of Admissions & University Placement Services</span>
          </h2>
          <p>
            BCAS International acts as an authorized university representative and academic bridge institution facilitating higher education admissions in the United Kingdom, Australia, Canada, Sweden, Finland, Malta, United Arab Emirates, and other partner regions. Our scope includes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Academic profiling based on G.C.E. O/L, G.C.E. A/L, Pearson BTEC HND, or undergraduate qualifications.</li>
            <li>Direct entry, foundation, and top-up bachelor’s/master’s degree shortlisting at accredited universities.</li>
            <li>Priority application submission, document attestation, and university offer letter procurement.</li>
            <li>Scholarship and South Asian regional tuition bursary identification and filing.</li>
            <li>Official language readiness coaching via the BCAS IELTS Academy (British Council & IDP standards).</li>
            <li>Canadian high school qualification facilitation via the <strong>Ontario Secondary School Diploma (OSSD)</strong> in direct partnership with Cambridge International Academy.</li>
            <li>Genuine Student (GS), Confirmation of Acceptance for Studies (CAS), and Confirmation of Enrolment (CoE) compliance audits.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <span>Zero-Fee Student Counseling & Direct University Tuition Policy</span>
          </h2>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <h3 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Free Placement Guarantee</span>
            </h3>
            <p className="text-emerald-900 text-xs leading-relaxed">
              BCAS never charges students or families Rs. 150,000 to Rs. 350,000+ &quot;file-opening fees&quot;, consultation retainers, or courier service costs for institutional admissions. All professional university counseling and application processing is provided 100% free of charge.
            </p>
          </div>
          <p className="text-slate-600">
            All university tuition fees, international health insurance (e.g., NHS IHS for the UK, OSHC for Australia), visa government filing fees, and tuberculosis or biometric charges are remitted directly to the authorized university or respective government immigration agency. BCAS counselors do not collect tuition fees into private accounts.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <span>Applicant Responsibilities & Academic Honesty</span>
          </h2>
          <p>
            To enable prompt and compliant university processing, applicants agree to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>Submit genuine, unmodified, and verifiable academic certificates, transcripts, and identification records.</li>
            <li>Disclose any past visa refusals, travel history discrepancies, or study gaps during initial counseling.</li>
            <li>Maintain genuine financial sponsorship records satisfying 28-day holding periods or Genuine Temporary Entrant criteria.</li>
            <li>Write original Statements of Purpose (SOP) and personal statements (BCAS provides advisory critique, but does not author falsified essays).</li>
          </ul>
          <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-200 font-medium">
            Submission of fraudulent documents or misrepresentation will result in immediate termination of placement services and mandatory notification to relevant university admissions registries.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              5
            </span>
            <span>Visa Decisions & Immigration Disclaimers</span>
          </h2>
          <p>
            While BCAS boasts a 98.4%+ visa success audit record through meticulous compliance checking, applicants acknowledge that:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Sole authority for granting or refusing student entry visas rests entirely with sovereign immigration authorities (such as UK Visas & Immigration - UKVI, Australian Department of Home Affairs, Immigration, Refugees and Citizenship Canada - IRCC, or Swedish Migration Agency).</li>
            <li>BCAS does not guarantee visa issuance or expedite sovereign diplomatic processing times.</li>
            <li>University admissions departments retain unilateral authority over final seat confirmations, conditional grade requirements, and scholarship allocations.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              6
            </span>
            <span>Intellectual Property & Digital Portal Usage</span>
          </h2>
          <p>
            All content on the BCAS placements web portal—including course syllabi matrices, cost calculators, university comparisons, testimonial videos, blog guides, and graphic materials—is the proprietary property of BCAS and its educational partners. You may not scrape, copy, or redistribute these assets for commercial brokerage purposes without prior written consent.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              7
            </span>
            <span>Contact & Legal Inquiries</span>
          </h2>
          <p>
            For questions regarding these Terms of Service or official admissions agreements, contact our central legal and admissions coordination desk:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Central Admissions Hotline</span>
              <a href="tel:+94761415273" className="text-sm font-bold text-[#00239C] hover:underline flex items-center gap-1.5 mt-1">
                <Phone className="w-4 h-4" />
                <span>+94 76 141 5273</span>
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Official Correspondence Email</span>
              <a href="mailto:Digital_Int@bcas.lk" className="text-sm font-bold text-[#00239C] hover:underline flex items-center gap-1.5 mt-1">
                <Mail className="w-4 h-4" />
                <span>Digital_Int@bcas.lk</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs">
        <button
          onClick={() => navigateTo('privacy')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          View Privacy Policy ➔
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
