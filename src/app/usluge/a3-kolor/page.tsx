import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import DeviceFrame from "@/components/ui/DeviceFrame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

import { uredaji, uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("a3-kolor")!;
const devices = uredaji["a3-kolor"];

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
            src={devices[0].image}
            alt="Canon imageRUNNER ADVANCE DX C3900 A3 multifunkcijski uređaj u boji"
            label="imageRUNNER ADVANCE DX C3900"
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

      {/* ── Uređaji: izmjenične uredničke trake, ne mreža kartica ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Uređaji</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[14ch]">Tri serije, jedna klasa</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Razlika među njima je brzina i opseg, ne kvaliteta ispisa. Koja
                vam odgovara, ovisi o tome koliko stvarno ispisujete — a to
                provjerimo prije nego išta predložimo.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 flex flex-col gap-px sm:mt-20">
            {devices.map((d, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={d.id} delay={i * 60}>
                  <article className="grid items-center gap-y-8 border-t border-[var(--line)] py-12 lg:grid-cols-12 lg:gap-x-16 lg:py-16">
                    <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                      <DeviceFrame
                        src={d.image}
                        alt={`Canon ${d.serija}`}
                        ratio="4 / 3"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </div>

                    <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                      <span className="t-label text-[var(--red-on-light)]">
                        {String(i + 1).padStart(2, "0")} — Canon
                      </span>
                      <h3 className="t-h3 mt-4">{d.serija}</h3>
                      <p className="mt-2 text-[0.875rem] text-[var(--muted)]">
                        {d.modeli.join(" · ")}
                      </p>
                      <p className="t-body mt-5 max-w-[46ch]">{d.opis}</p>

                      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--line)] pt-6">
                        {d.podaci.map((p) => (
                          <div key={p.k}>
                            <dt className="t-label text-[var(--muted)]">{p.k}</dt>
                            <dd className="mt-2 text-[0.9375rem] text-[var(--text)]">{p.v}</dd>
                          </div>
                        ))}
                      </dl>

                      <Link
                        href="/kontakt"
                        className="group mt-8 inline-flex items-center gap-2.5 border-b border-[var(--line-strong)] pb-1.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-[var(--red)] hover:text-[var(--red-on-light)]"
                      >
                        Zatražite ponudu za ovu seriju
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
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

      <CTABand
        title="Treba vam A3 pisač u boji?"
        lead="Pronađimo rješenje koje odgovara vašem poslovanju — prvo pogledamo koliko i što ispisujete, pa tek onda predlažemo uređaj."
      />
    </>
  );
}
