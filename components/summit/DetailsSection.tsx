import type { Summit, ScheduleData } from '@/types/schedule';
import { getEventTiming, formatTime } from '@/lib/scheduleUtils';

interface DetailsSectionProps {
  summit: Summit;
  scheduleData: ScheduleData;
}

export function DetailsSection({ summit, scheduleData }: DetailsSectionProps) {
  const timing = getEventTiming(scheduleData);

  // Get happy hour link from schedule data
  const happyHourSession = scheduleData.days
    .flatMap(day => day.sessions)
    .find(session => session.id === 'presummit-happy-hour');
  const happyHourLink = happyHourSession?.link || 'https://luma.com/j4sh7s8s';

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* When */}
          <div className="bg-[var(--card-background)] border-l-[3px] border-l-[var(--accent)] p-5">
            <h3 className="font-mono text-xs text-[var(--terminal-color)] mb-3">&gt; WHEN</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              <strong className="text-[var(--foreground)] block mb-1">Feb 27-28, {summit.year}</strong>
              Pre-Summit: Feb 26 - Ski Day + Evening Happy Hour<br />
              Doors: {formatTime(timing.doorsOpen)} MT<br />
              Welcome: {formatTime(timing.welcomeTime)} MT<br />
              Programming ends: {formatTime(timing.programmingEnd)} MT Saturday<br />
              2x Evening Activities: Beer Garden Dinner & Hot Tub BBQ<br />
            </p>
          </div>

          {/* Where */}
          <div className="bg-[var(--card-background)] border-l-[3px] border-l-[var(--accent)] p-5">
            <h3 className="font-mono text-xs text-[var(--terminal-color)] mb-3">&gt; WHERE</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              <strong className="text-[var(--foreground)] block mb-1">{summit.venue.name}</strong>
              {summit.venue.address}<br />
              RiNo District - Train from DIA<br />
              Hotels, restaurants nearby
            </p>
          </div>
        </div>

        {/* Public Happy Hour */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="bg-[var(--card-background)] border-2 border-[var(--terminal-color)] p-5 relative">
            <div className="absolute -top-2.5 left-4 bg-[var(--terminal-color)] text-[var(--background)] font-mono text-[10px] font-bold px-3 py-0.5 tracking-wider">
              OPEN TO ALL
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-1">
                  Welcome Happy Hour — Feb 26, 5-8 PM
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  No summit ticket required! Come meet the heatpunk community.
                </p>
              </div>
              <a
                href={happyHourLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline whitespace-nowrap border-[var(--terminal-color)] text-[var(--terminal-color)] hover:bg-[var(--terminal-color)] hover:text-[var(--background)]"
              >
                RSVP FREE ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
