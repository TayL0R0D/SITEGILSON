# AGENTS.md — Vacation Rental Direct Booking Site

## Project Purpose

A direct-booking website for a vacation rental property. The goal is conversion and ease of management — the owner (non-technical) manages availability through Google Calendar, and guests book via WhatsApp.

## Architecture

### File-Based Routing (TanStack Router)

All routes live in `src/routes/`:

| File | Purpose |
|------|---------|
| `__root.tsx` | Shell document: `<html>`, `<head>`, global meta |
| `index.tsx` | Full homepage (all sections in one file) |
| `api/calendar.ts` | Server-only API: fetches Google Calendar iCal, returns JSON |

### Key Components

| File | Purpose |
|------|---------|
| `src/components/AvailabilityCalendar.tsx` | Custom calendar UI; fetches `/api/calendar` on mount; handles date range selection |
| `src/components/BookingModal.tsx` | Booking flow: date summary + conditional terms (30% / full payment) + WhatsApp CTA |

### Key Libraries / Data

| File | Purpose |
|------|---------|
| `src/lib/ical-parser.ts` | Lightweight iCal parser (no dependency). Handles RFC 5545 line unfolding, DATE and DATETIME formats |
| `src/data/gallery.ts` | Gallery photo list — replace `src` URLs to update photos |

## Data Flow: Availability Calendar

```
Google Calendar (owner creates events)
  → public iCal feed (https://calendar.google.com/calendar/ical/{ID}/public/basic.ics)
    → /api/calendar (server route, 5-min Cache-Control)
      → AvailabilityCalendar component (client fetch on mount)
        → dates rendered as available/unavailable
          → BookingModal → WhatsApp deep link
```

## Configuration

All user-facing strings and IDs are driven by environment variables:

| Variable | Side | Purpose |
|----------|------|---------|
| `GOOGLE_CALENDAR_ID` | Server-only | iCal calendar ID for availability |
| `VITE_WHATSAPP_NUMBER` | Client | Phone number for WhatsApp CTA (E.164, no +) |
| `VITE_PROPERTY_NAME` | Client | Displayed name everywhere |
| `VITE_PROPERTY_LOCATION` | Client | Location tagline |

## Design System

- **Fonts**: Playfair Display (headings, serif elegance) + Inter (body, clean)
- **Colors**: defined as CSS variables in `src/styles.css` (forest green, warm gold, terracotta, cream)
- **Approach**: Mobile-first, Tailwind utility classes, `var(--color-*)` for brand colors
- **No component library** — all UI built with plain HTML elements + Tailwind

## Coding Conventions

- TypeScript strict mode — always type props interfaces
- `@/` alias maps to `src/` (configured in `tsconfig.json`)
- No comments unless the behavior is non-obvious
- Homepage sections (Hero, Gallery, Amenities, Booking, About, Footer) all live in `src/routes/index.tsx` as named function components
- Server routes use TanStack Start's `server.handlers` pattern

## Non-Obvious Decisions

- **iCal parsed server-side** to avoid CORS issues with Google Calendar feeds
- **5-minute cache** on `/api/calendar` response — balances freshness vs. performance
- **WhatsApp URL** includes pre-filled message with dates and deposit type (30% or 100% based on days-until-checkin ≤ 7)
- **Terms checkbox** gates the WhatsApp button — legal requirement for deposit acknowledgement
- **Blocked range validation** during date selection: if the user tries to select a range crossing a blocked date, the selection restarts from the clicked date
