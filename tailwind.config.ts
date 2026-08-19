import type { Config } from 'tailwindcss';

/**
 * Brand tokens live in one place: `app/globals.css` (:root custom properties).
 * Tailwind reads them through var() so there is never a hardcoded hex in a
 * component. Change a colour once in globals.css and the whole site follows.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: 'rgb(var(--cyan-rgb) / <alpha-value>)',
          deep: 'rgb(var(--cyan-deep-rgb) / <alpha-value>)',
        },
        'off-white': 'rgb(var(--off-white-rgb) / <alpha-value>)',
        white: 'rgb(var(--white-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        line: 'rgb(var(--line-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-body)',
      },
      // Type scale — §3. 12 / 14 / 16 / 20 / 24 / 32 / 48 then fluid display sizes.
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.6' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.25rem', { lineHeight: '1.6' }],
        xl: ['1.5rem', { lineHeight: '1.4' }],
        '2xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '3xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        // Fluid display sizes: 48 -> 64 -> 80 -> 96+
        'display-sm': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(3rem, 7vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.75rem, 8vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      // 8px grid — every spacing token is a multiple of 8.
      spacing: {
        1: '0.5rem',   // 8
        2: '1rem',     // 16
        3: '1.5rem',   // 24
        4: '2rem',     // 32
        5: '2.5rem',   // 40
        6: '3rem',     // 48
        7: '3.5rem',   // 56
        8: '4rem',     // 64
        10: '5rem',    // 80
        12: '6rem',    // 96
        16: '8rem',    // 128
        20: '10rem',   // 160
        24: '12rem',   // 192
        px: '1px',
        0: '0px',
        '0.5': '0.25rem', // 4 — hairline/optical only
      },
      maxWidth: {
        content: '1200px',
        prose: '720px',
      },
      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '0.75rem',
        lg: '1.25rem',
        xl: '2rem',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,11,12,0.04), 0 8px 32px rgba(11,11,12,0.05)',
        lift: '0 2px 4px rgba(11,11,12,0.05), 0 24px 64px rgba(11,11,12,0.09)',
        cyan: '0 8px 32px rgba(83,165,216,0.35)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
