const whyReasons = [
  { title: 'See Innovation:', text: 'New systems, products, software and live demos' },
  { title: 'Solve Challenges:', text: 'Facing a hurdle? Find the solution here' },
  { title: 'Connect:', text: 'Meet hyper-focused builders pushing hashrate heating' },
];

const attendees = [
  'ASIC Designers',
  'FOSS Devs',
  'System Builders',
  'Pleb Miners',
  'Home Builders',
  'Architects',
  'HVAC Techs',
  'Plumbers',
  'Insurers',
  'Energy Modelers',
  'Control Experts',
];

export function WhyWhoSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Why Attend */}
          <div className="heatpunk-card">
            <h3 className="font-mono text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="text-[var(--accent)]">▲</span> WHY ATTEND
            </h3>
            <ul className="space-y-3">
              {whyReasons.map((reason) => (
                <li
                  key={reason.title}
                  className="text-sm text-[var(--muted)] border-l-2 border-[var(--card-border)] pl-4"
                >
                  <strong className="text-[var(--foreground)]">{reason.title}</strong> {reason.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Who Attends */}
          <div className="heatpunk-card">
            <h3 className="font-mono text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="text-[var(--accent)]">●</span> WHO ATTENDS
            </h3>
            <div className="flex flex-wrap gap-2">
              {attendees.map((tag) => (
                <span key={tag} className="heatpunk-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
