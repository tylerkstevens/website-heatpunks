'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import type { DeckSlide } from '@/data/infoDeck';

interface InfoDeckCarouselProps {
  slides: DeckSlide[];
}

export function InfoDeckCarousel({ slides }: InfoDeckCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1));
  }, [slides.length]);

  // Keyboard arrow key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="space-y-4">
      {/* Slide display */}
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-[var(--card-background)] border border-[var(--card-border)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono"
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* Slide Image */}
        <div className="relative aspect-video bg-[var(--card-background)] border border-[var(--card-border)] overflow-hidden mx-8">
          <Image
            src={currentSlide.src}
            alt={currentSlide.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
            className="object-contain"
            priority={currentIndex === 0}
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= slides.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-[var(--card-background)] border border-[var(--card-border)] text-[var(--foreground)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors font-mono"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Page indicator */}
      <div className="flex items-center justify-center gap-4">
        <span className="font-mono text-xs text-[var(--muted)]">
          <span className="text-[var(--accent)]">{String(currentIndex + 1).padStart(2, '0')}</span>
          {' / '}
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2">
        {slides.map((_, i) => (
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
    </div>
  );
}
