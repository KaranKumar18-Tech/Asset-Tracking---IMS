export const CITIES = [
  { name: 'Mumbai',     count: 312, color: '#47bf72' },
  { name: 'Delhi NCR',  count: 268, color: '#47bf72' },
  { name: 'Bengaluru',  count: 241, color: '#60a5fa' },
  { name: 'Hyderabad',  count: 187, color: '#60a5fa' },
  { name: 'Chennai',    count: 143, color: '#f59e0b' },
  { name: 'Pune',       count: 98,  color: '#f59e0b' },
  { name: 'Kolkata',    count: 35,  color: '#9ca3af' },
]

export const STATS = {
  total: 1284,
  active: 847,
  transit: 214,
  idle: 200,
  missing: 23,
}

export const UTIL = [
  { name: 'Bar Counters',     pct: 82, color: '#47bf72' },
  { name: 'Backbars',         pct: 74, color: '#47bf72' },
  { name: 'POSM Sets',        pct: 68, color: '#60a5fa' },
  { name: 'Fabrication Units',pct: 51, color: '#f59e0b' },
  { name: 'Branding Assets',  pct: 43, color: '#f59e0b' },
]

export const VENDORS = [
  { name: 'Vendor A — Mumbai',     city: 'Mumbai',    count: 148 },
  { name: 'Vendor B — Delhi',      city: 'Delhi',     count: 121 },
  { name: 'Vendor C — Bengaluru',  city: 'Bengaluru', count: 98  },
  { name: 'Vendor D — Hyderabad',  city: 'Hyderabad', count: 87  },
  { name: 'Vendor E — Chennai',    city: 'Chennai',   count: 64  },
  { name: 'Vendor F — Pune',       city: 'Pune',      count: 43  },
]

export const ACTIVITY = [
  { color: '#47bf72', text: 'Premium Whisky Bar Counter #A-042 checked in — Premium Venue, Mumbai, Mumbai',           time: '2m ago'  },
  { color: '#60a5fa', text: 'Vodka Brand POSM Set #P-118 dispatched — Vendor A → Luxury Hotel',          time: '8m ago'  },
  { color: '#f59e0b', text: 'Gin Brand Backbar #B-205 overdue return flagged — Chennai',             time: '14m ago' },
  { color: '#ef4444', text: 'Rum Brand Standee #S-391 not scanned in 18 days — ALERT',         time: '22m ago' },
  { color: '#47bf72', text: 'Whisky Brand Fabrication Unit #F-077 returned to warehouse — Bengaluru',  time: '41m ago' },
  { color: '#60a5fa', text: 'Scotch Brand Display #D-156 in transit — Pune → Mumbai',                  time: '1h ago'  },
]

export const ASSETS = [
  { id: 'RFID-DG-0042', name: 'Premium Whisky Premium Bar Counter',      type: 'Bar Counter',  loc: 'Premium Venue, Mumbai, Mumbai',          vendor: 'Vendor A — Mumbai',   event: 'Premium Whisky Highball Festival',   scan: 'Today 09:24',    status: 'active'  },
  { id: 'RFID-DG-0118', name: 'Vodka Brand POSM Set (6pcs)',    type: 'POSM',         loc: 'Warehouse A, Mumbai',        vendor: 'Vendor A — Mumbai',   event: 'Unassigned',             scan: 'Yesterday',      status: 'transit' },
  { id: 'RFID-DG-0205', name: 'Whisky Brand Backbar Unit',      type: 'Backbar',      loc: 'Luxury Hotel, Chennai',           vendor: 'Vendor C — Bengaluru',    event: 'Whisky Brand Evenings',     scan: 'Today 11:05',    status: 'active'  },
  { id: 'RFID-DG-0391', name: 'Rum Brand Standee',      type: 'Branding',     loc: 'Last: Expo Fab, Hyderabad',        vendor: 'Vendor D — Hyderabad',   event: 'Unknown',                scan: '24 Apr 2026',    status: 'missing' },
  { id: 'RFID-DG-0156', name: 'Scotch Brand Display Unit',      type: 'Fabrication',  loc: 'In Transit (Pune → Mumbai)',       vendor: 'Vendor B — Delhi',  event: 'Scotch Brand Jazz Night',   scan: 'Yesterday',      status: 'transit' },
  { id: 'RFID-DG-0077', name: 'Whisky Brand Fabrication Kit',   type: 'Fabrication',  loc: 'Central Warehouse, Bengaluru',     vendor: 'Internal',           event: 'Returned',               scan: 'Today 07:30',    status: 'active'  },
  { id: 'RFID-DG-0303', name: 'Gin Brand Backbar Set',       type: 'Backbar',      loc: 'Lifestyle Hotel, Chennai',                 vendor: 'Vendor C — Bengaluru',    event: 'Gin Experience',         scan: '3 days ago',     status: 'idle'    },
  { id: 'RFID-DG-0412', name: 'Single Malt Brand Display Stand',       type: 'Branding',     loc: 'Luxury Hotel, Delhi, Delhi',              vendor: 'Vendor B — Delhi',  event: 'Single Malt Brand Launch',         scan: 'Today 10:18',    status: 'active'  },
  { id: 'RFID-DG-0447', name: 'Premium Whisky Ice Bucket Set',           type: 'POSM',         loc: 'Unknown',                          vendor: 'Vendor B — Delhi',  event: 'Unknown',                scan: '30 Apr 2026',    status: 'missing' },
  { id: 'RFID-DG-0512', name: 'Vodka Brand Neon Display',       type: 'Branding',     loc: 'Unknown — Pending Confirmation',   vendor: 'Vendor D — Hyderabad',   event: 'Unknown',                scan: '07 May 2026',    status: 'missing' },
  { id: 'RFID-DG-0334', name: 'Single Malt Brand Launch Kit',          type: 'Fabrication',  loc: 'Vendor B — Delhi, Delhi',         vendor: 'Vendor B — Delhi',  event: 'Single Malt Brand Launch',         scan: '06 May 2026',    status: 'idle'    },
  { id: 'RFID-DG-0088', name: 'Reserve Brand Display Unit',      type: 'Branding',     loc: 'In Transit (Delhi → Gurgaon)',     vendor: 'Vendor B — Delhi',  event: 'Reserve Brand Reserve Night',scan: 'Today 08:45',    status: 'transit' },
]

export const RFID_DETAIL = {
  'RFID-DG-0042': {
    name: 'Premium Whisky Premium Bar Counter', type: 'Bar Counter', status: 'active',
    loc: 'Premium Venue, Mumbai, Mumbai', vendor: 'Vendor A — Mumbai Pvt Ltd',
    event: 'Premium Whisky Highball Festival 2026', added: 'Jan 2024', weight: '45 kg',
    timeline: [
      { color: '#47bf72', title: 'Checked In — Premium Venue, Mumbai, Mumbai',    sub: 'Scanned by: Field Agent (Vendor A) · Today 09:24'     },
      { color: '#60a5fa', title: 'In Transit — Warehouse A → Premium Venue, Mumbai', sub: 'Dispatched · 11 May 2026 · 06:40'               },
      { color: '#f59e0b', title: 'Returned to Warehouse',                   sub: 'Post event · Luxury Hotel → Warehouse · 28 Apr'     },
      { color: '#47bf72', title: 'Checked In — Luxury Hotel, Delhi',       sub: 'Premium Whisky Weekend Experience · 22 Apr 2026'               },
    ]
  },
  'RFID-DG-0118': {
    name: 'Vodka Brand POSM Set (6pcs)', type: 'POSM', status: 'transit',
    loc: 'Warehouse A, Mumbai', vendor: 'Vendor A — Mumbai Pvt Ltd',
    event: 'Unassigned', added: 'Mar 2024', weight: '8 kg',
    timeline: [
      { color: '#60a5fa', title: 'Arrived at Warehouse A',            sub: 'Returned from Entertainment Venue, BKC · Yesterday'     },
      { color: '#47bf72', title: 'Checked In — Entertainment Venue, BKC',       sub: 'Vodka Brand Neon Night · 05 May 2026'                  },
      { color: '#60a5fa', title: 'Dispatched from Central Warehouse',       sub: 'Mumbai Hub → Vendor A · 04 May 2026'                },
    ]
  },
  'RFID-DG-0205': {
    name: 'Whisky Brand Backbar Unit', type: 'Backbar', status: 'active',
    loc: 'Luxury Hotel, Chennai', vendor: 'Vendor C — Bengaluru',
    event: 'Whisky Brand Evenings', added: 'Aug 2023', weight: '62 kg',
    timeline: [
      { color: '#47bf72', title: 'Checked In — Luxury Hotel, Chennai',    sub: 'Whisky Brand Evenings Event · Today 11:05'             },
      { color: '#60a5fa', title: 'In Transit — Signcraft Depot → Hyatt',   sub: 'Dispatched · 12 May 2026 · 07:00'                  },
      { color: '#47bf72', title: 'Stored at Signcraft Depot, Chennai',      sub: 'Post Luxury Hotel Event · 01 May 2026'               },
    ]
  },
  'RFID-DG-0391': {
    name: 'Rum Brand Standee', type: 'Branding', status: 'missing',
    loc: 'Last Known: Vendor D — Hyderabad, Hyderabad', vendor: 'Vendor D — Hyderabad',
    event: 'Unknown', added: 'Jun 2023', weight: '5 kg',
    timeline: [
      { color: '#ef4444', title: '⚠ ALERT — No scan in 18 days',           sub: 'Last activity: Expo Fab compound · 24 Apr 2026'     },
      { color: '#f59e0b', title: 'Idle — Vendor D — Hyderabad Yard',           sub: 'Post-event storage · 24 Apr 2026'                   },
      { color: '#47bf72', title: 'Checked In — Business Hotel, Hyderabad',        sub: 'Rum Brand Rum Night · 18 Apr 2026'             },
    ]
  },
}

export const ALERTS = [
  { type: 'missing', title: 'Rum Brand Standee — Missing',        desc: 'RFID-DG-0391 · No scan in 18 days · Last seen: Vendor D — Hyderabad, Hyderabad', time: '18 days ago',  id: 'RFID-DG-0391' },
  { type: 'missing', title: 'Premium Whisky Ice Bucket Set — Unlocated',           desc: 'RFID-DG-0447 · No scan in 12 days · Assigned to: Vendor B — Delhi, Delhi',  time: '12 days ago',  id: 'RFID-DG-0447' },
  { type: 'idle',    title: 'Gin Brand Backbar — Idle Too Long',        desc: 'RFID-DG-0303 · Stationary 8 days · No event scheduled',                      time: '8 days idle',  id: 'RFID-DG-0303' },
  { type: 'missing', title: 'Vodka Brand Neon Display — Unaccounted',      desc: 'RFID-DG-0512 · Vendor marked returned but no scan confirmation',             time: '5 days ago',   id: 'RFID-DG-0512' },
  { type: 'idle',    title: '3 POSM Sets — No Event Assigned',          desc: 'RFID-DG-0118, 0121, 0124 · Sitting at Vendor A warehouse',                   time: 'Ongoing',      id: 'RFID-DG-0118' },
  { type: 'overdue', title: 'Scotch Brand Standees — Overdue Return',      desc: 'RFID-DG-0156 · Expected back 10 May · Still in transit per last scan',       time: '2 days overdue', id: 'RFID-DG-0156' },
  { type: 'overdue', title: 'Single Malt Brand Launch Kit — Return Overdue',      desc: 'RFID-DG-0334 · Due 08 May · No check-out scan recorded',                    time: '4 days overdue', id: 'RFID-DG-0334' },
]

export const MOBILE_ASSETS = [
  { id: 'RFID-DG-0042', name: 'Premium Whisky Bar Counter',        status: 'active',  loc: 'Premium Venue, Mumbai',   scanned: '2h ago'    },
  { id: 'RFID-DG-0205', name: 'Whisky Brand Backbar',     status: 'active',  loc: 'Hyatt Chennai',     scanned: 'Today'     },
  { id: 'RFID-DG-0118', name: 'Vodka Brand POSM Set',     status: 'idle',    loc: 'Warehouse A', scanned: 'Yesterday' },
  { id: 'RFID-DG-0303', name: 'Gin Brand Backbar',     status: 'idle',    loc: 'Lifestyle Hotel, Chennai',  scanned: '3 days ago'},
]
