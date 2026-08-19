import Reveal from './Reveal';

/** Shared sub-page masthead. Calm by design — the loud motion lives on home. */
export default function PageHeader({
  eyebrow,
  headline,
  intro,
}: {
  eyebrow: string;
  headline: string;
  intro?: string;
}) {
  return (
    <Reveal as="header" className="bg-off-white pb-6 pt-16 lg:pb-10 lg:pt-24">
      <div className="container-content">
        <p data-reveal className="eyebrow">
          {eyebrow}
        </p>
        <h1 data-reveal className="max-w-[22ch] text-display font-bold text-ink">
          {headline}
        </h1>
        {intro && (
          <p data-reveal className="mt-3 max-w-prose text-lg text-muted sm:text-xl">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
