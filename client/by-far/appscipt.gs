const sheetName = 'Form Data';
const scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Check if 'e' is defined and has 'parameter' property
    if (e && e.parameter) {
      const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
      const sheet = doc.getSheetByName(sheetName);

      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const nextRow = sheet.getLastRow() + 1;

      const newRow = headers.map(function (header) {
        return header === 'Date' ? new Date() : e.parameter[header];
      });

      sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

      // Log the data to check if it's correct
      Logger.log('Data stored:', newRow);

      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('Invalid request data. The "parameter" property is missing.');
    }
  } catch (e) {
    // Log any errors
    Logger.log('Error:', e);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}