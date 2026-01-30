const workshops = [
  {
    number: '01',
    title: 'Builder Feedback with Canaan',
    description: 'Chat directly with an ASIC manufacturer committed to home miners. Tell them what you\'re looking for.',
  },
  {
    number: '02',
    title: 'Face Time with Architects',
    description: 'Commercial hashrate heating challenges - certifications, regulations. Chat with leading architects.',
  },
  {
    number: '03',
    title: 'Bitcoin Boiler Breakdown',
    description: 'Hydronic experts share best practices for radiant floors, pools, and how bitcoin boilers differ.',
  },
  {
    number: '04',
    title: 'FOSS Mining Stack with 256 Foundation',
    description: 'Start developing on the newly released open source mining stack. Core devs will be here.',
  },
];

export function WorkshopsSection() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--card-background)] to-[var(--background)]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            2026 <span className="text-[var(--accent)]">WORKSHOPS</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-2">
            New this year: dedicated sessions pairing builders to tackle challenges together.
          </p>
        </div>

        {/* Workshop grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workshops.map((workshop) => (
            <div
              key={workshop.number}
              className="heatpunk-card hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all"
            >
              <div className="font-mono text-[10px] text-[var(--accent)] mb-3">
                {workshop.number}
              </div>
              <h4 className="font-mono text-sm font-semibold text-[var(--foreground)] mb-2">
                {workshop.title}
              </h4>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {workshop.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center font-mono text-xs text-[var(--muted)] mt-6">
          + More workshops to be announced
        </p>
      </div>
    </section>
  );
}
