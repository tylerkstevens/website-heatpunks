'use client';

import { useState } from 'react';
import { grantFAQs } from '@/data/grants';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[004]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            FREQUENTLY ASKED <span className="text-[var(--accent)]">QUESTIONS</span>
          </h2>
        </div>

        <div className="max-w-3xl space-y-2">
          {grantFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--card-background)] border border-[var(--card-border)] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[var(--background)] transition-colors"
              >
                <span className="font-mono text-sm text-[var(--foreground)]">
                  {faq.question}
                </span>
                <span
                  className={`font-mono text-[var(--accent)] transition-transform ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-4 text-sm text-[var(--muted)] leading-relaxed border-t border-[var(--card-border)] pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
