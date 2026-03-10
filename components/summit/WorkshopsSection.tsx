import type { Session } from '@/types/schedule';

interface WorkshopsSectionProps {
  workshops: Session[];
}

// Short, landing-page specific descriptions for workshops
const workshopSummaries: Record<string, string> = {
  'day1-workshop-architect': 'Attendees worked with leading architects to define industry standards for hashrate heating systems—from certifications to client education.',
  'day2-workshop-boiler': 'Toured The Space\'s live bitcoin-heated radiant floor system. Explored hydronic integration challenges and control solutions from experts.',
  'day1-workshop-home-assistant': 'Integrated miners into Home Assistant. Built automations triggered by thermostats, solar, and energy prices—no cloud required.',
  'day2-workshop-canaan': 'Direct access to Canaan\'s team. Builders shared feedback on firmware, thermals, and hardware to shape home mining ASICs.',
  'day2-workshop-tether-sdk': 'Explored Tether\'s open-source Mining SDK. Collaborated on adapting P2P mining control for thermostats and heating systems.',
};

export function WorkshopsSection({ workshops }: WorkshopsSectionProps) {
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
            Dedicated sessions pairing builders to tackle real-world challenges together.
          </p>
        </div>

        {/* Workshop grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workshops.length > 0 ? (
            workshops.map((workshop, index) => (
              <div
                key={workshop.id}
                className="heatpunk-card hover:border-[var(--accent)] hover:-translate-y-0.5 transition-all"
              >
                <div className="font-mono text-[10px] text-[var(--accent)] mb-3">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h4 className="font-mono text-sm font-semibold text-[var(--foreground)] mb-2">
                  {workshop.title}
                </h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {workshopSummaries[workshop.id] || workshop.description || 'Workshop details coming soon'}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-[var(--muted)] text-sm">
              Workshop details coming soon
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
