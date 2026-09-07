// netlify/functions/ticketsnap.js
//
// Server-side proxy for the TicketSnap booking embed API.
//
// Why this exists: TicketSnap allowlists thehockeylabofficial.com for *framing*
// (Content-Security-Policy: frame-ancestors), but their availability endpoints
// send no Access-Control-Allow-Origin header. A browser fetch() straight from
// our pages is therefore blocked by CORS. Proxying through this function makes
// the request same-origin from the browser's point of view.
//
// If TicketSnap later adds CORS for our origin, the front end can call them
// directly and this function can be deleted.
//
// Routes (all GET):
//   /.netlify/functions/ticketsnap?resource=config
//     -> { eventId, eventName, types[], currency, timeZone, horizonDays, urls{} }
//   /.netlify/functions/ticketsnap?resource=availability&date=YYYY-MM-DD&type=<id>
//     -> { slots: [ { start, end, remaining, available, waitlist_available } ] }

const UPSTREAM = 'https://express.ticketsnap.ca';
const EVENT_ID = process.env.TICKETSNAP_EVENT_ID || '338';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  // Short cache: availability moves, but this stops us hammering upstream
  // when several visitors browse the same day.
  'Cache-Control': 'public, max-age=60',
};

function fail(statusCode, message) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify({ error: message }) };
}

// The embed page carries its config in a JSON <script id="booking-embed-config">.
// Parsing it means ticket types and prices always track TicketSnap rather than
// being duplicated (and going stale) in our own source.
function extractConfig(html) {
  const m = html.match(/id=["']booking-embed-config["'][^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;
  try {
    return JSON.parse(m[1].trim());
  } catch (err) {
    return null;
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return fail(405, 'Method Not Allowed');
  }

  const params = event.queryStringParameters || {};
  const resource = params.resource || 'config';

  try {
    if (resource === 'config') {
      const res = await fetch(`${UPSTREAM}/embed/booking/${EVENT_ID}`, {
        headers: { Accept: 'text/html' },
      });
      if (!res.ok) return fail(502, `Upstream returned ${res.status}`);

      const cfg = extractConfig(await res.text());
      if (!cfg) return fail(502, 'Could not parse booking config from TicketSnap');

      // Hand the browser only what the picker needs, and point the availability
      // URL back at this function rather than leaking the upstream one.
      return {
        statusCode: 200,
        headers: JSON_HEADERS,
        body: JSON.stringify({
          eventId: cfg.eventId,
          eventName: cfg.eventName,
          types: cfg.types || [],
          currency: cfg.currency || 'CAD',
          timeZone: cfg.timeZone || 'America/Vancouver',
          horizonDays: cfg.horizonDays,
          handoff: (cfg.urls && cfg.urls.handoff) || `${UPSTREAM}/booking-event/${EVENT_ID}`,
        }),
      };
    }

    if (resource === 'availability') {
      const date = params.date || '';
      const type = params.type || '';

      // Validate before forwarding — never pass raw user input upstream.
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return fail(400, 'date must be YYYY-MM-DD');
      if (!/^\d+$/.test(type)) return fail(400, 'type must be a numeric ticket_price_option_id');

      const url = `${UPSTREAM}/embed/booking/${EVENT_ID}/availability` +
                  `?date=${encodeURIComponent(date)}&ticket_price_option_id=${encodeURIComponent(type)}`;

      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) return fail(502, `Upstream returned ${res.status}`);

      const data = await res.json();
      return {
        statusCode: 200,
        headers: JSON_HEADERS,
        body: JSON.stringify({ slots: data.slots || [] }),
      };
    }

    return fail(400, `Unknown resource "${resource}"`);
  } catch (err) {
    return fail(502, `TicketSnap request failed: ${err.message}`);
  }
};
