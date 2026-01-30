'use client';

import { useState } from 'react';
import type { FAQItem } from '@/types/schedule';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-[var(--card-border)] bg-[var(--card-background)] overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[var(--background)] transition-colors group"
            aria-expanded={openIndex === index}
          >
            <span className="flex items-center gap-3 pr-4">
              <span className="font-mono text-[10px] text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {item.question}
              </span>
            </span>
            <ChevronIcon
              className={`h-4 w-4 flex-shrink-0 text-[var(--muted)] transition-transform ${
                openIndex === index ? 'rotate-180 text-[var(--accent)]' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-5 py-4 bg-[var(--background)] border-t border-[var(--card-border)]">
              <p className="text-[var(--muted)] text-sm pl-8">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
