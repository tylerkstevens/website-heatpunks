import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Summit Schedule',
  description: 'Full schedule for Heatpunk Summit 2026. Workshops, demos, panels, and networking events.',
  openGraph: {
    title: 'Summit Schedule | Hashrate Heatpunks',
    description: 'Full schedule for Heatpunk Summit 2026. Workshops, demos, panels, and networking events.',
    images: ['/api/og?title=SUMMIT%20SCHEDULE&subtitle=FEB%2027-28%2C%202026%20%E2%80%A2%20DENVER%2C%20CO&page=summit'],
  },
};

export default function SchedulePage() {
  return (
    <div className="relative py-12 md:py-16 bg-[var(--background)] min-h-screen flex items-center justify-center">
      <div className="noise-overlay" />
      <div className="relative z-10 text-center px-4">
        <span className="section-tag">[SCHEDULE]</span>
        <h1 className="font-mono text-3xl md:text-5xl font-bold tracking-wide mt-4 mb-6">
          COMING <span className="text-[var(--accent)]">SOON</span>
        </h1>
        <p className="text-[var(--muted)] text-sm md:text-base max-w-md mx-auto mb-8">
          The full Summit 2026 schedule is being finalized. Check back soon for talks, workshops, and demos.
        </p>
        <div className="font-mono text-xs text-[var(--terminal-color)]">
          {'// FEBRUARY 27-28, 2026 • DENVER, CO'}
        </div>
        <Link href="/summit" className="btn-secondary mt-8 inline-block">
          ← BACK TO SUMMIT
        </Link>
      </div>
    </div>
  );
}
