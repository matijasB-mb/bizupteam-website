import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import DeviceFrame from "@/components/ui/DeviceFrame";
import DeviceGallery from "@/components/ui/DeviceGallery";
import DeviceSpec from "@/components/ui/DeviceSpec";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";

import CustomSolutions from "@/components/ui/CustomSolutions";
import { uredaji, uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("a4-kolor")!;
const [device] = uredaji["a4-kolor"];

export const metadata: Metadata = {
  title: usluga.metaTitle,
  description: usluga.metaDescription,
  alternates: { canonical: "/usluge/a4-kolor" },
  openGraph: {
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    url: "/usluge/a4-kolor",
  },
};

const primjene = [
  "Ponude i prezentacije koje idu klijentu",
  "Računi i dokumenti s logotipom",
  "Interni materijali i upute",
  "Marketinški letci u malim nakladama",
  "Svakodnevni uredski ispis u boji",
];

export default function A4KolorPage() {
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
            alt="Canon imageRUNNER C1533iF, A4 multifunkcijski uređaj u boji"
            label="imageRUNNER C1533iF"
            tone="dark"
            ratio="4 / 3"
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        }
      >
        <Link
          href="/kontakt"
          className="group inline-flex items-center gap-2.5 bg-white px-6 py-3.5 text-[0.9375rem] font-medium leading-none text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--red)] hover:text-white"
        >
          Zatražite ponudu
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </PageHero>

      {/* ── Za što se koristi: proza plus popis, bez kartica ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionLabel>Za što se koristi</SectionLabel>
                <h2 className="t-h2 mt-7 max-w-[15ch]">
                  Boja se u uredu ne troši svaki dan — ali kad zatreba, mora biti dobra
                </h2>
                <p className="t-body mt-8 max-w-[var(--measure)]">
                  Većina ureda ispisuje crno-bijelo. Onaj dio koji ide u boji
                  obično je onaj koji netko izvan tvrtke stvarno vidi: ponuda,
                  prezentacija, dokument s logotipom. Zato A4 kolor uređaj ne
                  mora biti najbrži u sobi, ali mora biti pouzdan onda kada se
                  koristi.
                </p>
                <p className="t-body mt-5 max-w-[var(--measure)]">
                  Ovi uređaji stanu na ormarić i priključe se na postojeću mrežu.
                  Ispis radi izravno s telefona ili prijenosnika, bez instalacije
                  na svakom računalu.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={90}>
                <ul className="border-t border-[var(--line-strong)]">
                  {primjene.map((p, i) => (
                    <li
                      key={p}
                      className="flex items-baseline gap-5 border-b border-[var(--line)] py-5"
                    >
                      <span className="t-label text-[var(--red-on-light)]" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.0625rem] leading-snug text-[var(--text)]">{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Uređaj ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-[var(--line-strong)] pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>Uređaj</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[14ch]">Naš izbor za A4 kolor</h2>
              </div>
              <p className="max-w-[38ch] text-[0.9375rem] text-[var(--muted)]">
                Kompaktan multifunkcijski uređaj — ispis, kopiranje, skeniranje
                i slanje iz jednog kućišta.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-6">
              <DeviceGallery
                images={device.slike}
                alt={`Canon ${device.serija}`}
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <span className="t-label text-[var(--red-on-light)]">Canon</span>
              <h3 className="t-h2 mt-4 max-w-[13ch]">{device.serija}</h3>
              <p className="t-body mt-6 max-w-[42ch]">{device.opis}</p>
              <DeviceSpec device={device} />
            </div>
          </div>

          <CustomSolutions variant="note" />
        </div>
      </section>

      <CustomSolutions />

      <CTABand
        title="Treba vam kolor koji radi kad zatreba?"
        lead="Recite nam koliko ispisujete u boji mjesečno i predložit ćemo uređaj koji nije ni premalen ni preskup za to."
        primary={{ label: "Zatražite ponudu", href: "/kontakt" }}
      />
    </>
  );
}
