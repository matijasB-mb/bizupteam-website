import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import DeviceFrame from "@/components/ui/DeviceFrame";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { paketi } from "@/lib/site";
import { uslugaBySlug } from "@/lib/usluge";

const usluga = uslugaBySlug("najam-printera")!;

export const metadata: Metadata = {
  title: usluga.metaTitle,
  description: usluga.metaDescription,
  alternates: { canonical: "/usluge/najam-printera" },
  openGraph: {
    title: usluga.metaTitle,
    description: usluga.metaDescription,
    url: "/usluge/najam-printera",
  },
};

const koraci = [
  {
    n: "01",
    t: "Odaberete uređaj",
    d: "Prođemo kroz to koliko i što ispisujete. Iz toga izlazi format, brzina i to treba li vam boja — a ne obrnuto.",
  },
  {
    n: "02",
    t: "Dogovorimo uvjete",
    d: "Trajanje, mjesečni opseg i što sve ulazi u cijenu. Sve što ovisi o dogovoru napišemo prije potpisa, ne poslije.",
  },
  {
    n: "03",
    t: "Printer stiže u vaš ured",
    d: "Dostavimo, postavimo i spojimo uređaj na vašu mrežu. Od tog trenutka održavanje je naša briga.",
  },
];

const kategorije = [
  { label: "A4", opis: "Kompaktno, za svakodnevni uredski ispis", href: "/usluge/a4-monokromatski" },
  { label: "A3", opis: "Puni format kada dokument to traži", href: "/usluge/a3-monokromatski" },
  { label: "Kolor", opis: "Za dokumente koje netko izvan tvrtke vidi", href: "/usluge/a4-kolor" },
  { label: "Monokromatski", opis: "Najniža cijena po stranici", href: "/usluge/a3-monokromatski" },
];

export default function NajamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Usluge", href: "/usluge" }, { label: usluga.breadcrumb }]}
        eyebrow="Usluga najma"
        title={usluga.hero}
        lead={usluga.heroLead}
        aside={
          <DeviceFrame
            src="/images/canon/najam-hero.jpg"
            alt="Canon multifunkcijski uređaj u uredskom okruženju"
            label="Canon uređaj u najmu"
            tone="dark"
            ratio="4 / 3"
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
          <a
            href="#kako-radi"
            className="text-[0.9375rem] text-white/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
          >
            Kako to izgleda u praksi
          </a>
        </div>
      </PageHero>

      {/* ── Kako radi ── */}
      <section id="kako-radi" className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Kako radi</SectionLabel>
            <h2 className="t-h2 mt-7 max-w-[16ch]">Tri koraka do uređaja u uredu</h2>
          </Reveal>

          <ol className="mt-16 grid gap-y-14 sm:mt-20 lg:grid-cols-3 lg:gap-x-16">
            {koraci.map((k, i) => (
              <Reveal as="li" key={k.n} delay={i * 110}>
                <div className="border-t-2 border-[var(--ink)] pt-8">
                  <span className="t-numeral block text-[var(--red)]" aria-hidden="true">
                    {k.n}
                  </span>
                  <h3 className="t-h3 mt-7 max-w-[14ch]">{k.t}</h3>
                  <p className="t-body mt-4 max-w-[38ch]">{k.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Što najam može uključivati ── */}
      <section className="section bg-[var(--ink)] text-white">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel tone="paper">Što najam može uključivati</SectionLabel>
                <h2 className="t-h2 mt-7 max-w-[14ch] text-white">
                  Uređaj je samo dio dogovora
                </h2>
                <p className="t-lead mt-7 max-w-[42ch] text-white/60">
                  Točan opseg ovisi o ugovoru koji sklopimo. Ovo su dijelovi o
                  kojima razgovaramo — ne obećavamo ih unaprijed, nego ih
                  dogovorimo prema tome što vam stvarno treba.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={90}>
                <dl className="border-t border-white/15">
                  {[
                    { t: "Canon uređaj", d: "Odabran prema vašem opsegu ispisa, ne prema tome što je trenutno na skladištu." },
                    { t: "Fleksibilni modeli najma", d: "S dugoročnim ugovorom ili bez njega — nudimo i najam bez dugoročne obveze." },
                    { t: "Servis i podrška", d: "Preventivno održavanje i dogovoren rok odziva, umjesto otvorenog kraja." },
                    { t: "Potrošni materijal", d: "Toner prema dogovoru, uz automatsku dostavu po brojilu ispisa." },
                    { t: "Predvidiv trošak", d: "Mjesečni iznos umjesto velike jednokratne investicije u opremu." },
                  ].map((x, i) => (
                    <div key={x.t} className="flex gap-6 border-b border-white/12 py-6">
                      <span className="t-label w-6 shrink-0 pt-1 text-[var(--red-on-dark)]" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <dt className="text-[1.0625rem] font-medium text-white">{x.t}</dt>
                        <dd className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/55">
                          {x.d}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Odabir kategorije ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-[var(--line-strong)] pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>Što iznajmljujemo</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[14ch]">Odaberite smjer</h2>
              </div>
              <p className="max-w-[36ch] text-[0.9375rem] text-[var(--muted)]">
                Format i boja su dvije odluke. Kada su obje jasne, izbor uređaja
                se sam suzi na dva-tri modela.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid border-t border-[var(--line-strong)] sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {kategorije.map((k, i) => (
              <Reveal key={k.label} delay={i * 70} className="h-full">
                <Link
                  href={k.href}
                  className={`group flex h-full flex-col justify-between border-b border-[var(--line)] py-9 pr-8 transition-colors duration-500 hover:bg-[var(--paper)] ${
                    i % 2 === 0 ? "sm:border-r sm:pr-10" : ""
                  } ${i < 3 ? "lg:border-r lg:pr-10" : ""}`}
                >
                  <span
                    className="block text-[2rem] leading-none tracking-[-0.035em] text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--red-on-light)]"
                    style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                  >
                    {k.label}
                  </span>
                  <span className="mt-8 block text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    {k.opis}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-6 inline-block text-[var(--red)] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Paketi ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-[var(--line-strong)] pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>Paketi najma</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[18ch]">Prema opsegu ispisa</h2>
              </div>
              <p className="max-w-[36ch] text-[0.9375rem] text-[var(--muted)]">
                Isti Canon uređaj u svim paketima. Razlika je u mjesečnom opsegu
                i razini podrške koja ide uz njega.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {paketi.map((p, i) => {
              const dark = Boolean(p.featured);
              return (
                <Reveal key={p.id} delay={i * 70} className="h-full">
                  <article
                    className={[
                      "flex h-full flex-col p-7 lg:p-8",
                      dark
                        ? "bg-[var(--ink)] text-white lg:-my-5 lg:py-13"
                        : "bg-[var(--paper-warm)] lg:bg-transparent",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="t-h3" style={{ fontFamily: "var(--font-archivo), sans-serif" }}>
                        {p.name}
                      </h3>
                      {dark && (
                        <span className="t-label shrink-0 bg-[var(--red)] px-2 py-1 text-white">
                          Najtraženiji
                        </span>
                      )}
                    </div>

                    <p className={`mt-6 text-[0.9375rem] ${dark ? "text-white/55" : "text-[var(--muted)]"}`}>
                      {p.blurb}
                    </p>

                    <div className="mt-8">
                      <span
                        className="block text-[2.75rem] leading-none tabular-nums tracking-[-0.04em]"
                        style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                      >
                        {p.volume}
                      </span>
                      <span className={`mt-2 block text-[0.8125rem] ${dark ? "text-white/45" : "text-[var(--muted)]"}`}>
                        {p.volumeNote}
                      </span>
                    </div>

                    <ul
                      className={`mt-8 flex flex-1 flex-col gap-3 border-t pt-7 text-[0.9375rem] ${
                        dark ? "border-white/15 text-white/80" : "border-[var(--line)] text-[var(--text-2)]"
                      }`}
                    >
                      {p.includes.map((line) => (
                        <li key={line} className="flex gap-3 leading-snug">
                          <svg
                            width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true"
                            className={`mt-[0.45rem] shrink-0 ${dark ? "text-[var(--red-on-dark)]" : "text-[var(--red-on-light)]"}`}
                          >
                            <path d="M1 5.2 4.2 8.4 11 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                          </svg>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/kontakt"
                      className={[
                        "mt-8 inline-flex items-center justify-between gap-3 border-t pt-5 text-[0.9375rem] font-medium transition-colors duration-300",
                        dark
                          ? "border-white/15 text-white hover:text-[var(--red-on-dark)]"
                          : "border-[var(--line)] hover:text-[var(--red-on-light)]",
                      ].join(" ")}
                    >
                      Zatražite ponudu
                      <span aria-hidden="true">→</span>
                      <span className="sr-only">za paket {p.name}</span>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={100}>
            <p className="mt-10 max-w-[62ch] text-[0.875rem] leading-relaxed text-[var(--muted)]">
              Cijena najma ovisi o broju uređaja, opsegu ispisa i trajanju
              suradnje, pa je određujemo nakon kratke analize vaših potreba.
              Nudimo i najam bez dugoročne obveze te kupnju uz servisni ugovor.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        title="Ne kupujte printer prije nego što provjerite opciju najma."
        lead="Usporedba traje jedan razgovor. Ako vam se kupnja i dalje više isplati, reći ćemo vam to."
        primary={{ label: "Zatražite ponudu", href: "/kontakt" }}
      />
    </>
  );
}
