# The Hockey Lab — Website Deployment Guide

## Live Preview (temporary)
https://8080-ilsnemzqcvwqa8c6c5wpq-24afdabe.us2.manus.computer/index.html

---

## Deploying to Netlify (Recommended — Free)

### Option A: Drag & Drop (Easiest — 2 minutes)

1. Go to **[netlify.com](https://netlify.com)** and create a free account
2. From your Netlify dashboard, click **"Add new site" → "Deploy manually"**
3. Open the `hockeylab-v2-final.zip` file and **drag the `hockeylab` folder** (not the zip itself) onto the Netlify deploy zone
4. Netlify will give you a random URL like `amazing-hockey-lab.netlify.app` — your site is live
5. To set a custom domain (e.g. `thehockeylabofficial.com`): go to **Site settings → Domain management → Add custom domain**

### Option B: GitHub + Netlify (Best for ongoing updates)

1. Create a free [GitHub](https://github.com) account
2. Create a new repository and upload the contents of the `hockeylab` folder
3. In Netlify: **"Add new site" → "Import an existing project" → Connect to GitHub**
4. Select your repo — Netlify will auto-deploy every time you push changes

---

## Netlify Form Setup (Waitlist Submissions)

The waitlist form is already wired to Netlify Forms. Once deployed:

1. Go to your Netlify dashboard → **Forms**
2. You'll see the `waitlist` form appear after the first submission
3. Go to **Form notifications** → Add your email (`grant@thehockeylabofficial.com`) to receive instant email alerts for every submission
4. All submissions are also stored in the Netlify dashboard under Forms

---

## Connecting Your Domain

If you already own `thehockeylabofficial.com`:

1. In Netlify: **Site settings → Domain management → Add custom domain**
2. Type in `thehockeylabofficial.com` and follow the DNS instructions
3. Netlify provides free SSL (HTTPS) automatically

---

## What's Included in This Build

| File | Purpose |
|------|---------|
| `index.html` | Homepage with hero, pillars, programs, testimonials, Grant section, Mental Edge teaser, CTA |
| `programs.html` | Full 4-program breakdown with pricing, inclusions, and pathway |
| `method.html` | The Method — 4 pillars deep-dive, philosophy, principles |
| `mental-edge.html` | Mental Edge standalone program page with FAQ accordion |
| `about.html` | Grant's story — 5-chapter scrolling narrative with sticky nav |
| `waitlist.html` | Waitlist form (Netlify Forms) + countdown timer + pricing table |
| `css/site.css` | Full design system — all styles, animations, responsive |
| `js/shared.js` | Nav, footer, countdown timer, scroll animations, mobile menu |
| `netlify.toml` | Netlify configuration for clean URLs and headers |
| `images/` | All 5 brand photos |

---

## Key Features Built In

- **Live countdown timer** to June 1, 2026 — appears on homepage hero and waitlist page
- **Scroll-triggered animations** — elements fade/slide in as you scroll
- **Parallax hero** — depth effect on the homepage hero image
- **Animated marquee strip** — scrolling brand phrases
- **Mobile-first responsive** — fully optimized for all screen sizes
- **Sticky mobile CTA bar** — "Join the Waitlist" pinned to bottom on mobile
- **Hamburger menu** — full-screen mobile nav with smooth animation
- **FAQ accordion** — on Mental Edge page
- **Sticky story nav** — on About Grant page, tracks scroll position
- **Number counter animations** — stats count up when scrolled into view
- **Netlify Forms** — waitlist submissions delivered to your email
- **Custom scrollbar** — gold accent throughout
- **Active nav states** — current page highlighted in nav

---

## When the Partnership is Ready to Announce

Update these two lines across the site (search for "New Facility"):

- In `index.html`: Change `Coming Soon · New Facility · Coquitlam, BC` to `Express Development Centre · Coquitlam, BC`
- In `about.html`: Update the "The Lab" chapter to mention the partnership
- In `waitlist.html`: Update the hero subtext and footer contact section

---

## Future App Development

When you're ready to build the coach/athlete/parent app (drill library, report cards, routines, etc.), the recommended stack is:

- **React Native + Expo** for iOS/Android
- **Supabase** for database + auth (free tier is generous)
- **This website** becomes the marketing front-end; the app is a separate product

---

## Questions?

Everything was built to be easily editable. All HTML is clean and well-commented. The CSS uses CSS custom properties (variables) so changing brand colors is a one-line edit.
