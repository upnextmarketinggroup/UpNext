'use client';

import { useEffect, useRef } from 'react';

/**
 * One component for every piece of video/image media on the site.
 *
 * - Real asset present  -> muted + autoplay + loop + playsinline video with a
 *   poster, `preload="none"` so it never competes with LCP, and playback
 *   paused while offscreen (§12).
 * - No asset yet        -> a tasteful branded motion placeholder that clearly
 *   labels itself, so nothing looks broken and nothing looks finished (§10).
 */
export default function MediaFrame({
  src,
  poster,
  label,
  title,
  className = '',
  priority = false,
  objectPosition = 'center',
  labelPosition = 'center',
}: {
  src?: string;
  poster?: string;
  label?: string;
  title?: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  /** 'corner' keeps the placeholder badge clear of overlaid text (e.g. the hero). */
  labelPosition?: 'center' | 'corner';
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play what is on screen — keeps a grid of clips from cooking the CPU.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Autoplay refused (e.g. low-power mode) — the poster stands in. */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  if (src) {
    return (
      <video
        ref={videoRef}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition }}
        poster={poster || undefined}
        muted
        loop
        playsInline
        autoPlay={priority}
        preload={priority ? 'metadata' : 'none'}
        aria-label={title}
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  /* ---- PLACEHOLDER: branded motion stand-in. Swap by setting `src` in
     content/content.ts. ---- */
  return (
    <div
      className={`placeholder-surface relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-cyan/25 via-white to-cyan-deep/20 ${className}`}
      role="img"
      aria-label={title ? `${title} — placeholder media` : 'Placeholder media'}
    >
      {/* Drifting cyan bloom — motion without a file. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1/4 animate-[marquee_28s_linear_infinite] opacity-70 [animation-direction:alternate]"
        style={{
          background:
            'radial-gradient(38% 46% at 30% 40%, rgba(83,165,216,0.5), transparent 70%), radial-gradient(32% 40% at 72% 65%, rgba(46,134,193,0.42), transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
      {labelPosition === 'corner' ? (
        <span className="absolute bottom-2 right-2 max-w-[24ch] rounded-full bg-white/80 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-deep shadow-card backdrop-blur">
          {label}
        </span>
      ) : (
        <div className="relative flex flex-col items-center gap-1 px-3 text-center">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/85 shadow-card backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-[1px]" aria-hidden>
              <path d="M8 5.5v13l11-6.5-11-6.5z" fill="var(--cyan-deep)" />
            </svg>
          </span>
          {title && (
            <span className="font-display text-lg font-semibold text-ink">{title}</span>
          )}
          {label && (
            <span className="max-w-[26ch] rounded-full bg-white/85 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-deep backdrop-blur">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
