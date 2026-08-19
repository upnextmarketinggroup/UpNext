'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import MediaFrame from './MediaFrame';
import SectionHeading from './SectionHeading';
import { gsap, prefersReducedMotion, revealOnScroll } from '@/lib/motion';
import { workShowcase } from '@/content/content';

/**
 * The homepage's one pinned moment (§4): on desktop the section holds still,
 * filling the viewport, while the clips advance horizontally — then it releases.
 *
 * On small screens and under reduced motion it degrades to an ordinary
 * swipeable rail: no pinning, and nothing delaying the trip to the form.
 */
export default function WorkShowcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const rail = track.current;
    if (!el || !rail) return;

    if (prefersReducedMotion()) return;

    revealOnScroll(el, { start: 'top 80%' });

    const mm = gsap.matchMedia();

    // Pin only where there is room for it.
    mm.add('(min-width: 1024px)', () => {
      const distance = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
      if (distance() === 0) return;

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      data-reveal-scope=""
      className="section flex flex-col justify-center overflow-hidden bg-off-white lg:h-screen lg:py-0 lg:pb-6 lg:pt-16"
      aria-label="Selected work"
    >
      <div className="container-content shrink-0">
        <SectionHeading
          eyebrow={workShowcase.eyebrow}
          headline={workShowcase.headline}
          intro={workShowcase.intro}
          cta={workShowcase.cta}
        />
      </div>

      {/* Rail. Height is viewport-relative on desktop so the pinned frame always
          fits; card widths follow from their aspect ratio. */}
      <div
        ref={track}
        className="mt-4 flex gap-2 overflow-x-auto px-3 pb-2 sm:px-4 lg:mt-6 lg:min-h-0 lg:flex-1 lg:overflow-visible lg:px-6 lg:pb-0"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {workShowcase.items.map((item) => (
          <figure
            key={item.title}
            className={`group relative shrink-0 overflow-hidden rounded-lg border border-line bg-white shadow-card transition-shadow duration-[var(--dur-base)] ease-brand hover:shadow-lift lg:h-full lg:w-auto ${
              item.featured
                ? 'aspect-[4/5] w-[80vw] sm:aspect-video sm:w-[70vw]'
                : 'aspect-[4/5] w-[68vw] sm:w-[46vw]'
            }`}
            style={{ scrollSnapAlign: 'start' }}
          >
            <MediaFrame
              src={item.src}
              poster={item.poster}
              label={item.label}
              className="transition-transform duration-[var(--dur-slow)] ease-brand group-hover:scale-[1.03]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-1 bg-gradient-to-t from-ink/70 to-transparent p-2 pt-8">
              <span className="font-display text-lg font-semibold text-white">
                {item.title}
              </span>
              <span className="rounded-full bg-white/90 px-1 py-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-deep">
                {item.kind}
              </span>
            </figcaption>
          </figure>
        ))}

        {/* End cap: the rail leads somewhere. */}
        <Link
          href={workShowcase.cta.href}
          className="group flex aspect-[4/5] w-[68vw] shrink-0 flex-col justify-end gap-1 rounded-lg border border-line bg-white p-3 shadow-card transition-shadow hover:shadow-lift sm:w-[46vw] lg:aspect-video lg:h-full lg:w-auto"
          style={{ scrollSnapAlign: 'start' }}
        >
          <span className="font-display text-2xl font-semibold text-ink">
            {workShowcase.cta.label}
          </span>
          <span className="inline-flex items-center gap-0.5 text-base font-semibold text-cyan-deep">
            Full portfolio
            <svg viewBox="0 0 24 24" className="h-2 w-2 transition-transform group-hover:translate-x-0.5" aria-hidden>
              <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
