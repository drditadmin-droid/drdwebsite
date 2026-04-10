# Dr. D's Dental Studio — Project Overview

> Generated: 2026-04-10 | Author: Claude Code

---

## 1. Project Summary

**Dr. D's Dental Studio** is a full-stack dental clinic website with online appointment booking. It is a monorepo with a static frontend hosted on Vercel and a Node.js/Express backend hosted on Render, connected to a Supabase (PostgreSQL) database.

---

## 2. Repository Structure

```
drdwebsite/
├── backend/
│   ├── server.js                    # Express app entry point
│   ├── db.js                        # PostgreSQL connection pool (pg)
│   ├── package.json
│   ├── .env.example
│   └── routes/
│       ├── appointment.routes.js    # Booking logic
│       ├── service.routes.js        # Services listing
│       └── slots.routes.js          # Available time slot logic
│   └── src/
│       ├── config/
│       │   ├── db.js                # Supabase SDK client
│       │   ├── env.js               # Env var validation
│       │   ├── supabase.js          # Supabase setup
│       │   └── schema.sql           # DB schema (run manually)
│       └── routes/
│           └── contact.routes.js    # Contact form submission
├── frontend/
│   ├── index.html                   # Full SPA (all styles + JS embedded)
│   └── assets/
│       ├── css/main.css             # Placeholder (empty)
│       ├── js/main.js               # Placeholder (empty)
│       ├── js/contact.js            # Contact form API helper
│       └── images/                  # Static assets
└── README.md
```

---

## 3. Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | HTML5, Vanilla JS, Embedded CSS     |
| Backend     | Node.js (v20+), Express.js          |
| Database    | Supabase (PostgreSQL)               |
| DB Client   | pg (raw pool) + @supabase/supabase-js v2 |
| Hosting FE  | Vercel                              |
| Hosting BE  | Render                              |
| Security    | Helmet.js                           |
| Logging     | Morgan                              |
| Dev Server  | Nodemon                             |
| Email       | Resend / SMTP (infrastructure ready, not implemented) |

---

## 4. Environment Variables

```env
PORT=3000
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
RESEND_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

Required at startup: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `JWT_SECRET`

---

## 5. Database Schema

### `services`
| Column           | Type           | Notes               |
|------------------|----------------|---------------------|
| id               | UUID (PK)      | auto-generated      |
| name             | text           | required            |
| duration_minutes | integer        | default 30          |
| price            | numeric(10,2)  |                     |
| is_active        | boolean        | default true        |
| created_at       | timestamp      | auto                |

### `patients`
| Column     | Type      | Notes            |
|------------|-----------|------------------|
| id         | UUID (PK) | auto-generated   |
| full_name  | text      | required         |
| phone      | text      | unique, required |
| email      | text      |                  |
| created_at | timestamp | auto             |

### `appointments`
| Column           | Type      | Notes                                   |
|------------------|-----------|-----------------------------------------|
| id               | UUID (PK) | auto-generated                          |
| patient_id       | UUID (FK) | → patients (cascade delete)             |
| service_id       | UUID (FK) | → services (set null on delete)         |
| appointment_date | date      | required                                |
| appointment_time | time      | required                                |
| notes            | text      |                                         |
| status           | text      | default 'pending'                       |
| created_at       | timestamp | auto                                    |
| **Unique**       |           | (appointment_date, appointment_time)    |

### `contacts`
| Column     | Type      | Notes |
|------------|-----------|-------|
| id         | UUID (PK) |       |
| name       | text      |       |
| email      | text      |       |
| message    | text      |       |
| created_at | timestamp | auto  |

**Seed Data:** 8 dental services pre-inserted (Checkup, Cleaning, Extraction, Root Canal, Filling, Whitening, Braces Consultation, X-Ray).

---

## 6. API Endpoints

**Base URL:** `https://drdwebsite-usxh.onrender.com`

| Method | Path               | Description                          | Auth |
|--------|--------------------|--------------------------------------|------|
| GET    | /health            | Health check                         | None |
| GET    | /services          | List all active services             | None |
| POST   | /appointments      | Book an appointment                  | None |
| GET    | /appointments      | Get appointments by date (?date=)    | None |
| GET    | /available-slots   | Get available slots (?date=)         | None |
| POST   | /api/contact       | Submit contact form                  | None |

### POST /appointments — Request Body
```json
{
  "full_name": "string (required)",
  "phone": "string (required)",
  "email": "string",
  "service_id": "uuid (required)",
  "appointment_date": "YYYY-MM-DD (required)",
  "appointment_time": "HH:MM (required)",
  "notes": "string"
}
```

### GET /available-slots
- Query: `?date=YYYY-MM-DD`
- Returns 30-minute slots from 9:00 AM – 5:00 PM minus already booked slots
- Excludes cancelled appointments from booked list

---

## 7. Frontend — Single Page Application

**File:** `frontend/index.html` (all CSS and JS embedded)

### Sections
1. **Header** — sticky nav, logo, links to sections
2. **Hero** — gradient background, CTA button
3. **Services** — dynamically loaded cards from API
4. **About** — two-column layout, responsive
5. **Testimonials** — static content cards
6. **Appointment Form** — full booking form with real-time slot loading
7. **Footer**

### Color Palette
| Token      | Hex       | Usage           |
|------------|-----------|-----------------|
| Primary    | #DEA057   | Gold — CTAs     |
| Secondary  | #CE9461   | Tan — accents   |
| Surface    | #E0D8B0   | Light gold bg   |
| Background | #FCFFE7   | Cream page bg   |
| Text       | #1F2937   | Dark gray       |

### Key JS Functions
- `loadServices()` — fetches services from API, renders cards + populates dropdown
- `loadSlots(date)` — fetches available slots on date change, populates time dropdown
- Form submit handler — POSTs to /appointments, shows success/error, resets form

---

## 8. Deployment

| Component | Platform | Notes                          |
|-----------|----------|--------------------------------|
| Frontend  | Vercel   | Static deploy, no build step   |
| Backend   | Render   | Node.js service                |
| Database  | Supabase | PostgreSQL, schema run manually |

No CI/CD automation configured — all deployments are manual.

---

## 9. Known Gaps / Areas for Improvement

- `src/controllers/`, `src/middleware/`, `src/services/`, `src/utils/` — all empty placeholders
- `frontend/assets/css/main.css` and `main.js` — empty placeholders (logic embedded in `index.html`)
- No authentication on any API endpoint (no admin protection)
- No input validation middleware
- Email sending not implemented (env vars and infrastructure set up)
- No appointment update/cancel endpoints
- No admin dashboard
- Mixed database approach: `db.js` (raw pg pool) vs `src/config/db.js` (Supabase SDK) — routes use both

---

## 10. Scripts

```bash
# Backend
npm start       # production
npm run dev     # development with nodemon

# Database
# Manually run backend/src/config/schema.sql in Supabase SQL editor
```

---

*This document was auto-generated by Claude Code for project orientation purposes.*
