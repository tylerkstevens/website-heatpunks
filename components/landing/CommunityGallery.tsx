import Image from 'next/image';
import { siteConfig } from '@/data/site';
import type { ForumImage } from '@/types/discourse';

interface CommunityGalleryProps {
  images?: ForumImage[] | null;
}

export function CommunityGallery({ images }: CommunityGalleryProps) {
  // Show fallback UI if no images available
  if (!images || images.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)]">
        <div className="section-container text-center">
          <span className="section-tag">[COMMUNITY]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-4">
            FROM THE <span className="text-[var(--accent)]">FORUM</span>
          </h2>
          <p className="text-[var(--muted)] mt-4 mb-6">
            Community images temporarily unavailable. Check back soon!
          </p>
          <a
            href={siteConfig.links.forum}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            <span className="font-mono text-xs tracking-wider">VISIT FORUM DIRECTLY</span>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[var(--background-alt)] border-t border-[var(--card-border)] overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <div className="mb-8">
          <span className="section-tag">[COMMUNITY]</span>
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide">
            FROM THE <span className="text-[var(--accent)]">FORUM</span>
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm">
            Real builds and projects from the Hashrate Heatpunks community.
          </p>
        </div>
      </div>

      {/* Scrollable gallery - full width */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 px-6 md:px-12 scrollbar-hide snap-x snap-mandatory">
          {images.map((image) => (
            <a
              key={image.id}
              href={image.topicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group snap-start"
            >
              <div className="relative w-72 h-48 md:w-80 md:h-56 overflow-hidden border border-[var(--card-border)] bg-[var(--card-background)]">
                <Image
                  src={image.url}
                  alt={image.topicTitle}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 288px, 320px"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-mono text-xs text-white line-clamp-2">
                      {image.topicTitle}
                    </p>
                    <span className="font-mono text-[10px] text-[var(--terminal-color)] mt-1 inline-block">
                      VIEW ON FORUM →
                    </span>
                  </div>
                </div>
                {/* Border glow on hover */}
                <div className="absolute inset-0 border-2 border-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </a>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 bottom-4 w-6 md:w-12 bg-gradient-to-r from-[var(--background-alt)] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-4 w-6 md:w-12 bg-gradient-to-l from-[var(--background-alt)] to-transparent pointer-events-none" />
      </div>

      {/* View all link */}
      <div className="section-container mt-6">
        <a
          href={siteConfig.links.forum}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
        >
          <span>&gt;</span>
          SEE BUILDS ON THE FORUM
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
