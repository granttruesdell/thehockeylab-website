# The Hockey Lab — Agent Operations Guide

Operational data, payment links, scheduling links, and workflows for The Hockey Lab website. Any agent working on this project MUST read this file before touching payment flows, booking systems, offer copy, or confirmation pages.

**Status: The Hockey Lab is OPEN.** Do not reintroduce "Opening Summer 2026", "Coming Soon", "Opening August 2026", or waitlist framing anywhere on the site.

---

## 1. Current Offer Menu (effective August 2026)

This table is the source of truth. It supersedes any older pricing found in the repo.

| Offer | Price | Format | Terms |
|---|---|---|---|
| **Free Trial** | Free | 45 min | One per athlete. Booked online via Calendly. **Gear is required** &mdash; goalies full gear, skaters stick/gloves/helmet/skates. Loaners may be available for U9 and under. |
| **Drop-In (coached)** | $75 | 45 min with Grant | Booked online from the live picker on `train.html`. |
| **Drop-In (uncoached)** | $20 | 30 min open ice | Booked online. Shooters and solo reps, no coaching. |
| **Single Coached Session** | $75 | 45 min | Pre-booked via Square. |
| **Lab Pack 5** | $325 | 5 x 45 min | Pre-paid. 6-month expiry. Non-transferable. |
| **Lab Pack 10** | $600 | 10 x 45 min | Pre-paid. 6-month expiry. Non-transferable. |
| **Lab Membership** | $249/mo | 1 coached session/week | Month-to-month. Cancel anytime. **Includes unlimited uncoached open ice + the full Mental Edge program.** |
| **Lab Membership Plus** | $499/mo | 2 coached sessions/week | Month-to-month. Cancel anytime. **Includes unlimited uncoached open ice + the full Mental Edge program.** |
| **Lab Membership Lite** | $99/mo | Unlimited uncoached open ice | No coached sessions. **No Mental Edge.** Not on the site yet. |
| **Mental Edge** | $199 | 6-week cohort | Standalone, for non-members. Remote or in-person. |

> [!WARNING]
> **Mental Edge is scoped to Lab Membership and Lab Plus only — never Lite.**
> Confirmed by Grant Nov 2026. Any copy saying "every Lab Membership" or
> "every membership" is wrong, because Lite is a membership and does not
> include it. Always name the two tiers explicitly. Giving a $199 program
> away with a $99/mo tier is the failure mode this guards against.

> [!NOTE]
> **The Goalie Development Camp ran Aug 31 - Sep 4, 2026 and is no longer sold.**
> Its promotion was removed from `get-started.html`, `faq.html` and the contact
> form in Oct 2026. `camp-registration.html` and `camp-confirmation.html` remain
> in the repo, unlinked, so a future camp can reuse them — update the dates and
> re-link rather than rebuilding. The Square link and the webhook product mapping
> were left in place for the same reason.

**Retired — never reintroduce:** Young Cup, Charter Athlete, Development / Performance / Elite tiers, Hybrid Integration, Early Bird.

**The brand tagline is "Where Goalies Are Built"** — used in the homepage hero, the page title, the OG title, and the global footer in `js/shared.js`. Goalies are the primary niche and the target roster for the facility. Do not revert this to "Where Athletes Are Built". Skaters are still welcome and that stays in the body copy, but it is never the headline.

**Framing rule (updated Nov 2026):** sessions run **1-on-1 with Coach Grant**, and
there are **never more than two athletes on the ice**. Lead with 1-on-1, because that
is what actually happens and it is what TicketSnap sells ("1-on-1 coached sessions").
Keep the "never more than two" clause so pairing stays available as the roster grows
without the copy becoming untrue.

Until Nov 2026 the site led with "semi-private" and carried a paragraph arguing that
"semi-private isn't a downgrade". That undersold a 1-on-1 product and defended an
objection no one had raised. Do not reinstate it. Semi-private becomes the headline
only when sessions genuinely pair up by default.

**Never use the term "lead magnet" in public-facing copy.**

---

## 2. Payment Links (Square)

| Item | Price | Checkout link | Wired into site? |
|---|---|---|---|
| **Lab Membership** | $249/mo | https://express.ticketsnap.ca/store/items/48 | Yes — train, services, get-started |
| **Lab Membership Plus** | $499/mo | https://express.ticketsnap.ca/store/items/49 | Yes — train, services, get-started |
| **Lab Membership Lite** | $99/mo | https://express.ticketsnap.ca/store/items/125 | **NOT ON THE SITE YET** |
| **Lab Pack 5** | $325 | https://express.ticketsnap.ca/store/items/46 | Yes — train, services, get-started |
| **Lab Pack 10** | $600 | https://express.ticketsnap.ca/store/items/47 | Yes — train, services, get-started |
| **Mental Edge** | $199 | https://express.ticketsnap.ca/store/items/135 | Yes — mental-edge.html |
| **Drop-In coached / uncoached** | $75 / $20 | booking picker on `train.html#book-dropin` | Yes |
| **Goalie Camp** | $449 | https://square.link/u/3PkwKqfX | Removed from the site Oct 2026 |

All prices verified live against the TicketSnap store pages on 2026-11-02.
Checkout has moved from Square to TicketSnap; merchant of record remains
**Coquitlam Express Jr. A Hockey Club**. Only the retired `launch.html`,
`launch-v2.html` and `early-bird.html` still carry Square links, deliberately.

> [!IMPORTANT]
> **Checkout is migrating from Square to TicketSnap.** Lab Pack 5 and Lab Pack 10
> have moved; everything else is still on Square until Grant supplies the links.
> TicketSnap store items are public (no sign-in wall) and share a cart, so a
> visitor can buy more than one product in a single order.
> Retired pages (`launch.html`, `launch-v2.html`, `early-bird.html`) still carry
> the old Square links and were deliberately left alone.

> [!WARNING]
> **The TicketSnap product copy contradicts the website on two points.**
> TicketSnap describes both Lab Packs as **"1-on-1"** sessions, while the site
> and the framing rule above sell **semi-private, max 2 athletes on ice**.
> TicketSnap also tells Lab Pack 5 buyers there is **"no expiry pressure"**,
> while the site states a **6-month expiry**. Whichever is true, the two must be
> reconciled — a buyer who reads one and is held to the other has a fair complaint.

> [!WARNING]
> `PMTMJz5x` was previously the $75 Single Coached Session link. It has been
> repurposed as the Lab Membership. Any older reference calling it a single
> session is wrong. **There is currently no live Square link for the $75 single
> session** — `book.html` still collects those as a form request.

> [!NOTE]
> **Memberships are real subscriptions as of Nov 2026.** They moved from Square
> one-time links to TicketSnap store items that bill monthly (`/ month` on the
> product page, subscription checkout flow). The earlier stopgap wording
> ("Start Your First Month", "no automatic billing", "one month at a time") was
> reversed at the same time. "Month-to-month, cancel anytime" is accurate again.

**Retired Square links — do not reuse:** `zSpDjD6b` (Young Cup Charter), `ydo7DV3c` (Charter).

---

## 3. Scheduling Links

**Acuity account:** `info@thehockeylabofficial.com`

| Purpose | Link |
|---|---|
| **Free Trial** (primary CTA site-wide) | https://calendly.com/thehockeylabofficial-info/free-trial-lesson-at-the-hockey-lab |
| **15-Min Discovery Call** (secondary CTA) | https://calendly.com/thehockeylabofficial-info/free-15-min-call-with-coach-grant |
| Single Coached Session (Acuity) | https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248872 |
| Lab Pack 5 first session (Acuity) | https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248882 |
| Lab Pack 10 first session (Acuity) | https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248899 |

> [!WARNING]
> **Manus dependency — `development-consultation.html` and `mental-edge-consultation.html`.**
> Both pages contain a hand-built booking calendar that POSTs to
> `https://hockeywait-en2ftlab.manus.space/api/book` — a Manus-hosted backend, not
> Netlify. It is not a Netlify Form and has no `form-name`, so nothing about it appears
> in the Netlify dashboard. If that Manus workspace is shut down, the form fails at
> submit time with a generic error and the booking is lost.
> Both pages are now orphaned — no live page links to them. All "book a call" CTAs
> point at the Calendly 15-minute link instead. Do not link back to these pages
> unless the backend is migrated off Manus.

**Funnel rule:** the homepage hero offers two distinct paths, and they must lead to
different places. **Become a Member** (primary, gold) goes to `get-started.html#membership`;
**Book a Free Trial** (secondary, outline) goes to `get-started.html#free-trial-booking`.
Before Nov 2026 both buttons landed on the same page, which made the choice meaningless.
Everywhere else the free trial remains the primary entry point, and the 15-min call stays
the secondary path for hesitant parents.

> [!IMPORTANT]
> **Booking stays on our own domain.** Do not link CTAs directly to calendly.com.
> Both calendars are embedded on branded pages, and CTAs point at those anchors:
> - Free trial → `get-started.html#free-trial-booking`
> - 15-min call → `contact.html#book-a-call`
>
> These links open in the same tab (no `target="_blank"`) so the visitor never
> leaves the site. The only places a raw calendly.com URL belongs are the two
> widget `data-url` attributes and the "trouble with the calendar?" fallback
> on `get-started.html`.

> [!NOTE]
> **Drop-in booking is live on `train.html`** under `#book-dropin`. The picker is
> ours; the availability is TicketSnap's, fetched through
> `netlify/functions/ticketsnap.js` because their API sends no CORS header.
> Session types and prices are read from TicketSnap's own config at runtime, so
> they cannot drift from what is actually charged — do not hard-code them.
> Choosing a slot opens `booking-event/338` in a new tab to finish checkout,
> and that page still requires a TicketSnap sign-in.

---

## 4. Confirmation Pages

| Flow | Page |
|---|---|
| Free Trial | `/free-trial-confirmation.html` |
| Single Session | `/single-session-confirmation.html` |
| Lab Pack 5 | `/lab-pack-5-confirmation.html` |
| Lab Pack 10 | `/lab-pack-10-confirmation.html` |
| Mental Edge | `/mental-edge-confirmation.html` |
| Goalie Camp | `/camp-confirmation.html` |

Square payment links must be configured in the Square Dashboard to redirect to the matching confirmation page after successful payment.

**Retired confirmation pages** (still in repo, pending Grant's review — do not delete without approval): `charter-confirmation.html`, `young-cup-charter-confirmation.html`, `launch.html`, `launch-v2.html`, `early-bird.html`.

---

## 5. Netlify Forms

Do not remove the `data-netlify` attribute or the hidden `form-name` input from any form.

| Form name | Page |
|---|---|
| `session-booking` | `book.html` |
| `goalie-camp-registration` | `camp-registration.html` |
| `contact` | `contact.html` |
| `waitlist` | `waitlist.html` |

> [!IMPORTANT]
> **Free trials are booked through Calendly only.** The `free-trial-waitlist` Netlify form was
> removed from `get-started.html` and replaced with an inline Calendly embed. Do not reintroduce
> a form for free trials anywhere on the site — every "book a free trial" CTA must point at
> the Calendly free-trial link.

> [!NOTE]
> `book.html` still collects paid-session requests via form rather than taking payment.
> That remains manual work for Grant. The goal is fully self-serve booking and purchase.

---

## 6. Key Files

- `index.html` — homepage: hero, value props, final CTA block
- `train.html` — primary sales page: full offer menu + value ladder table
- `get-started.html` — funnel page: trial form + Square checkout links
- `faq.html` — master pricing list under "Programs & Pricing"
- `services.html` — offer cards with checkout CTAs
- `js/shared.js` — injects global nav, mobile menu, footer. **All global nav/footer changes go here, never in individual HTML files.**
- `css/site.css` — all CSS custom properties (`--gold: #FFD700`, `--dark-1: #080808`),
  plus `.facility-grid` / `.facility-item` (photo galleries) and `.photo-feature` (wide photo band)
- `images/lab-*.{webp,jpg}` — real facility photography (Aug 2026). `grant-hockey-canada.*` is
  the Hockey Canada coaching seminar photo used on `about.html`.
- `netlify.toml` — clean-URL redirects, security headers
- `netlify/functions/` — `form-submission.js`, `square-webhook.js`

---

## 7. Update Protocols

1. **Audit before replacing.** Always `grep` the whole repo for a price or term before changing it.
2. **Pricing changes are synchronous** across `train.html`, `services.html`, `get-started.html`, `faq.html`, `index.html`.
3. **Maintain the value ladder**, and compute savings against the *current* drop-in price.
   Drop-in $75 > Pack 5 $65 (13% off) > Pack 10 $60 (20% off) > Memberships $50&ndash;$62/session.

   > [!WARNING]
   > **Do not quote a single per-session figure for memberships.** A flat
   > "~$58" was published for weeks. It came from annualizing (52 weeks / 12
   > = 4.33 sessions a month), but in a real 4-session billing month $249
   > works out to $62.25 and $499 to $62.38 — both *more* than Pack 10's $60.
   > Memberships are sold on the guaranteed slot, continuous programming,
   > unlimited open ice and Mental Edge, not on beating the pack rate.

   > [!WARNING]
   > **Recalculate every savings percentage whenever the drop-in price moves.**
   > When drop-in went $70 &rarr; $75 the pack prices were updated but the
   > percentages were not, so the site advertised 7%/14% when the real
   > discounts were 13%/20% — under-selling the packs for weeks. The
   > percentages live in `train.html` and `get-started.html`.
4. **Nav/footer changes go in `js/shared.js` only.**
5. **Commit format:** conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`).

---

## 8. Voice & Tone

- Direct, professional, performance-oriented. Grounded and evidence-based.
- No fluffy marketing language, no hype, no "hockey bro" slang.
- Focus on structure, consistency, and the 4-pillar system: **Movement, Tracking, Execution, Mindset**.
- Refer to Grant as "Coach Grant" or "Grant".

---

## 9. Deployment

Netlify, continuous deployment from the `main` branch of `granttruesdell/thehockeylab-website`.

- **To deploy:** commit and push to `main`. Netlify builds within ~60 seconds.
- **Live URL:** https://thehockeylabofficial.com
- `origin/dev` is 30 commits behind `main` and is not in use.

---

## 10. Related Context

Grant's personal wiki holds brand, strategy, and offer background:

1. `C:\Users\shred\Desktop\Grants Ai Brain\wiki\hot.md` — read first
2. `wiki\ip\hockey-lab-brand-kit.md` — fonts, logos, colors
3. `wiki\ip\hockey-lab-offer-structure.md` — offer/pricing detail

Read only from `wiki\` — never touch `raw\`.
