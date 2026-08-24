// netlify/functions/square-webhook.js
//
// Receives Square webhook events (payment.updated) and creates/updates
// a Client record in the Notion Clients database when a payment is COMPLETED.
//
// Required environment variables (set in Netlify → Site configuration → Environment variables):
//   SQUARE_ACCESS_TOKEN      — Production access token from Square Developer Console
//   SQUARE_WEBHOOK_SIG_KEY   — Webhook signature key from Square Developer Console
//   NOTION_API_TOKEN         — Notion integration token
//   NOTION_CLIENTS_DB_ID     — Notion Clients database ID
//   TELEGRAM_BOT_TOKEN       — Telegram bot token (for Grant notifications)
//   TELEGRAM_CHAT_ID         — Grant's Telegram chat ID

const crypto = require('crypto');

// ── Product → Notion field mapping ────────────────────────────────────────────
// Maps Square catalog item names to Notion Membership Type + Program values.
const PRODUCT_MAP = {
  'Single Coached Session':                   { membershipType: null,                    program: 'Hockey Lab' },
  'Hockey Lab Private Session':               { membershipType: 'Private',               program: 'Private Coaching' },
  'Lab Pack — 5 Sessions':                    { membershipType: '10 Pack',               program: 'Hockey Lab' },   // closest option
  'Lab Pack — 10 Sessions':                   { membershipType: '10 Pack',               program: 'Hockey Lab' },
  'Hockey Lab Development Program':           { membershipType: 'Membership',            program: 'Development' },
  'Hockey Lab Performance Program':           { membershipType: 'Membership',            program: 'Hockey Lab' },
  'Hockey Lab Elite Program':                 { membershipType: 'Membership',            program: 'Hockey Lab' },
  'Hockey Lab Young Cup Program':             { membershipType: 'Membership',            program: 'Hockey Lab' },
  'Hockey Lab Young Cup Program (Charter Athlete)': { membershipType: 'Founding Athlete Pack', program: 'Founding Athlete' },
  'Hockey Lab Mental Edge Program':           { membershipType: 'Mental Edge',           program: 'Mental Edge' },
  'Charter Athlete Membership':               { membershipType: 'Founding Athlete Pack', program: 'Founding Athlete' },
  'Hockey Lab - Goalie Development Camp — Aug 31 - Sept 4': { membershipType: 'Goalie Dev Camp Aug 31 - Sep 4', program: 'Camp' },
};

// ── Verify Square webhook signature ───────────────────────────────────────────
function verifySquareSignature(sigKey, notificationUrl, body, squareSig) {
  const hmac = crypto.createHmac('sha256', sigKey);
  hmac.update(notificationUrl + body);
  const hash = hmac.digest('base64');
  return hash === squareSig;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const SQUARE_ACCESS_TOKEN    = process.env.SQUARE_ACCESS_TOKEN;
  const SQUARE_WEBHOOK_SIG_KEY = process.env.SQUARE_WEBHOOK_SIG_KEY;
  const NOTION_API_TOKEN       = process.env.NOTION_API_TOKEN;
  const NOTION_CLIENTS_DB_ID   = process.env.NOTION_CLIENTS_DB_ID;
  const TELEGRAM_BOT_TOKEN     = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID       = process.env.TELEGRAM_CHAT_ID;

  // ── Verify signature (skip if key not yet set, for initial testing) ──────
  if (SQUARE_WEBHOOK_SIG_KEY) {
    const squareSig = event.headers['x-square-hmacsha256-signature'] || event.headers['x-square-signature'];
    const notificationUrl = `https://thehockeylabofficial.com/.netlify/functions/square-webhook`;
    if (!squareSig || !verifySquareSignature(SQUARE_WEBHOOK_SIG_KEY, notificationUrl, event.body, squareSig)) {
      console.warn('[square-webhook] Signature verification failed.');
      return { statusCode: 403, body: 'Forbidden: invalid signature' };
    }
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: 'Bad Request: invalid JSON' };
  }

  const eventType = payload.type;
  console.log(`[square-webhook] Received event: ${eventType}`);

  // Only process payment.updated events where status = COMPLETED
  if (eventType !== 'payment.updated' && eventType !== 'payment.created') {
    return { statusCode: 200, body: 'Ignored: not a payment event' };
  }

  const payment = payload.data?.object?.payment;
  if (!payment) {
    return { statusCode: 200, body: 'Ignored: no payment object' };
  }

  if (payment.status !== 'COMPLETED') {
    console.log(`[square-webhook] Payment status is ${payment.status}, ignoring.`);
    return { statusCode: 200, body: `Ignored: payment status is ${payment.status}` };
  }

  // ── Fetch full order details to get buyer info and line items ────────────
  let buyerName = 'Unknown';
  let buyerEmail = '';
  let buyerPhone = '';
  let productName = 'Hockey Lab Purchase';
  let membershipType = null;
  let program = 'Hockey Lab';
  const amountCents = payment.amount_money?.amount || 0;
  const currency = payment.amount_money?.currency || 'CAD';
  const amountFormatted = `$${(amountCents / 100).toFixed(2)} ${currency}`;
  const paymentDate = payment.created_at ? payment.created_at.split('T')[0] : new Date().toISOString().split('T')[0];

  // Try to get buyer info from the payment's buyer_email_address
  if (payment.buyer_email_address) {
    buyerEmail = payment.buyer_email_address;
  }

  // Try to get order details for line items and customer info
  if (payment.order_id && SQUARE_ACCESS_TOKEN) {
    try {
      const orderResp = await fetch(`https://connect.squareup.com/v2/orders/${payment.order_id}`, {
        headers: {
          'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Square-Version': '2024-01-18'
        }
      });
      const orderData = await orderResp.json();
      const order = orderData.order;

      if (order?.line_items?.length > 0) {
        const firstItem = order.line_items[0];
        productName = firstItem.name || productName;
        const mapping = PRODUCT_MAP[productName];
        if (mapping) {
          membershipType = mapping.membershipType;
          program = mapping.program;
        }
      }

      // Get customer info from order's customer_id
      if (order?.customer_id && SQUARE_ACCESS_TOKEN) {
        const custResp = await fetch(`https://connect.squareup.com/v2/customers/${order.customer_id}`, {
          headers: {
            'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'Square-Version': '2024-01-18'
          }
        });
        const custData = await custResp.json();
        const customer = custData.customer;
        if (customer) {
          const first = customer.given_name || '';
          const last  = customer.family_name || '';
          buyerName  = `${first} ${last}`.trim() || buyerName;
          buyerEmail = customer.email_address || buyerEmail;
          buyerPhone = customer.phone_number || '';
        }
      }
    } catch (err) {
      console.error('[square-webhook] Error fetching order/customer:', err.message);
    }
  }

  // Fallback: use receipt_url or note for name if still unknown
  if (buyerName === 'Unknown' && payment.note) {
    buyerName = payment.note;
  }

  console.log(`[square-webhook] Processing: ${buyerName} | ${buyerEmail} | ${productName} | ${amountFormatted}`);

  // ── Create Notion Client record ──────────────────────────────────────────
  if (!NOTION_API_TOKEN || !NOTION_CLIENTS_DB_ID) {
    console.error('[square-webhook] Missing Notion credentials.');
    return { statusCode: 500, body: 'Server config error: missing Notion credentials' };
  }

  const notionProperties = {
    'Client Name':    { title: [{ text: { content: buyerName } }] },
    'Client Status':  { select: { name: 'Onboarding' } },
    'Payment Status': { select: { name: 'Paid' } },
    'Start Date':     { date: { start: paymentDate } },
    'Notes':          { rich_text: [{ text: { content: `Square payment: ${productName} — ${amountFormatted} on ${paymentDate}\nPayment ID: ${payment.id}` } }] },
  };

  if (buyerEmail) notionProperties['Email'] = { email: buyerEmail };
  if (buyerPhone) notionProperties['Phone'] = { phone_number: buyerPhone };
  if (membershipType) notionProperties['Membership Type'] = { select: { name: membershipType } };
  if (program) notionProperties['Program'] = { multi_select: [{ name: program }] };

  try {
    const notionResp = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_CLIENTS_DB_ID },
        properties: notionProperties
      })
    });

    const notionResult = await notionResp.json();
    if (!notionResp.ok) {
      console.error('[square-webhook] Notion error:', JSON.stringify(notionResult));
      return { statusCode: 500, body: `Notion error: ${notionResult.message}` };
    }

    console.log(`[square-webhook] Notion client created: ${notionResult.id}`);

    // ── Send Telegram notification ─────────────────────────────────────────
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const msg = `💳 *New Square Purchase!*\n\n👤 *${buyerName}*\n📧 ${buyerEmail || 'No email'}\n📱 ${buyerPhone || 'No phone'}\n\n🏒 *${productName}*\n💰 ${amountFormatted}\n📅 ${paymentDate}\n\n✅ Added to Notion Clients`;
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: 'Markdown'
        })
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Client created in Notion', notionId: notionResult.id })
    };

  } catch (err) {
    console.error('[square-webhook] Unexpected error:', err.message);
    return { statusCode: 500, body: `Server error: ${err.message}` };
  }
};
