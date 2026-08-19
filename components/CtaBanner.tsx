import Link from 'next/link';
import Logo from './Logo';
import Reveal from './Reveal';
import { finalCta, nav } from '@/content/content';

/**
 * Sub-page closer. Sub-pages exist for the curious, so they end by pointing
 * back at the form on the homepage rather than repeating it (§5).
 */
export default function CtaBanner({
  headline = finalCta.headline,
  body = finalCta.subhead,
}: {
  headline?: string;
  body?: string;
}) {
  return (
    <Reveal as="section" className="section bg-off-white" aria-label="Get started">
      <div className="container-content">
        <div
          data-reveal
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-deep to-cyan px-4 py-8 text-center shadow-cyan lg:px-10 lg:py-12"
        >
          <div className="mb-3 flex justify-center">
            <Logo variant="onCyan" href={null} />
          </div>
          <h2 className="mx-auto max-w-[26ch] text-display-sm font-bold text-white">
            {headline}
          </h2>
          <p className="mx-auto mt-2 max-w-prose text-lg text-white/85">{body}</p>
          <Link
            href={nav.cta.href}
            className="btn mt-4 bg-white text-lg text-cyan-deep hover:-translate-y-0.5 hover:shadow-lift"
          >
            {nav.cta.label}
            <svg viewBox="0 0 24 24" className="h-2 w-2" aria-hidden>
              <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
