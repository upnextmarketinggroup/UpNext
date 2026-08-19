import Link from 'next/link';

/** Shared section header: eyebrow + headline + optional intro and link. */
export default function SectionHeading({
  eyebrow,
  headline,
  intro,
  cta,
  align = 'left',
  tone = 'light',
}: {
  eyebrow?: string;
  headline: string;
  intro?: string;
  cta?: { label: string; href: string };
  align?: 'left' | 'center';
  tone?: 'light' | 'cyan';
}) {
  const centered = align === 'center';
  const onCyan = tone === 'cyan';

  return (
    <div
      className={`flex flex-col gap-2 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-prose' : 'w-full md:max-w-[68%]'}>
        {eyebrow && (
          <p
            data-reveal
            className={`eyebrow ${onCyan ? 'text-white/80' : ''}`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-reveal
          className={`text-display-sm font-bold ${onCyan ? 'text-white' : 'text-ink'}`}
        >
          {headline}
        </h2>
        {intro && (
          <p
            data-reveal
            className={`mt-2 text-lg ${onCyan ? 'text-white/85' : 'text-muted'}`}
          >
            {intro}
          </p>
        )}
      </div>

      {cta && (
        <Link
          data-reveal
          href={cta.href}
          className={`${onCyan ? 'btn bg-white text-cyan-deep hover:-translate-y-0.5' : 'btn-secondary'} shrink-0`}
        >
          {cta.label}
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
      )}
    </div>
  );
}
