import Link from 'next/link';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { services } from '@/content/content';

/**
 * Services by outcome (§7). Each card is named by the result it drives, never
 * the mechanism. The Growth System card references the system's power without
 * describing a single moving part — that is deliberate.
 */
export default function ServicesGrid() {
  return (
    <Reveal as="section" id="services" className="section bg-off-white" aria-label="Services">
      <div className="container-content">
        <SectionHeading
          eyebrow={services.eyebrow}
          headline={services.headline}
          intro={services.intro}
          cta={services.cta}
        />

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {services.items.map((service, i) => (
            <li
              key={service.slug}
              data-reveal
              data-reveal-group="services"
              className={`group relative flex flex-col gap-1 overflow-hidden rounded-lg border p-4 transition-all duration-[var(--dur-base)] ease-brand hover:-translate-y-0.5 lg:p-5 ${
                service.featured
                  ? 'border-transparent bg-gradient-to-br from-cyan-deep to-cyan text-white shadow-cyan'
                  : 'border-line bg-white shadow-card hover:shadow-lift'
              }`}
            >
              <span
                aria-hidden
                className={`font-display text-sm font-semibold tabular-nums ${
                  service.featured ? 'text-white/70' : 'text-cyan'
                }`}
              >
                0{i + 1}
              </span>
              <h3
                className={`text-2xl font-semibold ${
                  service.featured ? 'text-white' : 'text-ink'
                }`}
              >
                {service.name}
              </h3>
              <p
                className={`text-lg font-medium ${
                  service.featured ? 'text-white' : 'text-cyan-deep'
                }`}
              >
                {service.outcome}
              </p>
              <p
                className={`max-w-prose text-base ${
                  service.featured ? 'text-white/85' : 'text-muted'
                }`}
              >
                {service.detail}
              </p>
              <Link
                href={`/services#${service.slug}`}
                className={`mt-1 inline-flex items-center gap-0.5 text-base font-semibold ${
                  service.featured ? 'text-white' : 'text-ink hover:text-cyan-deep'
                }`}
              >
                What you get
                <svg
                  viewBox="0 0 24 24"
                  className="h-2 w-2 transition-transform duration-[var(--dur-base)] group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
