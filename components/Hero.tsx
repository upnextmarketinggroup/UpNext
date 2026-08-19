'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import MediaFrame from './MediaFrame';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import { hero, media } from '@/content/content';

/**
 * Full-viewport hero (§6.2). Headline reveals word-by-word on load, the reel
 * fades and scales in behind it, and the media parallaxes gently on scroll.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '[data-hero-media]',
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.4 }
      )
        .fromTo(
          '[data-hero-eyebrow]',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.15
        )
        .fromTo(
          '[data-hero-word]',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.95, stagger: 0.055 },
          0.25
        )
        .fromTo(
          '[data-hero-sub], [data-hero-actions], [data-hero-hint]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.7
        );

      // Subtle parallax on the hero media (§4).
      gsap.to('[data-hero-media]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-12"
      aria-label="Introduction"
    >
      {/* Reel behind the headline. Poster loads first so LCP stays fast (§12). */}
      <div data-hero-media className="absolute inset-0 -z-20">
        <MediaFrame
          src={media.heroReel.src}
          poster={media.heroReel.poster}
          labelPosition="corner"
          priority
        />
      </div>
      {/* Off-white -> cyan wash keeps text razor-readable over any footage. */}
      <div aria-hidden className="hero-wash absolute inset-0 -z-10" />

      {/* PLACEHOLDER marker — disappears as soon as a real reel is set in
          content/content.ts. Sits above the wash so it cannot be missed. */}
      {!media.heroReel.src && (
        <span className="absolute bottom-2 right-2 z-10 max-w-[22ch] rounded-full border border-cyan/30 bg-white/90 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-deep shadow-card backdrop-blur">
          {media.heroReel.label}
        </span>
      )}

      <div className="container-content relative">
        <p data-hero-eyebrow className="eyebrow">
          <span className="h-0.5 w-0.5 rounded-full bg-cyan" aria-hidden />
          {hero.eyebrow}
        </p>

        <h1 className="max-w-[19ch] text-display-lg font-bold text-ink">
          {hero.headline.map((word, i) => (
            /* The space lives OUTSIDE the mask — a trailing space inside an
               overflow-hidden inline-block collapses and the words run together. */
            <span key={`${word.text}-${i}`}>
              <span className="word-mask">
                <span
                  data-hero-word
                  className={word.accent ? 'text-gradient-cyan' : undefined}
                >
                  {word.text}
                </span>
              </span>
              {i < hero.headline.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <p
          data-hero-sub
          className="mt-3 max-w-prose text-lg text-muted sm:text-xl"
        >
          {hero.subhead}
        </p>

        <div data-hero-actions className="mt-5 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <Link href={hero.primaryCta.href} className="btn-primary w-full text-lg sm:w-auto">
            {hero.primaryCta.label}
            <svg viewBox="0 0 24 24" className="h-2 w-2" aria-hidden>
              <path
                d="M5 12h13M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </Link>
          <Link href={hero.secondaryCta.href} className="btn-secondary w-full text-lg sm:w-auto">
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div
        data-hero-hint
        aria-hidden
        className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted [@media(min-height:860px)]:flex"
      >
        {hero.scrollHint}
        <span className="h-4 w-px bg-gradient-to-b from-cyan to-transparent" />
      </div>
    </section>
  );
}
