'use client';

import { useState } from 'react';
import type { ScheduleDay as ScheduleDayType, Summit } from '@/types/schedule';
import { ScheduleDay } from './ScheduleDay';

interface DayTabsProps {
  days: ScheduleDayType[];
  summit: Summit;
}

export function DayTabs({ days, summit }: DayTabsProps) {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {days.map((day, index) => (
          <button
            key={day.date}
            onClick={() => setActiveDay(index)}
            className={`px-6 py-3 font-mono text-xs tracking-wider whitespace-nowrap transition-all border ${
              activeDay === index
                ? 'bg-[var(--accent)] text-[var(--background)] border-[var(--accent)]'
                : 'bg-[var(--card-background)] text-[var(--muted)] border-[var(--card-border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            <span className="opacity-50 mr-2">{String(index + 1).padStart(2, '0')}</span>
            {day.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Active Day Content */}
      <ScheduleDay day={days[activeDay]} summit={summit} />
    </div>
  );
}
