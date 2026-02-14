import type { Session, Summit } from '@/types/schedule';

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  dateString: string; // Store the date string for proper formatting
  startTime: string;  // Store the time string (HH:MM)
  endTime: string;    // Store the time string (HH:MM)
}

// Format date for ICS with timezone (America/Denver)
function formatDateTimeForICS(dateString: string, timeString: string): string {
  // dateString format: "2026-02-27"
  // timeString format: "09:00"
  const [year, month, day] = dateString.split('-');
  const [hour, minute] = timeString.split(':');

  // Format as YYYYMMDDTHHMMSS for local time
  return `${year}${month}${day}T${hour}${minute}00`;
}

function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

// Mountain Time (Denver) timezone definition for ICS
const MOUNTAIN_TIMEZONE = `BEGIN:VTIMEZONE
TZID:America/Denver
BEGIN:STANDARD
DTSTART:20251102T020000
TZOFFSETFROM:-0600
TZOFFSETTO:-0700
TZNAME:MST
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:20260308T020000
TZOFFSETFROM:-0700
TZOFFSETTO:-0600
TZNAME:MDT
END:DAYLIGHT
END:VTIMEZONE`;

export function generateICSContent(event: CalendarEvent): string {
  const startDateTime = formatDateTimeForICS(event.dateString, event.startTime);
  const endDateTime = formatDateTimeForICS(event.dateString, event.endTime);
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Heatpunks//Summit//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${MOUNTAIN_TIMEZONE}
BEGIN:VEVENT
UID:${Date.now()}@heatpunks.org
DTSTAMP:${dtstamp}
DTSTART;TZID=America/Denver:${startDateTime}
DTEND;TZID=America/Denver:${endDateTime}
SUMMARY:${escapeICSText(event.title)}
DESCRIPTION:${escapeICSText(event.description)}
LOCATION:${escapeICSText(event.location)}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${formatDateForGoogle(event.start)}/${formatDateForGoogle(event.end)}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateAppleCalendarUrl(event: CalendarEvent): string {
  // Apple Calendar uses .ics files, so we generate a data URL
  const icsContent = generateICSContent(event);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}

export function createSessionEvent(
  session: Session,
  date: string,
  summit: Summit
): CalendarEvent {
  // Create Date objects for Google Calendar (which handles timezones differently)
  const startDate = new Date(`${date}T${session.start}:00-07:00`); // MST offset
  const endDate = new Date(`${date}T${session.end}:00-07:00`); // MST offset

  return {
    title: `${session.title} - Heatpunk Summit ${summit.year}`,
    description: session.description || '',
    location: session.location
      ? `${session.location}, ${summit.venue.name}, ${summit.venue.address}`
      : `${summit.venue.name}, ${summit.venue.address}`,
    start: startDate,
    end: endDate,
    dateString: date,
    startTime: session.start,
    endTime: session.end,
  };
}

export function createFullEventICS(summit: Summit, days: { date: string; sessions: Session[] }[]): string {
  const events: string[] = [];
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  for (const day of days) {
    for (const session of day.sessions) {
      const event = createSessionEvent(session, day.date, summit);
      const startDateTime = formatDateTimeForICS(event.dateString, event.startTime);
      const endDateTime = formatDateTimeForICS(event.dateString, event.endTime);

      events.push(`BEGIN:VEVENT
UID:${session.id}-${Date.now()}@heatpunks.org
DTSTAMP:${dtstamp}
DTSTART;TZID=America/Denver:${startDateTime}
DTEND;TZID=America/Denver:${endDateTime}
SUMMARY:${escapeICSText(event.title)}
DESCRIPTION:${escapeICSText(event.description)}
LOCATION:${escapeICSText(event.location)}
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT`);
    }
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Heatpunks//Summit//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Heatpunk Summit ${summit.year}
X-WR-TIMEZONE:America/Denver
${MOUNTAIN_TIMEZONE}
${events.join('\n')}
END:VCALENDAR`;
}
