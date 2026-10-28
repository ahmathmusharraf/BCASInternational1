import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LeadGenerationForm } from '../components/inquiry/LeadGenerationForm';
import { GoogleAppsScriptModal } from '../components/inquiry/GoogleAppsScriptModal';
import {
  TableProperties,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileCode2,
  Settings,
  HelpCircle,
  Database,
  PhoneCall,
  Clock,
  ArrowRight,
  ExternalLink,
  Trash2,
  Eye
} from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { getRecordedLeads, clearRecordedLeads, getScriptEndpoint } from '../services/leadService';

export const InquiryPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [recordedLeads, setRecordedLeads] = useState<any[]>(() => getRecordedLeads());
  const [activeTab, setActiveTab] = useState<'form' | 'table'>('form');

  const refreshLeads = () => {
    setRecordedLeads(getRecordedLeads());
  };

  const handleClear = () => {
    if (window.confirm('Clear locally recorded leads log? (This does not delete rows from your actual Google Sheet)')) {
      clearRecordedLeads();
      setRecordedLeads([]);
    }
  };

  const currentEndpoint = getScriptEndpoint();

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      
      {/* Editorial Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-[#001869] to-[#00239C] text-white pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BA141A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-3 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/15 text-xs font-semibold backdrop-blur-xs">
            <TableProperties className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google Apps Script Lead Generation Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-tight">
            Direct Admissions Inquiry Portal
          </h1>

          <p className="text-xs sm:text-base text-blue-100 max-w-2xl leading-relaxed">
            Submit your university study inquiry. Form submissions are automatically streamed directly to a Google Sheet via a serverless Google Apps Script Web App with zero third-party backend dependencies.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 backdrop-blur-xs cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-amber-300" />
              <span>Configure Google Apps Script Endpoint</span>
            </button>

            <a
              href="https://wa.me/94761415273?text=Hi%20BCAS,%20I%20would%20like%20assistance%20with%20submitting%20my%20university%20admission%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 font-bold text-xs rounded-xl border border-emerald-400/30 transition-all flex items-center gap-1.5 backdrop-blur-xs"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span>WhatsApp Desk: +94 76 141 5273</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Interactive Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-20 space-y-8">
        
        {/* Form and System Overview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: The Lead Generation Form (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <LeadGenerationForm
              onSuccess={() => refreshLeads()}
              onOpenSettings={() => setShowConfigModal(true)}
            />
          </div>

          {/* Right Column: Architectural Highlights & Live Lead Viewer (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Backend Architecture Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#00239C]" />
                  <h3 className="font-bold text-sm text-slate-900">How This Backend Works</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  100% Serverless
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Direct Fetch:</strong> Browser sends JSON payload with timestamp and UTM tracking parameters directly to your Apps Script Web App.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Spam Shield:</strong> Hidden honeypot field catches automated bots silently without bothering genuine students.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Duplicate Throttling:</strong> Client-side hash checks prevent accidental double submissions within 45 seconds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Automatic Status:</strong> Every lead arrives with <code className="font-mono bg-blue-50 text-[#00239C] px-1 py-0.5 rounded font-bold">Lead Status = "New"</code> ready for admissions counselor assignment.</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Google Sheet Connection:</span>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(true)}
                  className="font-bold text-[#00239C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{currentEndpoint ? 'View Endpoint' : 'Connect Sheet'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Live Submissions Tracker Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>Recent Inquiries Log</span>
                    <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">
                      {recordedLeads.length}
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Inspected from this browser session
                  </p>
                </div>

                {recordedLeads.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                    title="Clear session history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {recordedLeads.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl space-y-1">
                  <TableProperties className="w-6 h-6 mx-auto text-slate-300" />
                  <p>No inquiries submitted in this session yet.</p>
                  <p className="text-[10px] text-slate-400">Fill out the form on the left to test live submission!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {recordedLeads.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span className="truncate max-w-[180px]">{item.fullName}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-[#00239C]">
                          {item.leadStatus || 'New'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        {item.interest}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                        <span>{item.phone || item.email}</span>
                        <span>{item.submitTimestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Campus Counseling Desks */}
            <div className="bg-gradient-to-br from-[#001869] to-[#00239C] text-white rounded-2xl sm:rounded-3xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-sm flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Prefer In-Person or Phone Guidance?</span>
              </h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                You can also visit our physical placement admissions desks in Colombo, Jaffna, Kalmunai, and Kandy (Open Monday – Sunday: 08:00 AM – 06:00 PM) for face-to-face academic assessment.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-blue-200">Toll-Free Hotline:</span>
                <a href="tel:+94761415273" className="font-bold text-white hover:underline">
                  +94 76 141 5273
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Google Apps Script Modal */}
      <GoogleAppsScriptModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onEndpointUpdated={() => refreshLeads()}
      />

    </div>
  );
};
