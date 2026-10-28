import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  Code2,
  Check,
  Copy,
  ExternalLink,
  Settings,
  HelpCircle,
  Database,
  RefreshCw,
  Send,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Download,
  Terminal,
  ShieldCheck,
  Globe
} from 'lucide-react';
import {
  getAppsScriptUrl,
  setAppsScriptUrl,
  resetAppsScriptUrl,
  testAppsScriptConnection,
  getLocalLeadsLog,
  clearLocalLeadsLog,
  exportLeadsToCsv,
  GOOGLE_APPS_SCRIPT_CODE,
  GOOGLE_SHEET_HEADERS,
  DEFAULT_APPS_SCRIPT_URL
} from '../../services/leadService';
import { StoredLeadRecord } from '../../types';

interface GoogleSheetsSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetsSetupModal: React.FC<GoogleSheetsSetupModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'instructions' | 'script' | 'config' | 'leads'>('instructions');

  // URL config state
  const [urlInput, setUrlInput] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs: number } | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Copy states
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHeaders, setCopiedHeaders] = useState(false);

  // Local leads
  const [leads, setLeads] = useState<StoredLeadRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setUrlInput(getAppsScriptUrl());
      setLeads(getLocalLeadsLog());
      setTestResult(null);
      setSaveFeedback(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyHeaders = () => {
    navigator.clipboard.writeText(GOOGLE_SHEET_HEADERS.join('\t')); // Tab-separated for direct paste into Google Sheets row 1
    setCopiedHeaders(true);
    setTimeout(() => setCopiedHeaders(false), 2500);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await testAppsScriptConnection(urlInput);
      setTestResult(result);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Connection test failed',
        latencyMs: 0
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveUrl = () => {
    setAppsScriptUrl(urlInput);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const handleResetUrl = () => {
    resetAppsScriptUrl();
    setUrlInput(DEFAULT_APPS_SCRIPT_URL);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  };

  const handleExportCsv = () => {
    const csv = exportLeadsToCsv(leads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bcas-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearLeads = () => {
    if (confirm('Are you sure you want to clear locally cached lead submissions? (This will not delete rows in Google Sheets)')) {
      clearLocalLeadsLog();
      setLeads([]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-[#001869] to-[#00239C] text-white p-4 sm:p-6 flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-bold font-display text-white">
                  Google Sheets & Apps Script Integration
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
                  Zero Backend
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Direct POST webhook from website form into Google Sheet without intermediary servers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 px-4 sm:px-6 bg-slate-50 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'instructions'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Setup Instructions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('script')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'script'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Google Apps Script Code</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'config'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Webhook URL & Connection Test</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'leads'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Captured Leads ({leads.length})</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 text-slate-700 text-xs sm:text-sm">
          {/* TAB 1: SETUP INSTRUCTIONS */}
          {activeTab === 'instructions' && (
            <div className="space-y-6">
              <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-200/80 flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#00239C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    How This Architecture Works
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    When visitors submit the inquiry form, the website makes a direct <code className="font-mono bg-blue-100 text-blue-900 px-1 py-0.5 rounded">fetch()</code> POST request with JSON payload to your Google Apps Script Web App URL. The script parses the payload, adds a timestamp, automatically assigns <code className="font-mono bg-blue-100 text-blue-900 px-1 py-0.5 rounded">Lead Status: "New"</code>, and appends a row into your Google Sheet. No Node.js server, database server, or monthly SaaS costs needed!
                  </p>
                </div>
              </div>

              {/* 5-Step Process */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00239C]" />
                  <span>Step-by-Step Setup Guide</span>
                </h4>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="border border-slate-200 rounded-xl p-3.5 sm:p-4 bg-slate-50/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#00239C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <h5 className="font-bold text-slate-900">
                        Create Your Google Sheet & Set Row 1 Headers
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 ml-8 mb-2">
                      Go to <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#00239C] underline font-semibold">sheets.new</a> to create a new Google Sheet. Name it e.g. <strong className="text-slate-900">BCAS Admissions Leads</strong>. In Row 1, paste these 11 column headers:
                    </p>
                    <div className="ml-8 flex flex-wrap items-center gap-2">
                      <div className="bg-slate-900 text-slate-200 font-mono text-[11px] px-3 py-1.5 rounded-lg border border-slate-700 flex-1 overflow-x-auto whitespace-nowrap">
                        {GOOGLE_SHEET_HEADERS.join(' | ')}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyHeaders}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-800 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        {copiedHeaders ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedHeaders ? 'Copied!' : 'Copy Headers'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="border border-slate-200 rounded-xl p-3.5 sm:p-4 bg-slate-50/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#00239C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h5 className="font-bold text-slate-900">
                        Open Google Apps Script
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 ml-8">
                      In your Google Sheet menu bar, click <strong className="text-slate-900">Extensions ➔ Apps Script</strong>. A new tab will open with the code editor.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="border border-slate-200 rounded-xl p-3.5 sm:p-4 bg-slate-50/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#00239C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        3
                      </span>
                      <h5 className="font-bold text-slate-900">
                        Paste the Complete Apps Script Code
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 ml-8 mb-2">
                      Delete any default placeholder in <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">Code.gs</code> and paste the complete script provided in the <strong>"Google Apps Script Code"</strong> tab.
                    </p>
                    <div className="ml-8">
                      <button
                        type="button"
                        onClick={() => setActiveTab('script')}
                        className="px-3 py-1.5 bg-[#00239C] text-white rounded-lg text-xs font-bold hover:bg-[#001869] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>View & Copy Script Code ➔</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="border border-slate-200 rounded-xl p-3.5 sm:p-4 bg-slate-50/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#00239C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        4
                      </span>
                      <h5 className="font-bold text-slate-900">
                        Deploy as Web App (Crucial Setting: "Who has access: Anyone")
                      </h5>
                    </div>
                    <div className="text-xs text-slate-600 ml-8 space-y-1">
                      <p>1. In the top-right of Apps Script, click <strong className="text-slate-900">Deploy ➔ New deployment</strong>.</p>
                      <p>2. Click the gear icon next to "Select type" and choose <strong className="text-slate-900">Web app</strong>.</p>
                      <p>3. Set <strong className="text-slate-900">Execute as:</strong> "Me (your email)".</p>
                      <p className="bg-amber-50 text-amber-900 p-2 rounded-lg border border-amber-200">
                        ⚠️ <strong>CRITICAL:</strong> Set <strong className="text-slate-900">Who has access:</strong> to <strong className="text-emerald-800 uppercase underline">"Anyone"</strong> (not "Only myself"). This allows form submissions from website visitors to be logged without requiring them to sign into your Google account.
                      </p>
                      <p>4. Click <strong className="text-slate-900">Deploy</strong>. Grant authorization permissions when prompted by Google.</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="border border-slate-200 rounded-xl p-3.5 sm:p-4 bg-slate-50/60">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#00239C] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        5
                      </span>
                      <h5 className="font-bold text-slate-900">
                        Copy the Web App URL & Paste into Webhook Config
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 ml-8 mb-2">
                      Copy the URL ending with <code className="font-mono bg-slate-200 text-slate-800 px-1 py-0.5 rounded">/exec</code>. Navigate to the <strong>"Webhook URL & Connection Test"</strong> tab, paste it, and run a test ping!
                    </p>
                    <div className="ml-8">
                      <button
                        type="button"
                        onClick={() => setActiveTab('config')}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Go to Webhook Settings ➔</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPS SCRIPT CODE */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Production-Ready Google Apps Script (Code.gs)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Includes JSON parsing, CORS headers, concurrency lock, honeypot spam protection, auto-header creation, and email alert.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Code Copied to Clipboard!' : 'Copy Entire Script'}</span>
                </button>
              </div>

              {/* Code Box */}
              <div className="relative">
                <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-[460px] border border-slate-800 leading-relaxed">
                  <code>{GOOGLE_APPS_SCRIPT_CODE}</code>
                </pre>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <strong className="block text-slate-800">Script Features Included:</strong>
                <ul className="list-disc list-inside space-y-0.5">
                  <li><strong>LockService:</strong> 30s mutex lock prevents duplicate row collisions during high traffic.</li>
                  <li><strong>Honeypot Filter:</strong> Silently drops bot spam without cluttering your Google Sheet.</li>
                  <li><strong>Auto-Creation:</strong> Auto-creates the "Leads" sheet tab with styled header row if missing.</li>
                  <li><strong>Timezone Formatting:</strong> Formats timestamp in Sri Lanka / script timezone.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: CONFIG & TEST */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Google Apps Script Web App Endpoint URL
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Paste the published Web App URL from Apps Script (must end with <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">/exec</code>).
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#00239C] focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveUrl}
                        className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Save Endpoint URL
                      </button>

                      <button
                        type="button"
                        onClick={handleTestConnection}
                        disabled={isTesting}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
                      >
                        {isTesting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Pinging Endpoint...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Test Live Connection</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetUrl}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Reset to Simulation Default
                    </button>
                  </div>
                </div>

                {saveFeedback && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Endpoint saved successfully! Website forms will now transmit to this address.</span>
                  </div>
                )}

                {/* Test Result Card */}
                {testResult && (
                  <div className={`p-4 rounded-xl border text-xs space-y-1 animate-in fade-in duration-200 ${
                    testResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {testResult.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>{testResult.success ? 'Connection Successful' : 'Connection Test Failed'}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{testResult.message}</p>
                    {testResult.latencyMs > 0 && (
                      <span className="text-[11px] font-mono text-slate-500 block">
                        Response time: {testResult.latencyMs}ms
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CAPTURED LEADS LOG */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Inquiry Leads Activity Log
                  </h4>
                  <p className="text-xs text-slate-500">
                    Review and export submissions captured by the client interface ({leads.length} stored).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {leads.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={handleExportCsv}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearLeads}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Log</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-500 text-xs space-y-2">
                  <Database className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="font-semibold text-slate-700">No inquiry submissions recorded yet.</p>
                  <p className="text-[11px] max-w-sm mx-auto text-slate-500">
                    Submit the inquiry form on the website to see lead rows captured in real time.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="p-2.5">Date / Time</th>
                        <th className="p-2.5">Name</th>
                        <th className="p-2.5">Contact</th>
                        <th className="p-2.5">Interest</th>
                        <th className="p-2.5">UTM / Source</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/80">
                          <td className="p-2.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                            {new Date(lead.submittedAt).toLocaleString()}
                          </td>
                          <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">
                            {lead.name}
                          </td>
                          <td className="p-2.5 whitespace-nowrap text-slate-600">
                            <div>{lead.email}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{lead.phone}</div>
                          </td>
                          <td className="p-2.5 text-[#00239C] font-medium max-w-xs truncate">
                            {lead.interest}
                          </td>
                          <td className="p-2.5 text-slate-500 text-[11px] font-mono">
                            {lead.utmSource} ({lead.utmMedium})
                          </td>
                          <td className="p-2.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {lead.leadStatus || 'New'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Google Apps Script handles all CORS headers and JSON formatting directly.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Done / Close
          </button>
        </div>
      </div>
    </div>
  );
};
