// netlify/functions/form-submission.js
//
// Handles Netlify form submissions for the "Free Trial Waitlist" form.
// On each submission it:
//   1. Creates a new lead in the Notion Leads database
//   2. Sends a Telegram notification to Grant
//
// Required environment variables (set in Netlify → Site configuration → Environment variables):
//   NOTION_API_TOKEN    — Your Notion integration token
//   NOTION_DATABASE_ID  — Leads database ID
//   TELEGRAM_BOT_TOKEN  — Token from Telegram BotFather
//   TELEGRAM_CHAT_ID    — Grant's Telegram chat ID

// Native fetch is available in Node.js 18+ (Netlify default as of 2023).

exports.handler = async (event) => {
  // Only accept POST requests (Netlify webhooks always POST)
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // ── Parse Netlify webhook payload ──────────────────────────────────────
    // Netlify wraps form data in a top-level "data" key when sending webhooks.
    const payload = JSON.parse(event.body);
    const formData = payload.data || payload;

    // ── Extract form fields ────────────────────────────────────────────────
    // Supports both the exact HTML field names and common snake_case variants.
    const firstName   = formData['First Name']            || formData.first_name    || '';
    const lastName    = formData['Last Name']             || formData.last_name     || '';
    const fullName    = `${firstName} ${lastName}`.trim() || 'Unknown Lead';
    const email       = formData['Email Address']         || formData.email         || '';
    const phone       = formData['Phone Number']          || formData.phone         || '';
    const ageDivision = formData['Athlete Age / Division']|| formData.age_division  || '';
    const notes       = formData['Anything Else']         || formData.notes         || '';

    // ── Environment variables ──────────────────────────────────────────────
    const NOTION_API_TOKEN   = process.env.NOTION_API_TOKEN;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

    if (!NOTION_API_TOKEN) {
      console.error('[form-submission] NOTION_API_TOKEN is not set.');
      return { statusCode: 500, body: 'Server configuration error: missing Notion token.' };
    }

    // ── 1. Create Lead in Notion ───────────────────────────────────────────
    // Schema confirmed by querying the database (collection://8baffb50-04d4-4772-8f5e-9818fefbe027).
    // Key properties used:
    //   Lead Name   (title)         — full name
    //   Email       (email)         — email address
    //   Phone       (phone_number)  — phone number
    //   Athlete Age (number)        — numeric age parsed from "12 / U13"
    //   Notes       (rich_text)     — age/division string + free-text notes
    //   Lead Source (select)        — hardcoded "Website"
    //   Sales Stage (select)        — hardcoded "New Lead"

    // Extract the numeric age from strings like "12 / U13" or "14"
    let athleteAge = null;
    const ageMatch = ageDivision.match(/\d+/);
    if (ageMatch) {
      athleteAge = parseInt(ageMatch[0], 10);
    }

    // Build the notes text combining both age/division and free-text notes
    const notesContent = [
      ageDivision ? `Age / Division: ${ageDivision}` : '',
      notes       ? `Notes: ${notes}`                : ''
    ].filter(Boolean).join('\n\n');

    const notionProperties = {
      "Lead Name": {
        title: [{ text: { content: fullName } }]
      },
      "Email": {
        email: email || null
      },
      "Phone": {
        phone_number: phone || null
      },
      "Notes": {
        rich_text: notesContent
          ? [{ text: { content: notesContent } }]
          : []
      },
      "Lead Source": {
        select: { name: "Website" }
      },
      "Sales Stage": {
        select: { name: "New Lead" }
      }
    };

    // Only include Athlete Age if we successfully parsed a number
    if (athleteAge !== null) {
      notionProperties["Athlete Age"] = { number: athleteAge };
    }

    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization':  `Bearer ${NOTION_API_TOKEN}`,
        'Content-Type':   'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent:     { database_id: NOTION_DATABASE_ID },
        properties: notionProperties
      })
    });

    if (!notionRes.ok) {
      // Log the error but don't abort — still send the Telegram alert
      const errText = await notionRes.text();
      console.error('[form-submission] Notion API error:', notionRes.status, errText);
    } else {
      const notionPage = await notionRes.json();
      console.log('[form-submission] Notion lead created:', notionPage.id);
    }

    // ── 2. Send Telegram Notification ─────────────────────────────────────
    if (TELEGRAM_BOT_TOKEN) {
      const message =
        `🏒 New Free Trial Lead!\n\n` +
        `Name: ${fullName}\n` +
        `Email: ${email || '—'}\n` +
        `Phone: ${phone || '—'}\n` +
        `Age/Division: ${ageDivision || '—'}\n` +
        `Notes: ${notes || '—'}\n\n` +
        `Follow up within 24 hours!`;

      const tgRes = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text:    message
          })
        }
      );

      if (!tgRes.ok) {
        console.error('[form-submission] Telegram API error:', tgRes.status, await tgRes.text());
      } else {
        console.log('[form-submission] Telegram notification sent.');
      }
    } else {
      console.warn('[form-submission] TELEGRAM_BOT_TOKEN not set — skipping notification.');
    }

    // ── Return success ─────────────────────────────────────────────────────
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Lead processed successfully.' })
    };

  } catch (err) {
    console.error('[form-submission] Unhandled error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
