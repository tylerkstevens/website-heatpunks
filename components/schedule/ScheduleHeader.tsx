'use client';

import type { Summit, ScheduleDay } from '@/types/schedule';
import { createFullEventICS } from '@/lib/calendar';

interface ScheduleHeaderProps {
  summit: Summit;
  days: ScheduleDay[];
}

export function ScheduleHeader({ summit, days }: ScheduleHeaderProps) {
  const handleDownloadFullSchedule = () => {
    const icsContent = createFullEventICS(summit, days);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `heatpunk-summit-${summit.year}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="section-tag">[SCHEDULE]</span>
          <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-wide mt-2 mb-3">
            SUMMIT <span className="text-[var(--accent)]">SCHEDULE</span>
          </h1>
          <p className="font-mono text-xs text-[var(--muted)]">
            <span className="text-[var(--terminal-color)]">&gt;</span> February 26-28, {summit.year} • {summit.venue.name}
          </p>
        </div>

        <button
          onClick={handleDownloadFullSchedule}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <CalendarIcon className="h-4 w-4" />
          <span className="font-mono text-xs tracking-wider">ADD_ALL_TO_CALENDAR</span>
        </button>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t border-[var(--card-border)]" />
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
