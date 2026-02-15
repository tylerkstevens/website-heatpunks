import { InfoDeckCarousel } from './InfoDeckCarousel';
import { infoDeckSlides } from '@/data/infoDeck';

export function InfoDeckSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            OVERVIEW <span className="text-[var(--accent)]">DECK</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-2">
            Everything you need to know about Heatpunk Summit 2026.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <InfoDeckCarousel slides={infoDeckSlides} />
        </div>

        {/* Download link */}
        <div className="mt-8 text-center">
          <a
            href="/resources/HeatpunkSummit2026_InfoDeck.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span className="text-[var(--terminal-color)]">&gt;</span> Download full PDF
          </a>
        </div>
      </div>
    </section>
  );
}
