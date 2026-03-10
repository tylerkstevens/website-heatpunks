'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';

interface VideoSectionProps {
  year: number;
  videos: Video[];
  sectionTag?: string;
}

export function VideoSection({ year, videos, sectionTag }: VideoSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (videos.length === 0) return null;

  const video = videos[selectedIndex];
  const total = videos.length;

  const handlePrev = () => {
    setSelectedIndex((i) => i - 1);
    setIsPlaying(false);
  };

  const handleNext = () => {
    setSelectedIndex((i) => i + 1);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--background)] border-t border-[var(--card-border)]">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          {sectionTag && <span className="section-tag">{sectionTag}</span>}
          <h2 className="font-mono text-2xl md:text-3xl font-bold tracking-wide mt-2 mb-2 text-[var(--foreground)]">
            {year} <span className="text-[var(--accent)]">SUMMIT VIDEOS</span>
          </h2>
          <p className="text-[var(--muted)] text-sm max-w-2xl">
            Watch recordings from Heatpunk Summit {year}. Browse with the arrows to read each session before playing.
          </p>
        </div>

        {/* Large Preview */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-[var(--card-border)] bg-[var(--card-background)]">
            {/* Video area */}
            <div className="relative aspect-video">
              {isPlaying ? (
                <iframe
                  key={video.youtubeId}
                  src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 w-full h-full group"
                  aria-label={`Play ${video.title}`}
                >
                  {/* Thumbnail */}
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    priority={selectedIndex === 0}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                      <svg className="h-7 w-7 text-[var(--accent)] group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Metadata + Navigation */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Title + Description */}
              <div className="flex-1 min-w-0">
                <h3 className="font-mono text-sm font-semibold text-[var(--foreground)] leading-snug">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-[var(--muted)] text-xs mt-1">
                    {video.description}
                  </p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={selectedIndex === 0}
                  className="w-10 h-10 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono"
                  aria-label="Previous video"
                >
                  ←
                </button>
                <span className="font-mono text-xs text-[var(--muted)] tabular-nums w-12 text-center">
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  onClick={handleNext}
                  disabled={selectedIndex === total - 1}
                  className="w-10 h-10 bg-[var(--background)] border border-[var(--card-border)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono"
                  aria-label="Next video"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
