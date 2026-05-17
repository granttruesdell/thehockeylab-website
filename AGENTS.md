# The Hockey Lab — Agent Operations Guide

This file contains critical operational data, payment links, scheduling links, and workflows for The Hockey Lab website. Any agent working on this project MUST read this file before making changes to payment flows, booking systems, or confirmation pages.

## 1. Payment Links (Square)

All payments are processed through Square. When adding new CTAs or updating pricing, use these exact links:

| Item | Price | Square Link |
|---|---|---|
| **Single Coached Session** | $75 | [https://square.link/u/PMTMJz5x](https://square.link/u/PMTMJz5x) |
| **Lab Pack — 5 Sessions** | $325 | [https://square.link/u/fxlJ6lSJ](https://square.link/u/fxlJ6lSJ) |
| **Lab Pack — 10 Sessions** | $599 | [https://square.link/u/qqbxCCRe](https://square.link/u/qqbxCCRe) |
| **Young Cup Charter** | $179/mo | [https://square.link/u/zSpDjD6b](https://square.link/u/zSpDjD6b) |
| **Goalie Development Camp** | $449 | [https://square.link/u/3PkwKqfX](https://square.link/u/3PkwKqfX) |

*Note: Square payment links must be configured in the Square Dashboard to redirect to the corresponding confirmation page (see Section 3) upon successful payment.*

## 2. Scheduling Links (Acuity & Calendly)

Booking is handled via Acuity Scheduling (for paid sessions) and Calendly (for free discovery calls).

**Acuity Account:** `info@thehockeylabofficial.com`
**Acuity Trial Expiry:** May 23, 2026 (Must subscribe to Starter plan to keep links active)
**Booking Start Date:** July 1, 2026 (Pre-July 1 dates are manually blocked via messaging on the site)

| Appointment Type | Direct Booking Link |
|---|---|
| **Free Trial Session** (45 min, free) | [https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248717](https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248717) |
| **Single Coached Session** (45 min, $75) | [https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248872](https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248872) |
| **Lab Pack 5** (First Session) | [https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248882](https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248882) |
| **Lab Pack 10** (First Session) | [https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248899](https://app.acuityscheduling.com/schedule.php?owner=39339711&appointmentType=93248899) |
| **15-Min Discovery Call** (Calendly) | [https://calendly.com/thehockeylabofficial-info/free-15-min-call-with-coach-grant](https://calendly.com/thehockeylabofficial-info/free-15-min-call-with-coach-grant) |

## 3. Confirmation Pages

These pages are the post-payment or post-signup destinations. They contain embedded Acuity calendars or specific next-step instructions.

| Flow | Confirmation Page URL | Notes |
|---|---|---|
| **Free Trial** | `/free-trial-confirmation.html` | Waitlist only. No live booking calendar. Grant reaches out manually. |
| **Single Session** | `/single-session-confirmation.html` | Acuity iframe embedded. July 1+ booking only. |
| **Lab Pack 5** | `/lab-pack-5-confirmation.html` | Acuity iframe embedded. July 1+ booking only. |
| **Lab Pack 10** | `/lab-pack-10-confirmation.html` | Acuity iframe embedded. July 1+ booking only. |
| **Charter Athlete** | `/charter-confirmation.html` | Next steps + waiver link. No booking calendar. |
| **Young Cup Charter** | `/young-cup-charter-confirmation.html` | Next steps + waiver link. Specific to ages 5-7. |
| **Goalie Camp** | `/camp-confirmation.html` | Next steps + waiver link. |

## 4. Current Workflows & Rules

1. **Free Trials:** Currently operating as a waitlist. Users fill out the Netlify form on `get-started.html`, land on `free-trial-confirmation.html`, and Grant contacts them manually. Do not expose the Acuity Free Trial link until Grant gives the green light.
2. **Pre-July 1 Bookings:** The Acuity iframes on the confirmation pages are currently wrapped in a "Booking Opens July 1" message. When July 1 approaches, the HTML needs to be updated to expose the live iframe.
3. **Drop-Ins:** Drop-in sessions have been removed from the public site. They are available for members only. Do not add Drop-In CTAs to public pages.
4. **Forms:** All forms (Waitlist, Camp Registration, Native Booking Request) use Netlify Forms. Submissions go to the Netlify dashboard and trigger email notifications to Grant.

## 5. Deployment

The site is hosted on Netlify, connected to the `main` branch of the GitHub repository.
- **To deploy:** Commit and push to `main`. Netlify auto-deploys within 60 seconds.
- **Live URL:** [https://thehockeylabofficial.com](https://thehockeylabofficial.com)
