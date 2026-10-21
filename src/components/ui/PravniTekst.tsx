import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

export type Tocka = { id: string; n: string; naslov: string; sadrzaj: ReactNode };

/**
 * Raspored za pravne stranice — izjavu o privatnosti i uvjete korištenja.
 *
 * Numerirani sadržaj uz lijevi rub i tekst u mjeri od 68 znakova. Numeracija
 * je ovdje stvarna struktura, ne ukras: pravni tekst se citira po točkama
 * („vidi točku 07"), pa brojevi moraju biti vidljivi i povezivi.
 */
export default function PravniTekst({ tocke }: { tocke: Tocka[] }) {
  return (
    <section className="section bg-[var(--paper)]">
      <div className="shell">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <nav aria-label="Sadržaj" className="lg:col-span-3">
            <Reveal>
              <p className="t-label text-[var(--muted)]">Sadržaj</p>
              <ol className="mt-5 flex flex-col gap-2.5 border-t border-[var(--line)] pt-5">
                {tocke.map((t) => (
                  <li key={t.id} className="flex gap-3">
                    <span className="t-label w-5 shrink-0 pt-1 text-[var(--muted)]">{t.n}</span>
                    <a
                      href={`#${t.id}`}
                      className="text-[0.9375rem] leading-snug text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--red-on-light)]"
                    >
                      {t.naslov}
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </nav>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal delay={80}>
              <div className="flex max-w-[var(--measure)] flex-col gap-16">
                {tocke.map((t) => (
                  <section key={t.id} id={t.id} className="scroll-mt-28">
                    <h2 className="t-h3">
                      {t.n} — {t.naslov}
                    </h2>
                    {t.sadrzaj}
                  </section>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
