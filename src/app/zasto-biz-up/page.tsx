import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import Figure from "@/components/ui/Figure";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zašto Biz Up",
  description:
    "Jedan partner za telekomunikacije i uredsku tehnologiju, lokalna podrška iz Osijeka, servis s dogovorenim rokom odziva i predvidivi mjesečni troškovi.",
  alternates: { canonical: "/zasto-biz-up" },
  openGraph: {
    title: "Zašto Biz Up",
    description:
      "Jedan partner za telekomunikacije i uredsku tehnologiju, s lokalnom podrškom iz Osijeka.",
    url: "/zasto-biz-up",
  },
};

/* Each reason is written as an argument with a cost attached, not as a claim. */
const razlozi = [
  {
    n: "01",
    t: "Jedan partner",
    lead: "Dva ugovora manje, dva broja manje, dvije eskalacije manje.",
    body: "Kada telekomunikacije i uredsku opremu vodi ista tvrtka, nestaje prostor u kojem se dva dobavljača prebacuju odgovornost. Nema pitanja je li problem u vezi ili u uređaju — netko ga jednostavno riješi.",
  },
  {
    n: "02",
    t: "Lokalna dostupnost",
    lead: "Sjedište u Osijeku znači da dolazak nije logistički projekt.",
    body: "Poznajemo tržište na kojem poslujete i dolazimo kada treba doći. Za servis uredske opreme to je razlika između istog dana i sljedećeg tjedna.",
  },
  {
    n: "03",
    t: "Servis s rokom",
    lead: "Rok odziva zapisan u ugovoru, ne obećan u razgovoru.",
    body: "Paketi najma nose dogovoren rok odziva — osam sati, u najvišem paketu četiri, uz zamjenski uređaj isti dan. To je broj koji možete planirati, a ne otvoren kraj.",
  },
  {
    n: "04",
    t: "Trošak koji se ne mijenja",
    lead: "Mjesečni iznos umjesto niza nepredvidivih računa.",
    body: "Najam znači jedan iznos u kojem su uređaj, servis i toner. Automatska dostava tonera po brojilu uklanja i onaj trošak koji obično iskoči u najgorem trenutku.",
  },
  {
    n: "05",
    t: "Prijedlog prema brojevima",
    lead: "Prvo pogledamo koliko stvarno ispisujete.",
    body: "Uređaj biramo iz brojila i računa, ne iz kataloga. Ako procijenimo da vam postojeće rješenje već odgovara, to i kažemo — takav razgovor donosi manje u tom mjesecu, ali čuva suradnju.",
  },
  {
    n: "06",
    t: "Suradnja koja traje",
    lead: "Isporuka je početak, a ne kraj posla.",
    body: "Uređaji koje iznajmljujemo ostaju naša odgovornost cijelo vrijeme trajanja ugovora. To nas drži zainteresiranima za to da rade — i nakon što je račun plaćen.",
  },
];

export default function ZastoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Zašto Biz Up" }]}
        eyebrow="Vaše pogodnosti kao Biz Up partnera"
        title="Šest razloga, svaki s brojkom iza sebe."
        lead="Ništa od ovoga nije obećanje za budućnost — to je način na koji radimo sa svakim klijentom od prvog dana."
      />

      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <ol className="border-t border-[var(--line-strong)]">
            {razlozi.map((r, i) => (
              <Reveal as="li" key={r.n} delay={i * 60}>
                <article className="group grid gap-y-5 border-b border-[var(--line)] py-12 transition-colors duration-500 hover:bg-[var(--paper-warm)] lg:grid-cols-12 lg:gap-x-16 lg:py-16">
                  <div className="lg:col-span-4">
                    <span
                      className="t-numeral block text-[var(--line-strong)] transition-colors duration-500 group-hover:text-[var(--red)]/25"
                      aria-hidden="true"
                    >
                      {r.n}
                    </span>
                    <h2 className="t-h2 mt-6 max-w-[12ch]">{r.t}</h2>
                  </div>

                  <div className="lg:col-span-7 lg:col-start-6 lg:self-end">
                    <p className="t-lead max-w-[40ch] text-[var(--text)]">{r.lead}</p>
                    <p className="t-body mt-5 max-w-[52ch]">{r.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ljudi ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel>Iza svega toga</SectionLabel>
                <h2 className="t-h2 mt-7 max-w-[13ch]">
                  Na kraju ipak zovete čovjeka
                </h2>
                <p className="t-body mt-8 max-w-[42ch]">
                  Svaka od gornjih šest točaka svodi se na isto: kada nešto
                  zapne, znate koga zvati i ta osoba zna vaš ured. To je jedina
                  prednost koju veliki dobavljač teško može kopirati.
                </p>
                <Link
                  href="/tim"
                  className="group mt-9 inline-flex items-center gap-2.5 border-b border-[var(--line-strong)] pb-1.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-[var(--red)] hover:text-[var(--red-on-light)]"
                >
                  Upoznajte tim
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Figure
                src={images.teamWorking}
                alt="Tim za zajedničkim stolom radi na prijenosnim računalima"
                ratio="4 / 3"
                sizes="(min-width: 1024px) 46vw, 100vw"
                delay={80}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Provjerite nas na jednom uređaju."
        lead="Ne morate premjestiti cijeli ured odjednom. Počnite s jednim uređajem i vidite kako izgleda suradnja."
      />
    </>
  );
}
