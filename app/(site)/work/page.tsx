import type { Metadata } from 'next';
import CtaBanner from '@/components/CtaBanner';
import MediaFrame from '@/components/MediaFrame';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { media, workPage } from '@/content/content';

export const metadata: Metadata = {
  title: 'Work',
  description: workPage.intro,
};

/** Fuller portfolio (§5). More footage, less copy. */
export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow={workPage.eyebrow}
        headline={workPage.headline}
        intro={workPage.intro}
      />

      {/* The reel, deep-linked from /start ("Watch the reel"). */}
      <Reveal as="section" id="reel" className="scroll-mt-12 bg-off-white pb-6 lg:pb-10">
        <div className="container-content">
          <div
            data-reveal
            className="relative aspect-video overflow-hidden rounded-xl border border-line shadow-lift"
          >
            {/* PLACEHOLDER REEL — swap `media.heroReel` in content/content.ts. */}
            <MediaFrame
              src={media.heroReel.src}
              poster={media.heroReel.poster}
              label={media.heroReel.label}
              title="The reel"
            />
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section bg-white" aria-label="Projects">
        <div className="container-content grid gap-4 sm:grid-cols-2 lg:gap-6">
          {workPage.projects.map((project, i) => (
            <article
              key={project.title}
              data-reveal
              data-reveal-group={`project-${Math.floor(i / 2)}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-white shadow-card transition-shadow duration-[var(--dur-base)] ease-brand group-hover:shadow-lift sm:aspect-video">
                <MediaFrame
                  src={project.src}
                  poster={project.poster}
                  label={project.label}
                  className="transition-transform duration-[var(--dur-slow)] ease-brand group-hover:scale-[1.03]"
                />
              </div>
              <h2 className="mt-2 text-xl font-semibold text-ink">{project.title}</h2>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-cyan-deep">
                {project.kind}
              </p>
              <p className="mt-1 max-w-prose text-base text-muted">{project.blurb}</p>
            </article>
          ))}
        </div>
      </Reveal>

      <CtaBanner
        headline="Want work that looks like this?"
        body="Start with the free audit. We will tell you exactly what we would shoot and why."
      />
    </>
  );
}
