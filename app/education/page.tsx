import type { Metadata } from 'next';
import { BookSection } from '@/components/education/BookSection';
import { VideoSection } from '@/components/education/VideoSection';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Learn about hashrate heating technology. Free resources, videos, and guides for implementing Bitcoin mining as a heat source.',
};

export default function EducationPage() {
  return (
    <div className="bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Flame background - uses theme-aware CSS class */}
        <div className="absolute inset-0 flame-bg" />
        <div className="noise-overlay" />

        <div className="relative z-10 section-container text-center">
          <span className="section-tag">[EDUCATION]</span>
          <h1 className="font-mono text-[clamp(2rem,8vw,4rem)] font-extrabold tracking-tight mb-4">
            <span className="text-flame-gradient">LEARN</span>{' '}
            <span className="text-[var(--foreground)]">HASHRATE HEATING</span>
          </h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Explore our curated resources to understand how Bitcoin mining can be
            transformed into a valuable heat source for homes and businesses.
          </p>
        </div>
      </section>

      <BookSection />
      <VideoSection />

      {/* Coming Soon Section */}
      <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="section-container text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-4xl text-[var(--terminal-color)] mb-4 font-mono">⏳</div>
            <span className="section-tag">[COMING SOON]</span>
            <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-4">
              MORE RESOURCES IN DEVELOPMENT
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              We&apos;re working on curated tutorials, technical guides, and in-depth
              articles to help you master hashrate heating. Join our community to
              be notified when new content is available.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
