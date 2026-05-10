import { createFileRoute } from '@tanstack/react-router'
import { parseICalEvents } from '@/lib/ical-parser'

export const Route = createFileRoute('/api/calendar')({
  server: {
    handlers: {
      GET: async () => {
        const calendarId = process.env.GOOGLE_CALENDAR_ID
        if (!calendarId) {
          return Response.json({ events: [], error: 'GOOGLE_CALENDAR_ID not set' })
        }

        const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`

        try {
          const res = await fetch(icalUrl, {
            headers: { 'User-Agent': 'VacationRentalSite/1.0' },
            signal: AbortSignal.timeout(8000),
          })

          if (!res.ok) {
            return Response.json({ events: [], error: `Calendar fetch failed: ${res.status}` })
          }

          const icsText = await res.text()
          const events = parseICalEvents(icsText)

          // Serialize dates to ISO strings for JSON transport
          const serialized = events.map(e => ({
            summary: e.summary,
            start: e.start.toISOString(),
            end: e.end.toISOString(),
          }))

          return Response.json(
            { events: serialized },
            {
              headers: {
                'Cache-Control': 'public, max-age=300', // 5-min cache
              },
            }
          )
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Unknown error'
          return Response.json({ events: [], error: msg }, { status: 500 })
        }
      },
    },
  },
})
