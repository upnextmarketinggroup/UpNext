import type { Metadata } from 'next';
import CtaBanner from '@/components/CtaBanner';
import MediaFrame from '@/components/MediaFrame';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { aboutPage, media, site } from '@/content/content';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.name} — ${site.tagline}`,
};

/** The founder's story, on camera, plus behind-the-scenes (§5). */
export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={aboutPage.eyebrow} headline={aboutPage.headline} />

      <Reveal as="section" className="bg-off-white pb-8 lg:pb-12" aria-label="Founder">
        <div className="container-content grid gap-4 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-8">
          <div data-reveal className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line shadow-lift">
            {/* PLACEHOLDER — founder photo / clip. Swap in content/content.ts. */}
            <MediaFrame
              src={media.founder.src}
              poster={media.founder.poster}
              label={media.founder.label}
            />
          </div>

          <div data-reveal data-reveal-group="story">
            {/* PLACEHOLDER COPY — replace with the founder's real story. */}
            <p className="max-w-prose text-xl font-medium text-ink">{aboutPage.lead}</p>
            {aboutPage.body.map((paragraph) => (
              <p key={paragraph} className="mt-2 max-w-prose text-lg text-muted">
                {paragraph}
              </p>
            ))}
            <p className="mt-4 border-t border-line pt-3 font-display text-lg font-semibold text-ink">
              {aboutPage.founder.name}
              <span className="block text-base font-normal text-muted">
                {aboutPage.founder.role}
              </span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section bg-white" aria-label="What we believe">
        <div className="container-content">
          <ul className="grid gap-2 sm:grid-cols-2">
            {aboutPage.values.map((value) => (
              <li
                key={value.title}
                data-reveal
                data-reveal-group="values"
                className="card p-4 lg:p-5"
              >
                <h2 className="text-xl font-semibold text-ink">{value.title}</h2>
                <p className="mt-1 max-w-prose text-base text-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" className="section bg-off-white" aria-label="Behind the scenes">
        <div className="container-content">
          <h2 data-reveal className="text-display-sm font-bold text-ink">
            {aboutPage.behindTheScenes.headline}
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {aboutPage.behindTheScenes.items.map((item, i) => (
              <div
                key={`bts-${i}`}
                data-reveal
                data-reveal-group="bts"
                className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line shadow-card"
              >
                {/* PLACEHOLDER — behind-the-scenes stills. Swap in content/content.ts. */}
                <MediaFrame src={item.src} label={item.label} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <CtaBanner />
    </>
  );
}
