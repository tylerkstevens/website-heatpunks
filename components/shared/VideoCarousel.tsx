'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Video } from '@/data/videos';

interface VideoCarouselProps {
  videos: Video[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedVideo, setExpandedVideo] = useState<Video | null>(null);

  const visibleCount = 3;
  const maxIndex = Math.max(0, videos.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleVideos = videos.slice(currentIndex, currentIndex + visibleCount);

  return (
    <div className="space-y-4">
      {/* Expanded Video Player */}
      {expandedVideo && (
        <div className="relative aspect-video bg-black mb-6 border border-[var(--card-border)]">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${expandedVideo.youtubeId}?autoplay=1`}
            title={expandedVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <button
            onClick={() => setExpandedVideo(null)}
            className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-[var(--accent)] border border-[var(--card-border)] text-white transition-colors font-mono text-xs"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>
      )}

      {/* Carousel */}
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-[var(--card-background)] border border-[var(--card-border)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono"
          aria-label="Previous videos"
        >
          ←
        </button>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-8">
          {visibleVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setExpandedVideo(video)}
              className="group relative aspect-video bg-[var(--card-background)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors text-left overflow-hidden"
            >
              {/* YouTube Thumbnail */}
              <Image
                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt={video.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />

              {/* Play Overlay - intentionally dark for contrast over image */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                  <PlayIcon className="h-5 w-5 text-[var(--accent)] group-hover:text-white" />
                </div>
              </div>

              {/* Title - intentionally dark gradient for readability over image */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <p className="font-mono text-xs text-white line-clamp-2">
                  {video.title}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-[var(--card-background)] border border-[var(--card-border)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono"
          aria-label="Next videos"
        >
          →
        </button>
      </div>

      {/* Dots indicator */}
      {videos.length > visibleCount && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 transition-colors ${
                i === currentIndex ? 'bg-[var(--accent)]' : 'bg-[var(--card-border)]'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
