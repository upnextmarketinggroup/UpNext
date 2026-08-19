'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { nav } from '@/content/content';

/**
 * Sticky top nav (§6.1). Gains a solid background + shrinks once the visitor
 * scrolls past the hero (§4).
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on Escape, and lock the page behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-[var(--dur-base)] ease-brand ${
        scrolled
          ? 'border-b border-line bg-white/85 py-1 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-2'
      }`}
    >
      <nav
        className="container-content flex items-center justify-between gap-2"
        aria-label="Main"
      >
        <Logo />

        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base font-medium text-ink/80 transition-colors duration-[var(--dur-fast)] hover:text-cyan-deep"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={nav.cta.href} className="btn-primary text-sm">
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn-secondary md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="container-content md:hidden"
        >
          <ul className="mt-2 flex flex-col gap-1 rounded-lg border border-line bg-white p-2 shadow-lift">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-2 py-1 text-lg font-medium text-ink hover:bg-off-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                {nav.cta.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
