export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Flame background - uses theme-aware CSS class */}
      <div className="absolute inset-0 flame-bg" />
      <div className="noise-overlay" />

      <div className="relative z-10 section-container text-center">
        <span className="section-tag">[GRANTS]</span>
        <h1 className="font-mono text-[clamp(2rem,8vw,4rem)] font-extrabold tracking-tight mb-4">
          <span className="text-flame-gradient">BUILD</span>{' '}
          <span className="text-[var(--foreground)]">WITH US</span>
        </h1>
        <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed mb-8">
          The 256 Foundation funds projects advancing hashrate heating adoption globally.
          Technical standards, research, advocacy, documentation, education - if it moves
          the industry forward, we want to hear about it.
        </p>
        <a
          href="#apply"
          className="btn-primary inline-flex"
        >
          <span className="relative z-10">APPLY NOW</span>
          <span className="btn-heat" />
        </a>
      </div>
    </section>
  );
}
