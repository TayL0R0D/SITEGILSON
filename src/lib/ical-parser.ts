// Simple iCal parser for Google Calendar public feeds
export interface CalendarEvent {
  summary: string
  start: Date
  end: Date
}

function parseICalDateStr(raw: string): Date {
  // Raw can be: 20240601 or 20240601T120000Z or 20240601T120000+0300
  const digits = raw.replace(/[-T:Z]/g, '').slice(0, 8)
  const year = parseInt(digits.slice(0, 4))
  const month = parseInt(digits.slice(4, 6)) - 1
  const day = parseInt(digits.slice(6, 8))
  return new Date(year, month, day)
}

export function parseICalEvents(icsText: string): CalendarEvent[] {
  const events: CalendarEvent[] = []
  // Unfold long lines (RFC 5545: continuation lines begin with space/tab)
  const unfolded = icsText
    .replace(/\r\n/g, '\n')
    .replace(/\n[ \t]/g, '')
  const lines = unfolded.split('\n')

  let inEvent = false
  let summary = ''
  let start: Date | null = null
  let end: Date | null = null

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true
      summary = ''
      start = null
      end = null
    } else if (line === 'END:VEVENT') {
      if (start && end) {
        events.push({ summary, start, end })
      }
      inEvent = false
    } else if (inEvent) {
      if (line.startsWith('DTSTART')) {
        const val = line.split(':').slice(1).join(':')
        start = parseICalDateStr(val)
      } else if (line.startsWith('DTEND')) {
        const val = line.split(':').slice(1).join(':')
        end = parseICalDateStr(val)
      } else if (line.startsWith('SUMMARY:')) {
        summary = line.slice(8)
      }
    }
  }

  return events
}

// Check if a given date falls within any blocked range
export function isDateBlocked(date: Date, events: CalendarEvent[]): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return events.some(evt => {
    const s = new Date(evt.start.getFullYear(), evt.start.getMonth(), evt.start.getDate())
    const e = new Date(evt.end.getFullYear(), evt.end.getMonth(), evt.end.getDate())
    return d >= s && d < e
  })
}
