export interface DeckSlide {
  page: number;
  src: string;
  alt: string;
}

export const infoDeckSlides: DeckSlide[] = Array.from({ length: 13 }, (_, i) => ({
  page: i + 1,
  src: `/images/info-deck/slide-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Heatpunk Summit 2026 Info Deck - Page ${i + 1} of 13`,
}));
