import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { site, socials, startPage } from '@/content/content';

export const metadata: Metadata = {
  title: 'Start here',
  description: startPage.subhead,
  // A QR-code destination has no business in search results.
  robots: { index: false, follow: true },
};

/**
 * /start — the QR-code + t-shirt landing page (§8).
 *
 * Deliberately NOT a flat link tree: one oversized cyan action dominates and
 * everything else is visibly secondary. Mobile-first, since nearly every scan
 * happens on a phone.
 */

/** Secondary links can point at values from `socials` via a keyword. */
function resolveHref(href: string): string | null {
  if (href === 'INSTAGRAM') return socials.instagram || null;
  if (href === 'BOOK_A_CALL') return socials.bookACall || null;
  return href;
}

export default function StartPage() {
  const secondary = startPage.secondary
    .map((link) => ({ ...link, href: resolveHref(link.href) }))
    .filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <div className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-off-white px-2 py-10">
      {/* Cyan spotlight behind the card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 0%, rgb(var(--cyan-rgb) / 0.28), transparent 70%)',
        }}
      />

      <main className="relative mx-auto w-full max-w-[30rem]">
        <div className="rounded-xl border border-line bg-white p-3 shadow-lift sm:p-5">
          <header className="text-center">
            <div className="flex justify-center">
              <Logo withWordmark={false} className="[&_svg]:h-8 [&_svg]:w-8" />
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold text-ink">
              {startPage.greeting}
            </h1>
            <p className="mx-auto mt-1 max-w-[32ch] text-base text-muted">
              {startPage.subhead}
            </p>
          </header>

          {/* The one action that matters. */}
          <Link
            href={startPage.primary.href}
            className="btn-primary mt-4 w-full px-3 py-3 text-xl leading-tight"
          >
            {startPage.primary.label}
            <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" aria-hidden>
              <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>

          <p className="mt-2 text-center text-sm text-muted">
            Takes 30 seconds. No obligation.
          </p>

          {/* Everything else, visibly quieter. */}
          <nav className="mt-4 border-t border-line pt-3" aria-label="More links">
            <ul className="flex flex-col gap-1">
              {secondary.map((link) => {
                const external = link.href.startsWith('http');
                return (
                  <li key={link.label}>
                    {external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded border border-line px-2 py-2 text-base font-medium text-ink transition-colors duration-[var(--dur-fast)] hover:border-cyan/50 hover:text-cyan-deep"
                      >
                        {link.label}
                        <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="flex items-center justify-between rounded border border-line px-2 py-2 text-base font-medium text-ink transition-colors duration-[var(--dur-fast)] hover:border-cyan/50 hover:text-cyan-deep"
                      >
                        {link.label}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <p className="mt-3 text-center text-sm text-muted">
          {site.name} · {startPage.footnote}
        </p>
      </main>
    </div>
  );
}
