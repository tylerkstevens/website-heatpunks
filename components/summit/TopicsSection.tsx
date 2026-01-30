export function TopicsSection() {
  const topics = [
    'Controlling Miners as Electric Heaters',
    'Pools, Shares & Intermittent Hashing',
    'Sizing Hashrate for Heat Demand',
    'Certifications & Building Code',
    'Open Sourcing the Mining Stack',
    'Penetrating the Heating Industry',
    'Sovereign Smart Homes',
    'Live Hardware Demonstrations',
    'Cross-Industry Q&A',
    '+ More announced via email',
  ];

  const half = Math.ceil(topics.length / 2);
  const col1 = topics.slice(0, half);
  const col2 = topics.slice(half);

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[004]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            <span className="text-[var(--accent)]">TOPICS</span>
          </h2>
        </div>

        {/* Topics grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          <ul className="space-y-0">
            {col1.map((topic, i) => (
              <li
                key={i}
                className="py-3 border-b border-[var(--card-border)] text-[var(--muted)] text-sm flex items-center"
              >
                <span className="text-[var(--accent)] font-mono mr-3">&gt;</span>
                {topic}
              </li>
            ))}
          </ul>
          <ul className="space-y-0">
            {col2.map((topic, i) => (
              <li
                key={i}
                className="py-3 border-b border-[var(--card-border)] text-[var(--muted)] text-sm flex items-center"
              >
                <span className="text-[var(--accent)] font-mono mr-3">&gt;</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
