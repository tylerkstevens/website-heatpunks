export function WhySection() {
  const challenges = [
    {
      title: 'No Safety Standards',
      description: 'Hashrate heating appliances lack established safety certifications (UL, CE) and recognized testing protocols.',
    },
    {
      title: 'Building Code Gaps',
      description: 'Building codes worldwide don\'t recognize or address hashrate heating, creating permitting uncertainty.',
    },
    {
      title: 'Industry Unfamiliarity',
      description: 'HVAC professionals need training and resources to understand and implement this technology.',
    },
    {
      title: 'Limited Documentation',
      description: 'The industry needs more documented case studies and real-world performance data.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[001]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            ACCELERATING <span className="text-[var(--accent)]">ADOPTION</span>
          </h2>
          <p className="text-[var(--muted)] max-w-2xl">
            Hashrate heating has enormous potential, but significant barriers remain.
            Our grants target the foundational work needed to unlock mainstream adoption.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-[var(--card-background)] border-l-[3px] border-l-[var(--accent)] p-5"
            >
              <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
