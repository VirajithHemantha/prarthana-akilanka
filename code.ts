function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Open the specific spreadsheet provided by the user
    var doc = SpreadsheetApp.openById("1wQKnA2sMjlpRPUS9P5gRINFJqVgWlbmAXIoLAKJX7bo");

    // We only have a Wishes section now
    var sheetName = "Wishes";
    var sheet = doc.getSheetByName(sheetName);

    // Auto-create the sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      sheet.appendRow(["Timestamp", "Guest Name", "Message"]);
      sheet.getRange("A1:C1").setFontWeight("bold").setBackground("#f3f3f3");
      sheet.setFrozenRows(1);
    }

    // Append the row
    var row = [
      new Date(),
      e.parameter.name || "",
      e.parameter.message || ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
