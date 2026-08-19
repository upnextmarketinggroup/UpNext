import Link from 'next/link';
import Logo from './Logo';
import { footer, site, socials } from '@/content/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-content grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:py-10">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-2 max-w-[34ch] text-base text-muted">{footer.blurb}</p>
          <p className="mt-2 text-sm text-muted">{site.location}</p>
        </div>

        {footer.columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {column.title}
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-ink/80 transition-colors hover:text-cyan-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-content flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-3">
            <li>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink/80 transition-colors hover:text-cyan-deep"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-cyan-deep"
              >
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
                  className="text-sm font-medium text-ink/80 transition-colors hover:text-cyan-deep"
                >
                  {site.phone}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
