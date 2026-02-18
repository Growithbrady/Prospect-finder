# Prospect Finder 🔍
### Local Business Intelligence Tool for Home Service Companies

A web-based lead generation tool that uses the Google Places API to find and score local home service businesses as potential marketing clients. Built for identifying businesses that could benefit from website builds, SEO, reputation management, and social media services.

---

## What It Does

Prospect Finder searches Google Maps for local businesses, filters them by your criteria, and scores each one based on how likely they are to need marketing services. Results include contact info, ratings, review counts, website status, and a custom opportunity score — all exportable to CSV.

---

## Features

- **Smart Scoring** — Each business is scored based on rating, review count, and website presence to identify the highest-opportunity leads
- **Website Filter** — Search for businesses with no website (best for new builds), businesses with a website (redesign opportunities), or all businesses
- **Keyword Filters** — Include keywords to target specific services (e.g. "move out, deep clean"), or exclude keywords to filter out big chains and franchises
- **Expanded Search Queries** — Automatically generates 10-14 search variations per business type to maximize results
- **Review & Rating Filters** — Set min/max rating and review count to target businesses of the right size
- **Result Tabs** — View all results, no-website only, has-website only, or hot leads after search
- **Opportunity Labels** — Each result shows what service could be pitched (website build, reputation management, review growth, etc.)
- **CSV Export** — Download all results or copy to clipboard for use in outreach

---

## Supported Business Types

- HVAC / Heating & Cooling
- Plumbing
- Roofing
- Electrical
- Landscaping
- Pest Control
- Cleaning Services
- Handyman Services
- Custom (any business type)

---

## Tech Stack

- **Frontend** — Vanilla HTML/CSS/JS, hosted on GitHub Pages
- **Backend** — Node.js serverless function hosted on Vercel (proxies Google Places API to avoid CORS)
- **API** — Google Places Text Search + Place Details

---

## Setup

1. Get a free Google API key at [console.cloud.google.com](https://console.cloud.google.com) and enable the **Places API**
2. Visit the live tool at [growithbrady.github.io/Prospect-finder](https://growithbrady.github.io/Prospect-finder)
3. Enter your API key, city, business type, and filters
4. Click **Run Search**

---

## Backend

The Vercel backend lives at `prospect-finder-api.vercel.app/api` and proxies all Google Places API calls to avoid CORS issues. It accepts POST requests with the following actions:

- `search` — Text search for businesses by query
- `details` — Fetch full details for a specific place by `place_id`

---

## Lead Scoring

| Condition | Points |
|---|---|
| Very low rating (≤2.5) | +35 |
| Low rating (≤3.0) | +30 |
| Below average rating (≤3.5) | +22 |
| No website | +30 |
| Small review count (5-30) | +20 |
| Business is operational | +10 |
| Has phone number | +5 |

- **Hot Lead** = 70+ points
- **Warm Lead** = 50-69 points
- **Cold Lead** = below 50 points

---

## Built By

[Growithbrady](https://github.com/Growithbrady)
