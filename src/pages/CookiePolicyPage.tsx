import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Settings,
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  Info
} from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
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
          <Cookie className="w-3.5 h-3.5 text-amber-600" />
          <span>TRANSPARENCY & TRACKING DISCLOSURE</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-1">
          BCAS Cookie Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Effective Date: {lastUpdated} · BCAS International University Placements
        </p>
      </div>

      {/* Quick Interactive Preference CTA */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#00239C] uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage Your Preferences</span>
          </span>
          <p className="text-xs text-slate-700 leading-relaxed">
            You can customize which optional cookies you allow at any time using our Cookie Preferences Manager.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('cookie-preferences')}
          className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 inline-flex items-center gap-1.5"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Open Cookie Preferences</span>
        </button>
      </div>

      {/* Main Document Content */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <span>What Are Cookies?</span>
          </h2>
          <p>
            Cookies are small text files placed on your computer, tablet, or smartphone when you visit web pages. They are widely used by modern educational portals to ensure website security, remember your user preferences (such as your target study destination or nearest regional campus in Colombo, Jaffna, Kalmunai, or Kandy), and provide a faster, more personalized experience.
          </p>
          <p>
            Cookies do not scan your device or compromise personal documents. BCAS uses cookies strictly to enhance admissions guidance and maintain your temporary session choices.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <span>Categories of Cookies We Use</span>
          </h2>
          <p>We classify cookies into four distinct categories on our website:</p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">1. Strictly Necessary Cookies (Essential)</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-[#00239C] text-[10px] font-bold">Always Active</span>
              </div>
              <p className="text-xs text-slate-600">
                These cookies are required for core website functionality, including preserving shortlisted degree programmes, saving application forms in progress, securing session requests, and navigating between pages without losing entered data.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">2. Campus & Preference Cookies (Functional)</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">Configurable</span>
              </div>
              <p className="text-xs text-slate-600">
                These cookies remember your preferences—such as your chosen regional campus (Colombo, Kandy, Jaffna, or Kalmunai), target study countries (UK, Australia, Canada, Europe, UAE), and tuition cost calculator estimates.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">3. Analytics & Performance Cookies</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">Configurable</span>
              </div>
              <p className="text-xs text-slate-600">
                These cookies collect aggregated, non-identifying telemetry about how prospective students navigate our site, which blog guides are most read, and load speed metrics to help us optimize user experience.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">4. Communications & Advisory Cookies</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold">Configurable</span>
              </div>
              <p className="text-xs text-slate-600">
                Used to coordinate admissions webinar RSVPs, event passes, and quick-link WhatsApp routing to certified placement counselors.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <span>Cookie Inventory Table</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Cookie Identifier</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Purpose</th>
                  <th className="py-2.5 px-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-slate-800">bcas_saved_courses</td>
                  <td className="py-2 px-3 font-semibold text-[#00239C]">Essential</td>
                  <td className="py-2 px-3">Stores student bookmarked courses across university sessions</td>
                  <td className="py-2 px-3">1 Year</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-slate-800">bcas_cookie_preferences</td>
                  <td className="py-2 px-3 font-semibold text-[#00239C]">Essential</td>
                  <td className="py-2 px-3">Remembers consent preferences set by the user</td>
                  <td className="py-2 px-3">6 Months</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-slate-800">bcas_preferred_campus</td>
                  <td className="py-2 px-3 text-slate-700">Functional</td>
                  <td className="py-2 px-3">Remembers nearest regional campus (Colombo, Jaffna, Kalmunai, Kandy)</td>
                  <td className="py-2 px-3">30 Days</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono font-bold text-slate-800">bcas_calculator_state</td>
                  <td className="py-2 px-3 text-slate-700">Functional</td>
                  <td className="py-2 px-3">Caches tuition comparison currency and destination estimates</td>
                  <td className="py-2 px-3">Session</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <span>How Can You Control or Block Cookies?</span>
          </h2>
          <p>
            You have full control over your cookie choices:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              <strong>Directly on this site:</strong> Click into our{' '}
              <button
                type="button"
                onClick={() => navigateTo('cookie-preferences')}
                className="text-[#00239C] font-bold underline cursor-pointer"
              >
                Cookie Preferences Manager
              </button>{' '}
              to toggle functional, performance, and communication cookies on or off at any moment.
            </li>
            <li>
              <strong>Through your web browser:</strong> You can configure Google Chrome, Apple Safari, Mozilla Firefox, or Microsoft Edge to reject cookies or alert you before a cookie is stored. Please note that disabling essential cookies may prevent you from saving courses or submitting application pre-assessments.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-slate-100 text-[#00239C] text-xs font-bold flex items-center justify-center shrink-0">
              5
            </span>
            <span>Questions & Contact</span>
          </h2>
          <p>
            If you have questions about how BCAS manages cookies or protects your digital footprint, feel free to contact our technical desk:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Admissions & Technical Helpline</span>
              <a href="tel:+94761415273" className="text-sm font-bold text-[#00239C] hover:underline flex items-center gap-1.5 mt-1">
                <Phone className="w-4 h-4" />
                <span>+94 76 141 5273</span>
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Digital Operations Desk</span>
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
          onClick={() => navigateTo('terms')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          View Terms of Service ➔
        </button>
        <button
          onClick={() => navigateTo('cookie-preferences')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          Open Cookie Preferences ➔
        </button>
      </div>
    </div>
  );
};
