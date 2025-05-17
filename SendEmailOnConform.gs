function onEdit(e) {
  // Check if event object exists
  if (!e || !e.source) {
    Logger.log("Error: No valid event object. This script must be triggered by editing the sheet.");
    return;
  }

  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var conformCol = 19; // Conform is in column P (16th column)
  
  // Check if the edited cell is in the Conform column and value is "Yes"
  if (range.getColumn() == conformCol && range.getValue().toString().toUpperCase() == "YES") {
    var row = range.getRow();
    var data = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Column indices (0-based)
    var email = data[4];           // Email (column E, 5th column)
    var firstName = data[2];       // first_name (column C)
    var planSelect = data[1];      // plan_select (column B)

    // Image file IDs
    var logoFileId = '1jAtM2xQzuPunuhGG0Qj0S2w9UbRuqqmk'; // User-provided image with green tick

    // Prepare blobs
    var logoBlob = DriveApp.getFileById(logoFileId).getBlob();

    // Email subject
    var subject = "✅ Registration Confirmed!";

    // Compose HTML message
    var htmlMessage =
      `<div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
               <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">Hello ${firstName}! 👋</h1>
         <div style="text-align: center; margin-bottom: 20px;">
           <img src=\"cid:tickLogo\" alt=\"Success\" style=\"width:250px; height:460px;\" />
         </div>

         <p style="font-size: 16px;">Your registration was successful. We’re delighted to have you with us. Get ready for an amazing experience!</p>
         <div style="margin: 30px 0; text-align: center;">
           <span style="display: inline-block; font-size: 20px; font-weight: 800; padding: 12px 20px; background-color: #f5f5f5; border-radius: 4px;">📋 Plan Selected: ${planSelect}</span>
         </div>
         <p style="font-size: 16px;">If you have any questions or need assistance, simply click the button below:</p>
         <div style="text-align: center; margin: 25px 0;">
           <a href="https://nashcon.in/" style="text-decoration: none; background-color: #008CBA; color: #ffffff; padding: 12px 24px; border-radius: 4px; font-weight: 600; display: inline-block;">Visit Us</a>
         </div>
         <p style="font-size: 14px; color: #777;">We look forward to seeing you onboard! 🚀</p>
         <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #aaa;">
           powered by @PSG™
         </div>
       </div>`;

    // Send email with inline image
    try {
      MailApp.sendEmail({
        to:         email,
        subject:    subject,
        htmlBody:   htmlMessage,
        inlineImages: { tickLogo: logoBlob }
      });
      Logger.log(`Email sent to ${email} for row ${row}`);
    } catch (error) {
      Logger.log(`Error sending email to ${email}: ${error}`);
    }
  }
}
