import { siteConfig } from '@/data/site';

export function DonateSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="mb-8">
          <span className="section-tag">[005]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            SUPPORT THE <span className="text-[var(--accent)]">MISSION</span>
          </h2>
          <p className="text-[var(--muted)] leading-relaxed max-w-2xl">
            Want to support hashrate heating research and development? Donations to the
            256 Foundation directly fund grants like these, helping accelerate global
            adoption of this transformative technology.
          </p>
        </div>
        <a
          href={siteConfig.foundation.donate}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex"
        >
          DONATE VIA THE 256 FOUNDATION
        </a>
      </div>
    </section>
  );
}
