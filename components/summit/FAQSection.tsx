import { FAQAccordion } from './FAQAccordion';
import type { FAQItem } from '@/types/schedule';

const faqItems: FAQItem[] = [
  {
    question: 'How much does it cost to attend?',
    answer: 'General admission is 210,000 sats. This includes all sessions, meals, and the after-party. Space members receive a 50% discount.',
  },
  {
    question: 'Is there a waitlist?',
    answer: 'Yes! We have limited capacity of 50+ builders. Email admin@heatpunks.org to get on the waitlist.',
  },
  {
    question: 'What should I bring?',
    answer: 'Bring your laptop if you want to participate in workshops. The venue has WiFi. Dress is casual.',
  },
  {
    question: 'Can I demo my product?',
    answer: 'We have dedicated demo time during the event. Contact us to arrange a product demonstration slot.',
  },
  {
    question: 'Is the ski day included?',
    answer: 'The ski day on February 26th is optional and organized separately. Details will be shared with registered attendees.',
  },
  {
    question: 'How do I get from the airport?',
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
