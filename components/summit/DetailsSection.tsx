import type { Summit } from '@/types/schedule';

interface DetailsSectionProps {
  summit: Summit;
}

export function DetailsSection({ summit }: DetailsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <div className="section-container">
        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* When */}
          <div className="bg-[var(--card-background)] border-l-[3px] border-l-[var(--accent)] p-5">
            <h3 className="font-mono text-xs text-[var(--terminal-color)] mb-3">&gt; WHEN</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              <strong className="text-[var(--foreground)] block mb-1">Feb 27-28, {summit.year}</strong>
              Pre-Summit: Feb 26 - Ski Day + Happy Hour<br />
              Start: 10 AM MST (doors 8 AM)<br />
              End: ~3 PM MST Saturday
            </p>
          </div>

          {/* Where */}
          <div className="bg-[var(--card-background)] border-l-[3px] border-l-[var(--accent)] p-5">
            <h3 className="font-mono text-xs text-[var(--terminal-color)] mb-3">&gt; WHERE</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              <strong className="text-[var(--foreground)] block mb-1">{summit.venue.name}</strong>
              {summit.venue.address}<br />
              RiNo District - Train from DIA<br />
              Hotels, restaurants nearby
            </p>
          </div>
        </div>

        {/* Public Happy Hour */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="bg-[var(--card-background)] border-2 border-[var(--terminal-color)] p-5 relative">
            <div className="absolute -top-2.5 left-4 bg-[var(--terminal-color)] text-[var(--background)] font-mono text-[10px] font-bold px-3 py-0.5 tracking-wider">
              OPEN TO ALL
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-[var(--foreground)] mb-1">
                  Welcome Happy Hour — Feb 26, 5-8 PM
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  No summit ticket required! Come meet the heatpunk community.
                </p>
              </div>
              <a
                href="https://lu.ma/j4sh7s8s"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline whitespace-nowrap border-[var(--terminal-color)] text-[var(--terminal-color)] hover:bg-[var(--terminal-color)] hover:text-[var(--background)]"
              >
                RSVP FREE ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
