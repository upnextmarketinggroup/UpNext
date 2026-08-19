'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { revealOnScroll } from '@/lib/motion';

/**
 * Wraps a section and animates any descendant marked `data-reveal` as it
 * scrolls in. Children opt in, so a section can hold both animated and calm
 * content (§4: big moves in a few places, restraint everywhere else).
 */
export default function Reveal({
  children,
  className,
  stagger,
  y,
  as: Tag = 'div',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  as?: 'div' | 'section' | 'footer' | 'ul' | 'header';
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Let layout settle (fonts, images) before measuring trigger positions.
    const id = requestAnimationFrame(() => revealOnScroll(el, { stagger, y }));
    return () => cancelAnimationFrame(id);
  }, [stagger, y]);

  return (
    <Tag ref={ref as never} className={className} data-reveal-scope="" {...rest}>
      {children}
    </Tag>
  );
}
