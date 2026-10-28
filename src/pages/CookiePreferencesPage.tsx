import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  Check,
  Shield,
  Lock,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  Info,
  Cookie,
  SlidersHorizontal,
  ExternalLink,
  Building2
} from 'lucide-react';

interface CookieSettings {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  lastUpdated?: string;
}

const STORAGE_KEY = 'bcas_cookie_preferences';

export const CookiePreferencesPage: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const [settings, setSettings] = useState<CookieSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      essential: true,
      functional: true,
      analytics: true,
      marketing: false,
      lastUpdated: 'Default Settings'
    };
  });

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleToggle = (key: keyof Omit<CookieSettings, 'essential' | 'lastUpdated'>) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    const updated: CookieSettings = {
      ...settings,
      essential: true, // always required
      lastUpdated: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    setSettings(updated);
    setIsSaved(true);
    showToast('Your cookie preferences have been saved successfully.');
  };

  const handleAcceptAll = () => {
    const allOn: CookieSettings = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      lastUpdated: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allOn));
    } catch {
      // ignore
    }
    setSettings(allOn);
    setIsSaved(true);
    showToast('All cookies accepted.');
  };

  const handleRejectNonEssential = () => {
    const minimal: CookieSettings = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      lastUpdated: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
    } catch {
      // ignore
    }
    setSettings(minimal);
    setIsSaved(true);
    showToast('Non-essential cookies disabled.');
  };

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
          <Sliders className="w-3.5 h-3.5 text-blue-600" />
          <span>PRIVACY & DATA CONTROLS</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight mt-1">
          Cookie Preferences Manager
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage how BCAS International uses cookies on your browser. Last updated: {settings.lastUpdated || 'Default'}
        </p>
      </div>

      {/* Control Actions Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Info className="w-4 h-4 text-[#00239C] shrink-0" />
          <span>
            Changes are saved directly to this device and browser profile.
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            Reject Non-Essential
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white transition-colors cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>

      {/* Cookie Categories List */}
      <div className="space-y-4">
        {/* Category 1: Strictly Necessary */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Strictly Necessary Cookies
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Always Required
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              These cookies are essential for you to browse the site and use core features. They securely preserve your shortlisted courses, allow you to draft admissions enquiries, and maintain session tokens. Without these, the study abroad portal cannot function properly.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 font-mono">
              Key items: bcas_saved_courses, bcas_cookie_preferences
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold text-slate-400">Locked Active</span>
            <div className="w-11 h-6 bg-[#00239C] rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-90">
              <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
            </div>
          </div>
        </div>

        {/* Category 2: Functional & Campus Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00239C] shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Campus & Functional Preferences
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#00239C] text-[10px] font-bold border border-blue-200">
                Recommended
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enables the website to remember choices you make—such as your preferred regional campus (Colombo, Kandy, Jaffna, or Kalmunai), your target country filter (UK, Australia, Canada, Sweden, Finland, Malta, UAE), and your tuition savings calculator state.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 font-mono">
              Key items: bcas_preferred_campus, bcas_calculator_state
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold text-slate-700">
              {settings.functional ? 'Enabled' : 'Disabled'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.functional}
              onClick={() => handleToggle('functional')}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer flex items-center px-1 ${
                settings.functional ? 'bg-[#00239C] justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
            </button>
          </div>
        </div>

        {/* Category 3: Analytics & Performance */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-600 shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Analytics & Site Performance
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold border border-purple-200">
                Optional
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Helps our educational analysts identify which university destination guides, IELTS preparation tips, and courses are most searched for by Sri Lankan students. All telemetry is aggregated and strictly anonymized.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 font-mono">
              Key items: aggregated performance metrics
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold text-slate-700">
              {settings.analytics ? 'Enabled' : 'Disabled'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.analytics}
              onClick={() => handleToggle('analytics')}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer flex items-center px-1 ${
                settings.analytics ? 'bg-[#00239C] justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
            </button>
          </div>
        </div>

        {/* Category 4: Communications & Advisory */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-600 shrink-0" />
              <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                Communications & Advisory Cookies
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                Optional
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Coordinates event RSVP confirmations for university spot assessment fairs, remembers scheduled diagnostic IELTS tests, and pre-populates your selected country into direct WhatsApp counseling desks.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 font-mono">
              Key items: bcas_rsvp_status, bcas_advisory_route
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-bold text-slate-700">
              {settings.marketing ? 'Enabled' : 'Disabled'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={settings.marketing}
              onClick={() => handleToggle('marketing')}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer flex items-center px-1 ${
                settings.marketing ? 'bg-[#00239C] justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Save Action Sticky / Footer Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Ready to apply your selections?</span>
          </h3>
          <p className="text-xs text-slate-300">
            Click save to record your preferences. You can update these settings at any time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
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
          onClick={() => navigateTo('cookie-policy')}
          className="text-[#00239C] hover:underline font-semibold"
        >
          Read Full Cookie Policy ➔
        </button>
      </div>
    </div>
  );
};
