import { VideoCarousel } from '@/components/shared/VideoCarousel';
import { VideoEmbed } from '@/components/shared/VideoEmbed';
import { summitVideos, featuredEducationVideo } from '@/data/videos';

export function VideoSection() {
  // Get videos excluding the featured one for the carousel
  const carouselVideos = summitVideos.filter(v => v.id !== featuredEducationVideo.id);

  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        <div className="mb-12">
          <span className="section-tag">[002]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-2 text-[var(--foreground)]">
            SUMMIT VIDEOS
          </h2>
          <p className="text-[var(--muted)] text-sm max-w-2xl">
            Watch recordings from past Heatpunk Summits. Learn from industry experts,
            see live demonstrations, and explore the future of hashrate heating.
          </p>
        </div>

        {/* Featured Video */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="border border-[var(--card-border)] bg-[var(--card-background)]">
            <VideoEmbed
              youtubeId={featuredEducationVideo.youtubeId}
              title={featuredEducationVideo.title}
            />
            <div className="p-4">
              <h3 className="font-mono text-sm font-semibold text-[var(--foreground)]">
                {featuredEducationVideo.title}
              </h3>
              {featuredEducationVideo.description && (
                <p className="text-[var(--muted)] text-xs mt-1">
                  {featuredEducationVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Video Carousel */}
        <div className="max-w-5xl mx-auto">
          <h3 className="font-mono text-xs tracking-wider text-[var(--terminal-color)] mb-4">
            &gt; MORE VIDEOS
          </h3>
          <VideoCarousel videos={carouselVideos} />
        </div>
      </div>
    </section>
  );
}
