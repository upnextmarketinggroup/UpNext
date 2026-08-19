/**
 * Resolves the site's absolute base URL for metadata (canonical links,
 * OpenGraph images).
 *
 * This must NEVER return an empty string: `new URL('')` throws
 * ERR_INVALID_URL, and because Next.js evaluates metadata while collecting page
 * data, that failure breaks the production build rather than just one page.
 *
 * The trap this replaces: `process.env.NEXT_PUBLIC_SITE_URL ?? site.url`.
 * `??` only falls back on null/undefined, so an env var that exists but is
 * blank — which is what Vercel hands you for a variable added with no value —
 * passed the empty string straight through.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — the real domain, once it is live
 *   2. VERCEL_URL           — the current deployment (preview builds)
 *   3. site.url             — from content.ts, if it has been filled in
 *   4. FALLBACK_SITE_URL    — last resort, so the build always succeeds
 */
import { site } from '@/content/content';

export const FALLBACK_SITE_URL = 'https://upnext.vercel.app';

/** Trims a candidate and returns it only if it is a usable absolute URL. */
function usable(candidate: string | undefined, addProtocol = false): string | null {
  const value = candidate?.trim();
  if (!value) return null;

  const withProtocol =
    addProtocol && !/^https?:\/\//i.test(value) ? `https://${value}` : value;

  try {
    // Throws on anything that is not a valid absolute URL.
    return new URL(withProtocol).toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return (
    usable(process.env.NEXT_PUBLIC_SITE_URL) ??
    // Vercel supplies VERCEL_URL without a protocol, e.g. "upnext-abc123.vercel.app".
    usable(process.env.VERCEL_URL, true) ??
    usable(site.url) ??
    FALLBACK_SITE_URL
  );
}

/** The same value as a URL object, safe to hand to Next's `metadataBase`. */
export function getSiteUrlObject(): URL {
  return new URL(getSiteUrl());
}
