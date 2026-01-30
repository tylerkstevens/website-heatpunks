/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Heatpunk design system
        black: '#0a0a0a',
        dark: {
          DEFAULT: '#121212',
          alt: '#1a1a1a',
        },
        gray: {
          DEFAULT: '#2a2a2a',
          light: '#888888',
        },
        // Primary flame colors
        flame: {
          DEFAULT: '#ff6b00',
          light: '#ff8c33',
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdba8',
          300: '#ffc170',
          400: '#ff9d37',
          500: '#ff6b00',
          600: '#f06406',
          700: '#c74a07',
          800: '#9e3a0e',
          900: '#7f320f',
        },
        // Red accent
        red: {
          DEFAULT: '#ff3d00',
          500: '#ff3d00',
        },
        // Terminal green (cypherpunk)
        terminal: {
          DEFAULT: '#00ff41',
          500: '#00ff41',
          dim: '#00cc33',
        },
        // Secondary olive tones
        olive: {
          50: '#f7f7f0',
          100: '#eceede',
          200: '#d8dcbd',
          300: '#bec494',
          400: '#a5ab70',
          500: '#8a9155',
          600: '#6c7343',
          700: '#545937',
          800: '#454930',
          900: '#3b3f2b',
        },
        // Charcoal dark tones
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#3d3d3d',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flame-glow': 'flameGlow 4s ease-in-out infinite',
        'text-glow': 'textGlow 2s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'scroll-pulse': 'scrollPulse 2s ease-in-out infinite',
        'flame-wave': 'flameWave 3s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        flameGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        textGlow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '1', height: '40px' },
          '50%': { opacity: '0.5', height: '30px' },
        },
        flameWave: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
