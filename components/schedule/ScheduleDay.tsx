import type { ScheduleDay as ScheduleDayType, Summit, Session } from '@/types/schedule';
import { formatDate } from '@/lib/utils';
import { SessionCard } from './SessionCard';

interface ScheduleDayProps {
  day: ScheduleDayType;
  summit: Summit;
}

export function ScheduleDay({ day, summit }: ScheduleDayProps) {
  // Group sessions by track for parallel sessions
  const mainTrack: Session[] = [];
  const breakoutTrack: Session[] = [];
  let hasParallelSessions = false;

  // Check if there are parallel sessions at the same time
  const sessionsByTime: Record<string, Session[]> = {};

  for (const session of day.sessions) {
    const timeKey = `${session.start}-${session.end}`;
    if (!sessionsByTime[timeKey]) {
      sessionsByTime[timeKey] = [];
    }
    sessionsByTime[timeKey].push(session);
  }

  // Check if any time slot has multiple sessions
  for (const sessions of Object.values(sessionsByTime)) {
    if (sessions.length > 1) {
      hasParallelSessions = true;
      break;
    }
  }

  // Separate into tracks if there are parallel sessions
  if (hasParallelSessions) {
    for (const session of day.sessions) {
      if (session.track === 'breakout') {
        breakoutTrack.push(session);
      } else {
        mainTrack.push(session);
      }
    }
  }

  return (
    <div className="mb-12 last:mb-0">
      {/* Day Header */}
      <div className="mb-6 flex items-baseline gap-4">
        <h3 className="font-mono text-xl font-bold text-[var(--foreground)]">{day.name.toUpperCase()}</h3>
        <p className="font-mono text-xs text-[var(--muted)]">{formatDate(day.date)}</p>
      </div>

      {/* Sessions */}
      {hasParallelSessions && breakoutTrack.length > 0 ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Track */}
          <div>
            <h4 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">
              &gt; MAIN_TRACK
            </h4>
            <div className="space-y-2">
              {mainTrack.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  date={day.date}
                  summit={summit}
                />
              ))}
            </div>
          </div>

          {/* Breakout Track */}
          <div>
            <h4 className="font-mono text-xs tracking-wider text-[var(--accent)] mb-4">
              &gt; BREAKOUT_SESSIONS
            </h4>
            <div className="space-y-2">
              {breakoutTrack.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  date={day.date}
                  summit={summit}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {day.sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              date={day.date}
              summit={summit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
