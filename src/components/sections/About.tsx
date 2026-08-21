import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { contact } from "@/lib/site";

/* Facts only — each one verifiable from the client's own material. */
const facts = [
  { k: "Sjedište", v: "Osijek" },
  { k: "Fokus", v: "B2B" },
  { k: "Partnerstva", v: "A1 · Canon" },
] as const;

export default function About() {
  return (
    <section id="o-nama" className="section bg-[var(--paper)]">
      <div className="shell">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>O nama</SectionLabel>
              <h2 className="t-h2 mt-7 max-w-[14ch]">
                Lokalni partner.
                <br />
                <span className="text-[var(--muted)]">Ozbiljna tehnologija.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={90}>
              <p className="t-lead text-[var(--text)]">
                Biz Up Team je osječka tvrtka koja poslovnim korisnicima
                pokriva dva područja koja se inače kupuju od dva različita
                dobavljača — telekomunikacije i uredsku tehnologiju.
              </p>

              <div className="mt-8 flex max-w-[var(--measure)] flex-col gap-5">
                <p className="t-body">
                  Kao ugovorni partner A1-a savjetujemo tvrtke pri odabiru
                  telekomunikacijskih usluga. Kao partner Canona isporučujemo,
                  iznajmljujemo i održavamo printere, skenere i multifunkcijske
                  uređaje, uz automatsku dostavu tonera i rješenja za
                  digitalizaciju dokumenata.
                </p>
                <p className="t-body">
                  Radimo s B2B sektorom i pristupamo svakom klijentu pojedinačno
                  — prvo analiziramo kako ured stvarno radi, pa tek onda
                  predlažemo opremu i usluge. Kada nešto zatreba, javljate se
                  nama, a ne pozivnom centru.
                </p>
              </div>

              {/* The line the client already prints on the card in every box.
                  Repeating it here makes the site feel like the same company. */}
              <figure className="mt-12 border-l-2 border-[var(--red)] pl-6">
                <blockquote className="t-h3 max-w-[26ch] text-balance">
                  Ovo nije kraj prodaje — ovo je početak partnerstva.
                </blockquote>
                <figcaption className="t-label mt-4 text-[var(--muted)]">
                  Iz Biz Up pozdravne kartice
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-px border-t border-[var(--line)] sm:mt-24 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="pt-6">
                <dt className="t-label text-[var(--muted)]">{f.k}</dt>
                <dd className="t-h3 mt-3">{f.v}</dd>
              </div>
            ))}
            <div className="pt-6">
              <dt className="t-label text-[var(--muted)]">Kontakt</dt>
              <dd className="t-h3 mt-3">
                <a
                  href={contact.phoneHref}
                  className="tabular-nums transition-colors duration-300 hover:text-[var(--red-on-light)]"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
