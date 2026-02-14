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
import { getSessionsByType } from '@/lib/scheduleUtils';

export const metadata: Metadata = {
  title: 'Summit 2026',
  description: 'Heatpunk Summit 2026 - February 27-28 in Denver, CO. Join 150+ builders for workshops, demos, and networking.',
  openGraph: {
    title: 'Summit 2026 | Hashrate Heatpunks',
    description: 'Heatpunk Summit 2026 - February 27-28 in Denver, CO. Join 150+ builders for workshops, demos, and networking.',
    images: ['/api/og?title=HEATPUNK%20SUMMIT&subtitle=FEB%2027-28%2C%202026%20%E2%80%A2%20DENVER%2C%20CO&page=summit'],
  },
};

// Event JSON-LD Schema
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Heatpunk Summit 2026',
  description: 'Annual gathering of hashrate heating builders, featuring workshops, demos, and networking.',
  startDate: '2026-02-27',
  endDate: '2026-02-28',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'The Space',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3700 N Franklin St',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      postalCode: '80205',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Hashrate Heatpunks',
    url: 'https://heatpunks.org',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    price: '0',
    priceCurrency: 'USD',
    url: 'https://heatpunks.org/summit',
  },
};

export default function SummitPage() {
  const scheduleData = getScheduleData();
  const sponsors = getSponsors();

  // Extract workshops and calculate stats from schedule data
  const workshops = getSessionsByType(scheduleData, 'workshop');
  const stats = {
    workshops: workshops.length,
    demos: getSessionsByType(scheduleData, 'demo').length,
  };

  return (
    <div className="bg-[var(--black)]">
      {/* Event JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      {/* Hero with stats bar */}
      <SummitHero summit={scheduleData.summit} sponsors={sponsors} stats={stats} />

      {/* [001] About */}
      <AboutSection />

      {/* [002] Summit Videos */}
      <SummitVideoSection />

      {/* Why + Who cards */}
      <WhyWhoSection />

      {/* [003] Workshops */}
      <WorkshopsSection workshops={workshops} />

      {/* [004] Topics */}
      <TopicsSection />

      {/* [005] Highlights */}
      <HighlightsSection />

      {/* When/Where Details */}
      <DetailsSection summit={scheduleData.summit} scheduleData={scheduleData} />

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
