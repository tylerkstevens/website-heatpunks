import type { Session, Summit } from '@/types/schedule';

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

function formatDateForICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function formatDateForGoogle(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function generateICSContent(event: CalendarEvent): string {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Heatpunks//Summit//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@heatpunks.org
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(event.start)}
DTEND:${formatDateForICS(event.end)}
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
  const [startHour, startMin] = session.start.split(':').map(Number);
  const [endHour, endMin] = session.end.split(':').map(Number);

  const startDate = new Date(`${date}T${session.start}:00`);
  const endDate = new Date(`${date}T${session.end}:00`);

  // Adjust for Mountain Time (UTC-7)
  // Note: In production, you'd use a proper timezone library
  startDate.setHours(startDate.getHours() + 7);
  endDate.setHours(endDate.getHours() + 7);

  return {
    title: `${session.title} - Heatpunk Summit ${summit.year}`,
    description: session.description || '',
    location: session.location
      ? `${session.location}, ${summit.venue.name}, ${summit.venue.address}`
      : `${summit.venue.name}, ${summit.venue.address}`,
    start: startDate,
    end: endDate,
  };
}

export function createFullEventICS(summit: Summit, days: { date: string; sessions: Session[] }[]): string {
  const events: string[] = [];

  for (const day of days) {
    for (const session of day.sessions) {
      const event = createSessionEvent(session, day.date, summit);
      events.push(`BEGIN:VEVENT
UID:${session.id}-${Date.now()}@heatpunks.org
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(event.start)}
DTEND:${formatDateForICS(event.end)}
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
${events.join('\n')}
END:VCALENDAR`;
}
