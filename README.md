# AssetPulse — Diageo Experiential Asset Tracking Platform
### Built by EMB Global | Demo v1.0

---

## Quick Start (3 commands)

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS v3** — EMB brand colors baked in
- **React Router v6** — client-side routing
- **Lucide React** — icons
- **Recharts** — charts (ready to use)
- **PWA** — installable on mobile via vite-plugin-pwa

---

## Project Structure

```
src/
├── App.jsx                  # Router + layout
├── main.jsx                 # Entry point
├── index.css                # Tailwind + global styles
├── data/
│   └── mockData.js          # All dummy data (assets, vendors, cities, alerts)
├── components/
│   ├── ui.jsx               # Badge, Card, StatCard, shared components
│   ├── TopNav.jsx           # Desktop nav bar
│   └── BottomNav.jsx        # Mobile bottom nav
└── pages/
    ├── Dashboard.jsx        # Home — stats, city breakdown, activity feed
    ├── Assets.jsx           # Asset registry table with search + filters
    ├── Scan.jsx             # RFID/QR scan simulator + asset detail
    ├── Alerts.jsx           # Alert list — missing, idle, overdue
    └── MobileView.jsx       # Phone frame mockup + role explainer
```

---

## EMB Brand Colors (Tailwind tokens)

| Token           | Hex       | Usage                        |
|-----------------|-----------|------------------------------|
| `emb-deep`      | `#0c2114` | Page background              |
| `emb-dark`      | `#063520` | Cards, nav                   |
| `emb-mid`       | `#20452e` | Borders, dividers            |
| `emb-med`       | `#346948` | Muted text, secondary        |
| `emb-green`     | `#47bf72` | Primary accent, CTAs         |
| `emb-light`     | `#e1f3e9` | Light fills                  |
| `emb-purple`    | `#533E85` | Tags, type badges            |
| `emb-warm`      | `#FFE8C2` | Warm highlights              |

---

## Next Steps (Claude Code prompts to continue)

After the demo, use these prompts in Claude Code to build out the real app:

1. **Add real RFID/QR scanning:**
   > "Add a QR code scanner using the device camera on the Scan page using html5-qrcode library"

2. **Connect to a backend:**
   > "Set up Supabase with tables for assets, vendors, events, and scan_logs. Replace mockData with real Supabase queries using React Query"

3. **Add a map view:**
   > "Add an India map to the Dashboard showing city-wise asset distribution using react-leaflet"

4. **Add authentication:**
   > "Add login screen with role-based routing using Supabase Auth — Admin sees full dashboard, Field user sees only mobile view"

5. **Push notifications:**
   > "Add PWA push notifications for missing asset alerts using web-push"

---

## Demo Notes for Client Call

- All data is **simulated** — clearly marked with ⚙ SIMULATED badge
- RFID scan is **simulated** — enter any ID or use quick-load buttons
- Mobile frame is interactive — tap the phone screen elements
- Activity feed **auto-updates** every 6 seconds with new dummy events

---

*Powered by EMB Global · Diageo India · AssetPulse v1.0*
