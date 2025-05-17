const SPREADSHEET_ID = '1QBD1iRtHdTLrMan3O9TxBFy-TmaG625dazMHBaEMu7s';
const SHEET_NAME = 'PaymentGateWay-Nascon';
const FOLDER_ID = '1bmNaepEMnknfsb7H_TIt3TR4KrvXvTz8';

function doPost(e) {
  try {
    // e.postData.contents for raw body (multipart formdata won't parse to parameter)
    const params = e.parameter;

    // Required field check
    if (!params.first_name || !params.plan_select) {
      throw new Error('Missing required fields.');
    }

    // Save image if present (expecting base64 string)
    let screenshotURL = '';
    if (params.payment_screenshot && params.payment_screenshot.startsWith('data:image')) {
      screenshotURL = saveImageToDrive(params.payment_screenshot, `${params.first_name}_${Date.now()}.jpg`);
    }

    // Open Sheet and map headers to params
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Sheet named "${SHEET_NAME}" not found.`);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const keys = headers.map(h => h.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, '_'));

    // Build row respecting headers
    const row = keys.map(k => {
      if (k === 'timestamp') return new Date();
      if (k === 'payment_screenshot') return screenshotURL;
      return params[k] || '';
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function saveImageToDrive(dataUrl, filename) {
  const matches = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid image format.');

  const mimeType = matches[1];
  const base64Data = matches[2];
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, filename);

  const folder = DriveApp.getFolderById(FOLDER_ID);
  if (!folder) throw new Error('Drive folder not found.');

  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}
