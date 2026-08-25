import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import DeviceFrame from "@/components/ui/DeviceFrame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

import CustomSolutions from "@/components/ui/CustomSolutions";
import { uredaji, uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("a3-kolor")!;
const [device] = uredaji["a3-kolor"];

export const metadata: Metadata = {
  title: usluga.metaTitle,
  description: usluga.metaDescription,
  alternates: { canonical: "/usluge/a3-kolor" },
  openGraph: {
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    url: "/usluge/a3-kolor",
  },
};

/* Four reasons, written as an argument rather than a feature list. */
const razlozi = [
  {
    n: "01",
    t: "Dokument koji se ne mora ispričavati",
    d: "Ponuda, prezentacija ili plan u punom formatu i punoj boji izgleda kao nešto što je netko namjerno napravio, a ne kao ispis koji je prošao kroz najbliži uređaj.",
  },
  {
    n: "02",
    t: "Boja koja je svaki put ista",
    d: "Uredski kolor ispis vrijedi samo ako je predvidiv. Isti logotip mora izaći isto u ponedjeljak i u petak, na prvom i na tristotom listu.",
  },
  {
    n: "03",
    t: "Dva formata, jedan uređaj",
    d: "A3 uređaj ne služi samo za A3. Svakodnevni A4 ispis radi jednako dobro, a veliki format je tu onda kada zatreba — bez drugog uređaja u kutu.",
  },
  {
    n: "04",
    t: "Manje prekida u danu",
    d: "Uređaji ove klase rađeni su za urede koji ispisuju stalno. To se ne vidi u brošuri nego u tome koliko puta tjedno netko mora ustati i riješiti zastoj.",
  },
];

export default function A3KolorPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge", href: "/usluge" }, { label: usluga.breadcrumb }]}
        eyebrow={`${usluga.format} · ${usluga.boja}`}
        title={usluga.hero}
        lead={usluga.heroLead}
        aside={
          <DeviceFrame
            src={device.image}
            alt="Canon imageRUNNER ADVANCE DX C3926i, A3 multifunkcijski uređaj u boji"
            label="imageRUNNER ADVANCE DX C3926i"
            tone="dark"
            ratio="5 / 4"
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        }
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2.5 bg-white px-6 py-3.5 text-[0.9375rem] font-medium leading-none text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--red)] hover:text-white"
          >
            Zatražite ponudu
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/usluge/najam-printera"
            className="text-[0.9375rem] text-white/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
          >
            Dostupno i u najmu
          </Link>
        </div>
      </PageHero>

      {/* ── Uređaj ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Uređaj</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[14ch]">Naš izbor za A3 kolor</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Jedan uređaj koji pokriva i puni format i svakodnevni A4 ispis —
                bez drugog stroja u kutu koji se pali dvaput mjesečno.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid items-center gap-y-10 sm:mt-16 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-6">
              <DeviceFrame
                src={device.image}
                alt={`Canon ${device.serija}`}
                ratio="4 / 3"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <span className="t-label text-[var(--red-on-light)]">Canon</span>
              <h3 className="t-h2 mt-4 max-w-[14ch]">{device.serija}</h3>
              <p className="t-body mt-6 max-w-[44ch]">{device.opis}</p>

              <dl className="mt-9 border-t border-[var(--line)]">
                {device.podaci.map((d) => (
                  <div
                    key={d.k}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-4"
                  >
                    <dt className="t-label text-[var(--muted)]">{d.k}</dt>
                    <dd className="text-right text-[0.9375rem] text-[var(--text)]">{d.v}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/kontakt"
                className="group mt-9 inline-flex items-center gap-2.5 bg-[var(--ink)] px-6 py-3.5 text-[0.9375rem] font-medium leading-none text-white transition-colors duration-300 hover:bg-[var(--red)]"
              >
                Zatražite ponudu
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <CustomSolutions variant="note" />
        </div>
      </section>

      {/* ── Zašto A3 kolor ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Zašto A3 kolor</SectionLabel>
            <h2 className="t-h2 mt-7 max-w-[20ch]">
              Format i boja mijenjaju kako dokument djeluje
            </h2>
          </Reveal>

          <ul className="mt-16 border-t border-[var(--line-strong)] sm:mt-20">
            {razlozi.map((r, i) => (
              <Reveal as="li" key={r.n} delay={i * 70}>
                <div className="group grid gap-y-4 border-b border-[var(--line)] py-9 transition-colors duration-500 hover:bg-[var(--paper)] sm:grid-cols-12 sm:gap-x-8 lg:py-11">
                  <span
                    className="t-numeral text-[var(--line-strong)] transition-colors duration-500 group-hover:text-[var(--red)]/25 sm:col-span-2 sm:text-[3.25rem]"
                    aria-hidden="true"
                  >
                    {r.n}
                  </span>
                  <h3 className="t-h3 sm:col-span-4 sm:self-center">{r.t}</h3>
                  <p className="t-body max-w-[52ch] sm:col-span-6 sm:self-center">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CustomSolutions />

      <CTABand
        title="Treba vam A3 pisač u boji?"
        lead="Pronađimo rješenje koje odgovara vašem poslovanju — prvo pogledamo koliko i što ispisujete, pa tek onda predlažemo uređaj."
      />
    </>
  );
}
