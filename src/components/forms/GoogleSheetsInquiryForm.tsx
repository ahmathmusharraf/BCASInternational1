import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Settings,
  Sparkles,
  Lock,
  ArrowRight,
  RefreshCw,
  Info,
  Phone,
  Mail,
  User,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { submitLeadToGoogleSheets, getAppsScriptUrl, DEFAULT_APPS_SCRIPT_URL, getBrowserContext } from '../../services/leadService';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { StoredLeadRecord } from '../../types';

interface GoogleSheetsInquiryFormProps {
  onOpenSetupModal?: () => void;
  defaultInterest?: string;
  className?: string;
  compact?: boolean;
}

export const GoogleSheetsInquiryForm: React.FC<GoogleSheetsInquiryFormProps> = ({
  onOpenSetupModal,
  defaultInterest = 'Direct University Placement',
  className = '',
  compact = false
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: defaultInterest,
    message: '',
    honeypot: '' // Anti-spam hidden honeypot
  });

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<StoredLeadRecord | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Endpoint indicator
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLiveEndpoint, setIsLiveEndpoint] = useState(false);

  useEffect(() => {
    const url = getAppsScriptUrl();
    setCurrentUrl(url);
    setIsLiveEndpoint(url !== DEFAULT_APPS_SCRIPT_URL);
  }, []);

  // Update interest if prop changes
  useEffect(() => {
    if (defaultInterest) {
      setFormData(prev => ({ ...prev, interest: defaultInterest }));
    }
  }, [defaultInterest]);

  // Client-side validation function
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Please enter your complete full name';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@example.com)';
        }
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone / WhatsApp number is required';
        // Allow +, digits, spaces, hyphens; min 7 digits
        const digits = value.replace(/\D/g, '');
        if (digits.length < 7) {
          return 'Please enter a valid phone number (minimum 7 digits)';
        }
        return '';
      case 'interest':
        if (!value.trim()) return 'Please select your course or service of interest';
        return '';
      case 'message':
        if (value.trim() && value.trim().length > 1000) {
          return 'Message must not exceed 1000 characters';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, (formData as any)[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched and validate
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);
    const interestErr = validateField('interest', formData.interest);
    const messageErr = validateField('message', formData.message);

    const newErrors = {
      name: nameErr,
      email: emailErr,
      phone: phoneErr,
      interest: interestErr,
      message: messageErr
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      interest: true,
      message: true
    });

    if (nameErr || emailErr || phoneErr || interestErr || messageErr) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await submitLeadToGoogleSheets({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        message: formData.message || 'General admissions assessment requested via website form.',
        honeypot: formData.honeypot
      });

      setSubmissionSuccess(result.leadRecord);
    } catch (err: any) {
      setSubmissionError(err.message || 'An unexpected error occurred while transmitting to Google Sheets.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: defaultInterest,
      message: '',
      honeypot: ''
    });
    setErrors({});
    setTouched({});
    setSubmissionSuccess(null);
    setSubmissionError(null);
  };

  // Browser UTM & URL context for transparency preview
  const context = getBrowserContext();

  return (
    <div className={`bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden ${className}`}>
      {/* Top Banner with Google Sheets Integration Status */}
      <div className="bg-gradient-to-r from-[#001869] via-[#00239C] to-slate-900 text-white px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap items-center justify-between gap-2.5 border-b border-blue-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white">
                Google Sheets Lead Generation System
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                isLiveEndpoint
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                  : 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isLiveEndpoint ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {isLiveEndpoint ? 'Live Google Sheet' : 'Simulation Mode'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-blue-200/80 leading-none mt-0.5">
              Powered by Google Apps Script · Direct POST Webhook
            </p>
          </div>
        </div>

        {onOpenSetupModal && (
          <button
            type="button"
            onClick={onOpenSetupModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white rounded-lg text-[10px] sm:text-xs font-semibold border border-white/20 transition-all cursor-pointer shrink-0"
            title="Configure Google Apps Script Web App URL and setup instructions"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Setup & Apps Script</span>
          </button>
        )}
      </div>

      <div className="p-4 sm:p-6 lg:p-7">
        {/* SUCCESS VIEW */}
        {submissionSuccess ? (
          <div className="text-center py-6 sm:py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 uppercase tracking-wider inline-block">
                Reference ID: {submissionSuccess.id}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                Inquiry Logged Directly to Google Sheets!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{submissionSuccess.name}</strong>. Your inquiry for <strong className="text-[#00239C]">{submissionSuccess.interest}</strong> has been transmitted to our admissions database.
              </p>
            </div>

            {/* Lead Details Card */}
            <div className="bg-slate-50 rounded-xl p-3 sm:p-4 max-w-md mx-auto text-left text-xs border border-slate-200/80 space-y-1.5">
              <div className="flex justify-between text-slate-600 border-b border-slate-200/60 pb-1.5">
                <span className="font-medium">Lead Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {submissionSuccess.leadStatus}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="font-medium">Email Address:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.email}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="font-medium">Phone / WhatsApp:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.phone}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span className="font-medium">Submission Timestamp:</span>
                <span className="font-mono text-slate-700 text-[11px]">{new Date(submissionSuccess.submittedAt).toLocaleString()}</span>
              </div>
              {submissionSuccess.apiMessage && (
                <div className="pt-1.5 border-t border-slate-200/60 text-[11px] text-slate-500 italic">
                  ✓ {submissionSuccess.apiMessage}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20just%20submitted%20an%20inquiry%20(Ref:%20${submissionSuccess.id})%20for%20${encodeURIComponent(submissionSuccess.interest)}.%20Name:%20${encodeURIComponent(submissionSuccess.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Instant WhatsApp Follow-up</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5 sm:space-y-4">
            {/* Error Notification Banner */}
            {submissionError && (
              <div className="p-3 sm:p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-bold">Submission Failed</strong>
                  <span className="text-[11px] block mt-0.5 leading-relaxed">{submissionError}</span>
                  {onOpenSetupModal && (
                    <button
                      type="button"
                      onClick={onOpenSetupModal}
                      className="text-rose-700 font-semibold underline text-[11px] mt-1 hover:text-rose-900 cursor-pointer block"
                    >
                      Check Google Apps Script Web App Setup ↗
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* HIDDEN HONEYPOT FIELD (Spam Trap) */}
            <div
              style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }}
              aria-hidden="true"
            >
              <label htmlFor="bcas_hp_website_url">Do not fill this field if human</label>
              <input
                id="bcas_hp_website_url"
                type="text"
                name="bcas_hp_website_url"
                value={formData.honeypot}
                onChange={e => handleChange('honeypot', e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Field Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    placeholder="e.g. Ruwan Perera"
                    disabled={isSubmitting}
                    className={`w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                      touched.name && errors.name
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#00239C] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="e.g. ruwan.p@gmail.com"
                    disabled={isSubmitting}
                    className={`w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                      touched.email && errors.email
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#00239C] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Field Row 2: Phone Number & Course/Service Interested In */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number / WhatsApp <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="e.g. +94 77 123 4567"
                    disabled={isSubmitting}
                    className={`w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none transition-all ${
                      touched.phone && errors.phone
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#00239C] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Course or Service Interested In */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Course or Service Interested In <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <select
                    value={formData.interest}
                    onChange={e => handleChange('interest', e.target.value)}
                    onBlur={() => handleBlur('interest')}
                    disabled={isSubmitting}
                    className="w-full pl-9 pr-3 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 focus:bg-white focus:border-[#00239C] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
                  >
                    <optgroup label="Primary Services">
                      <option value="Direct University Placement">Direct University Placement (UK, Canada, Aus, Europe)</option>
                      <option value="Free Academic Profile Pre-Assessment">Free Academic Profile Pre-Assessment</option>
                      <option value="Visa Documentation & Embassy Guidance">Visa Documentation & Embassy Guidance</option>
                      <option value="Scholarship & Funding Advisory">Scholarship & Funding Advisory</option>
                    </optgroup>
                    <optgroup label="Specialized Pathway Programs">
                      <option value="Ontario Secondary School Diploma (OSSD)">Canadian High School OSSD (Direct Entry)</option>
                      <option value="IELTS Masterclass & Diagnostic Testing">IELTS Masterclass & Diagnostic Testing</option>
                    </optgroup>
                    <optgroup label="Popular Academic Disciplines">
                      <option value="Computing, AI & Software Engineering">Computing, AI & Software Engineering</option>
                      <option value="Business Administration & International Management">Business & Management</option>
                      <option value="Engineering & Renewable Energy">Engineering & Technology</option>
                      <option value="Biomedical, Nursing & Health Science">Biomedical & Health Sciences</option>
                      <option value="Law & Legal Studies (LLB/LLM)">Law & International Legal Studies</option>
                      <option value="Hospitality & International Tourism">Hospitality & Tourism</option>
                    </optgroup>
                    <optgroup label="Destination Countries">
                      <option value="Study in United Kingdom 🇬🇧">Study in United Kingdom 🇬🇧</option>
                      <option value="Study in Canada 🇨🇦">Study in Canada 🇨🇦</option>
                      <option value="Study in Australia 🇦🇺">Study in Australia 🇦🇺</option>
                      <option value="Study in Sweden / Finland 🇸🇪🇫🇮">Study in Sweden / Finland 🇸🇪🇫🇮</option>
                      <option value="Study in Malta / UAE 🇲🇹🇦🇪">Study in Malta / UAE 🇲🇹🇦🇪</option>
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {/* Field Row 3: Message */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Message / Your Academic Background & Query
                </label>
                <span className="text-[10px] text-slate-400">
                  {formData.message.length}/1000
                </span>
              </div>
              <div className="relative">
                <div className="absolute top-2.5 left-3 text-slate-400 pointer-events-none">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <textarea
                  rows={compact ? 2 : 3}
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  maxLength={1000}
                  placeholder="Share details such as your completed O/L, A/L or degree results, preferred intake, budget, or any specific questions..."
                  disabled={isSubmitting}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#00239C] focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Automated Metadata Info Banner */}
            <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>Anti-Spam Protected · Auto-Captures UTM & Page Context</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[9px] text-slate-400">
                <span>src: {context.utmSource}</span>
                <span>•</span>
                <span>status: "New"</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                Free consultation · No hidden consultant fees
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Transmitting Lead to Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry to Google Sheets</span>
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
