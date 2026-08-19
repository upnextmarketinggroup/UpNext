import Hero from '@/components/Hero';
import WorkShowcase from '@/components/WorkShowcase';
import ProofBand from '@/components/ProofBand';
import ServicesGrid from '@/components/ServicesGrid';
import MiniAbout from '@/components/MiniAbout';
import FinalCta from '@/components/FinalCta';

/**
 * Homepage — one concise scroll that hits every beat and ends on the form (§6).
 * Order is deliberate: craft first (hero + work), then proof, then what you
 * get, then who we are, then the ask.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkShowcase />
      <ProofBand />
      <ServicesGrid />
      <MiniAbout />
      <FinalCta />
    </>
  );
}
