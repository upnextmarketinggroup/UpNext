'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion';

/**
 * Counts 0 -> value when scrolled into view (§4). If `placeholder` is true the
 * real figure is not in yet, so we render the placeholder label instead of
 * animating a fake number.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  placeholder = false,
  placeholderText = '[REAL RESULT]',
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  placeholder?: boolean;
  placeholderText?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || placeholder) return;

    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: value,
      duration: 1.8,
      ease: 'power2.out',
      snap: { n: 1 },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.n).toLocaleString()}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, prefix, suffix, placeholder]);

  if (placeholder) {
    return (
      <span
        className={`${className ?? ''} rounded-sm bg-cyan/10 px-1 text-cyan-deep`}
        /* PLACEHOLDER NUMBER — set `metric.value` and `placeholder: false`
           in content/content.ts to switch this to a real count-up. */
      >
        {placeholderText}
      </span>
    );
  }

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
}
