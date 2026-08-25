import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import DeviceGallery from "@/components/ui/DeviceGallery";
import DeviceSpec from "@/components/ui/DeviceSpec";
import CustomSolutions from "@/components/ui/CustomSolutions";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { uredaji, uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("a3-monokromatski")!;
const [device] = uredaji["a3-monokromatski"];

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

      {/* ── Uređaj: tekst lijevo, uređaj desno — zrcalo A3 kolor stranice ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Uređaj</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[14ch]">Naš izbor za A3 crno-bijelo</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Kada je najveći dio ispisa ionako crno-bijel, mono uređaj je
                jeftiniji za držati — a puni format je tu kada zatreba.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid items-center gap-y-10 sm:mt-16 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <span className="t-label text-[var(--red-on-light)]">Canon</span>
              <h3 className="t-h2 mt-4 max-w-[13ch]">{device.serija}</h3>
              <p className="t-body mt-6 max-w-[42ch]">{device.opis}</p>
              <DeviceSpec device={device} />

              <Link
                href="/kontakt"
                className="group mt-9 inline-flex items-center gap-2.5 bg-[var(--ink)] px-6 py-3.5 text-[0.9375rem] font-medium leading-none text-white transition-colors duration-300 hover:bg-[var(--red)]"
              >
                Zatražite ponudu
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <DeviceGallery
                images={device.slike}
                alt={`Canon ${device.serija}`}
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
          </div>

          <CustomSolutions variant="note" />
        </div>
      </section>

      {/* ── Primjene ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Gdje se najviše koristi</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[13ch]">Tamo gdje se ispisuje svaki dan</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Crno-bijeli A3 rijetko kupuje netko tko ispisuje povremeno.
                Kupuje ga netko kome je ispis dio radnog dana.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid border-t border-[var(--line-strong)] sm:mt-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {primjene.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <div
                  className={`flex h-full flex-col border-[var(--line)] py-8 ${
                    i % 2 === 0 ? "sm:border-r sm:pr-10" : ""
                  } ${i < 3 ? "lg:border-r lg:pr-10" : ""}`}
                >
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
                Isti uređaj dostupan je i u najmu
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CustomSolutions />

      <CTABand
        title="Koliko stvarno ispisujete mjesečno?"
        lead="Odgovor na to pitanje bira uređaj umjesto vas. Pogledamo brojila i potrošnju, pa predložimo ono što ima smisla."
        primary={{ label: "Zatražite ponudu", href: "/kontakt" }}
      />
    </>
  );
}
