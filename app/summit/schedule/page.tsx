import type { Metadata } from 'next';
import { ScheduleHeader } from '@/components/schedule/ScheduleHeader';
import { DayTabs } from '@/components/schedule/DayTabs';
import { getScheduleData } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'Schedule - Summit 2026',
  description: 'Full schedule for Heatpunk Summit 2026. View talks, workshops, panels, and demos happening February 26-28 in Denver.',
};

export default function SchedulePage() {
  const scheduleData = getScheduleData();

  return (
    <div className="relative py-12 md:py-16 bg-[var(--background)] min-h-screen">
      <div className="noise-overlay" />
      <div className="relative z-10 section-container">
        <ScheduleHeader summit={scheduleData.summit} days={scheduleData.days} />
        <DayTabs days={scheduleData.days} summit={scheduleData.summit} />
      </div>
    </div>
  );
}
