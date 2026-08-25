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

const usluga = uslugaBySlug("a4-monokromatski")!;
const devices = uredaji["a4-monokromatski"];

export const metadata: Metadata = {
  title: usluga.metaTitle,
  description: usluga.metaDescription,
  alternates: { canonical: "/usluge/a4-monokromatski" },
  openGraph: {
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    url: "/usluge/a4-monokromatski",
  },
};

/* Deliberately the calmest page on the site: one device held large, three
   short statements, nothing else. The restraint is the argument. */
export default function A4MonoPage() {
  const [lead, ...rest] = devices;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge", href: "/usluge" }, { label: usluga.breadcrumb }]}
        eyebrow={`${usluga.format} · ${usluga.boja}`}
        title={usluga.hero}
        lead={usluga.heroLead}
      />

      {/* ── Jedan uređaj, veliki ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <div className="mx-auto max-w-4xl">
            <DeviceGallery
              images={lead.slike}
              alt={`Canon ${lead.serija}`}
              label={lead.serija}
              priority
              sizes="(min-width: 1024px) 56rem, 100vw"
            />
          </div>

          <Reveal delay={80}>
            <div className="mx-auto mt-14 grid max-w-4xl gap-y-8 border-t border-[var(--line-strong)] pt-10 sm:grid-cols-12 sm:gap-x-12">
              <div className="sm:col-span-5">
                <h2 className="t-h3">{lead.serija}</h2>
                <p className="mt-2 text-[0.875rem] text-[var(--muted)]">
                  {lead.modeli.join(" · ")}
                </p>
              </div>
              <div className="sm:col-span-7">
                <p className="t-body max-w-[46ch]">{lead.opis}</p>
                <div className="mt-7">
                  <DeviceSpec device={lead} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Tri kratke tvrdnje ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Zašto je ovo dovoljno</SectionLabel>
          </Reveal>

          <div className="mt-12 grid gap-y-12 lg:grid-cols-3 lg:gap-x-16">
            {[
              {
                t: "Jedna stvar, dobro odrađena",
                d: "Crno-bijeli ispis je posao koji ovi uređaji rade cijeli dan bez razmišljanja. Nema funkcija koje nitko nikad ne uključi.",
              },
              {
                t: "Najniža cijena po stranici",
                d: "Kada je najveći dio ispisa ionako crno-bijel, mono uređaj je jeftiniji za držati nego kolor koji se rijetko koristi u boji.",
              },
              {
                t: "Manje toga što se može pokvariti",
                d: "Jednostavniji uređaj znači manje intervencija i kraći zastoj kada intervencija ipak zatreba.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <div className="border-t border-[var(--line-strong)] pt-8">
                  <span className="t-label text-[var(--muted)]" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-5 max-w-[16ch]">{x.t}</h3>
                  <p className="t-body mt-4 max-w-[40ch]">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ostale izvedbe ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-[var(--line-strong)] pt-10 md:flex-row md:items-end md:justify-between">
              <h2 className="t-h3 max-w-[22ch]">Kompaktnija alternativa</h2>
              <Link
                href="/usluge/najam-printera"
                className="group inline-flex items-center gap-2.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:text-[var(--red-on-light)]"
              >
                Dostupno i u najmu
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-2">
            {rest.map((d, i) => (
              <Reveal key={d.id} delay={i * 80} className="h-full">
                <article className="flex h-full gap-6">
                  <div className="w-2/5 shrink-0">
                    <DeviceFrame
                      src={d.image}
                      alt={`Canon ${d.serija}`}
                      ratio="1 / 1"
                      sizes="(min-width: 640px) 18vw, 40vw"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-[1rem] font-semibold tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                    >
                      {d.serija}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                      {d.opis}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <CustomSolutions variant="note" />
        </div>
      </section>

      <CustomSolutions />

      <CTABand
        title="Jednostavan uređaj, jasan trošak."
        lead="Recite nam koliko stranica mjesečno ispisujete i javljamo se s prijedlogom — kupnja ili najam, kako vam više odgovara."
        primary={{ label: "Zatražite ponudu", href: "/kontakt" }}
      />
    </>
  );
}
