import { VideoCarousel } from '@/components/shared/VideoCarousel';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { summitVideos } from '@/data/videos';

export function SummitVideoSection() {
  const featuredVideo = summitVideos[0];
  const carouselVideos = summitVideos.slice(1);

  return (
    <section className="py-16 md:py-24 bg-[var(--card-background)]">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[002]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2">
            FROM <span className="text-[var(--accent)]">LAST YEAR</span>
          </h2>
          <p className="text-[var(--muted)] text-sm mt-2">
            Watch highlights from Heatpunk Summit 2025 to see what you can expect.
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
