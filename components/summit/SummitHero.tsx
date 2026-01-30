import type { Summit } from '@/types/schedule';
import { siteConfig } from '@/data/site';

interface SummitHeroProps {
  summit: Summit;
}

export function SummitHero({ summit }: SummitHeroProps) {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Flame background gradient - uses theme-aware CSS class */}
        <div className="absolute inset-0 animate-flame-glow flame-bg" />

        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Scan lines */}
        <div className="scan-lines" />

        <div className="relative z-10 text-center px-4 py-20">
          {/* Glitch Title */}
          <div className="mb-2">
            <h1 className="font-mono text-[clamp(3rem,15vw,8rem)] font-extrabold leading-none tracking-[0.1em]">
              <span className="text-flame-gradient animate-text-glow">HEATPUNK</span>
            </h1>
            <h2 className="font-mono text-[clamp(1rem,4vw,1.5rem)] font-normal tracking-[0.3em] text-[var(--foreground)] opacity-90 mt-2">
              SUMMIT_{summit.year}
            </h2>
          </div>

          {/* Tagline */}
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--terminal-color)] mt-6">
            // UNDERMINING THE STATUS QUO
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 font-mono text-xs text-[var(--muted)]">
            <span>
              <span className="text-[var(--accent)]">DATE:</span> FEB 27-28, {summit.year}
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">LOC:</span> DENVER, CO
            </span>
            <span className="text-[var(--card-border)] hidden md:inline">|</span>
            <span>
              <span className="text-[var(--accent)]">STATUS:</span>{' '}
              <span className="animate-blink">GET ON THE WAITLIST</span>
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <a
              href={`mailto:${siteConfig.contact.email}?subject=Summit ${summit.year} Waitlist`}
              className="btn-primary group"
            >
              <span className="relative z-10">REQUEST INVITATION</span>
              <span className="btn-heat" />
            </a>

            <a
              href="https://www.youtube.com/watch?v=c-NrYzmPRv8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              WATCH 2025 RECAP
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent)] to-transparent animate-scroll-pulse" />
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-[var(--background-alt)] border-t border-b border-[var(--card-border)] py-4 overflow-x-auto">
        <div className="flex justify-center gap-8 md:gap-16 px-4 min-w-max">
          <Stat value="2" label="DAYS" />
          <Stat value="50+" label="BUILDERS" />
          <Stat value="4" label="WORKSHOPS" />
          <Stat value="10+" label="DEMOS" />
          <Stat value="1" label="SKI DAY" />
        </div>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-mono text-xl md:text-2xl font-bold text-[var(--accent)]">{value}</div>
      <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)]">{label}</div>
    </div>
  );
}
