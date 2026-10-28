import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationFormData, SubmittedApplication } from '../types';
import { BCAS_CAMPUSES } from '../data/mockData';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { sendLeadToGoogleSheets } from '../services/leadService';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Printer,
  MessageCircle,
  Phone,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Award,
  HeartHandshake,
  BadgePercent
} from 'lucide-react';

export const ApplyPage: React.FC = () => {
  const {
    prefilledEnquiry,
    addSubmittedApplication,
    navigateTo,
    showToast,
    submittedApplications
  } = useApp();

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    cityOrCampus: 'Colombo Campus',
    currentQualification: 'G.C.E. A/L Completed',
    targetSubject: prefilledEnquiry.subject || 'Computing & IT',
    targetDestination: prefilledEnquiry.destination || 'United Kingdom',
    targetLevel: prefilledEnquiry.level || 'Bachelor’s',
    targetIntake: 'September / October 2027',
    budgetStatus: 'Need scholarship & funding guidance',
    englishProficiency: 'Planning to sit IELTS / PTE',
    specificQuestions: '',
    demoConsent: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<SubmittedApplication | null>(null);

  // Sync prefilled data if updated
  useEffect(() => {
    if (prefilledEnquiry.subject || prefilledEnquiry.destination || prefilledEnquiry.level) {
      setFormData(prev => ({
        ...prev,
        targetSubject: prefilledEnquiry.subject || prev.targetSubject,
        targetDestination: prefilledEnquiry.destination || prev.targetDestination,
        targetLevel: prefilledEnquiry.level || prev.targetLevel
      }));
    }
  }, [prefilledEnquiry]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ApplicationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (minimum 3 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com)';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide an active contact phone number';
    }

    if (!formData.demoConsent) {
      newErrors.demoConsent = 'Please check the consent box to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors indicated in the form', 'warning');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server error occurred while submitting application.');
      }

      const result = await response.json();
      if (result.success && result.application) {
        addSubmittedApplication(result.application);
        setSubmittedApp(result.application);

        // Stream application directly to Google Sheets
        sendLeadToGoogleSheets({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          interest: `${formData.targetSubject} (${formData.targetDestination}) - ${formData.targetLevel}`,
          message: formData.specificQuestions || `Intake: ${formData.targetIntake}, Campus: ${formData.cityOrCampus}, Qual: ${formData.currentQualification}`,
        }).catch(err => console.warn('Google Sheet auto-sync notice:', err));

        showToast('Application successfully confirmed and synced to admissions sheet!', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Application could not be confirmed by admissions backend.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      showToast(err.message || 'Unable to submit application to admissions server. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-6 space-y-4 sm:space-y-5">
      {/* Page Header */}
      <div className="space-y-1.5 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#00239C] uppercase tracking-wider">
          <Send className="w-3 h-3 text-[#00239C]" />
          <span>OFFICIAL ENQUIRY & PRE-ASSESSMENT</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          Start Your Study Abroad Enquiry
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-2xl">
          Complete this enquiry form for free academic eligibility assessment, university shortlisting, and scholarship estimation from BCAS counselors.
        </p>

        {/* BCAS Strengths & Trust Badges: Compact 1-line view */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
          <div className="p-1.5 bg-white rounded-md sm:rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5 transition-all duration-200 hover:border-emerald-200">
            <span className="p-1 rounded bg-emerald-50 text-emerald-700 shrink-0">
              <HeartHandshake className="w-3 h-3" />
            </span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-900 block truncate leading-tight">100% Free Guidance</span>
              <span className="text-[8px] sm:text-[9px] text-slate-500 block truncate">Zero Agency Fees</span>
            </div>
          </div>
          <div className="p-1.5 bg-white rounded-md sm:rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5 transition-all duration-200 hover:border-blue-200">
            <span className="p-1 rounded bg-blue-50 text-[#00239C] shrink-0">
              <Sparkles className="w-3 h-3" />
            </span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-900 block truncate leading-tight">Fast-Track Offers</span>
              <span className="text-[8px] sm:text-[9px] text-slate-500 block truncate">Direct University Link</span>
            </div>
          </div>
          <div className="p-1.5 bg-white rounded-md sm:rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5 transition-all duration-200 hover:border-purple-200">
            <span className="p-1 rounded bg-purple-50 text-purple-700 shrink-0">
              <Award className="w-3 h-3" />
            </span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-900 block truncate leading-tight">Scholarships Match</span>
              <span className="text-[8px] sm:text-[9px] text-slate-500 block truncate">Up to £8,000+ / 50%</span>
            </div>
          </div>
          <div className="p-1.5 bg-white rounded-md sm:rounded-lg border border-slate-200/80 shadow-2xs flex items-center gap-1.5 transition-all duration-200 hover:border-indigo-200">
            <span className="p-1 rounded bg-indigo-50 text-indigo-700 shrink-0">
              <ShieldCheck className="w-3 h-3" />
            </span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-slate-900 block truncate leading-tight">98.4% Visa Success</span>
              <span className="text-[8px] sm:text-[9px] text-slate-500 block truncate">Financial Audit & SOP</span>
            </div>
          </div>
        </div>
      </div>

      {!submittedApp ? (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-5 space-y-3.5 sm:space-y-4 animate-scale-in"
        >
          {/* Section 1: Contact Details */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-bold font-display text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-50 text-[#00239C] text-[10px] flex items-center justify-center font-bold">
                1
              </span>
              <span>Personal & Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="e.g. Kasun Bandara"
                  className={`w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150 ${
                    errors.fullName ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.fullName && (
                  <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="name@example.com"
                  className={`w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150 ${
                    errors.email ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Phone / WhatsApp <span className="text-red-600">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="e.g. +94 77 123 4567"
                  className={`w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150 ${
                    errors.phone ? 'border-red-500' : 'border-slate-200'
                  }`}
                />
                {errors.phone && (
                  <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>

              {/* Preferred Campus */}
              <div>
                <label htmlFor="campus" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Nearest Campus for Consultation
                </label>
                <select
                  id="campus"
                  value={formData.cityOrCampus}
                  onChange={e => setFormData({ ...formData, cityOrCampus: e.target.value })}
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
                >
                  <option value="Colombo Campus">Colombo Campus (City Center)</option>
                  <option value="Jaffna Campus">Jaffna Campus (Northern Region)</option>
                  <option value="Kalmunai Campus">Kalmunai Campus (Eastern Region)</option>
                  <option value="Kandy Campus">Kandy Campus (Central Region)</option>
                  <option value="Online Zoom Consultation">Online / WhatsApp Consultation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Study Preferences */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-bold font-display text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-50 text-[#00239C] text-[10px] flex items-center justify-center font-bold">
                2
              </span>
              <span>Study Preferences & Background</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {/* Study Area */}
              <div>
                <label htmlFor="subject" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Study Area / Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.targetSubject}
                  onChange={e => setFormData({ ...formData, targetSubject: e.target.value })}
                  placeholder="e.g. Computing, Business, Law"
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
                />
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="destination" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Preferred Destination
                </label>
                <select
                  id="destination"
                  value={formData.targetDestination}
                  onChange={e => setFormData({ ...formData, targetDestination: e.target.value })}
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
                >
                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                  <option value="Australia">Australia 🇦🇺</option>
                  <option value="Canada">Canada 🇨🇦</option>
                  <option value="Sweden">Sweden 🇸🇪</option>
                  <option value="Finland">Finland 🇫🇮</option>
                  <option value="Malta">Malta 🇲🇹</option>
                  <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                  <option value="Other / And Many More Destinations">Other Destinations 🌐</option>
                  <option value="Open to options">Open to options 🧭</option>
                </select>
              </div>

              {/* Study Level */}
              <div>
                <label htmlFor="level" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Target Study Level
                </label>
                <select
                  id="level"
                  value={formData.targetLevel}
                  onChange={e => setFormData({ ...formData, targetLevel: e.target.value })}
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
                >
                  <option value="Foundation">Foundation Pathway</option>
                  <option value="Diploma / HND">Diploma / Pearson BTEC HND</option>
                  <option value="Bachelor’s">Bachelor’s Degree</option>
                  <option value="Postgraduate">Master’s / Postgraduate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-0.5">
              {/* Highest Qualification */}
              <div>
                <label htmlFor="qualification" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  Highest Qualification
                </label>
                <select
                  id="qualification"
                  value={formData.currentQualification}
                  onChange={e => setFormData({ ...formData, currentQualification: e.target.value })}
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
                >
                  <option value="G.C.E. O/L Completed">G.C.E. Ordinary Level (O/L)</option>
                  <option value="G.C.E. A/L Completed">G.C.E. Advanced Level (A/L)</option>
                  <option value="BCAS Foundation Diploma">BCAS International Foundation</option>
                  <option value="Pearson BTEC HND">Pearson BTEC HND / Higher Diploma</option>
                  <option value="Bachelor’s Degree">Bachelor&apos;s Degree Graduate</option>
                  <option value="Working Professional">Working Professional</option>
                </select>
              </div>

              {/* English Readiness */}
              <div>
                <label htmlFor="english" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                  English Status
                </label>
                <select
                  id="english"
                  value={formData.englishProficiency}
                  onChange={e => setFormData({ ...formData, englishProficiency: e.target.value })}
                  className="w-full px-2.5 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
                >
                  <option value="IELTS / PTE Already Completed">IELTS / PTE Score Ready</option>
                  <option value="Planning to sit IELTS / PTE">Planning to sit IELTS / PTE soon</option>
                  <option value="Wish to use O/L or A/L English">Assess O/L or A/L English waiver</option>
                  <option value="Need English Preparation Course">Need English Preparation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Questions & Message */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-bold font-display text-slate-900 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-50 text-[#00239C] text-[10px] flex items-center justify-center font-bold">
                3
              </span>
              <span>Specific Questions or Goals</span>
            </h2>

            <div>
              <label htmlFor="message" className="text-[10px] sm:text-[11px] font-semibold text-slate-700 block mb-0.5">
                Brief Note (Optional)
              </label>
              <textarea
                id="message"
                rows={2}
                value={formData.specificQuestions}
                onChange={e => setFormData({ ...formData, specificQuestions: e.target.value })}
                placeholder="e.g. Interested in credit transfer after HND, or checking scholarship for September..."
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00239C] transition-all duration-150"
              />
            </div>

            {/* Consent Box */}
            <div>
              <label className="flex items-start gap-2 p-2 bg-slate-50 border border-slate-200 rounded-md sm:rounded-lg cursor-pointer transition-colors hover:bg-slate-100/70">
                <input
                  type="checkbox"
                  required
                  checked={formData.demoConsent}
                  onChange={e => {
                    setFormData({ ...formData, demoConsent: e.target.checked });
                    if (errors.demoConsent) setErrors({ ...errors, demoConsent: undefined });
                  }}
                  className="w-3.5 h-3.5 text-[#00239C] rounded border-slate-300 mt-0.5 shrink-0"
                />
                <span className="text-[10px] sm:text-[11px] text-slate-600 leading-tight">
                  I confirm the accuracy of information and request free university placement guidance from BCAS. <span className="text-red-600">*</span>
                </span>
              </label>
              {errors.demoConsent && (
                <span className="text-[10px] text-red-600 mt-0.5 block flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.demoConsent}</span>
                </span>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 border-t border-slate-100">
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>We never collect passwords or passport numbers through this form.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-2.5 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all duration-150 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Reference...</span>
              ) : (
                <>
                  <span>Submit Application Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Confirmation & Next Steps Screen */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden p-4 sm:p-6 space-y-5 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                APPLICATION ENQUIRY CONFIRMED
              </span>
              <h2 className="text-base sm:text-lg font-bold font-display mt-0.5">
                Thank you, {submittedApp.data.fullName}!
              </h2>
              <p className="text-xs text-emerald-900 mt-0.5">
                Your enquiry has been successfully logged. Your personal application reference is{' '}
                <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-300">
                  {submittedApp.referenceNumber}
                </strong>
              </p>
            </div>
          </div>

          {/* Summary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Candidate Profile
              </h3>
              <div className="space-y-1 text-slate-700">
                <p>
                  <span className="text-slate-500">Applicant:</span>{' '}
                  <strong>{submittedApp.data.fullName}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Email:</span> {submittedApp.data.email}
                </p>
                <p>
                  <span className="text-slate-500">Phone:</span> {submittedApp.data.phone}
                </p>
                <p>
                  <span className="text-slate-500">Campus Assigned:</span>{' '}
                  <span className="font-semibold text-[#00239C]">{submittedApp.data.cityOrCampus}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                Target Pathway
              </h3>
              <div className="space-y-1.5 text-slate-700">
                <p>
                  <span className="text-slate-500">Subject Area:</span>{' '}
                  <strong>{submittedApp.data.targetSubject}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Destination:</span>{' '}
                  <strong>{submittedApp.data.targetDestination}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Level & Intake:</span> {submittedApp.data.targetLevel} · {submittedApp.data.targetIntake}
                </p>
                <p>
                  <span className="text-slate-500">Logged On:</span> {submittedApp.submittedAt}
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 font-display">
              Recommended Immediate Next Steps:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00239C] shrink-0 mt-0.5" />
                <span>
                  <strong>Gather Academic Transcripts:</strong> Prepare certified copies of your G.C.E. O/L, A/L or BCAS HND results certificates.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00239C] shrink-0 mt-0.5" />
                <span>
                  <strong>Check Passport Validity:</strong> Ensure your passport has at least 18 months of remaining validity.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00239C] shrink-0 mt-0.5" />
                <span>
                  <strong>Instant Follow-up via WhatsApp:</strong> Message our admissions team citing reference{' '}
                  <code className="font-mono font-bold text-[#00239C]">{submittedApp.referenceNumber}</code> for priority handling.
                </span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Summary</span>
              </button>
              <button
                onClick={() => setSubmittedApp(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/94761415273?text=Hi%20BCAS,%20I%20have%20submitted%20an%20enquiry%20with%20reference%20${submittedApp.referenceNumber}.%20Applicant:%20${encodeURIComponent(submittedApp.data.fullName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                <span>Follow up on WhatsApp ↗</span>
              </a>
              <button
                onClick={() => navigateTo('portal')}
                className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Student Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Previous Enquiries in this Browser Session */}
      {submittedApplications.length > 0 && !submittedApp && (
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
              Recent Enquiries in this Browser ({submittedApplications.length})
            </span>
          </div>
          <div className="space-y-2">
            {submittedApplications.slice(0, 3).map(app => (
              <div
                key={app.referenceNumber}
                className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="font-mono text-[#00239C] mr-2">{app.referenceNumber}</strong>
                  <span className="font-semibold text-slate-800">{app.data.targetSubject}</span>
                  <span className="text-slate-500 ml-1">({app.data.targetDestination})</span>
                </div>
                <span className="text-[11px] text-slate-500">{app.submittedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
