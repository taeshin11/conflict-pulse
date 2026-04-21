# Conflict Pulse — PRD

> Short Title: Real-Time Pulse Monitor for Active Global Conflicts
> Last Updated: 2026-04-14

---

## Overview

Conflict Pulse is a live-style activity monitor for active global conflicts. The core metaphor is a "pulse" — each conflict zone displays an animated activity indicator that reflects current conflict tempo: the number of recent incidents, casualty reports, or significant escalations logged in the past 7 days. Visitors see a grid of conflict cards, each with a pulsing dot (red for high activity, amber for moderate, green for low), a brief status line, and a quick-access link to the country detail page.

The site offers three primary list views: a general active conflicts list, a dedicated countries-at-war page, and a most-dangerous-countries ranking. Each serves a different search intent and audience. Country detail pages provide a full breakdown of recent incidents, casualty summary, displacement data, and key actors. The design is deliberately news-dashboard in aesthetic — dark header, card grid, live-feel animations — to convey urgency and currency.

Conflict Pulse targets the same broad news-following audience as major conflict trackers, with an SEO strategy focused on high-volume informational queries like "countries at war 2026" and "active conflicts list." The site is deployed at conflict-pulse-omega.vercel.app on Vercel free tier, with Adsterra and Google AdSense monetization.

---

## Target Users & Pain Points

| User Type | Pain Point | How This Solves It |
|---|---|---|
| News Readers | Hard to get a quick "what's happening now" view | Pulse grid shows activity at a glance |
| Students | Need a citable list of all active armed conflicts | Active conflicts list with start dates and sources |
| Researchers | Most-dangerous-countries data is unstandardized | Ranked list with consistent metrics |
| Journalists | Fast orientation when covering a new conflict | Country detail pages with key actors and recent incidents |
| SEO Traffic | "countries at war 2026" is a high-volume query | Dedicated /countries-at-war/ landing page |
| Policy Analysts | Want to see conflict activity trends | Pulse trend history per conflict |

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router, SSG) | Vercel native, static pages, fast TTFB |
| Styling | Tailwind CSS | Mobile-first, animation utilities |
| Charts | Recharts | Trend sparklines per conflict |
| i18n | next-intl | 8-language support (en/ko/ja/zh/es/fr/de/pt) |
| Data | countries.json in /public/data/ | Zero DB cost, weekly manual updates |
| Ads | Adsterra + Google AdSense ca-pub-7098271335538021 | CPM monetization |
| Analytics | Google Sheets via Apps Script | Free visitor tracking |
| Deployment | Vercel free tier | Zero cost |
| Repo | GitHub (public) | Free CI/CD |

---

## Pages & Routes

```
/[locale]/                          → Home: pulse grid of all active conflicts
/[locale]/active-conflicts-list/    → Full sortable list of active armed conflicts
/[locale]/countries-at-war/         → Countries currently engaged in armed conflict
/[locale]/most-dangerous-countries/ → Ranked by danger/casualty composite score
/[locale]/country/[slug]/           → Country detail: pulse history, incidents, actors
/[locale]/about/                    → About: mission, data sources, update cadence
/[locale]/faq/                      → FAQ: what counts as an active conflict?
/api/visitor/                       → Visitor counter API route
/sitemap.xml
/robots.txt
```

### Key SEO Pages

- `/active-conflicts-list/` — "active conflicts list 2026"
- `/countries-at-war/` — "countries at war 2026"
- `/most-dangerous-countries/` — "most dangerous countries in the world"
- `/country/ukraine` — "ukraine war status"

---

## Data Model

### /public/data/countries.json

```json
{
  "updated": "2026-04-14",
  "version": "1.0.0",
  "countries": [
    {
      "id": "ukraine",
      "slug": "ukraine",
      "country": "Ukraine",
      "country_flag": "🇺🇦",
      "iso2": "UA",
      "region": "europe",
      "conflict_name": "Russia-Ukraine War",
      "conflict_type": "interstate",
      "start_date": "2022-02-24",
      "status": "active",
      "pulse_level": "critical",
      "pulse_score": 98,
      "pulse_history": [95, 96, 97, 98, 98, 97, 98],
      "recent_incidents_7d": 847,
      "casualties_total": 480000,
      "casualties_7d": 1200,
      "displaced_total": 10500000,
      "key_actors": ["Russia", "Ukraine", "NATO allies"],
      "danger_rank": 1,
      "last_incident_date": "2026-04-13",
      "summary": "Full-scale conventional warfare across eastern and southern Ukraine. Daily artillery exchanges, drone strikes, and front-line infantry combat.",
      "sources": [
        { "name": "ACLED", "url": "https://acleddata.com/" },
        { "name": "ISW", "url": "https://understandingwar.org/" }
      ]
    }
  ]
}
```

**Conflict type values**: `interstate` | `civil-war` | `insurgency` | `proxy` | `hybrid`
**Pulse level values**: `critical` | `high` | `moderate` | `low`
**Status values**: `active` | `ceasefire` | `frozen`

---

## UI Components

### PulseGrid Component

Homepage component rendering a responsive CSS grid of ConflictCard components. Filters: All / By Region / By Type. Sort: by pulse score (default), by casualties, by start date.

### ConflictCard Component

Each card shows:
- Animated pulsing dot (CSS animation, color by pulse_level)
- Country flag + conflict name
- Pulse level badge
- Recent incidents (last 7 days)
- "X days active" counter
- Link to country detail page

Pulse dot animation (Tailwind):
```tsx
<span className={`relative flex h-3 w-3`}>
  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColor}`} />
  <span className={`relative inline-flex rounded-full h-3 w-3 ${pulseColor}`} />
</span>
```

### ActiveConflictsList Component

Used on `/active-conflicts-list/`. Full sortable table with columns: Rank, Country, Conflict Name, Type, Start Date, Duration, Pulse Score, Casualties (total). Sortable by any column.

### DangerRankingList Component

Used on `/most-dangerous-countries/`. Ordered list with danger rank, country flag, conflict name, composite danger score, and key risk factor. Top 3 highlighted with gold/silver/bronze styling.

---

## Milestones & Git Push Points

### Milestone 0 — Repo Setup
```bash
gh repo create conflict-pulse --public --description "Real-Time Pulse Monitor for Active Global Conflicts"
git init && npx create-next-app@latest . --typescript --tailwind --app
npm install recharts next-intl
git add -A && git commit -m "chore: project scaffold"
git push -u origin main
```

### Milestone 1 — Data + Layout
- Populate `countries.json` with 40+ active conflicts, all fields complete
- Build `app/layout.tsx` with dark header, Adsterra zones, footer
- Build `Header.tsx`, `Footer.tsx` with visitor counter placeholder

```bash
git add -A && git commit -m "feat: countries.json + layout shell"
git push
```

### Milestone 2 — Core Features (Home + Pulse Grid)
- `PulseGrid` component with animated dots
- `ConflictCard` with pulse animation
- Home `page.tsx` with summary stats bar (total active, critical count)
- Region + type filter tabs

```bash
git add -A && git commit -m "feat: pulse grid, conflict cards, animated dots"
git push
```

### Milestone 3 — List Pages + Detail Pages
- `app/[locale]/active-conflicts-list/page.tsx` — sortable table
- `app/[locale]/countries-at-war/page.tsx` — filtered active list
- `app/[locale]/most-dangerous-countries/page.tsx` — danger ranking
- `app/[locale]/country/[slug]/page.tsx` — full country detail
- `generateStaticParams` for all dynamic routes

```bash
git add -A && git commit -m "feat: list pages + country detail pages"
git push
```

### Milestone 4 — i18n + SEO
- next-intl 8 locales
- `app/sitemap.ts` with all country slugs + list pages
- JSON-LD ItemList schema on list pages
- JSON-LD Dataset on country pages
- hreflang + canonical

```bash
git add -A && git commit -m "feat: i18n + sitemap + JSON-LD schemas"
git push
```

### Milestone 5 — Visitor Counter + Webhook
- `app/api/visitor/route.ts`
- Google Sheets Apps Script webhook
- `middleware.ts` for visit logging

```bash
git add -A && git commit -m "feat: visitor counter + Google Sheets webhook"
git push
```

### Milestone 6 — QA + Deploy
- Lighthouse audit (home + active-conflicts-list)
- Mobile at 375px
- `vercel --prod`

```bash
git add -A && git commit -m "chore: QA pass + production deploy"
git push
```

---

## Agent Team

### Agent 1 — Frontend
**Responsibilities**: PulseGrid, ConflictCard with CSS pulse animation, ActiveConflictsList sortable table, DangerRankingList, layout with dark header, Tailwind styling, Adsterra placement, mobile responsiveness.

**Start prompt**:
> "You are the Frontend agent for Conflict Pulse. Build a pulse-animated conflict grid using Tailwind's animate-ping for dot animations. Color: red for critical, amber for high, yellow for moderate, green for low. Sortable table for the active-conflicts-list page. Dark header (bg-gray-900), light content area (bg-gray-50)."

### Agent 2 — Backend/Data
**Responsibilities**: countries.json schema and population (40+ conflicts), pulse scoring logic documentation, API routes, Google Sheets webhook.

**Start prompt**:
> "You are the Backend/Data agent for Conflict Pulse. Populate countries.json with 40+ active global armed conflicts. Each entry needs pulse_score (0-100), pulse_history array (last 7 periods), recent_incidents_7d, casualties_total, displaced_total, and key_actors. Include conflicts from all regions."

### Agent 3 — SEO/Content
**Responsibilities**: Page-specific meta titles for list pages, JSON-LD ItemList on list pages, sitemap, FAQ content, i18n messages.

**Start prompt**:
> "You are the SEO/Content agent for Conflict Pulse. The three list pages (/active-conflicts-list, /countries-at-war, /most-dangerous-countries) are the primary SEO targets. Write meta titles like 'Active Conflicts List 2026 — 47 Armed Conflicts Tracked'. Write FAQ answers for what counts as an active conflict."

### Agent 4 — QA
**Responsibilities**: Pulse animation rendering on mobile, sort functionality on all list pages, country slugs 200 response, Lighthouse audit.

**Start prompt**:
> "You are the QA agent for Conflict Pulse. Verify animate-ping pulse dots render at 375px. Confirm all three list pages (/active-conflicts-list, /countries-at-war, /most-dangerous-countries) load with correct sorted data. Check all country/[slug] routes return 200."

---

## SEO Strategy

### Target Keywords

| Keyword | Volume (est.) | Target Page |
|---|---|---|
| active conflicts list | 14,000/mo | /active-conflicts-list/ |
| countries at war 2026 | 28,000/mo | /countries-at-war/ |
| most dangerous countries | 40,000/mo | /most-dangerous-countries/ |
| list of wars 2026 | 18,000/mo | /active-conflicts-list/ |
| countries currently at war | 22,000/mo | /countries-at-war/ |
| ukraine war update | 95,000/mo | /country/ukraine |
| world conflict tracker | 9,000/mo | / |

### generateMetadata for List Pages

```tsx
// /active-conflicts-list/
title: `Active Conflicts List 2026 — ${count} Armed Conflicts Tracked | Conflict Pulse`
description: `Complete list of all active armed conflicts in 2026. ${count} ongoing wars and conflicts tracked with live pulse activity scores, casualty data, and daily updates.`

// /countries-at-war/
title: `Countries at War 2026 — Full List | Conflict Pulse`
description: `${count} countries currently engaged in active armed conflict as of April 2026. Sortable by region, conflict type, and casualty count.`

// /most-dangerous-countries/
title: `Most Dangerous Countries in the World 2026 — Ranked | Conflict Pulse`
description: `Ranked list of the world's most dangerous countries by active conflict intensity, casualty rate, and displacement impact. Updated weekly.`
```

### JSON-LD Schema Types

- Home: `WebSite` with `SearchAction`
- List pages: `ItemList` of `Country` entities
- Country detail: `Dataset`

---

## Ads Integration

### Placement Strategy

```
Layout Header:           728x90 (desktop), 320x50 (mobile) — above nav
In-Content Home:         728x90 — between summary stats bar and pulse grid
List Pages In-Content:   728x90 — after first 10 rows of table
Country Detail:          300x250 — sidebar right (lg screens)
Mobile Bottom:           320x50 fixed bar
AdSense:                 ca-pub-7098271335538021 auto-ads enabled
```

---

## Launch Checklist

- [ ] GitHub repo created: `conflict-pulse`
- [ ] countries.json: 40+ active conflicts with all required fields
- [ ] PulseGrid renders with animate-ping dots at correct colors
- [ ] ConflictCard shows pulse level, flag, incidents, duration
- [ ] /active-conflicts-list/ renders sortable table
- [ ] /countries-at-war/ renders filtered active list
- [ ] /most-dangerous-countries/ renders danger ranking top 20
- [ ] Country detail pages: all slugs return 200
- [ ] Region filter tabs working on home grid
- [ ] Adsterra + AdSense keys in Vercel env vars
- [ ] Google Sheets webhook logging visits
- [ ] Visitor counter in footer
- [ ] i18n: 8 locales with no missing keys
- [ ] sitemap.xml includes list pages + all country slugs
- [ ] JSON-LD ItemList on list pages
- [ ] Lighthouse ≥ 90 (Performance, SEO)
- [ ] Pulse animations not causing layout shift at 375px
- [ ] `vercel --prod` deployed at conflict-pulse-omega.vercel.app
