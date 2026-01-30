import Link from 'next/link';

const grantFocusAreas = [
  { icon: '⚡', label: 'STANDARDS' },
  { icon: '📊', label: 'RESEARCH' },
  { icon: '📖', label: 'DOCUMENTATION' },
  { icon: '🎓', label: 'EDUCATION' },
];

export function GrantsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            FUND THE <span className="text-[var(--accent)]">FUTURE</span>
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-2xl">
            The 256 Foundation funds foundational work accelerating hashrate heating adoption.
            No safety standards? No building codes? We&apos;re funding the solutions.
          </p>
        </div>

        {/* Focus areas */}
        <div className="flex flex-wrap gap-2 mb-8">
          {grantFocusAreas.map((area) => (
            <span key={area.label} className="heatpunk-tag flex items-center gap-2">
              <span className="text-[var(--terminal-color)]">{area.icon}</span>
              {area.label}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link href="/grants" className="btn-primary group">
          <span className="relative z-10">APPLY FOR GRANT</span>
          <span className="btn-heat" />
        </Link>
      </div>
    </section>
  );
}
