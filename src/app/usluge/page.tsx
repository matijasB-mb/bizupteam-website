import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

import CustomSolutions from "@/components/ui/CustomSolutions";
import { grupe, uslugeUGrupi } from "@/lib/usluge";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "Dva područja na jednom mjestu: telekomunikacije kao ugovorni partner A1-a i Canon uredska tehnologija — A3 i A4, u boji i crno-bijelo, kupnja ili najam.",
  alternates: { canonical: "/usluge" },
  openGraph: {
    title: "Usluge",
    description:
      "Telekomunikacije kao ugovorni partner A1-a i Canon uredska tehnologija za urede.",
    url: "/usluge",
  },
};

export default function UslugePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge" }]}
        eyebrow="Naša rješenja"
        title="Dva područja, jedan partner."
        lead="Odaberite rješenje koje odgovara potrebama vašeg poslovanja — telekomunikacije, uredska tehnologija ili oboje."
      />

      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Pregled</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[13ch]">Šest putova, jedan razgovor</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Ne morate unaprijed znati što točno tražite. Dovoljno je da
                znate kako ured danas radi — ostalo je naš posao.
              </p>
            </div>
          </Reveal>

          {grupe.map((g, gi) => (
            <div key={g.id} className={gi === 0 ? "mt-16 sm:mt-20" : "mt-20 sm:mt-24"}>
              <Reveal>
                <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-6 md:flex-row md:items-baseline md:justify-between">
                  <h3
                    className="text-[1.375rem] font-semibold tracking-[-0.025em]"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    {g.label}
                  </h3>
                  <p className="max-w-[44ch] text-[0.9375rem] text-[var(--muted)]">{g.opis}</p>
                </div>
              </Reveal>

              <ul>
                {uslugeUGrupi(g.id).map((u, i) => (
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

                      <h4 className="t-h2 transition-colors duration-300 group-hover:text-[var(--red-on-light)] sm:col-span-5 lg:col-span-4">
                        {u.nav}
                      </h4>

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
          ))}
        </div>
      </section>

      {/* ── Uz svaki uređaj ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Uz svaki Canon uređaj</SectionLabel>
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
                <div className="flex h-full flex-col border-[var(--line)] py-8 lg:py-10 lg:pr-10">
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

      <CustomSolutions />

      <CTABand
        title="Niste sigurni što vam treba?"
        lead="To je najčešća polazna točka. Prođemo kroz vaše račune i potrošnju, pa predložimo ono što ima smisla."
      />
    </>
  );
}
