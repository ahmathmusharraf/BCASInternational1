/**
 * ========================================================================
 * BCAS INTERNATIONAL EDUCATION & UNIVERSITY PLACEMENTS
 * Google Apps Script - Automated Lead Generation Webhook Backend (Code.gs)
 * 
 * Supported Website URLs:
 *  - Primary / Vercel: https://bcasinternationalplacement.vercel.app/
 *  - Custom Domain:    https://bcasinternational.lk
 * 
 * Email Alerts Recipient: ahmathmusharraf@gmail.com
 * ========================================================================
 *
 * HOW TO USE THIS SCRIPT:
 * 1. Open your Google Spreadsheet (e.g., "BCAS Student Leads 2026")
 * 2. In the top menu, click: Extensions > Apps Script
 * 3. Delete any default code in Code.gs, paste this entire file, and click Save (💾).
 * 4. Click: Deploy > New deployment
 * 5. Under "Select type" (gear icon), select "Web app"
 * 6. Set Description: "BCAS Lead Capture Webhook v1"
 * 7. Set "Execute as": "Me" (your Google account)
 * 8. CRITICAL: Set "Who has access": "Anyone" (allows website inquiry forms to submit)
 * 9. Click "Deploy", authorize permissions when prompted, and copy the Web App URL.
 * 10. Paste the Web App URL into the website's Google Sheets Setup modal!
 *
 * TARGET GOOGLE SHEET COLUMNS:
 *  Col A: Timestamp
 *  Col B: Name
 *  Col C: Email
 *  Col D: Phone
 *  Col E: Interest (Country / Degree)
 *  Col F: Message
 *  Col G: Page URL (https://bcasinternationalplacement.vercel.app/ or https://bcasinternational.lk)
 *  Col H: UTM Source
 *  Col I: UTM Medium
 *  Col J: UTM Campaign
 *  Col K: Lead Status (Defaults to "New")
 */

// ------------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------------

// If this script is attached to your Google Sheet (Extensions > Apps Script),
// leave SHEET_ID empty ('') to automatically use the active spreadsheet!
// If running as a standalone script, paste your Spreadsheet ID between quotes.
var SHEET_ID = '';

// Name of the tab/sheet where leads will be saved
var SHEET_NAME = 'Leads';

// Email address to receive instant lead notification alerts
var NOTIFICATION_EMAIL = 'ahmathmusharraf@gmail.com';

/**
 * Handles incoming HTTP POST requests from website inquiry forms
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Wait up to 10 seconds for concurrent submissions to prevent row collision
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

    // 2. Extract and sanitize lead fields
    var name = (data.fullName || data.name || 'Prospective Student').trim();
    var email = (data.email || '').trim();
    var phone = (data.phone || '').trim();
    var interest = (data.interest || data.course || 'General Admissions').trim();
    var message = (data.message || '').trim();
    var pageUrl = (data.pageUrl || data.url || 'https://bcasinternationalplacement.vercel.app/').trim();
    var utmSource = (data.utmSource || data.utm_source || 'direct').trim();
    var utmMedium = (data.utmMedium || data.utm_medium || 'web-inquiry').trim();
    var utmCampaign = (data.utmCampaign || data.utm_campaign || 'general-admissions').trim();

    // 3. Open target Google Sheet (creates tab & headers automatically if not existing)
    var sheet = getOrCreateLeadSheet();

    // 4. Prepare row timestamp and values
    var timestamp = new Date();
    var leadStatus = 'New'; // Automatically mark new leads

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

    // Format new row styling: wrap message text, format timestamp, highlight status
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange(lastRow, 6).setWrap(true);
    sheet.getRange(lastRow, 11).setFontWeight('bold').setFontColor('#00239C');

    // 6. Send instant email notification to ahmathmusharraf@gmail.com
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.trim().length > 0 && NOTIFICATION_EMAIL.indexOf('@') !== -1) {
      try {
        var cleanPhoneDigits = phone.replace(/[^0-9]/g, '');
        var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
        var sourceHost = 'bcasinternationalplacement.vercel.app';
        try {
          if (pageUrl.indexOf('//') !== -1) {
            sourceHost = pageUrl.split('/')[2];
          }
        } catch (hErr) {}

        var subject = '🎓 New Student Lead: ' + name + ' (' + interest + ') - [' + sourceHost + ']';
        var htmlBody = 
          '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">' +
            '<div style="background-color: #00239C; color: #ffffff; padding: 20px 24px;">' +
              '<h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: -0.5px;">BCAS International Placements</h2>' +
              '<p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Website Lead from <strong>' + sourceHost + '</strong></p>' +
            '</div>' +
            '<div style="padding: 24px; background-color: #ffffff;">' +
              '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
                '<tr><td style="padding: 10px 0; color: #64748b; width: 140px; border-bottom: 1px solid #f1f5f9;"><strong>Full Name:</strong></td><td style="padding: 10px 0; color: #0f172a; font-weight: bold; border-bottom: 1px solid #f1f5f9;">' + name + '</td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:' + email + '" style="color: #00239C; text-decoration: none; font-weight: 500;">' + email + '</a></td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;"><strong>Phone / WhatsApp:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><span style="color: #0f172a; font-weight: bold;">' + phone + '</span></td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;"><strong>Program / Interest:</strong></td><td style="padding: 10px 0; color: #00239C; font-weight: bold; border-bottom: 1px solid #f1f5f9;">' + interest + '</td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 10px 0; color: #334155; line-height: 1.5; border-bottom: 1px solid #f1f5f9;">' + (message || 'No additional message provided.') + '</td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;"><strong>Page URL:</strong></td><td style="padding: 10px 0; color: #00239C; font-size: 13px; border-bottom: 1px solid #f1f5f9;"><a href="' + pageUrl + '" target="_blank" style="color: #00239C; text-decoration: underline;">' + pageUrl + '</a></td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;"><strong>Source / Channel:</strong></td><td style="padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;">' + utmSource + ' (' + utmMedium + ')</td></tr>' +
                '<tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;"><strong>Received Time:</strong></td><td style="padding: 10px 0; color: #64748b; font-size: 13px;">' + formattedDate + '</td></tr>' +
              '</table>' +
              '<div style="margin-top: 24px; padding-top: 20px; border-top: 2px solid #f1f5f9; text-align: center;">' +
                (cleanPhoneDigits ? '<a href="https://wa.me/' + cleanPhoneDigits + '" style="display: inline-block; background-color: #10B981; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-right: 10px;">Chat on WhatsApp 💬</a>' : '') +
                '<a href="mailto:' + email + '" style="display: inline-block; background-color: #00239C; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply via Email ✉️</a>' +
              '</div>' +
            '</div>' +
            '<div style="background-color: #f8fafc; padding: 12px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">' +
              'Row #' + lastRow + ' in Google Sheet: ' + SHEET_NAME + ' · Lead Status: New · Notified: ' + NOTIFICATION_EMAIL +
            '</div>' +
          '</div>';

        MailApp.sendEmail({
          to: NOTIFICATION_EMAIL.trim(),
          subject: subject,
          htmlBody: htmlBody
        });
      } catch (mailError) {
        Logger.log('Could not send email alert: ' + mailError.toString());
      }
    }

    // 7. Return standard JSON success response with CORS support
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
 * Handles HTTP GET requests for testing endpoint health & ping checks
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'info';
  
  if (action === 'ping') {
    return createJsonResponse({
      status: 'active',
      service: 'BCAS International University Placements Lead Webhook',
      urls: [
        'https://bcasinternationalplacement.vercel.app/',
        'https://bcasinternational.lk'
      ],
      timestamp: new Date().toISOString(),
      cors: true
    }, 200);
  }

  return createJsonResponse({
    status: 'online',
    message: 'BCAS Google Apps Script Lead Webhook is active and listening for POST requests.',
    targetSheet: SHEET_NAME,
    supportedDomains: [
      'https://bcasinternationalplacement.vercel.app/',
      'https://bcasinternational.lk'
    ],
    notificationEmail: NOTIFICATION_EMAIL,
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
  sheet.setColumnWidth(7, 220); // Page URL
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
