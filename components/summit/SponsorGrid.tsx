import type { Sponsor } from '@/types/schedule';

interface SponsorGridProps {
  sponsors: Sponsor[];
}

export function SponsorGrid({ sponsors }: SponsorGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-12">
          <h3 className="font-mono text-xs tracking-[0.2em] text-[var(--muted)] mb-8">
            SUMMIT SPONSORS
          </h3>
          <p className="text-[var(--muted)] text-sm">
            Thank you to our sponsors for making this event possible.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="heatpunk-card flex items-center justify-center p-6 min-h-[100px] group"
            >
              <span className="font-mono text-xs tracking-wider text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors text-center">
                {sponsor.name}
              </span>
            </a>
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <div className="mt-12 pt-8 border-t border-[var(--card-border)]">
          <p className="font-mono text-xs text-[var(--muted)]">
            <span className="text-[var(--terminal-color)]">&gt;</span> Interested in sponsoring?{' '}
            <a
              href="mailto:admin@heatpunks.org?subject=Summit Sponsorship"
              className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
