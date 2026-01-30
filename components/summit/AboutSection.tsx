export function AboutSection() {
  const attendees = [
    { tag: 'ASIC DESIGNERS', desc: 'Building the next generation of mining hardware' },
    { tag: 'FOSS DEVS', desc: 'Open source firmware and control systems' },
    { tag: 'SYSTEM BUILDERS', desc: 'Complete hashrate heating solutions' },
    { tag: 'PLEB MINERS', desc: 'Home miners heating with hashrate' },
    { tag: 'HOME BUILDERS', desc: 'Architects designing mining-heated homes' },
    { tag: 'HVAC TECHS', desc: 'Integrating ASICs into heating systems' },
    { tag: 'PLUMBERS', desc: 'Hydronic and radiant floor specialists' },
    { tag: 'INSURERS', desc: 'Coverage for mining heating systems' },
    { tag: 'ENERGY MODELERS', desc: 'Optimizing heat and power efficiency' },
    { tag: 'CONTROL EXPERTS', desc: 'Automation and smart home integration' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-tag">[001]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            WHAT IS HEATPUNK?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* About text */}
          <div>
            <p className="text-[var(--foreground)] text-lg leading-relaxed mb-4">
              The Heatpunks are bitcoiners <span className="text-highlight">undermining the status-quo</span>,
              bringing hashrate back home into heating appliances and infrastructure.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-8">
              This summit brings together all key stakeholders pushing forward the emerging industry
              of hashrate heating. ASIC Designers, FOSS Developers, Firmware Builders, Control Experts,
              Heating Industry Veterans, Plumbers, HVAC Techs, Home Insurers, System Builders,
              Pleb Miners and more — <span className="text-highlight">All in the Same Room.</span>
            </p>

            {/* Objectives */}
            <div>
              <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">
                &gt; OBJECTIVES
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-[var(--muted)] text-sm">
                  <span className="font-mono text-[10px] text-[var(--accent)]">01</span>
                  Overcome challenges for mining in homes and businesses
                </li>
                <li className="flex gap-3 text-[var(--muted)] text-sm">
                  <span className="font-mono text-[10px] text-[var(--accent)]">02</span>
                  Spark partnerships that accelerate development
                </li>
                <li className="flex gap-3 text-[var(--muted)] text-sm">
                  <span className="font-mono text-[10px] text-[var(--accent)]">03</span>
                  Network with hyper-focused builders
                </li>
                <li className="flex gap-3 text-[var(--muted)] text-sm">
                  <span className="font-mono text-[10px] text-[var(--accent)]">04</span>
                  Dismantle the proprietary mining empire
                </li>
              </ul>
            </div>
          </div>

          {/* Who attends */}
          <div>
            <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">
              &gt; WHO ATTENDS
            </h3>
            <div className="flex flex-wrap gap-2">
              {attendees.map((item) => (
                <span
                  key={item.tag}
                  className="heatpunk-tag"
                  title={item.desc}
                >
                  {item.tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
