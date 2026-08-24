import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import { contact, nav, site } from "@/lib/site";
import { usluge } from "@/lib/usluge";

const linkClass =
  "inline-block py-1.5 text-sm text-white/70 transition-colors duration-300 hover:text-[var(--red-on-dark)]";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="shell">
        <div className="grid gap-y-12 border-t border-white/12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" aria-label="Biz Up Team — početna">
              <Wordmark className="text-white" />
            </Link>
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-white/60">
              Ugovorni partner A1-a za telekomunikacijske usluge i partner
              Canona za uredsku tehnologiju. {site.city}.
            </p>
          </div>

          <nav aria-label="Podnožje — stranica" className="lg:col-span-2 lg:col-start-5">
            <p className="t-label text-white/55">Stranica</p>
            <ul className="mt-4 flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Podnožje — usluge" className="lg:col-span-3 lg:col-start-7">
            <p className="t-label text-white/55">Usluge</p>
            <ul className="mt-4 flex flex-col gap-1">
              {usluge.map((u) => (
                <li key={u.slug}>
                  <Link href={`/usluge/${u.slug}`} className={linkClass}>{u.nav}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic lg:col-span-3 lg:col-start-10">
            <p className="t-label text-white/55">Kontakt</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
              <li className="pt-1">
                {contact.street}
                <br />
                {contact.cityLine}
              </li>
              <li>
                <a href={contact.phoneHref} className="inline-block py-1 tabular-nums transition-colors duration-300 hover:text-[var(--red-on-dark)]">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="inline-block py-1 transition-colors duration-300 hover:text-[var(--red-on-dark)]">
                  {contact.email}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 py-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. Sva prava pridržana.</p>
          <p>A1 i Canon su zaštitni znakovi svojih vlasnika. Biz Up Team je njihov partner.</p>
        </div>
      </div>
    </footer>
  );
}
