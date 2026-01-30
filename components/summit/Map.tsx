'use client';

import { useEffect, useState } from 'react';

interface MapProps {
  lat: number;
  lng: number;
  title: string;
}

export function Map({ lat, lng, title }: MapProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    const checkDarkMode = () => {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    checkDarkMode();

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Using OpenStreetMap embed
  const bbox = `${lng - 0.01},${lat - 0.008},${lng + 0.01},${lat + 0.008}`;
  const marker = `${lat},${lng}`;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <iframe
        title={`Map showing ${title}`}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`}
        style={{
          border: 0,
          filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      />
    </div>
  );
}
