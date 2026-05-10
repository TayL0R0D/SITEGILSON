# Casa da Serra — Direct Booking Website

A premium vacation rental direct-booking website built with TanStack Start and deployed on Netlify.

## Key Technologies

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start (SSR + file-based routing) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS (Google Fonts, CSS variables) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Features

- **Real-time availability calendar** synced from a public Google Calendar via iCal
- **Instagram-style photo gallery** with lightbox
- **WhatsApp booking flow** with terms acceptance
- **Mobile-first, premium design** with nature-inspired typography (Playfair Display + Inter)

## Running Locally

```bash
npm install
npm run dev        # Start dev server on port 3000
```

For local Netlify features (edge functions, etc.):

```bash
netlify dev        # Start on port 8888
```

## Environment Variables

Create a `.env` file:

```env
# Google Calendar (iCal) ID — make the calendar public first
# Find it in Google Calendar Settings → Integrate calendar → Calendar ID
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com

# WhatsApp number (E.164 format, no + or spaces)
VITE_WHATSAPP_NUMBER=5511999999999

# Property display info (optional, defaults provided)
VITE_PROPERTY_NAME=Casa da Serra
VITE_PROPERTY_LOCATION=Serra da Mantiqueira, MG
```

## Google Calendar Setup (Owner Instructions)

1. Open Google Calendar on your phone or computer
2. Create a new calendar (optional but recommended — e.g., "Casa da Serra Bookings")
3. Go to **Settings → [Calendar Name] → Share with specific people**
4. Under **Access permissions**, check **Make available to public**
5. Copy the **Calendar ID** (looks like `abc123@group.calendar.google.com`)
6. Set it as the `GOOGLE_CALENDAR_ID` environment variable in Netlify
7. To block dates: simply **create an event** in that calendar on the desired dates — the site will show them as unavailable within 5 minutes

## Updating Gallery Photos

Replace the placeholder URLs in `src/data/gallery.ts` with your own photos. Options:
- Upload photos to `/public/photos/` and reference as `/photos/filename.jpg`
- Use any publicly accessible image URL

## Customizing Property Info

- Property stats (guests, bedrooms, bathrooms): `src/routes/index.tsx` → `AboutSection`
- Amenities list: `src/routes/index.tsx` → `amenities` array
- Property description: `src/routes/index.tsx` → `AboutSection` paragraph
- Booking terms text: `src/components/BookingModal.tsx`
