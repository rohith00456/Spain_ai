# Google Sheets Integration Setup Guide for SpineAI

## Why Not a Direct API Key?
Google Sheets API keys can only **read** public sheets — they **cannot write** data.
The free and reliable solution is a **Google Apps Script Web App** (acts as a mini backend).

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"SpineAI Pre-Bookings"**
3. In **Row 1**, add these headers:

| A | B | C | D | E |
|---|---|---|---|---|
| Name | Email | Phone | Timestamp | Source |

4. Copy the **Spreadsheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`

---

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Append a new row with the booking data
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.phone || '',
      data.timestamp || new Date().toLocaleString(),
      data.source || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'SpineAI Booking API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (Ctrl+S) and name the project **"SpineAI Bookings"**

---

## Step 3: Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set these options:
   - **Description**: SpineAI Booking Form
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. **Authorize** the app when prompted (click through the "unsafe app" warning — it's your own script)
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 4: Add the URL to Your Website

Open `script.js` and replace the placeholder URL at the top:

```javascript
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

---

## Step 5: Test It

1. Open your SpineAI website
2. Click **Pre-Book Now**
3. Fill in a test name, email, and phone
4. Submit the form
5. Check your Google Sheet — a new row should appear!

---

## Troubleshooting

- **No data appearing?** Make sure the Web App URL is correct and deployed as "Anyone" access
- **After changing the Apps Script code**, you must create a **New Deployment** (not just save)
- **CORS errors?** The `mode: 'no-cors'` in the fetch call handles this — data still gets sent
- **Check browser console** (F12) for ✅ or ❌ messages about the submission

---

## Note About Your API Key

The API key `AIzaSyAUHifTYOTfbQOyO6HUas5_STHClwvyb5A` you provided is a 
Google Cloud API key. These keys are only for **reading** public Google Sheets data.
For **writing** data from a frontend, the Google Apps Script approach above is the 
standard, free, and secure method used by thousands of static websites.

⚠️ **Security tip**: Consider rotating/regenerating that API key since it was shared 
in a conversation. You can do this from the Google Cloud Console → APIs & Services → Credentials.
