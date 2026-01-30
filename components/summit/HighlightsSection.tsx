const highlights = [
  { icon: '⛷', label: 'Rocky Mountain Ski Day' },
  { icon: '⚙', label: 'Hardware Demos' },
  { icon: '★', label: 'Live Product Launches' },
  { icon: '☻', label: 'Panel Sessions' },
  { icon: '☕', label: 'Community Meals' },
  { icon: '♫', label: 'After Party' },
];

export function HighlightsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[005]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            EVENT <span className="text-[var(--accent)]">HIGHLIGHTS</span>
          </h2>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {highlights.map((item) => (
            <div key={item.label} className="text-center py-4">
              <div className="text-2xl text-[var(--accent)] mb-2">{item.icon}</div>
              <span className="font-mono text-[10px] tracking-wider text-[var(--muted)]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
