import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import {
  LeadFormData,
  LeadSubmissionResponse,
  sendLeadToGoogleSheets,
  getScriptEndpoint,
  getLeadTrackingContext
} from '../../services/leadService';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { useApp } from '../../context/AppContext';

interface LeadGenerationFormProps {
  initialInterest?: string;
  className?: string;
  compact?: boolean;
  onSuccess?: (res: LeadSubmissionResponse) => void;
  onOpenSettings?: () => void;
}

export const COURSE_INTEREST_OPTIONS = [
  'Computing, Software Engineering & AI',
  'Business Administration & Management',
  'Biomedical Science & Healthcare',
  'Civil, Mechanical & Electrical Engineering',
  'Law & International Legal Studies (LLB)',
  'Hospitality, Tourism & Event Management',
  'Ontario Secondary School Diploma (OSSD) - Canadian High School',
  'IELTS Academic Preparation & Testing Desk',
  'University Transfer & Top-up Degree',
  'Scholarship & Financial Aid Guidance',
  'General International Admissions Counseling'
];

export const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({
  initialInterest = '',
  className = '',
  compact = false,
  onSuccess,
  onOpenSettings,
}) => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    interest: initialInterest || COURSE_INTEREST_OPTIONS[0],
    message: '',
    honeypot: '', // Hidden spam trap field
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasConfiguredUrl, setHasConfiguredUrl] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({ pageUrl: '', utmSource: '', utmCampaign: '' });

  useEffect(() => {
    const endpoint = getScriptEndpoint();
    setHasConfiguredUrl(!!endpoint && endpoint.trim().length > 10);
    const tracking = getLeadTrackingContext();
    setTrackingInfo({
      pageUrl: tracking.pageUrl,
      utmSource: tracking.utmSource,
      utmCampaign: tracking.utmCampaign,
    });
  }, []);

  useEffect(() => {
    if (initialInterest) {
      setFormData(prev => ({ ...prev, interest: initialInterest }));
    }
  }, [initialInterest]);

  // Client-Side Validation Logic
  const validateField = (name: keyof LeadFormData, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) return 'Please enter a valid personal name.';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address (e.g. name@domain.com).';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone or WhatsApp number is required.';
        // Allows +, digits, spaces, hyphens, min 7 digits
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 7 || digitsOnly.length > 15) {
          return 'Please enter a valid phone number (e.g. +94 77 123 4567).';
        }
        return '';

      case 'interest':
        if (!value.trim()) return 'Please select a study area or service.';
        return '';

      case 'message':
        if (value.trim().length > 0 && value.trim().length < 8) {
          return 'Please provide a few more details (at least 8 characters).';
        }
        return '';

      default:
        return '';
    }
  };

  const handleBlur = (field: keyof LeadFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field] || '');
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger full validation
    const newErrors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      interest: validateField('interest', formData.interest),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      interest: true,
      message: true,
    });

    const hasErrors = Object.values(newErrors).some(err => err.length > 0);
    if (hasErrors) {
      setErrorMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await sendLeadToGoogleSheets(formData);
      setSubmissionResult(res);
      showToast(
        res.mode === 'live' 
          ? 'Inquiry sent directly to Google Sheet!' 
          : 'Inquiry captured in Simulation Mode! Connect your Google Sheet anytime.',
        'success'
      );
      if (onSuccess) {
        onSuccess(res);
      }
    } catch (err: any) {
      const msg = err.message || 'Failed to submit inquiry. Please check your connection and try again.';
      setErrorMessage(msg);
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      interest: initialInterest || COURSE_INTEREST_OPTIONS[0],
      message: '',
      honeypot: '',
    });
    setErrors({});
    setTouched({});
    setSubmissionResult(null);
    setErrorMessage(null);
  };

  // SUCCESS STATE RENDER
  if (submissionResult) {
    return (
      <div className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-emerald-200/80 shadow-lg text-center space-y-4 animate-in zoom-in-95 duration-200 ${className}`}>
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
            {submissionResult.mode === 'live' ? '✓ Synced to Google Sheet' : '✓ Captured in Simulation'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
            Thank you, {formData.fullName.split(' ')[0]}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your university placement inquiry has been captured. An official BCAS counselor from our Colombo, Jaffna, Kalmunai, or Kandy regional campus will contact you promptly.
          </p>
        </div>

        {/* Lead Reference & Sheet Row Details Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Reference ID:</span>
            <code className="font-mono text-slate-900 font-bold">{submissionResult.leadId}</code>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Area of Interest:</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">{formData.interest}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-medium">Recorded Timestamp:</span>
            <span className="text-slate-700">{submissionResult.timestamp}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Status in Google Sheet:</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#00239C] font-bold text-[10px]">
              New Lead
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
          <a
            href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20have%20submitted%20an%20inquiry%20(${submissionResult.leadId})%20for%20${encodeURIComponent(formData.interest)}.%20Applicant:%20${encodeURIComponent(formData.fullName)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Chat Now on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE FORM RENDER
  return (
    <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-slate-200 shadow-md ${className}`}>
      
      {/* Top Header / Integration Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-[#00239C] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Direct Admissions Inquiry</span>
          </span>
          <h3 className="text-base sm:text-xl font-bold font-display text-slate-900 mt-0.5">
            Send an Inquiry to BCAS Placements
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Automatically logged into our admissions database powered by Google Sheets.
          </p>
        </div>

        {/* Google Apps Script status badge & trigger */}
        {onOpenSettings && (
          <button
            type="button"
            onClick={onOpenSettings}
            className="self-start sm:self-center px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-[#00239C] text-[10px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Configure Google Apps Script Web App URL"
          >
            <Settings className="w-3 h-3" />
            <span>Google Sheet: {hasConfiguredUrl ? 'Live Web App' : 'Setup / Simulator'}</span>
          </button>
        )}
      </div>

      {/* Global Error Notice */}
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block">Submission Notice:</span>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        
        {/* Honeypot hidden spam field (hidden from view, tabindex=-1, autocomplete off) */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none', left: '-9999px' }}
        >
          <label htmlFor="hp_lead_url">Do not fill this field</label>
          <input
            id="hp_lead_url"
            type="text"
            name="website_url"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        {/* Row 1: Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Full Name <span className="text-[#BA141A]">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={e => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="e.g. Ahamed Farhan"
              disabled={submitting}
              className={`w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-white transition-all focus:outline-none focus:ring-2 ${
                errors.fullName && touched.fullName
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-[#00239C] focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.fullName && touched.fullName && (
            <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Row 2: Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Email Address <span className="text-[#BA141A]">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="name@example.com"
                disabled={submitting}
                className={`w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-white transition-all focus:outline-none focus:ring-2 ${
                  errors.email && touched.email
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00239C] focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Phone / WhatsApp <span className="text-[#BA141A]">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="+94 77 123 4567"
                disabled={submitting}
                className={`w-full pl-9 pr-3 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-white transition-all focus:outline-none focus:ring-2 ${
                  errors.phone && touched.phone
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-[#00239C] focus:ring-blue-100'
                }`}
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Course or Service Interested In */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1">
            Course or Service Interested In <span className="text-[#BA141A]">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </span>
            <select
              value={formData.interest}
              onChange={e => handleChange('interest', e.target.value)}
              onBlur={() => handleBlur('interest')}
              disabled={submitting}
              className="w-full pl-9 pr-8 py-2 sm:py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-white focus:outline-none focus:border-[#00239C] focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
            >
              {COURSE_INTEREST_OPTIONS.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Row 4: Message */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-800">
              Your Message or Questions <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">
              {formData.message.length}/500
            </span>
          </div>
          <div className="relative">
            <textarea
              name="message"
              rows={compact ? 2 : 3}
              maxLength={500}
              value={formData.message}
              onChange={e => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              placeholder="Tell us about your educational background, target intake (e.g. Sept 2026), preferred country, or any scholarship questions..."
              disabled={submitting}
              className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-white transition-all focus:outline-none focus:ring-2 resize-none ${
                errors.message && touched.message
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-[#00239C] focus:ring-blue-100'
              }`}
            />
          </div>
          {errors.message && touched.message && (
            <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Live Tracking Chips / Context Preview */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            Auto-Tracking:
          </span>
          <span>Source: <strong className="text-slate-700">{trackingInfo.utmSource}</strong></span>
          <span>Campaign: <strong className="text-slate-700">{trackingInfo.utmCampaign}</strong></span>
          <span className="truncate max-w-[150px] sm:max-w-xs" title={trackingInfo.pageUrl}>
            URL: {trackingInfo.pageUrl ? new URL(trackingInfo.pageUrl, 'https://bcas.lk').pathname : '/'}
          </span>
        </div>

        {/* Submit Button & Assurance */}
        <div className="pt-1 space-y-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 sm:py-3.5 px-6 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sending directly to Google Sheets...</span>
              </>
            ) : (
              <>
                <span>Submit University Inquiry</span>
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
            <span>Free counseling & admissions processing · No agency fee · Protected against spam</span>
          </p>
        </div>

      </form>
    </div>
  );
};
