import type { ScheduleData, Session } from '@/types/schedule';

/**
 * Format 24-hour time to 12-hour with AM/PM
 * Example: "09:45" → "9:45 AM"
 */
export function formatTime(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Get sessions filtered by type
 */
export function getSessionsByType(scheduleData: ScheduleData, type: string): Session[] {
  return scheduleData.days
    .flatMap(day => day.sessions)
    .filter(session => session.type === type);
}

/**
 * Extract event timing for landing page
 */
export function getEventTiming(scheduleData: ScheduleData) {
  const day1 = scheduleData.days.find(d => d.date === scheduleData.summit.dates.day1);
  const day2 = scheduleData.days.find(d => d.date === scheduleData.summit.dates.day2);

  return {
    doorsOpen: day1?.sessions.find(s => s.id === 'day1-breakfast')?.start || '08:00',
    welcomeTime: day1?.sessions.find(s => s.id === 'day1-welcome')?.start || '09:45',
    programmingEnd: day2?.sessions.find(s => s.id === 'day2-closing')?.end || '15:35',
    freeTimeEnd: day2?.sessions.find(s => s.id === 'day2-free-time')?.end || '17:00',
  };
}

/**
 * Calculate column assignments for overlapping sessions in timeline view
 */
export function calculateSessionColumns(sessions: Session[]): Array<Session & { column: number; totalColumns: number }> {
  // Sort sessions by start time, then by end time
  const sorted = [...sessions].sort((a, b) => {
    const startCompare = a.start.localeCompare(b.start);
    if (startCompare !== 0) return startCompare;
    return a.end.localeCompare(b.end);
  });

  // Track which columns are occupied at each time
  const columns: Array<{ session: Session; endTime: string }> = [];
  const result: Array<Session & { column: number; totalColumns: number }> = [];

  for (const session of sorted) {
    // Find the first available column
    let columnIndex = 0;
    while (columnIndex < columns.length) {
      // Check if this column is free (previous session ended before this one starts)
      if (columns[columnIndex].endTime <= session.start) {
        // Column is free, use it
        break;
      }
      columnIndex++;
    }

    // If no column was free, we need a new one
    if (columnIndex === columns.length) {
      columns.push({ session, endTime: session.end });
    } else {
      columns[columnIndex] = { session, endTime: session.end };
    }

    // Store the column assignment
    const sessionWithColumn = {
      ...session,
      column: columnIndex,
      totalColumns: 1, // Will be updated in second pass
    };
    result.push(sessionWithColumn);
  }

  // Second pass: determine total columns for each session
  // (how many columns exist at the time this session is active)
  for (const sessionWithColumn of result) {
    let maxColumns = 1;
    for (const other of result) {
      if (other === sessionWithColumn) continue;

      // Check if sessions overlap
      const overlap = (
        (sessionWithColumn.start < other.end && sessionWithColumn.end > other.start)
      );

      if (overlap) {
        maxColumns = Math.max(maxColumns, other.column + 1);
      }
    }
    sessionWithColumn.totalColumns = maxColumns;
  }

  return result;
}
