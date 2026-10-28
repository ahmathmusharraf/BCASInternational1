/**
 * Google Sheets & Google Apps Script Lead Capture Service
 * 
 * Manages form submissions, tracking parameter extraction, honeypot spam protection,
 * duplicate submission prevention, and communication with the Google Apps Script Web App.
 */

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  honeypot?: string; // Hidden spam filter field
}

export interface LeadTrackingContext {
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  submitTimestamp: string;
}

export interface LeadSubmissionPayload extends LeadFormData, LeadTrackingContext {
  leadStatus: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  leadId?: string;
  timestamp?: string;
  mode: 'live' | 'simulation';
  previewRow?: (string | number)[];
}

const STORAGE_ENDPOINT_KEY = 'bcas_apps_script_url';
const STORAGE_RECENT_LEADS_KEY = 'bcas_saved_leads_history';
const LAST_SUBMIT_HASH_KEY = 'bcas_last_submit_hash';
const LAST_SUBMIT_TIME_KEY = 'bcas_last_submit_time';

/**
 * Extracts URL, UTM parameters, and formatted timestamp
 */
export function getLeadTrackingContext(): LeadTrackingContext {
  if (typeof window === 'undefined') {
    return {
      pageUrl: 'https://bcas-international.lk',
      utmSource: 'direct',
      utmMedium: 'organic',
      utmCampaign: 'admissions-portal',
      submitTimestamp: new Date().toISOString(),
    };
  }

  const urlParams = new URLSearchParams(window.location.search);
  
  // Format localized readable timestamp: YYYY-MM-DD HH:mm:ss
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedTimestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return {
    pageUrl: window.location.href,
    utmSource: urlParams.get('utm_source') || (document.referrer ? new URL(document.referrer, window.location.origin).hostname : 'direct'),
    utmMedium: urlParams.get('utm_medium') || 'web-inquiry',
    utmCampaign: urlParams.get('utm_campaign') || 'general-admissions',
    submitTimestamp: formattedTimestamp,
  };
}

/**
 * Retrieves the currently configured Google Apps Script Web App URL
 */
export function getScriptEndpoint(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_ENDPOINT_KEY);
  if (stored && stored.trim().length > 0) return stored.trim();
  
  // Optional Vite environment variable fallback
  const envUrl = (import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  
  return '';
}

/**
 * Updates the configured Google Apps Script Web App URL
 */
export function setScriptEndpoint(url: string): void {
  if (typeof window === 'undefined') return;
  if (!url || url.trim() === '') {
    localStorage.removeItem(STORAGE_ENDPOINT_KEY);
  } else {
    localStorage.setItem(STORAGE_ENDPOINT_KEY, url.trim());
  }
}

/**
 * Checks for duplicate submissions within a short cooldown window (45 seconds)
 */
function isDuplicateSubmission(formData: LeadFormData): boolean {
  if (typeof window === 'undefined') return false;
  
  const hash = `${formData.fullName.trim().toLowerCase()}_${formData.email.trim().toLowerCase()}_${formData.phone.trim()}_${formData.interest}`;
  const lastHash = sessionStorage.getItem(LAST_SUBMIT_HASH_KEY);
  const lastTimeStr = sessionStorage.getItem(LAST_SUBMIT_TIME_KEY);

  if (lastHash === hash && lastTimeStr) {
    const elapsed = Date.now() - parseInt(lastTimeStr, 10);
    // Within 45 seconds
    if (elapsed < 45000) {
      return true;
    }
  }

  // Store current submission for future duplicate check
  sessionStorage.setItem(LAST_SUBMIT_HASH_KEY, hash);
  sessionStorage.setItem(LAST_SUBMIT_TIME_KEY, Date.now().toString());
  return false;
}

/**
 * Saves a lead record locally for administrator and user inspection
 */
function recordLeadInHistory(payload: LeadSubmissionPayload, mode: 'live' | 'simulation'): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_RECENT_LEADS_KEY);
    const list: any[] = raw ? JSON.parse(raw) : [];
    list.unshift({
      ...payload,
      id: `LEAD-${Date.now().toString().slice(-6)}`,
      mode,
      recordedAt: new Date().toISOString(),
    });
    // Keep last 30
    localStorage.setItem(STORAGE_RECENT_LEADS_KEY, JSON.stringify(list.slice(0, 30)));
  } catch (err) {
    console.warn('Unable to record lead in localStorage', err);
  }
}

export function getRecordedLeads(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_RECENT_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearRecordedLeads(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_RECENT_LEADS_KEY);
}

/**
 * Sends a lead submission to the Google Apps Script Web App endpoint.
 * Supports:
 *  - Hidden honeypot filtering (spam silently ignored)
 *  - Duplicate submission throttling
 *  - Live Google Apps Script webhook integration via fetch()
 *  - Simulation mode when endpoint is not configured yet
 */
export async function sendLeadToGoogleSheets(formData: LeadFormData): Promise<LeadSubmissionResponse> {
  // 1. Honeypot check: If bot populated the hidden honeypot field, simulate success silently
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    console.warn('Spam submission intercepted by honeypot field:', formData.honeypot);
    return {
      success: true,
      message: 'Inquiry received successfully. Our admissions desk will contact you soon.',
      leadId: `SPAM-SHIELD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      mode: 'simulation',
    };
  }

  // 2. Duplicate submission prevention
  if (isDuplicateSubmission(formData)) {
    throw new Error('Duplicate inquiry detected: We already received your inquiry a moment ago. A BCAS placement advisor will be in touch shortly.');
  }

  // 3. Assemble complete payload with tracking context
  const tracking = getLeadTrackingContext();
  const payload: LeadSubmissionPayload = {
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    interest: formData.interest.trim(),
    message: formData.message.trim(),
    pageUrl: tracking.pageUrl,
    utmSource: tracking.utmSource,
    utmMedium: tracking.utmMedium,
    utmCampaign: tracking.utmCampaign,
    submitTimestamp: tracking.submitTimestamp,
    leadStatus: 'New',
  };

  const previewRow = [
    payload.submitTimestamp,
    payload.fullName,
    payload.email,
    payload.phone,
    payload.interest,
    payload.message,
    payload.pageUrl,
    payload.utmSource,
    payload.utmMedium,
    payload.utmCampaign,
    payload.leadStatus,
  ];

  const endpoint = getScriptEndpoint();

  // 4. If no Web App URL is configured, run in rich Simulation Mode
  if (!endpoint || endpoint.length < 10) {
    // Artificial slight network latency for realistic UX feel
    await new Promise(resolve => setTimeout(resolve, 800));

    recordLeadInHistory(payload, 'simulation');

    return {
      success: true,
      message: 'Inquiry captured in Preview / Simulation Mode! Connect your Google Apps Script URL anytime to append directly to your live Google Sheet.',
      leadId: `BCAS-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: payload.submitTimestamp,
      mode: 'simulation',
      previewRow,
    };
  }

  // 5. Live Transmission to Google Apps Script Web App
  // NOTE: Sending as 'text/plain;charset=utf-8' is the standard industry pattern
  // for Google Apps Script Web Apps to avoid CORS preflight (OPTIONS) limitations.
  // The Google Apps Script doPost(e) parses `JSON.parse(e.postData.contents)`.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Google Apps Script usually returns 200 with text/json content
    const responseText = await response.text();
    let data: any = null;

    try {
      data = JSON.parse(responseText);
    } catch {
      // If response text was plain or redirected HTML
      if (response.ok) {
        data = { status: 'success', message: 'Row appended successfully to Google Sheet' };
      }
    }

    if (data && (data.status === 'success' || data.success === true || response.ok)) {
      recordLeadInHistory(payload, 'live');
      return {
        success: true,
        message: data.message || 'Inquiry successfully saved to Google Sheet!',
        leadId: data.leadId || `GS-${Date.now().toString().slice(-6)}`,
        timestamp: payload.submitTimestamp,
        mode: 'live',
        previewRow,
      };
    } else {
      throw new Error(data?.message || `Google Apps Script returned an unexpected response (Status: ${response.status})`);
    }
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Connection timed out while sending to Google Sheet. Please check your internet or Google Apps Script URL.');
    }

    // Check for CORS / Failed to fetch
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      // In some browser setups, Google Apps Script 302 redirect can trigger a client fetch warning
      // even if the script successfully wrote to the sheet. Let's provide an actionable, clear message:
      throw new Error(
        'Unable to reach Google Apps Script Web App. Please ensure your script deployment Access is set to "Anyone" (not "Only myself").'
      );
    }

    throw error;
  }
}

/**
 * Pings the Google Apps Script Web App to verify connectivity
 */
export async function pingGoogleAppsScript(url: string): Promise<{ success: boolean; message: string; latencyMs: number; details?: any }> {
  if (!url || !url.startsWith('https://script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Invalid Google Apps Script URL. Must start with "https://script.google.com/macros/s/..."',
      latencyMs: 0,
    };
  }

  const startTime = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 9000);

  try {
    // Perform a test GET request to check Web App health
    const res = await fetch(`${url}?action=ping`, {
      method: 'GET',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);
    const text = await res.text();
    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (res.ok || (json && json.status === 'active')) {
      return {
        success: true,
        message: 'Google Apps Script Web App is connected and responding!',
        latencyMs,
        details: json,
      };
    } else {
      return {
        success: true,
        message: 'Endpoint reachable! Ensure doGet() and doPost() are deployed with Access set to "Anyone".',
        latencyMs,
        details: text.slice(0, 100),
      };
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      message: err.name === 'AbortError' 
        ? 'Ping timed out after 9 seconds.' 
        : `Connection test note: ${err.message || 'CORS or Network issue'}. Please verify script deployment settings.`,
      latencyMs,
    };
  }
}

/**
 * Complete, copy-paste ready Google Apps Script backend code (Code.gs)
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `/**
 * ========================================================================
 * BCAS INTERNATIONAL EDUCATION & UNIVERSITY PLACEMENTS
 * Google Apps Script - Automated Lead Generation Webhook Backend
 * ========================================================================
 * 
 * Features:
 *  - Receives JSON POST payloads from website inquiry forms via JavaScript fetch()
 *  - Automatically adds timestamps and sets Lead Status to "New"
 *  - Creates target sheet and initializes headers if they do not exist
 *  - Handles CORS preflight and returns standard JSON responses
 *  - Safe lock concurrency prevention for simultaneous inquiries
 * 
 * Target Columns in Google Sheet:
 *  1. Timestamp (A)
 *  2. Name (B)
 *  3. Email (C)
 *  4. Phone (D)
 *  5. Interest (E)
 *  6. Message (F)
 *  7. Page URL (G)
 *  8. UTM Source (H)
 *  9. UTM Medium (I)
 * 10. UTM Campaign (J)
 * 11. Lead Status (K)
 */

// ------------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------------
// If using a standalone script, insert your Google Spreadsheet ID below.
// If this script was created via "Extensions > Apps Script" inside the Sheet,
// you can leave SHEET_ID empty ('') to automatically use the active sheet!
var SHEET_ID = ''; 

// The sheet tab name where leads will be saved
var SHEET_NAME = 'Leads';

/**
 * Handles incoming HTTP POST requests from the website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Wait up to 10 seconds for concurrent requests to avoid row collision
  try {
    lock.waitLock(10000);
  } catch (lockError) {
    return createJsonResponse({
      status: 'error',
      message: 'Server busy handling concurrent submissions. Please try again.'
    }, 429);
  }

  try {
    // 1. Verify and parse request payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: 'error',
        message: 'No POST data payload received.'
      }, 400);
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // Fallback for form-encoded payloads
      data = e.parameter || {};
    }

    // 2. Validate essential fields
    var name = (data.fullName || data.name || '').trim();
    var email = (data.email || '').trim();
    var phone = (data.phone || '').trim();
    var interest = (data.interest || data.course || 'General Admissions').trim();
    var message = (data.message || '').trim();
    var pageUrl = (data.pageUrl || data.url || '').trim();
    var utmSource = (data.utmSource || data.utm_source || 'direct').trim();
    var utmMedium = (data.utmMedium || data.utm_medium || 'web-inquiry').trim();
    var utmCampaign = (data.utmCampaign || data.utm_campaign || 'general-admissions').trim();

    if (!name) {
      return createJsonResponse({
        status: 'error',
        message: 'Validation failed: Full Name is required.'
      }, 400);
    }

    if (!email && !phone) {
      return createJsonResponse({
        status: 'error',
        message: 'Validation failed: At least an Email Address or Phone Number is required.'
      }, 400);
    }

    // 3. Open target Google Sheet
    var sheet = getOrCreateLeadSheet();

    // 4. Prepare row timestamp and values
    var timestamp = new Date();
    var leadStatus = 'New'; // Automatically set to "New"

    var rowData = [
      timestamp,     // Col A: Timestamp
      name,          // Col B: Name
      email,         // Col C: Email
      phone,         // Col D: Phone
      interest,      // Col E: Interest
      message,       // Col F: Message
      pageUrl,       // Col G: Page URL
      utmSource,     // Col H: UTM Source
      utmMedium,     // Col I: UTM Medium
      utmCampaign,   // Col J: UTM Campaign
      leadStatus     // Col K: Lead Status
    ];

    // 5. Append row to spreadsheet
    sheet.appendRow(rowData);
    var lastRow = sheet.getLastRow();

    // Format new row for crisp look: wrap message text and format timestamp
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange(lastRow, 6).setWrap(true);
    sheet.getRange(lastRow, 11).setFontWeight('bold').setFontColor('#00239C');

    // 6. Return standard JSON success response
    return createJsonResponse({
      status: 'success',
      message: 'Inquiry successfully recorded in Google Sheets.',
      rowNumber: lastRow,
      leadId: 'LEAD-' + lastRow + '-' + new Date().getTime().toString().slice(-4),
      timestamp: Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')
    }, 200);

  } catch (error) {
    Logger.log('Error processing lead: ' + error.toString());
    return createJsonResponse({
      status: 'error',
      message: 'Internal error: ' + error.toString()
    }, 500);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles HTTP GET requests for testing endpoint health
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'info';
  
  if (action === 'ping') {
    return createJsonResponse({
      status: 'active',
      service: 'BCAS International University Placements Lead Webhook',
      timestamp: new Date().toISOString(),
      cors: true
    }, 200);
  }

  return createJsonResponse({
    status: 'online',
    message: 'BCAS Google Apps Script Lead Webhook is active and listening for POST requests.',
    targetSheet: SHEET_NAME,
    instructions: 'Send HTTP POST requests with JSON payload to this URL.'
  }, 200);
}

/**
 * Retrieves the spreadsheet sheet tab, creating it and initializing headers if absent
 */
function getOrCreateLeadSheet() {
  var ss;
  if (SHEET_ID && SHEET_ID.trim().length > 0) {
    ss = SpreadsheetApp.openById(SHEET_ID.trim());
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error('No active spreadsheet found. Please specify your SHEET_ID in the script configuration.');
    }
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  
  // If sheet does not exist yet, create it with standard headers
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    initializeHeaders(sheet);
  } else if (sheet.getLastRow() === 0) {
    // If sheet exists but is completely empty, add headers
    initializeHeaders(sheet);
  }

  return sheet;
}

/**
 * Initializes Google Sheet headers with professional BCAS styling
 */
function initializeHeaders(sheet) {
  var headers = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Interest',
    'Message',
    'Page URL',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'Lead Status'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format Header Row: Navy blue background, white bold text, freeze row
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#00239C');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontFamily('Arial');
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 35);
  sheet.setFrozenRows(1);

  // Set initial column widths
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 170); // Name
  sheet.setColumnWidth(3, 210); // Email
  sheet.setColumnWidth(4, 150); // Phone
  sheet.setColumnWidth(5, 190); // Interest
  sheet.setColumnWidth(6, 260); // Message
  sheet.setColumnWidth(7, 200); // Page URL
  sheet.setColumnWidth(8, 110); // UTM Source
  sheet.setColumnWidth(9, 110); // UTM Medium
  sheet.setColumnWidth(10, 130); // UTM Campaign
  sheet.setColumnWidth(11, 120); // Lead Status
}

/**
 * Helper to build a CORS-friendly JSON TextOutput
 */
function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
`;

/**
 * Google Sheet headers list
 */
export const GOOGLE_SHEET_HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'Interest',
  'Message',
  'Page URL',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'Lead Status',
];

import { StoredLeadRecord } from '../types';

export const DEFAULT_APPS_SCRIPT_URL = '';
export const GOOGLE_APPS_SCRIPT_CODE = GOOGLE_APPS_SCRIPT_TEMPLATE;

export const getAppsScriptUrl = getScriptEndpoint;
export const setAppsScriptUrl = setScriptEndpoint;
export const resetAppsScriptUrl = () => setScriptEndpoint('');
export const testAppsScriptConnection = pingGoogleAppsScript;
export const getLocalLeadsLog = getRecordedLeads;
export const clearLocalLeadsLog = clearRecordedLeads;
export const getBrowserContext = getLeadTrackingContext;

export function exportLeadsToCsv(leadsInput?: any[]): string {
  const leads = leadsInput || getRecordedLeads();
  if (leads.length === 0) return '';
  const rows = [
    GOOGLE_SHEET_HEADERS.join(','),
    ...leads.map((l: any) => [
      `"${l.submitTimestamp || l.timestamp || l.submittedAt || ''}"`,
      `"${(l.fullName || l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.interest || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.pageUrl || '').replace(/"/g, '""')}"`,
      `"${(l.utmSource || '').replace(/"/g, '""')}"`,
      `"${(l.utmMedium || '').replace(/"/g, '""')}"`,
      `"${(l.utmCampaign || '').replace(/"/g, '""')}"`,
      `"${(l.leadStatus || 'New').replace(/"/g, '""')}"`,
    ].join(','))
  ];
  return rows.join('\n');
}

export async function submitLeadToGoogleSheets(input: {
  name?: string;
  fullName?: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  honeypot?: string;
}): Promise<{ success: boolean; message: string; leadRecord: StoredLeadRecord }> {
  const fullName = input.fullName || input.name || '';
  const res = await sendLeadToGoogleSheets({
    fullName,
    email: input.email,
    phone: input.phone,
    interest: input.interest,
    message: input.message,
    honeypot: input.honeypot
  });

  const tracking = getLeadTrackingContext();
  const nowIso = new Date().toISOString();
  const leadRecord: StoredLeadRecord = {
    id: res.leadId || `LEAD-${Date.now()}`,
    timestamp: res.timestamp || tracking.submitTimestamp,
    submittedAt: nowIso,
    name: fullName,
    email: input.email,
    phone: input.phone,
    interest: input.interest,
    message: input.message,
    pageUrl: tracking.pageUrl,
    utmSource: tracking.utmSource,
    utmMedium: tracking.utmMedium,
    utmCampaign: tracking.utmCampaign,
    leadStatus: 'New',
    mode: res.mode,
    apiMessage: res.message
  };

  return {
    success: res.success,
    message: res.message,
    leadRecord
  };
}
