'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import CountUp from './CountUp';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { gsap, prefersReducedMotion } from '@/lib/motion';
import { clientLogos, proof } from '@/content/content';

/**
 * The respectful proof pattern (§6.4, §13): client logo + a short quote in
 * their words + one real number. Nothing else — no case-study bragging, no
 * over-featuring of client names. Numbers count up on scroll (§4).
 */
export default function ProofBand() {
  const logoRow = useRef<HTMLDivElement>(null);

  // Logos slide/stagger into place on enter (§4).
  useEffect(() => {
    const el = logoRow.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-logo]',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Reveal as="section" className="section bg-white" aria-label="Client proof">
      <div className="container-content">
        <SectionHeading eyebrow={proof.eyebrow} headline={proof.headline} />

        {/* Logo row */}
        <div ref={logoRow} className="mt-6 border-y border-line py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {clientLogos.label}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
            {clientLogos.items.map((client) => (
              <div key={client.name} data-logo className="opacity-100">
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={200}
                    height={64}
                    className="h-4 w-auto object-contain grayscale transition duration-[var(--dur-base)] hover:grayscale-0"
                  />
                ) : (
                  /* PLACEHOLDER LOGO — set `logo` in content/content.ts. */
                  <span className="placeholder-surface inline-flex h-5 items-center rounded border border-dashed border-cyan/50 px-2 font-display text-base font-semibold text-cyan-deep">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Proof slots */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {proof.items.map((item) => (
            <figure
              key={item.client}
              data-reveal
              data-reveal-group="proof"
              className="card flex flex-col gap-3 p-4 lg:p-5"
            >
              <div className="flex items-center gap-2">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.client}
                    width={160}
                    height={48}
                    className="h-4 w-auto object-contain"
                  />
                ) : (
                  /* PLACEHOLDER LOGO — swap in content/content.ts. */
                  <span className="placeholder-surface inline-flex h-5 items-center rounded border border-dashed border-cyan/50 px-2 font-display text-base font-semibold text-cyan-deep">
                    {item.client}
                  </span>
                )}
              </div>

              <blockquote className="text-xl font-medium text-ink">
                <span aria-hidden className="text-cyan">“</span>
                {/* PLACEHOLDER QUOTE — pull from testimonial video. */}
                {item.quote}
                <span aria-hidden className="text-cyan">”</span>
              </blockquote>

              <figcaption className="mt-auto flex items-baseline gap-2 border-t border-line pt-3">
                <span className="font-display text-3xl font-bold text-ink">
                  <CountUp
                    value={item.metric.value}
                    prefix={item.metric.prefix}
                    suffix={item.metric.suffix}
                    placeholder={item.metric.placeholder}
                    placeholderText={item.metric.label}
                  />
                </span>
                {!item.metric.placeholder && (
                  <span className="text-base text-muted">{item.metric.label}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
