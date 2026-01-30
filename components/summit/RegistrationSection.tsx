import { siteConfig } from '@/data/site';

export function RegistrationSection() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--card-background)] to-[var(--background)]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[006]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            <span className="text-[var(--accent)]">REGISTRATION</span>
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
          {/* General */}
          <div className="bg-[var(--card-background)] border border-[var(--card-border)] p-6 text-center">
            <div className="font-mono text-[10px] tracking-wider text-[var(--muted)] mb-2">
              GENERAL
            </div>
            <div className="font-mono text-3xl font-bold text-[var(--foreground)]">
              210,000 <span className="text-lg text-[var(--accent)]">SATS</span>
            </div>
            <p className="font-mono text-xs text-[var(--muted)] mt-2">
              Sessions + Meals + After Party
            </p>
          </div>

          {/* Member */}
          <div className="bg-[var(--card-background)] border-2 border-[var(--accent)] p-6 text-center relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-[var(--background)] font-mono text-[10px] font-bold px-3 py-0.5 tracking-wider">
              MEMBER
            </div>
            <div className="font-mono text-[10px] tracking-wider text-[var(--muted)] mb-2">
              THE SPACE
            </div>
            <div className="font-mono text-3xl font-bold text-[var(--foreground)]">
              50% <span className="text-lg text-[var(--accent)]">OFF</span>
            </div>
            <p className="font-mono text-xs text-[var(--muted)] mt-2">
              All benefits at half price
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Summit 2026 Waitlist`}
            className="btn-primary"
          >
            <span className="relative z-10">REQUEST INVITATION</span>
            <span className="btn-heat" />
          </a>

          <a
            href={`mailto:${siteConfig.contact.email}?subject=Summit 2026 Sponsorship`}
            className="btn-outline"
          >
            SPONSOR / DEMO INQUIRY
          </a>
        </div>
      </div>
    </section>
  );
}
