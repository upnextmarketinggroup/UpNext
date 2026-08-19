import type { Metadata } from 'next';
import CtaBanner from '@/components/CtaBanner';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { services, servicesPage } from '@/content/content';

export const metadata: Metadata = {
  title: 'Services',
  description: servicesPage.intro,
};

/**
 * Services page (§7). Outcome-focused detail only: no mechanics, no funnel
 * anatomy, no pricing anywhere.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={servicesPage.eyebrow}
        headline={servicesPage.headline}
        intro={servicesPage.intro}
      />

      <Reveal as="section" className="section bg-white" aria-label="Service detail">
        <div className="container-content flex flex-col gap-6 lg:gap-10">
          {services.items.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              data-reveal
              data-reveal-group={service.slug}
              className={`scroll-mt-16 grid gap-3 rounded-xl border p-4 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-8 lg:p-8 ${
                service.featured
                  ? 'border-transparent bg-gradient-to-br from-cyan-deep to-cyan text-white shadow-cyan'
                  : 'border-line bg-white shadow-card'
              }`}
            >
              <div>
                <span
                  aria-hidden
                  className={`font-display text-sm font-semibold tabular-nums ${
                    service.featured ? 'text-white/70' : 'text-cyan'
                  }`}
                >
                  0{i + 1}
                </span>
                <h2
                  className={`text-2xl font-semibold ${
                    service.featured ? 'text-white' : 'text-ink'
                  }`}
                >
                  {service.name}
                </h2>
                <p
                  className={`mt-1 text-lg font-medium ${
                    service.featured ? 'text-white' : 'text-cyan-deep'
                  }`}
                >
                  {service.outcome}
                </p>
              </div>

              <div>
                <p
                  className={`max-w-prose text-lg ${
                    service.featured ? 'text-white/90' : 'text-muted'
                  }`}
                >
                  {service.detail}
                </p>
                <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className={`flex items-start gap-1 text-base ${
                        service.featured ? 'text-white' : 'text-ink'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-2 w-2 shrink-0" aria-hidden>
                        <path
                          d="M5 13l4 4L19 7"
                          stroke={service.featured ? 'currentColor' : 'var(--cyan)'}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <CtaBanner
        headline={servicesPage.closer.headline}
        body={servicesPage.closer.body}
      />
    </>
  );
}
