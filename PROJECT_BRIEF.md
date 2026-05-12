# AssetPulse — Project Brief & Build Plan
### Experiential Asset Tracking & Inventory Management Platform
**Client:** [FMCG / Beverage Client — Confidential]
**Delivery Partner:** EMB Global
**Document Type:** Pre-Sales Brief + Full Build Plan
**Status:** Demo v1.0 Built · Discovery Call Scheduled
**Last Updated:** May 2026

---

## Table of Contents

1. [Client Overview](#1-client-overview)
2. [Business Context](#2-business-context)
3. [The Problem Statement](#3-the-problem-statement)
4. [Client Requirements](#4-client-requirements)
5. [Solution Overview](#5-solution-overview)
6. [Platform Architecture](#6-platform-architecture)
7. [Feature Breakdown — Screen by Screen](#7-feature-breakdown--screen-by-screen)
8. [Tech Stack](#8-tech-stack)
9. [Build Plan — Phase by Phase](#9-build-plan--phase-by-phase)
10. [Claude Code Prompts](#10-claude-code-prompts)
11. [Vendor Assessment — Gravitones](#11-vendor-assessment--gravitones)
12. [Demo vs Production Gap](#12-demo-vs-production-gap)
13. [Discovery Call Questions](#13-discovery-call-questions)
14. [EMB Engagement Model](#14-emb-engagement-model)
15. [UI Theme Reference](#15-ui-theme-reference)

---

## 1. Client Overview

| Field | Detail |
|---|---|
| **Industry** | FMCG — Premium Beverage / Spirits |
| **Listed On** | NSE & BSE |
| **HQ** | Bengaluru, India |
| **Revenue** | ₹27,600 Cr (FY2025) |
| **Employees** | 3,000+ |
| **Manufacturing** | 37 facilities across India |
| **Portfolio** | 50+ premium spirit brands (whisky, vodka, gin, rum, single malt) |
| **Parent** | Global beverage leader (London HQ, FTSE 100) |

---

## 2. Business Context

### The Advertising Constraint
The client operates in a category where **traditional advertising (TV, mass media, digital) is severely restricted** under Indian regulations. Each state has its own rules governing pricing, distribution, and promotion. This means:

- Traditional media is largely unavailable for brand building
- Brand building happens **at the point of sale** and through **controlled consumer touchpoints**
- **Experiential marketing is the primary brand-building channel**

### What Experiential Marketing Means at This Scale
The client runs hundreds of brand activations across India every year — pop-up bars at premium hotels, curated tasting experiences, product launches, nightclub takeovers, themed consumer events.

For each activation, they deploy a set of **physical branded assets**:

| Asset Category | Examples |
|---|---|
| **Bars** | Portable branded bar counters, modular bar units |
| **Backbars** | Branded display shelving, branded fixtures behind bar |
| **POSM** | Standees, tent cards, menu boards, wobblers, neon signs, branded glassware |
| **Fabrication Units** | Custom display fabrications, branded props, furniture |
| **Branding Assets** | Banners, vinyl wraps, backdrop panels, branded lanyards |

These assets **travel constantly** across a complex supply chain:

```
Fabrication Unit → Central Warehouse → Vendor → Event Venue → Back to Vendor/Warehouse
```

This happens across **7+ cities**, **50+ vendors**, and **hundreds of events per year**.

---

## 3. The Problem Statement

| # | Pain Point | Business Impact |
|---|---|---|
| 1 | No single view of where an asset is at any time | Assets go missing, events can't be set up on time |
| 2 | Vendors hold assets without accountability | Asset loss, no return enforcement |
| 3 | No alerts when assets sit idle or go missing | Replacement cost, brand inconsistency |
| 4 | Field teams have no tool to check-in/check-out | No custody chain, vendor disputes |
| 5 | No audit trail — who had what, when, where | No accountability for damaged/lost assets |
| 6 | Manual tracking via spreadsheets/WhatsApp | Error-prone, no real-time visibility |
| 7 | No city-wise or vendor-wise inventory report | Can't plan deployments efficiently |
| 8 | No lifecycle data — which assets need replacement | Reactive maintenance, surprise costs |

> **Analogy for discovery call:** Think of this as "Jira for physical assets" — every asset has a status, owner, current location, and full history. Or a library management system, but for branded materials across 9 cities and 50+ vendors.

---

## 4. Client Requirements

### Primary Requirement
> *"Need a centralized platform for tracking, tagging, and managing experiential assets across India including bars, backbars, fabrication units, POSM, branding assets, etc."*

| # | Requirement | Priority |
|---|---|---|
| 1 | Centralized dashboard with real-time visibility of all assets | P0 |
| 2 | QR/RFID-based asset tagging and tracking | P0 |
| 3 | Track asset movement across cities, vendors, warehouses, and events | P0 |
| 4 | Check-in/check-out system with custody logs and accountability | P0 |
| 5 | Asset lifecycle and utilization reporting | P1 |
| 6 | Vendor-wise and city-wise inventory visibility | P1 |
| 7 | Alerts for missing, delayed, or inactive assets | P1 |
| 8 | Mobile-friendly interface for on-ground teams/vendors | P1 |
| 9 | Search and filter by asset type, location, vendor, status, event | P1 |
| 10 | Audit trail and historical movement tracking | P2 |

**P0** = Must have at launch · **P1** = Required within 60 days · **P2** = Phase 2

---

## 5. Solution Overview

**AssetPulse** — A centralized, QR/RFID-based physical asset lifecycle management platform:

- **Web dashboard** — for central/city teams (full visibility + admin)
- **Mobile PWA** — for vendors and field staff (scan, custody, alerts)
- **QR/RFID scanning engine** — tag → identity → custody chain
- **Alert system** — missing, idle, overdue notifications
- **Audit + reporting layer** — lifecycle, utilization, vendor accountability

**Delivery model:** EMB Global as solution owner + Gravitones as development partner

---

## 6. Platform Architecture

```
┌──────────────────────────────────────────────────────────┐
│                   CLIENT CENTRAL TEAM                    │
│            Web Dashboard (React + Vite PWA)              │
│  Dashboard | Assets | Scan | Alerts | Reports | Admin    │
└─────────────────────┬────────────────────────────────────┘
                      │ HTTPS / REST API
┌─────────────────────▼────────────────────────────────────┐
│                  BACKEND (Node.js)                       │
│  Asset Service | Scan Service | Alert Engine | Auth      │
│  Vendor API | Event API | Reporting Service              │
└───────┬────────────────┬──────────────────┬─────────────┘
        │                │                  │
┌───────▼──────┐ ┌───────▼──────┐ ┌────────▼────────┐
│  PostgreSQL  │ │    Redis     │ │  File Storage   │
│ (Supabase)   │ │ (Real-time   │ │ (Asset photos,  │
│ Assets/Scans │ │  cache)      │ │  QR images)     │
└──────────────┘ └──────────────┘ └─────────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│           MOBILE PWA (React — same codebase)             │
│      Vendor View | Scan | Custody List | Alerts          │
│           Installable on Android + iOS                   │
└──────────────────────────────────────────────────────────┘
        │
┌───────▼────────────────────────────┐
│         QR / RFID Layer            │
│  QR: html5-qrcode (camera scan)    │
│  RFID: Web Serial API / BLE bridge │
│  QR Generation: qrcode.react       │
└────────────────────────────────────┘
```

### QR vs RFID Decision

| Factor | QR Code | RFID |
|---|---|---|
| Cost | ₹0 (print-on-demand) | ₹50–200 per tag |
| Scanning | Phone camera | RFID reader device |
| Range | Close range (line of sight) | Up to 10m (passive), 100m (active) |
| Durability | Medium | High (embedded) |
| **Recommendation** | **Phase 1 — Start with QR** | **Phase 2 — Add RFID for warehouse bulk scan** |

---

## 7. Feature Breakdown — Screen by Screen

### Screen 1: Dashboard `/`
**Users:** Central Team, City Managers
- Stat cards: Total Assets, Active, In Transit, Missing
- City-wise distribution bar chart
- Live activity feed (real-time, auto-refreshing)
- Utilization by asset type
- Top vendors by custody count

### Screen 2: Asset Registry `/assets`
**Users:** Central Team, City Managers
- Search bar + 4 filter dropdowns (type, city, status, event)
- Data table: RFID ID, Name, Type, Location, Vendor, Event, Last Scan, Status
- Row click → Scan detail view
- Export CSV (Phase 2)

### Screen 3: RFID / QR Scan `/scan`
**Users:** All roles
- Camera QR scanner (html5-qrcode) + manual input fallback
- Asset detail card: name, type, location, vendor, event, weight
- Movement history timeline (full custody chain)
- Check In / Check Out buttons with toast confirmation

### Screen 4: Alerts `/alerts`
**Users:** Central Team, Managers, Vendors (own only)
- Summary pills: Missing | Idle | Overdue
- Color-coded list: 🔴 Missing · 🟡 Idle · 🔵 Overdue
- Click → asset scan detail
- Mark resolved button

### Screen 5: Mobile Field View `/mobile`
**Users:** Vendors, Field teams
- Phone-optimized bottom nav layout
- Scan QR/RFID button (camera)
- My Custody list
- Recent scan history + overdue badges
- Check-in / Check-out flow

### Screen 6: Asset Detail `/assets/:id`
**Users:** All web users
- Full asset profile + RFID/QR ID
- Complete movement history timeline
- Photo gallery (Phase 2)
- Print QR label button

### Screen 7: Reports `/reports` — Phase 2
- Utilization by asset type (bar chart)
- Vendor accountability table (return rate)
- City deployment heatmap
- Export Excel/PDF

### Screen 8: Admin `/admin` — Phase 2
- Asset CRUD, vendor/event management
- User roles (Admin, City Manager, Vendor)
- RFID/QR tag generation + printing
- Alert threshold settings

---

## 8. Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 (EMB brand tokens) |
| Routing | React Router v6 |
| Icons | Lucide React |
| Charts | Recharts |
| QR Scanner | html5-qrcode |
| QR Generator | qrcode.react |
| State (Phase 2) | Zustand |
| PWA | vite-plugin-pwa |

### Backend (Phase 2)

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (role-based, JWT) |
| Real-time | Supabase Realtime |
| Storage | Supabase Storage |
| Notifications | Firebase FCM |
| Hosting | Vercel + Railway |

### Core Database Schema

```sql
assets      -- asset_id, name, type, rfid_tag, qr_code, weight, added_date, status
vendors     -- vendor_id, name, city, contact, active
events      -- event_id, name, venue, city, start_date, end_date
scan_logs   -- log_id, asset_id, vendor_id, event_id, action, location, timestamp, scanned_by
alerts      -- alert_id, asset_id, type (missing/idle/overdue), created_at, resolved_at
users       -- user_id, name, email, role (admin/manager/vendor), vendor_id
```

---

## 9. Build Plan — Phase by Phase

### Phase 0 — Demo ✅ DONE
**Output:** Interactive React PWA demo with mock data

### Phase 1 — MVP (Weeks 1–6)

| Week | Deliverables |
|---|---|
| 1 | Supabase schema, auth (login + roles) |
| 2 | Dashboard with real Supabase data |
| 3 | Asset registry — CRUD, search, filters |
| 4 | QR camera scan, check-in/out to DB |
| 5 | Alert engine — cron job, alert list |
| 6 | Mobile PWA polish, UAT |

**Deliverable:** Live deployed URL + installable PWA

### Phase 2 — Full Product (Weeks 7–12)

| Week | Deliverables |
|---|---|
| 7 | Asset detail page, photo upload |
| 8 | Reports page, vendor accountability |
| 9 | Admin panel — vendor/event/user mgmt |
| 10 | RFID integration (if hardware confirmed) |
| 11 | Push notifications, India map view |
| 12 | Optimization, security audit, docs |

### Phase 3 — Scale
- Hindi UI for field teams
- Offline mode (PWA service worker)
- Bulk QR printing interface
- SAP/ERP integration
- AI condition detection (photo → damage assessment)

---

## 10. Claude Code Prompts

Copy these into Claude Code in VS Code. Run in order.

---

### Prompt 0 — Theme + Brand Fix (Run First)
See `CLAUDE_CODE_PROMPT_THEME_FIX.md` in project root.
Light mode, white cards, no client/brand names.

---

### Prompt 1 — QR Camera Scanner
```
Add a live camera QR code scanner to /src/pages/Scan.jsx using html5-qrcode.

- Install html5-qrcode
- "Open Camera" button activates device camera with green viewfinder UI
- On successful scan, populate the input and auto-trigger doScan()
- "Stop Camera" button to close scanner
- Rear camera default on mobile
- Graceful permission denied fallback
- Keep existing manual input
```

---

### Prompt 2 — Supabase Integration
```
Set up Supabase for this React + Vite app.

- Install @supabase/supabase-js
- Create /src/lib/supabase.js using VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY env vars
- Create /src/lib/api.js with: getAssets(filters), getAssetById(id), getScanLogs(assetId),
  createScanLog(payload), getAlerts(), resolveAlert(alertId)
- Create .env.example
- Keep mockData.js as fallback when Supabase not configured
```

---

### Prompt 3 — Auth + Role-based Routing
```
Add Supabase Auth to this app.

- Create /src/pages/Login.jsx — EMB green branding, email + password
- Create /src/hooks/useAuth.js — returns { user, role, loading, signIn, signOut }
- App.jsx: unauthenticated → /login, admin/manager → /, vendor → /mobile
- Add user avatar + sign out to TopNav
- Protect all routes, persistent session
- Store role in Supabase user metadata
```

---

### Prompt 4 — Asset Detail Page
```
Create /src/pages/AssetDetail.jsx at route /assets/:id.

- Fetch from Supabase by id (fallback to mockData RFID_DETAIL)
- Header: name, RFID/QR ID, status badge, back button
- Info grid: type, location, vendor, event, weight, tagged since, last scan
- Full movement history timeline from scan_logs
- Check In, Check Out, Flag as Missing (Admin only) buttons
- Print QR code button using qrcode.react
- Loading skeleton, mobile responsive
```

---

### Prompt 5 — India Map on Dashboard
```
Add city asset map to Dashboard using react-leaflet.

- Install react-leaflet and leaflet
- MapView component at /src/components/MapView.jsx
- India map centered at lat:20.5937, lng:78.9629, zoom:5
- Circle marker per city: size = asset count, color = green/amber/red by volume
- Popup: city name, count, status breakdown
- OpenStreetMap tiles (no API key)
- Below stat cards, height 300px, hidden below 640px
```

---

### Prompt 6 — Reports Page
```
Create /src/pages/Reports.jsx at route /reports.

- Add to TopNav + BottomNav
- Date range: 7/30/90 days + custom
- Utilization chart (Recharts BarChart) by asset type
- Vendor accountability table: name | assets | on-time | overdue | rate%
- City deployment stacked bar: Active/Idle/Missing per city
- Export as CSV (papaparse)
- EMB colors: #47bf72, #533E85, #FFE8C2
```

---

### Prompt 7 — Push Notifications
```
Add push notifications using Firebase Cloud Messaging.

- Install firebase
- /src/lib/firebase.js with VITE_FIREBASE_* env vars
- /public/firebase-messaging-sw.js service worker
- /src/hooks/useNotifications.js with requestPermission() and subscribeToAlerts()
- "Enable Notifications" prompt on first login
- Trigger: asset 10+ days without scan, or overdue return
- Notification: "⚠ Bar Counter Unit — No scan in 12 days | Mumbai"
- On click: open /scan?id=ASSET_ID
```

---

### Prompt 8 — Offline Mode
```
Add offline PWA support for field team scanning without internet.

- Update vite.config.js to GenerateSW strategy
- Cache offline: /, /scan, /mobile, /alerts
- /src/hooks/useOfflineScan.js:
  - No internet → save scan to localStorage queue
  - Internet returns → auto-sync to Supabase
  - Toast: "Syncing X offline scans..."
- Offline indicator banner
- Precache all static assets
- Show cached data when offline
```

---

## 11. Vendor Assessment — Gravitones

Gravitones — Bhubaneswar, Odisha. Specializes in AI/ML, mobile apps, web development.

### Case Study 1: Smart Industrial Monitoring & Predictive Safety System
- IoT sensor platform — heat, smoke, vibration, ML anomaly detection, compliance logging
- Stack: FastAPI, MQTT, InfluxDB, Redis, PostgreSQL
- Relevance: 🟡 Medium — architecture transferable, use case is fixed-sensor not mobile tracking

### Case Study 2: Unified GPS-Based Vehicle Tracking Platform
- GPS vehicle tracking — real-time location, geo-fencing, route history, check-in/out, mobile app
- Stack: Django, React.js, Next.js, AWS, PostgreSQL, Firebase FCM
- Relevance: 🟢 High — core DNA (track physical object, custody chain, mobile app, alerts, admin) maps directly

### Capability Map

| Requirement | Evidence | Confidence |
|---|---|---|
| Real-time dashboard | Both case studies | ✅ High |
| Mobile app | GPS Vehicle Tracking | ✅ High |
| Movement history + audit trail | GPS Vehicle Tracking | ✅ High |
| Alert system | Both case studies | ✅ High |
| Check-in/check-out | GPS Vehicle Tracking | 🟡 Adaptable |
| QR code scanning | Not shown | ❓ Confirm |
| RFID integration | Not shown | ❓ Confirm |
| React frontend | GPS Vehicle Tracking | ✅ High |
| PostgreSQL | Both case studies | ✅ High |

**Key question to ask Gravitones:** "Have you built QR scan-based check-in/check-out before?"

**Recommendation:** Use GPS Vehicle Tracking as the primary proof point in the client pitch.

---

## 12. Demo vs Production Gap

| Feature | Demo v1.0 | Production MVP |
|---|---|---|
| Dashboard stats | Hardcoded | Real DB counts |
| Activity feed | Dummy auto-updates | Supabase Realtime |
| Asset table | 12 dummy assets | Full DB (1,000+) |
| Search/filter | Client-side JS | Server-side DB query |
| RFID scan | Text input only | Live QR camera |
| Asset detail | 4 hardcoded records | Full DB lookup |
| Movement timeline | Dummy steps | Real scan_logs |
| Check-in/check-out | Alert popup | Writes to Supabase |
| Alerts | 7 hardcoded | Auto-generated by cron |
| Mobile view | Static frame mockup | Real installable PWA |
| Login/auth | None | Supabase Auth + RBAC |
| Map view | Not included | react-leaflet |
| Push notifications | Not included | Firebase FCM |
| Reports/export | Not included | Reports page + CSV |

---

## 13. Discovery Call Questions

### Scale & Volume
- How many total physical assets across India?
- Events/activations per year approximately?
- How many cities actively operating?
- How many external vendors hold assets?

### Current Process
- How are assets tracked today? (Excel / WhatsApp / nothing?)
- When an asset goes missing — how do you find out and how long does it take?
- Can you tell right now how many assets a specific vendor holds?

### Technical
- QR codes vs RFID preference? (QR cheaper to start, RFID better at scale)
- Do vendors have smartphones for a mobile app?
- Any existing system to integrate with? (SAP, ERP, vendor portal?)
- Existing asset master list to import?

### Ownership & Rollout
- Who owns this internally — IT or Marketing/Brand team?
- Pilot one city first or go national at launch?
- Ideal go-live timeline?
- Budget range in mind?

### Data & Compliance
- Should vendors see only their own assets or full city inventory?
- Data residency requirement (India-only storage)?
- SOC2/ISO27001 compliance needed?

---

## 14. EMB Engagement Model

```
Client
  │
  ▼
EMB Global (Solution Architecture + PM + Client Ownership)
  │
  ├── Frontend Dev  → Gravitones / EMB vendor network
  ├── Backend Dev   → Gravitones / EMB vendor network
  ├── Hardware      → RFID/QR vendor (to be scouted)
  └── QA            → EMB QA team
```

| Model | Description |
|---|---|
| **Disclosed** | EMB + Gravitones both presented to client |
| **White-label** | EMB delivers fully, Gravitones in background |
| **Staff Aug** | EMB provides dedicated team embedded with client |

---

## 15. UI Theme Reference

### Color System — Light Mode First

| Token | Hex | Usage |
|---|---|---|
| `emb-surface` | `#f7faf8` | Page background (light greenish white) |
| `emb-card / white` | `#ffffff` | Card backgrounds |
| `emb-border` | `#d4e8db` | Card + input borders |
| `emb-green` | `#47bf72` | Buttons, accents, active states |
| `emb-light` | `#e1f3e9` | Hover states, alternating row stripes |
| `emb-textprimary` | `#0f1e16` | Primary text (dark green, not black) |
| `emb-textsecondary` | `#3d6b4f` | Muted / secondary text |
| `emb-deep` | `#063520` | TopNav + BottomNav background ONLY |
| `emb-purple` | `#533E85` | Type/category tag pills |
| `emb-warm` | `#FFE8C2` | Warning highlights |

### Design Rules
- Page background is **light** (`#f7faf8`) — never dark
- Cards are **white** with soft green-gray border and subtle shadow
- Text is **dark green** (`#0f1e16`) on white surfaces — readable
- Only TopNav + BottomNav stay **dark** (`#063520`)
- Green buttons always have **white text** (`text-white`)
- No client/brand names visible anywhere in the UI (use generic labels)

---

*Document prepared by EMB Global Pre-Sales Team*
*Solution Architect: Karan Kumar*
*Classification: Internal + Client-Facing*
*(Remove Section 1 details before sharing externally)*
