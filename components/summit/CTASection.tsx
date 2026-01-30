import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient - uses theme-aware CSS class */}
      <div className="absolute inset-0 flame-bg" />
      <div className="noise-overlay" />

      <div className="relative z-10 section-container text-center">
        <span className="section-tag">[006]</span>
        <h2 className="font-mono text-2xl md:text-4xl font-bold tracking-wide mt-4 mb-4">
          READY TO JOIN THE{' '}
          <span className="text-flame-gradient">REVOLUTION</span>?
        </h2>
        <p className="text-[var(--muted)] max-w-2xl mx-auto mb-8 text-sm">
          Don&apos;t miss your chance to be part of Heatpunk Summit 2026. Space is limited.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Summit 2026 Waitlist`}
            className="btn-primary"
          >
            <span className="font-mono text-xs tracking-wider">&gt; GET_ON_WAITLIST</span>
          </a>

          <Link
            href="/summit/schedule"
            className="btn-secondary"
          >
            <span className="font-mono text-xs tracking-wider">VIEW_SCHEDULE</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-12 pt-8 border-t border-[var(--card-border)]">
          <div>
            <p className="font-mono text-2xl md:text-3xl font-bold text-[var(--accent)]">150+</p>
            <p className="font-mono text-[10px] text-[var(--muted)] tracking-wider">BUILDERS</p>
          </div>
          <div>
            <p className="font-mono text-2xl md:text-3xl font-bold text-[var(--terminal-color)]">3</p>
            <p className="font-mono text-[10px] text-[var(--muted)] tracking-wider">DAYS</p>
          </div>
          <div>
            <p className="font-mono text-2xl md:text-3xl font-bold text-[var(--bitcoin)]">∞</p>
            <p className="font-mono text-[10px] text-[var(--muted)] tracking-wider">CONNECTIONS</p>
          </div>
        </div>
      </div>
    </section>
  );
}
