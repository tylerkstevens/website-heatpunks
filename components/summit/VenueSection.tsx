import type { Summit } from '@/types/schedule';
import { Map } from './Map';

interface VenueSectionProps {
  summit: Summit;
}

export function VenueSection({ summit }: VenueSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12">
          <span className="section-tag">[003]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
            VENUE & <span className="text-[var(--accent)]">TRAVEL</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Venue Info */}
          <div className="space-y-4">
            <div className="heatpunk-card">
              <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">
                &gt; LOCATION
              </h3>
              <p className="font-mono text-lg text-[var(--foreground)] mb-2">{summit.venue.name}</p>
              <address className="not-italic text-[var(--muted)] text-sm font-mono">
                {summit.venue.address}
              </address>
            </div>

            <div className="space-y-3">
              <div className="heatpunk-card flex items-start gap-4">
                <LocationIcon className="h-5 w-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-sm text-[var(--foreground)]">RiNo District, Denver</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    A vibrant arts district with great restaurants and breweries nearby.
                  </p>
                </div>
              </div>

              <div className="heatpunk-card flex items-start gap-4">
                <TrainIcon className="h-5 w-5 text-[var(--terminal-color)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-sm text-[var(--foreground)]">Easy Transit Access</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Accessible via A Line from Denver International Airport (DIA).
                  </p>
                </div>
              </div>

              <div className="heatpunk-card flex items-start gap-4">
                <PlaneIcon className="h-5 w-5 text-[var(--bitcoin)] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-sm text-[var(--foreground)]">Fly into DIA</p>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Denver International Airport is a major hub with direct flights from most cities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] border border-[var(--card-border)] overflow-hidden">
            {summit.venue.coordinates ? (
              <Map
                lat={summit.venue.coordinates.lat}
                lng={summit.venue.coordinates.lng}
                title={summit.venue.name}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-[var(--card-background)] text-[var(--muted)] font-mono text-sm">
                Map coordinates not available
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="3" width="16" height="16" rx="2" />
      <path d="M4 11h16" />
      <path d="M12 3v8" />
      <circle cx="8" cy="15" r="1" />
      <circle cx="16" cy="15" r="1" />
      <path d="M8 19l-2 3" />
      <path d="M16 19l2 3" />
    </svg>
  );
}

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
