import Link from 'next/link';
import MediaFrame from './MediaFrame';
import Reveal from './Reveal';
import { media, miniAbout } from '@/content/content';

/** One tight block; the full story lives on /about (§6.6). */
export default function MiniAbout() {
  return (
    <Reveal as="section" className="section bg-white" aria-label="About UpNext">
      <div className="container-content grid items-center gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line shadow-card sm:aspect-[3/2] lg:aspect-[4/5]">
          {/* PLACEHOLDER — founder photo / clip. Swap `media.founder` in content.ts. */}
          <MediaFrame
            src={media.founder.src}
            poster={media.founder.poster}
            label={media.founder.label}
          />
        </div>

        <div data-reveal>
          <p className="eyebrow">{miniAbout.eyebrow}</p>
          <h2 className="text-display-sm font-bold text-ink">{miniAbout.headline}</h2>
          {miniAbout.body.map((paragraph) => (
            <p key={paragraph} className="mt-2 max-w-prose text-lg text-muted">
              {paragraph}
            </p>
          ))}
          <Link href={miniAbout.cta.href} className="btn-secondary mt-3">
            {miniAbout.cta.label}
            <svg viewBox="0 0 24 24" className="h-2 w-2" aria-hidden>
              <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
