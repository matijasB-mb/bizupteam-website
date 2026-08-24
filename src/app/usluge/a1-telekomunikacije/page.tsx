import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { a1, images } from "@/lib/site";
import { uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("a1-telekomunikacije")!;

export const metadata: Metadata = {
  title: usluga.metaTitle,
  description: usluga.metaDescription,
  alternates: { canonical: "/usluge/a1-telekomunikacije" },
  openGraph: {
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    url: "/usluge/a1-telekomunikacije",
  },
};

/**
 * Deliberately the shortest service page on the site.
 *
 * Every sentence here has to clear A1's own review, so the page states the
 * advisory role, names the four areas and stops. No tariffs, no packages, no
 * numbers — none of that is ours to publish. If A1 later approves more detail,
 * there is room to add it; there is no room to take a wrong claim back.
 */
export default function A1Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge", href: "/usluge" }, { label: usluga.breadcrumb }]}
        eyebrow="Ugovorni partner — A1"
        title={usluga.hero}
        lead={usluga.heroLead}
      >
        <Link
          href="/kontakt"
          className="group inline-flex items-center gap-2.5 bg-white px-6 py-3.5 text-[0.9375rem] font-medium leading-none text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--red)] hover:text-white"
        >
          Dogovorite razgovor
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </PageHero>

      {/* ── Uloga ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel>Naša uloga</SectionLabel>
                <h2 className="t-h2 mt-7 max-w-[13ch]">Savjetnik, ne operator</h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={90}>
                <p className="t-lead text-[var(--text)]">{a1.body}</p>
                <div className="mt-8 flex max-w-[var(--measure)] flex-col gap-5">
                  <p className="t-body">
                    Naš B2B odjel radi isključivo s poslovnim korisnicima.
                    Prolazimo kroz postojeće račune i stvarnu potrošnju tima, pa
                    iz toga izlazi prijedlog — a ne obrnuto.
                  </p>
                  <p className="t-body">
                    Nakon ugovora ostajemo vaša točka kontakta. Kada nešto
                    zatreba, zovete nas, a ne pozivni centar.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Četiri područja ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Područja</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[14ch]">Kroz što vas vodimo</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Četiri odluke koje tvrtka donosi rijetko, a živi s njima godinama.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-[var(--line-strong)] sm:mt-16 sm:grid-cols-2">
            {a1.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex h-full flex-col border-b border-[var(--line)] py-9 sm:pr-10 sm:odd:border-r sm:odd:border-[var(--line)]">
                  <span className="t-label text-[var(--red-on-light)]" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mt-5 max-w-[18ch]">{item.title}</h3>
                  <p className="t-body mt-4 max-w-[44ch]">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Slika s natpisom ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal variant="media">
            <div
              className="group relative overflow-hidden bg-[var(--ink-soft)]"
              style={{ aspectRatio: "21 / 9" }}
            >
              <Image
                src={images.telecom}
                alt="Djelatnica u uredu razgovara telefonom za radnim stolom"
                fill
                sizes="(min-width: 1344px) 1216px, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(11,11,12,0.9) 0%, rgba(11,11,12,0.62) 42%, rgba(11,11,12,0.15) 78%, transparent 100%)",
                }}
              />
              <div className="absolute inset-y-0 left-0 flex max-w-[26ch] flex-col justify-end p-6 sm:p-10 lg:p-14">
                <p
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-archivo), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.15rem, 2.5vw, 2rem)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Povezani. Gdje god posao treba.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-14 flex flex-col items-start gap-6 border-t border-[var(--line)] pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Uz telekomunikacije pokrivamo i uredsku tehnologiju — printere,
                skenere i digitalizaciju dokumenata, kao partner Canona.
              </p>
              <Link
                href="/usluge"
                className="group inline-flex shrink-0 items-center gap-2.5 border-b border-[var(--line-strong)] pb-1.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-[var(--red)] hover:text-[var(--red-on-light)]"
              >
                Pogledajte i uredsku tehnologiju
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Donesite zadnji račun i krenimo od njega."
        lead="Iz stvarne potrošnje se najbrže vidi što vam treba, a što plaćate bez potrebe."
        primary={{ label: "Dogovorite razgovor", href: "/kontakt" }}
      />
    </>
  );
}
