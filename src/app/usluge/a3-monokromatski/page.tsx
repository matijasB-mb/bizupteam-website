import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import DeviceFrame from "@/components/ui/DeviceFrame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

import { uredaji, uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("a3-monokromatski")!;
const devices = uredaji["a3-monokromatski"];

export const metadata: Metadata = {
  title: usluga.metaTitle,
  description: usluga.metaDescription,
  alternates: { canonical: "/usluge/a3-monokromatski" },
  openGraph: {
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    url: "/usluge/a3-monokromatski",
  },
};

/* Comparison rows. Every figure below is from Canon's own specification for
   the imageRUNNER ADVANCE DX 4800 series — nothing is estimated. */
const usporedba = [
  { model: "4825i", a4: "25", a3: "15" },
  { model: "4835i", a4: "35", a3: "17" },
  { model: "4845i", a4: "45", a3: "22" },
];

const primjene = [
  { t: "Računovodstvo", d: "Mjesečna zaključenja i arhiva koja mora biti čitljiva i za pet godina." },
  { t: "Administracija", d: "Obrasci, zapisnici i interni dokumenti u stalnom protoku." },
  { t: "Uredi s više odjela", d: "Jedan uređaj koji podnosi opterećenje cijelog kata." },
  { t: "Dokumentacija", d: "Nacrti, tablice i pregledi kojima A4 jednostavno nije dovoljan." },
];

export default function A3MonoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge", href: "/usluge" }, { label: usluga.breadcrumb }]}
        eyebrow={`${usluga.format} · ${usluga.boja}`}
        title={usluga.hero}
        lead={usluga.heroLead}
      >
        {/* Performance read straight away — this page leads with numbers */}
        <dl className="grid max-w-3xl grid-cols-2 gap-px border-t border-white/15 sm:grid-cols-4">
          {[
            { k: "Brzina", v: "45", u: "str./min A4" },
            { k: "Format A3", v: "22", u: "str./min" },
            { k: "Skeniranje", v: "270", u: "slika/min" },
            { k: "Modeli", v: "3", u: "u seriji" },
          ].map((s) => (
            <div key={s.k} className="pt-6 pr-6">
              <dt className="t-label text-white/55">{s.k}</dt>
              <dd className="mt-3">
                <span
                  className="text-[2.25rem] leading-none tabular-nums tracking-[-0.04em] text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                >
                  {s.v}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] text-white/50">{s.u}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* ── Usporedba serije: prava tablica, ne kartice ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Serija 4800</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[13ch]">Odaberite prema brzini</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Tri modela dijele isto kućište, isti pribor i isti način rada.
                Razlikuju se samo po tome koliko stranica izbace u minuti.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 overflow-x-auto sm:mt-16">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <caption className="sr-only">
                  Usporedba brzine ispisa modela Canon imageRUNNER ADVANCE DX serije 4800
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="t-label py-4 pr-6 text-[var(--muted)]">Model</th>
                    <th scope="col" className="t-label py-4 pr-6 text-[var(--muted)]">A4 — str./min</th>
                    <th scope="col" className="t-label py-4 pr-6 text-[var(--muted)]">A3 — str./min</th>
                    <th scope="col" className="t-label py-4 text-[var(--muted)]">Za koga</th>
                  </tr>
                </thead>
                <tbody>
                  {usporedba.map((r, i) => (
                    <tr key={r.model} className="group border-b border-[var(--line)] transition-colors duration-500 hover:bg-[var(--paper-warm)]">
                      <th scope="row" className="py-7 pr-6 align-top">
                        <span
                          className="text-[1.0625rem] font-semibold tracking-[-0.02em]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {r.model}
                        </span>
                      </th>
                      <td className="py-7 pr-6 align-top">
                        <span
                          className="text-[1.75rem] leading-none tabular-nums tracking-[-0.03em] text-[var(--ink)]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                        >
                          {r.a4}
                        </span>
                      </td>
                      <td className="py-7 pr-6 align-top">
                        <span
                          className="text-[1.75rem] leading-none tabular-nums tracking-[-0.03em] text-[var(--muted)]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                        >
                          {r.a3}
                        </span>
                      </td>
                      <td className="py-7 align-top text-[0.9375rem] text-[var(--text-2)]">
                        {["Umjeren dnevni volumen", "Redovit dnevni volumen", "Ispis koji ne smije stati"][i]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-[62ch] text-[0.875rem] leading-relaxed text-[var(--muted)]">
              Brzine su prema službenoj Canon specifikaciji serije imageRUNNER
              ADVANCE DX 4800. Sva tri modela skeniraju do 270 slika u minuti
              obostrano i podržavaju Trusted Platform Module 2.0.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Uređaji ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Uređaji</SectionLabel>
            <h2 className="t-h2 mt-7 max-w-[16ch]">imageRUNNER ADVANCE DX 4800</h2>
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:mt-16 lg:grid-cols-3">
            {devices.map((d, i) => (
              <Reveal key={d.id} delay={i * 80} className="h-full">
                <article className="flex h-full flex-col">
                  <DeviceFrame
                    src={d.image}
                    alt={`Canon ${d.serija}`}
                    ratio="1 / 1"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <h3 className="t-h3 mt-7">{d.serija}</h3>
                  <p className="t-body mt-3 max-w-[38ch] flex-1">{d.opis}</p>
                  <dl className="mt-6 flex flex-col gap-3 border-t border-[var(--line)] pt-5">
                    {d.podaci.map((p) => (
                      <div key={p.k} className="flex items-baseline justify-between gap-4 text-[0.875rem]">
                        <dt className="text-[var(--muted)]">{p.k}</dt>
                        <dd className="text-right text-[var(--text)]">{p.v}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primjene ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Gdje se najviše koristi</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[13ch]">Tamo gdje se ispisuje svaki dan</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Crno-bijeli A3 rijetko kupuje netko tko ispisuje povremeno. Kupuje
                ga netko kome je ispis dio radnog dana.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-[var(--line-strong)] sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {primjene.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <div className="flex h-full flex-col border-[var(--line)] py-8 sm:border-r sm:pr-8 lg:last:border-r-0">
                  <span className="t-label text-[var(--muted)]" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-5">{p.t}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-14 border-t border-[var(--line)] pt-10">
              <Link
                href="/usluge/najam-printera"
                className="group inline-flex items-center gap-3 text-[1.0625rem] font-medium transition-colors duration-300 hover:text-[var(--red-on-light)]"
              >
                Isti uređaji dostupni su i u najmu
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Koliko stvarno ispisujete mjesečno?"
        lead="Odgovor na to pitanje bira model umjesto vas. Pogledamo brojila i potrošnju, pa predložimo ono što ima smisla."
        primary={{ label: "Zatražite ponudu", href: "/kontakt" }}
      />
    </>
  );
}
