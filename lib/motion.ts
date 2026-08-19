/**
 * Central GSAP setup. Registering the plugin in one module keeps every
 * component's import identical and avoids double registration.
 */
'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

let registered = false;

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });
  registered = true;
}

/** True when the visitor has asked the OS for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Standard scroll-linked reveal: fade + rise as the element enters the
 * viewport, with optional stagger across children marked `[data-reveal]`.
 */
export function revealOnScroll(
  scope: HTMLElement,
  options: { stagger?: number; y?: number; start?: string } = {}
) {
  const { stagger = 0.08, y = 24, start = 'top 85%' } = options;
  const targets = Array.from(
    scope.querySelectorAll<HTMLElement>('[data-reveal]')
  );
  if (targets.length === 0) return;

  // Group by the `data-reveal-group` attribute so unrelated blocks inside one
  // section animate on their own trigger instead of all firing at once.
  const groups = new Map<string, HTMLElement[]>();
  targets.forEach((el) => {
    const key = el.dataset.revealGroup ?? 'default';
    const list = groups.get(key) ?? [];
    list.push(el);
    groups.set(key, list);
  });

  groups.forEach((items) => {
    gsap.fromTo(
      items,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        stagger,
        duration: 0.85,
        scrollTrigger: {
          trigger: items[0],
          start,
          once: true,
        },
      }
    );
  });
}

export { gsap, ScrollTrigger };
