import { FAQAccordion } from './FAQAccordion';
import type { FAQItem } from '@/types/schedule';

const faqItems: FAQItem[] = [
  {
    question: 'How much did it cost to attend?',
    answer: '2026 General admission was 210,000 sats. This included all sessions, meals, and the after-party. Space members received a 50% discount.',
  },
  {
    question: 'Was there a waitlist?',
    answer: 'Yes — the event sold out with ~150 builders. Request your invite for HPS 2027 to be notified when planning begins.',
  },
  {
    question: 'What did attendees bring?',
    answer: 'Attendees brought laptops for certain workshops. The venue had WiFi. Dress was casual.',
  },
  {
    question: 'Were product demos featured?',
    answer: 'Yes! Hashrate heating products were demonstrated throughout the event. Interested in demoing at HPS 2027? Contact admin@heatpunks.org.',
  },
  {
    question: 'Was the ski day included?',
    answer: 'The ski day on February 26th was optional and organized separately. Attendees arranged their own ski passes and rentals.',
  },
  {
    question: 'How do you get from the airport?',
    answer: 'The A Line train runs directly from DIA to downtown Denver. The venue in RiNo is accessible via rideshare or a short walk from the 38th & Blake station.',
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-tag">[008]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            FREQUENTLY ASKED <span className="text-[var(--accent)]">QUESTIONS</span>
          </h2>
        </div>

        <div className="max-w-3xl">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
