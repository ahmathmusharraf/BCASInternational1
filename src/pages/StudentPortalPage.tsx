import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_STUDENT_PROFILE } from '../data/mockData';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Calendar,
  MessageCircle,
  ExternalLink,
  AlertTriangle,
  Lock,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export const StudentPortalPage: React.FC = () => {
  const { studentUser, setStudentUser, navigateTo, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'counselor'>('dashboard');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const profile = studentUser || DEMO_STUDENT_PROFILE;

  const handleDocumentUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadModalOpen(false);
      if (studentUser) {
        setStudentUser({
          ...studentUser,
          checklist: studentUser.checklist.map(item =>
            item.title === selectedDocTitle ? { ...item, completed: true } : item
          )
        });
      }
      showToast(`Document "${selectedDocTitle}" simulated upload completed and logged!`, 'success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#00239C] uppercase tracking-wider">
          <User className="w-4 h-4 text-[#00239C]" />
          <span>APPLICANT HUB & ADMISSIONS TRACKER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
          BCAS Student Portal
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Track your international university application stages, document audit statuses, and direct communications with your assigned BCAS admissions counselor.
        </p>
      </div>

      {/* Security Architecture Notice */}
      <div className="p-4 sm:p-5 bg-blue-50/80 border border-blue-200/90 rounded-2xl flex items-start gap-3.5 text-xs sm:text-sm text-blue-950">
        <Lock className="w-5 h-5 text-[#00239C] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block text-slate-900">
            Institutional Security Architecture Notice:
          </strong>
          <p className="leading-relaxed text-slate-700">
            For data security and privacy compliance, official student credentials, transcripts, and financial records are authenticated through dedicated BCAS enterprise servers. You are currently viewing the{' '}
            <strong className="text-[#00239C]">Interactive Applicant Demonstration Hub</strong> for verified candidate {profile.fullName} (ID: {profile.studentId}).
          </p>
          <div className="pt-1">
            <a
              href="https://bcas.lk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00239C] font-semibold hover:underline inline-flex items-center gap-1 text-xs"
            >
              <span>Access official BCAS internal student records at bcas.lk</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Applicant Card Summary */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#00239C] flex items-center justify-center font-bold text-xl border border-blue-100 shrink-0">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-display text-slate-900">
                  {profile.fullName}
                </h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  ACTIVE APPLICANT
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Student ID: <code className="font-mono text-slate-800 font-semibold">{profile.studentId}</code> · Registered at {profile.registeredCampus}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <a
              href={profile.counselor.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>Counselor WhatsApp</span>
            </a>
            <button
              onClick={() => navigateTo('apply')}
              className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white rounded-xl font-semibold transition-colors cursor-pointer"
            >
              New Enquiry ↗
            </button>
          </div>
        </div>

        {/* Target Programme & Progress Strip */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 block">Target University & Destination</span>
            <strong className="text-sm text-slate-900 block font-display">
              {profile.targetUniversity}
            </strong>
            <span className="text-xs text-[#00239C] font-semibold">{profile.destination}</span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 block">Degree Programme</span>
            <strong className="text-sm text-slate-900 block font-display">
              {profile.chosenCourse}
            </strong>
            <span className="text-xs text-slate-500">Undergraduate Top-Up Pathway</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Application Progress</span>
              <span className="text-[#00239C] font-mono">{profile.applicationProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00239C] rounded-full transition-all duration-300"
                style={{ width: `${profile.applicationProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block truncate">
              Stage: {profile.currentStage}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-3 px-3 transition-colors cursor-pointer relative ${
            activeTab === 'dashboard'
              ? 'text-[#00239C] border-b-2 border-[#00239C]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Application Stages
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 px-3 transition-colors cursor-pointer relative ${
            activeTab === 'documents'
              ? 'text-[#00239C] border-b-2 border-[#00239C]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Document Locker ({profile.checklist.filter(c => c.completed).length}/{profile.checklist.length})
        </button>
        <button
          onClick={() => setActiveTab('counselor')}
          className={`pb-3 px-3 transition-colors cursor-pointer relative ${
            activeTab === 'counselor'
              ? 'text-[#00239C] border-b-2 border-[#00239C]'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Assigned Counselor Desk
        </button>
      </div>

      {/* Tab 1: Application Stages */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold font-display text-slate-900">
              Admission Pipeline Stages
            </h3>

            <div className="space-y-4">
              {[
                {
                  stage: '01. Application Dossier Submitted',
                  desc: 'All academic transcripts and identification verified by BCAS Admissions Desk.',
                  completed: true
                },
                {
                  stage: '02. University Conditional Offer Letter Issued',
                  desc: 'Offer received from University of East London. Conditions: English test & financial seasoning.',
                  completed: true
                },
                {
                  stage: '03. Financial Documentation & Bank Seasoning',
                  desc: '28-Day bank balance seasoning currently in progress with certified bank manager letter.',
                  completed: false,
                  active: true
                },
                {
                  stage: '04. CAS / Visa Confirmation Reference',
                  desc: 'University issues final Confirmation of Acceptance for Studies upon deposit confirmation.',
                  completed: false
                },
                {
                  stage: '05. Visa Lodgement & Biometrics',
                  desc: 'Appointment scheduling at VFS Global Colombo and visa decision receipt.',
                  completed: false
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-start gap-4 transition-colors ${
                    step.completed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : step.active
                      ? 'bg-blue-50/60 border-blue-200'
                      : 'bg-slate-50/50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      step.completed
                        ? 'bg-emerald-600 text-white'
                        : step.active
                        ? 'bg-[#00239C] text-white ring-4 ring-blue-100'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div className="space-y-0.5">
                    <h4
                      className={`text-sm font-bold ${
                        step.completed
                          ? 'text-emerald-950'
                          : step.active
                          ? 'text-blue-950'
                          : 'text-slate-600'
                      }`}
                    >
                      {step.stage}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Document Locker */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold font-display text-slate-900">
                Document Checklist & Verification
              </h3>
              <p className="text-xs text-slate-500">
                Mandatory records required for university unconditional acceptance and visa grant.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {profile.checklist.filter(c => c.completed).length} of {profile.checklist.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.checklist.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.completed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.completed ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>

                {!item.completed && (
                  <button
                    onClick={() => {
                      setSelectedDocTitle(item.title);
                      setUploadModalOpen(true);
                    }}
                    className="self-start text-xs font-semibold text-[#00239C] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Document File</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Assigned Counselor */}
      {activeTab === 'counselor' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-[#00239C] text-white flex items-center justify-center font-bold text-xl shrink-0">
              SJ
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900">
                {profile.counselor.name}
              </h3>
              <p className="text-xs text-slate-500">
                {profile.counselor.role} · {profile.counselor.campus}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block mb-1">Direct Consultation Desk:</span>
              <p className="font-semibold text-slate-900">
                BCAS City Campus & International Center, 356 Galle Road, Colombo 03
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block mb-1">Admissions Desk Hours:</span>
              <p className="font-semibold text-slate-900">
                Monday – Sunday: 08:00 AM – 06:00 PM (SLST)
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={profile.counselor.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>Direct WhatsApp with Counselor</span>
            </a>
            <a
              href="tel:+94761415273"
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
            >
              Call Campus Desk (+94 76 141 5273)
            </a>
          </div>
        </div>
      )}

      {/* Document Upload Simulation Modal */}
      {uploadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold font-display text-slate-900">
              Upload Document: {selectedDocTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Select your certified PDF or clear photo copy (maximum 10MB).
            </p>

            <form onSubmit={handleDocumentUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-600 hover:border-[#00239C] transition-colors cursor-pointer bg-slate-50">
                <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                <span className="font-semibold text-slate-800 block">
                  Click to select file or drag and drop
                </span>
                <span className="text-[11px] text-slate-400">PDF, JPG, or PNG</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2 bg-[#00239C] hover:bg-[#001869] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? 'Uploading & Verifying...' : 'Submit Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
