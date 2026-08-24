import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

import { usluge } from "@/lib/usluge";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "Canon printeri i multifunkcijski uređaji za urede — A3 i A4, u boji i crno-bijelo, kupnja ili najam. Servis, toner i podrška uključeni u dogovor.",
  alternates: { canonical: "/usluge" },
  openGraph: {
    title: "Usluge",
    description:
      "Canon printeri i multifunkcijski uređaji za urede — A3 i A4, u boji i crno-bijelo, kupnja ili najam.",
    url: "/usluge",
  },
};

export default function UslugePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge" }]}
        eyebrow="Naša rješenja"
        title="Uredski ispis, riješen do kraja."
        lead="Odaberite rješenje koje odgovara potrebama vašeg poslovanja — od kompaktnog A4 uređaja do A3 sustava u boji, u kupnji ili u najmu."
      />

      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Pregled</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[13ch]">Pet putova, jedan razgovor</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Ne morate unaprijed znati koji vam uređaj treba. Dovoljno je da
                znate koliko ispisujete — ostalo je naš posao.
              </p>
            </div>
          </Reveal>

          <ul className="mt-16 border-t border-[var(--line-strong)] sm:mt-20">
            {usluge.map((u, i) => (
              <Reveal as="li" key={u.slug} delay={i * 60}>
                <Link
                  href={`/usluge/${u.slug}`}
                  className="group grid items-baseline gap-y-3 border-b border-[var(--line)] py-9 transition-colors duration-500 hover:bg-[var(--paper-warm)] sm:grid-cols-12 sm:gap-x-8 lg:py-12"
                >
                  <span
                    className="t-label text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--red-on-light)] sm:col-span-1"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="t-h2 transition-colors duration-300 group-hover:text-[var(--red-on-light)] sm:col-span-5 lg:col-span-4">
                    {u.nav}
                  </h3>

                  <p className="t-body max-w-[46ch] sm:col-span-5 lg:col-span-5 lg:col-start-7">
                    {u.navOpis}
                  </p>

                  <span className="hidden justify-end text-[var(--red)] sm:col-span-1 sm:flex lg:col-start-12">
                    <svg
                      width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true"
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none"
                    >
                      <path d="M0 6h17M13 1.5 18 6l-5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Uz svaki uređaj ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Uz svaki uređaj</SectionLabel>
            <h2 className="t-h2 mt-7 max-w-[18ch]">
              Uređaj je početak suradnje, ne kraj prodaje
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-[var(--line-strong)] sm:mt-16 lg:grid-cols-3">
            {[
              {
                t: "Automatska dostava tonera",
                d: "Uređaji su povezani sustavom koji prati brojač ispisa, pa toner stiže prije nego što ponestane.",
              },
              {
                t: "Servis i održavanje",
                d: "Preventivno održavanje i redoviti servisi koji sprječavaju veće kvarove umjesto da ih liječe.",
              },
              {
                t: "Cloud i digitalizacija",
                d: "Skeniranje u cloud i arhiviranje dokumenata, tako da papir završi kao datoteka koju možete pronaći.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 80}>
                <div className="flex h-full flex-col border-[var(--line)] py-8 lg:border-r lg:py-10 lg:pr-10 lg:last:border-r-0">
                  <span className="t-label text-[var(--muted)]" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-5">{x.t}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Niste sigurni što vam treba?"
        lead="To je najčešća polazna točka. Prođemo kroz vaše račune i potrošnju, pa predložimo ono što ima smisla."
      />
    </>
  );
}
