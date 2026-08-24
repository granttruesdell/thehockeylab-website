# The Hockey Lab — Agent Operations Guide

Operational data, payment links, scheduling links, and workflows for The Hockey Lab website. Any agent working on this project MUST read this file before touching payment flows, booking systems, offer copy, or confirmation pages.

**Status: The Hockey Lab is OPEN.** Do not reintroduce "Opening Summer 2026", "Coming Soon", "Opening August 2026", or waitlist framing anywhere on the site.

---

## 1. Current Offer Menu (effective August 2026)

This table is the source of truth. It supersedes any older pricing found in the repo.

| Offer | Price | Format | Terms |
|---|---|---|---|
| **Free Trial** | Free | 45 min | One per athlete. Booked online via Calendly. |
| **Drop-In** | $70 | 45 min, coached | Walk-in, subject to availability. |
| **Single Coached Session** | $75 | 45 min | Pre-booked via Square. |
| **Lab Pack 5** | $325 | 5 x 45 min | Pre-paid. 6-month expiry. Non-transferable. |
| **Lab Pack 10** | $600 | 10 x 45 min | Pre-paid. 6-month expiry. Non-transferable. |
| **Lab Membership** | $280/mo | 1 session/week | Month-to-month. Cancel anytime. |
| **Lab Membership Plus** | $520/mo | 2 sessions/week | Month-to-month. Cancel anytime. |
| **Mental Edge** | $199 | 6-week cohort | Standalone. Remote or in-person. |
| **Goalie Development Camp** | $449 | Aug 31 - Sep 4, 2026 | Registration via `camp-registration.html`. |

**Retired — never reintroduce:** Young Cup, Charter Athlete, Development / Performance / Elite tiers, Hybrid Integration, Early Bird.

**Framing rule:** the core product is **semi-private** (max 2 athletes on ice). While the roster builds, many sessions will naturally run 1-on-1 — copy must still say semi-private so pairing never reads as a downgrade.

**Never use the term "lead magnet" in public-facing copy.**

---

## 2. Payment Links (Square)

| Item | Price | Square Link | Wired into site? |
|---|---|---|---|
| **Lab Membership** | $280/mo | https://square.link/u/PMTMJz5x | Yes — train, services, get-started |
| **Lab Membership Plus** | $520/mo | https://square.link/u/n9L5Hmez | Yes — train, services, get-started |
| **Lab Pack 5** | $325 | https://square.link/u/fxlJ6lSJ | Yes — train, services, get-started |
| **Lab Pack 10** | $600 | https://square.link/u/qqbxCCRe | Yes — train, services, get-started |
| **Mental Edge** | $199 | https://square.link/u/MG1hBCpz | Yes — mental-edge.html |
| **Goalie Camp** | $449 | https://square.link/u/3PkwKqfX | Launch pages only |
| **Single Coached Session** | $75 | none | Not sold online |

All prices above verified live against the Square checkout pages on 2026-08-24.
Square merchant of record: **Coquitlam Express Jr. A Hockey Club**.

> [!WARNING]
> `PMTMJz5x` was previously the $75 Single Coached Session link. It has been
> repurposed as the $280 Lab Membership. Any older reference calling it a single
> session is wrong. **There is currently no live Square link for the $75 single
> session** — `book.html` still collects those as a form request.

> [!WARNING]
> Both membership checkout pages render as a **one-time CA$ charge** with no
> recurring-billing line. If these are not true Square subscriptions, members
> will be billed once and must be re-invoiced manually every month. Verify in
> the Square dashboard before relying on them for recurring revenue.

> [!NOTE]
> Both membership descriptions in Square promise **"unlimited drop-in open ice"**.
> That benefit is not yet stated in the website copy for either tier.

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

**Funnel rule:** the **free trial is the primary entry point** everywhere. The 15-min call is the *secondary* path for hesitant parents ("not sure yet?"). Do not swap their priority.

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
| `free-trial-waitlist` | `get-started.html` |
| `session-booking` | `book.html` |
| `goalie-camp-registration` | `camp-registration.html` |
| `contact` | `contact.html` |
| `waitlist` | `waitlist.html` |

> [!NOTE]
> `book.html` and `get-started.html` still collect requests via form rather than taking payment.
> Both represent manual work for Grant. The goal is fully self-serve booking and purchase.

---

## 6. Key Files

- `index.html` — homepage: hero, value props, final CTA block
- `train.html` — primary sales page: full offer menu + value ladder table
- `get-started.html` — funnel page: trial form + Square checkout links
- `faq.html` — master pricing list under "Programs & Pricing"
- `services.html` — offer cards with checkout CTAs
- `js/shared.js` — injects global nav, mobile menu, footer. **All global nav/footer changes go here, never in individual HTML files.**
- `css/site.css` — all CSS custom properties (`--gold: #FFD700`, `--dark-1: #080808`)
- `netlify.toml` — clean-URL redirects, security headers
- `netlify/functions/` — `form-submission.js`, `square-webhook.js`

---

## 7. Update Protocols

1. **Audit before replacing.** Always `grep` the whole repo for a price or term before changing it.
2. **Pricing changes are synchronous** across `train.html`, `services.html`, `get-started.html`, `faq.html`, `index.html`.
3. **Maintain the value ladder:** Drop-in > Pack 5 > Pack 10 = Membership Plus on a per-session basis.
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
