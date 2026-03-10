import { VideoCarousel } from '@/components/shared/VideoCarousel';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { summit2026Videos } from '@/data/videos';

export function SummitVideoSection() {
  const featuredVideo = summit2026Videos[0];
  const carouselVideos = summit2026Videos.slice(1);

  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[002]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            2026 <span className="text-[var(--accent)]">RECORDINGS</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-2">
            Watch all sessions from Heatpunk Summit 2026. Full library available on the{' '}
            <a href="/education" className="text-[var(--accent)] hover:underline">education page</a>.
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="border border-[var(--card-border)]">
            <VideoEmbed
              youtubeId={featuredVideo.youtubeId}
              title={featuredVideo.title}
            />
          </div>
        </div>

        {/* Video Carousel */}
        {carouselVideos.length > 0 && (
          <div className="max-w-5xl mx-auto">
            <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-6">
              &gt; MORE_SESSIONS
            </h3>
            <VideoCarousel videos={carouselVideos} />
          </div>
        )}
      </div>
    </section>
  );
}
