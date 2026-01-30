import type { Metadata } from 'next';
import { SummitHero } from '@/components/summit/SummitHero';
import { AboutSection } from '@/components/summit/AboutSection';
import { SummitVideoSection } from '@/components/summit/SummitVideoSection';
import { WhyWhoSection } from '@/components/summit/WhyWhoSection';
import { WorkshopsSection } from '@/components/summit/WorkshopsSection';
import { TopicsSection } from '@/components/summit/TopicsSection';
import { HighlightsSection } from '@/components/summit/HighlightsSection';
import { DetailsSection } from '@/components/summit/DetailsSection';
import { VenueSection } from '@/components/summit/VenueSection';
import { RegistrationSection } from '@/components/summit/RegistrationSection';
import { SummitCommunitySection } from '@/components/summit/SummitCommunitySection';
import { SponsorGrid } from '@/components/summit/SponsorGrid';
import { FAQSection } from '@/components/summit/FAQSection';
import { getScheduleData, getSponsors } from '@/lib/schedule';

export const metadata: Metadata = {
  title: 'Summit 2026',
  description: 'Heatpunk Summit 2026 - February 27-28 in Denver, Colorado. The gathering for bitcoiners and heating professionals advancing hashrate heating technology.',
};

export default function SummitPage() {
  const scheduleData = getScheduleData();
  const sponsors = getSponsors();

  return (
    <div className="bg-[var(--black)]">
      {/* Hero with stats bar */}
      <SummitHero summit={scheduleData.summit} />

      {/* [001] About */}
      <AboutSection />

      {/* [002] Summit Videos */}
      <SummitVideoSection />

      {/* Why + Who cards */}
      <WhyWhoSection />

      {/* [003] Workshops */}
      <WorkshopsSection />

      {/* [004] Topics */}
      <TopicsSection />

      {/* [005] Highlights */}
      <HighlightsSection />

      {/* When/Where Details */}
      <DetailsSection summit={scheduleData.summit} />

      {/* Interactive Map */}
      <VenueSection summit={scheduleData.summit} />

      {/* [006] Registration/Pricing */}
      <RegistrationSection />

      {/* [007] Community */}
      <SummitCommunitySection />

      {/* Sponsors */}
      <SponsorGrid sponsors={sponsors} />

      {/* [008] FAQ (interactive) */}
      <FAQSection />
    </div>
  );
}
