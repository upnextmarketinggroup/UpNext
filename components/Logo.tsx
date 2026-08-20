import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/content';

/**
 * UpNext identity (§3).
 *
 * - `Logo` — the header/footer lockup: a text wordmark, "Up" in ink and
 *   "Next" in cyan, set in Anton. No badge.
 * - `LogoMark` — the cyan circle badge with the arrow-U over "NEXT.". It is no
 *   longer part of the nav, but it stays the favicon / browser-tab icon
 *   (see app/icon.svg) and the square avatar mark for social and /start.
 *
 * The header reads "UpNext"; the full legal name, "UpNext Media", is
 * `site.name` and belongs in the footer, metadata and legal copy.
 *
 * SWAPPING IN THE REAL LOGO: drop the client file at
 * `public/logo/upnext.svg` (and `public/logo/upnext-white.svg` for the
 * knockout) and set USE_IMAGE_FILES = true below. Nothing else changes.
 */
const USE_IMAGE_FILES = false;

type Variant = 'onLight' | 'onCyan';

export function LogoMark({ variant, className }: { variant: Variant; className?: string }) {
  const badge = variant === 'onCyan' ? 'var(--white)' : 'var(--cyan)';
  const glyph = variant === 'onCyan' ? 'var(--cyan)' : 'var(--white)';

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={`${site.name} logo`}
    >
      <circle cx="60" cy="60" r="60" fill={badge} />
      {/* U with the arrow integrated into the right ascender */}
      <path
        d="M32 34v24c0 8.2 6.6 14.8 14.8 14.8S61.6 66.2 61.6 58V46.2l-6.4 6.4-5-5L58.8 33l9.6 14.6-5 5-6.4-6.4"
        fill="none"
        stroke={glyph}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* P */}
      <path
        d="M72 34v39M72 34h9.5a10.5 10.5 0 0 1 0 21H72"
        fill="none"
        stroke={glyph}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* NEXT. */}
      <text
        x="60"
        y="97"
        textAnchor="middle"
        fill={glyph}
        style={{
          font: '700 20px/1 var(--font-display)',
          letterSpacing: '0.02em',
        }}
      >
        NEXT.
      </text>
    </svg>
  );
}

export default function Logo({
  variant = 'onLight',
  withWordmark = true,
  className = '',
  href = '/',
}: {
  variant?: Variant;
  withWordmark?: boolean;
  className?: string;
  href?: string | null;
}) {
  /* On cyan the wordmark knocks out in white; the accent half goes ink so
     "Next" still reads as its own word. */
  const upColor = variant === 'onCyan' ? 'text-white' : 'text-ink';
  const nextColor = variant === 'onCyan' ? 'text-ink' : 'text-cyan';

  const inner = withWordmark ? (
    /* Anton only ships one weight — no font-semibold, and a touch of negative
       tracking to tighten the two halves into a single word. */
    <span
      className={`inline-flex items-baseline text-lg leading-none tracking-[-0.01em] ${className}`}
      style={{ fontFamily: "'Anton', var(--font-display), system-ui, sans-serif" }}
    >
      <span className={upColor}>Up</span>
      <span className={nextColor}>Next</span>
    </span>
  ) : (
    <span className={`inline-flex items-center ${className}`}>
      {USE_IMAGE_FILES ? (
        <Image
          src={variant === 'onCyan' ? '/logo/upnext-white.svg' : '/logo/upnext.svg'}
          alt={`${site.name} logo`}
          width={40}
          height={40}
          className="h-5 w-5"
          priority
        />
      ) : (
        <LogoMark variant={variant} className="h-5 w-5 shrink-0" />
      )}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} aria-label={`${site.shortName} — home`} className="rounded-sm">
      {inner}
    </Link>
  );
}
