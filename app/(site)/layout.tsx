import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/**
 * Layout for the main site. `/start` deliberately sits outside this group so
 * the QR landing page stays single-purpose — no nav, no footer, one action (§8).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-2 focus:py-1 focus:font-semibold focus:text-ink focus:shadow-lift"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
