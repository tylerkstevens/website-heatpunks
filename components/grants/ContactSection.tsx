export function ContactSection() {
  return (
    <section className="py-12 md:py-16 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <h3 className="font-mono text-lg font-bold tracking-wide mb-3">
          QUESTIONS?
        </h3>
        <p className="text-[var(--muted)] text-sm mb-4">
          Have questions about the grants program? Reach out.
        </p>
        <a
          href="mailto:grants@heatpunks.org"
          className="font-mono text-sm text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
        >
          &gt; grants@heatpunks.org
        </a>
      </div>
    </section>
  );
}
