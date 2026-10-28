import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  FileCode2,
  TableProperties,
  Link2,
  Send,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Download
} from 'lucide-react';
import {
  GOOGLE_APPS_SCRIPT_TEMPLATE,
  GOOGLE_SHEET_HEADERS,
  getScriptEndpoint,
  setScriptEndpoint,
  pingGoogleAppsScript
} from '../../services/leadService';

interface GoogleAppsScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEndpointUpdated?: (newEndpoint: string) => void;
}

export const GoogleAppsScriptModal: React.FC<GoogleAppsScriptModalProps> = ({
  isOpen,
  onClose,
  onEndpointUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'code' | 'headers' | 'settings'>('settings');
  const [endpointInput, setEndpointInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHeaders, setCopiedHeaders] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [testState, setTestState] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEndpointInput(getScriptEndpoint());
      setSaveSuccess(false);
      setTestState('idle');
      setTestMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyHeaders = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_SHEET_HEADERS.join('\t'));
      setCopiedHeaders(true);
      setTimeout(() => setCopiedHeaders(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([GOOGLE_APPS_SCRIPT_TEMPLATE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveEndpoint = () => {
    setScriptEndpoint(endpointInput);
    setSaveSuccess(true);
    if (onEndpointUpdated) {
      onEndpointUpdated(endpointInput.trim());
    }
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!endpointInput.trim()) {
      setTestState('error');
      setTestMessage('Please enter your Google Apps Script Web App URL first.');
      return;
    }

    setTestState('testing');
    setTestMessage('Pinging Web App endpoint...');

    const res = await pingGoogleAppsScript(endpointInput.trim());
    if (res.success) {
      setTestState('success');
      setTestMessage(res.message);
    } else {
      setTestState('error');
      setTestMessage(res.message);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#001869] via-[#00239C] to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <TableProperties className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-display leading-tight flex items-center gap-2">
                <span>Google Sheets & Apps Script Integration</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-200 text-[9px] font-bold uppercase tracking-wider">
                  Zero Backend
                </span>
              </h3>
              <p className="text-[10px] sm:text-xs text-blue-200/90 leading-none mt-0.5">
                Automated lead capture flowing directly into your private Google Spreadsheet
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close setup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 sm:px-6 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-2.5 sm:py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Connect Web App URL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-2.5 sm:py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>5-Step Setup Guide</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-2.5 sm:py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'code'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Google Apps Script (Code.gs)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('headers')}
            className={`px-3 py-2.5 sm:py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'headers'
                ? 'border-[#00239C] text-[#00239C] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>Sheet Columns & Headers</span>
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-700 text-xs sm:text-sm space-y-4">
          
          {/* TAB 1: SETTINGS / CONNECT */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00239C] shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 leading-relaxed">
                  <p className="font-bold">Pure Google Sheets Backend Architecture</p>
                  <p className="mt-0.5 text-blue-800">
                    Form submissions send JSON data directly via browser <code className="font-mono bg-blue-100 px-1 py-0.5 rounded text-[#00239C]">fetch()</code> to your Google Apps Script Web App. No intermediary servers, databases, or third-party paid subscriptions required.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Google Apps Script Web App URL
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="url"
                    value={endpointInput}
                    onChange={e => setEndpointInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#00239C] focus:ring-1 focus:ring-[#00239C] font-mono"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveEndpoint}
                      className="px-4 py-2 bg-[#00239C] hover:bg-[#001869] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      {saveSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved!</span>
                        </>
                      ) : (
                        <span>Save URL</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={testState === 'testing'}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {testState === 'testing' ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5 text-slate-500" />
                      )}
                      <span>Ping Test</span>
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Paste the Web App execution URL obtained from Apps Script Deployment (ending in <code className="font-mono text-slate-700">/exec</code>).
                </p>
              </div>

              {/* Ping Test Status Banner */}
              {testState !== 'idle' && (
                <div
                  className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                    testState === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : testState === 'error'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  {testState === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                  {testState === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                  {testState === 'testing' && <RefreshCw className="w-4 h-4 text-blue-600 animate-spin shrink-0 mt-0.5" />}
                  <div>
                    <span className="font-bold">
                      {testState === 'success' && 'Endpoint Active: '}
                      {testState === 'error' && 'Endpoint Test: '}
                      {testState === 'testing' && 'Testing: '}
                    </span>
                    <span>{testMessage}</span>
                  </div>
                </div>
              )}

              {/* Status Indicator */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Current Operational Mode:</span>
                {endpointInput && endpointInput.trim().length > 10 ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Google Sheet Mode
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Local Simulation / Demo Mode (No URL)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP SETUP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                
                {/* Step 1 */}
                <div className="p-3.5 sm:p-4 bg-white flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Create a New Google Spreadsheet
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Go to <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#00239C] font-semibold underline inline-flex items-center gap-0.5">sheets.new <ExternalLink className="w-2.5 h-2.5" /></a> and name your spreadsheet <strong>"BCAS International Student Inquiries"</strong>. Rename the bottom sheet tab to <strong>"Leads"</strong>.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 sm:p-4 bg-white flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Open Google Apps Script Editor
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In the spreadsheet menu, click <strong>Extensions</strong> ➔ <strong>Apps Script</strong>. A new browser tab opens with the Google Apps Script code editor.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 sm:p-4 bg-white flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00239C] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Paste Code.gs & Configure Sheet ID
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Delete any existing code in the <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">Code.gs</code> file and paste the complete Google Apps Script code from the <strong>"Google Apps Script (Code.gs)"</strong> tab above.
                    </p>
                    <p className="text-[11px] text-slate-500">
                      💡 If you opened Apps Script directly from the sheet, you can leave <code className="font-mono">SHEET_ID = ''</code> (it will auto-detect the active spreadsheet!).
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="p-3.5 sm:p-4 bg-white flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#BA141A] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <span>Deploy as Web App (Critical Setting!)</span>
                      <span className="px-1.5 py-0.2 bg-red-100 text-[#BA141A] text-[9px] font-bold rounded">Access: Anyone</span>
                    </h4>
                    <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1 pl-1">
                      <li>Click the blue <strong>Deploy</strong> button at top right ➔ select <strong>New deployment</strong>.</li>
                      <li>Click the gear icon next to "Select type" and choose <strong>Web app</strong>.</li>
                      <li>Description: <code className="font-mono text-slate-800">BCAS Leads Webhook v1</code>.</li>
                      <li><strong>Execute as:</strong> "Me (your email)".</li>
                      <li><strong>Who has access:</strong> Select <strong>"Anyone"</strong> (do not choose "Only myself" so public student inquiries can submit).</li>
                      <li>Click <strong>Deploy</strong> and authorize permissions when prompted.</li>
                    </ol>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="p-3.5 sm:p-4 bg-white flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Copy Web App URL & Paste into BCAS Portal
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Copy the generated <strong>Web app URL</strong> (ending in <code className="font-mono text-slate-800">/exec</code>), switch back to the <strong>Connect Web App URL</strong> tab here, paste it, and click <strong>Save URL</strong>.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CODE.GS */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Code.gs (Complete Google Apps Script Web App)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadCode}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Code.gs</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1 text-xs font-bold text-white bg-[#00239C] hover:bg-[#001869] rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                <pre className="p-3.5 bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed rounded-xl overflow-x-auto max-h-96 border border-slate-800 select-all">
                  {GOOGLE_APPS_SCRIPT_TEMPLATE}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: HEADERS */}
          {activeTab === 'headers' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Google Sheet Target Headers (11 Columns)
                </span>
                <button
                  type="button"
                  onClick={handleCopyHeaders}
                  className="px-3 py-1 text-xs font-bold text-white bg-[#00239C] hover:bg-[#001869] rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedHeaders ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied Headers!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy for Spreadsheet</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600">
                The script will automatically create these headers and format the row with a dark blue banner if the sheet is empty, or you can paste them manually into Row 1 of your sheet:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {GOOGLE_SHEET_HEADERS.map((header, idx) => (
                  <div
                    key={header}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-md bg-blue-100 text-[#00239C] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block leading-tight">{header}</span>
                      <span className="text-[10px] text-slate-500">
                        {header === 'Lead Status' ? 'Default: "New"' : 'Auto-populated'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-4 py-3 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Spam honeypot & duplicate prevention enabled</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
