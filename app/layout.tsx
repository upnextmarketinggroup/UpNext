import type { Metadata, Viewport } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import { site, theme } from '@/content/content';
import { getSiteUrlObject } from '@/lib/site-url';
import './globals.css';

export const metadata: Metadata = {
  // Never `new URL(process.env…)` directly — a blank env var throws at build
  // time and takes the whole build down. See lib/site-url.ts.
  metadataBase: getSiteUrlObject(),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#53a5d8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* `data-headline` drives the headline-font swap — see theme in content.ts. */
    <html lang="en" data-headline={theme.headlineFont}>
      <head>
        {/* Fonts loaded via <link> rather than next/font so the site builds and
            runs in offline/air-gapped environments too (§3). */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Anton&family=Archivo:wght@600;700;800&display=swap"
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
