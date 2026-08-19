import LeadForm from './LeadForm';
import Reveal from './Reveal';
import { finalCta } from '@/content/content';

/**
 * The page's climax (§6.7): a confident line, the reasons it is easy to say
 * yes, and the two-step form itself — no click required to convert.
 */
export default function FinalCta() {
  return (
    <Reveal
      as="section"
      id="audit"
      className="section scroll-mt-12 bg-gradient-to-b from-white to-off-white"
      aria-label="Request a free marketing audit"
    >
      <div className="container-content grid items-start gap-5 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-8">
        <div data-reveal className="lg:sticky lg:top-12">
          <p className="eyebrow">{finalCta.eyebrow}</p>
          <h2 className="text-display-sm font-bold text-ink">{finalCta.headline}</h2>
          <p className="mt-2 max-w-prose text-lg text-muted">{finalCta.subhead}</p>

          <ul className="mt-4 flex flex-col gap-1">
            {finalCta.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-1 text-base text-ink">
                <svg viewBox="0 0 24 24" className="h-2 w-2 shrink-0" aria-hidden>
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="var(--cyan)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-reveal-group="form">
          <LeadForm />
        </div>
      </div>
    </Reveal>
  );
}
