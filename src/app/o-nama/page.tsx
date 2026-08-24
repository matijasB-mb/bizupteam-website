import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import Figure from "@/components/ui/Figure";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { images, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Biz Up Team je osječka tvrtka koja poslovnim korisnicima pokriva telekomunikacije i uredsku tehnologiju — ugovorni partner A1-a i partner Canona.",
  alternates: { canonical: "/o-nama" },
  openGraph: {
    title: "O nama",
    description:
      "Osječka tvrtka koja poslovnim korisnicima pokriva telekomunikacije i uredsku tehnologiju.",
    url: "/o-nama",
  },
};

export default function ONamaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "O nama" }]}
        eyebrow={`${site.city} · B2B`}
        title="Dva dobavljača manje."
        lead="Telekomunikacije i uredska tehnologija obično se kupuju od dvije različite tvrtke. Kod nas se ne moraju."
      />

      {/* ── Priča ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionLabel>Tko smo</SectionLabel>
                <h2 className="t-h2 mt-7 max-w-[12ch]">
                  Mala tvrtka koja radi s malim tvrtkama
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={90}>
                <p className="t-lead text-[var(--text)]">
                  Biz Up Team je osječka tvrtka. Poslujemo isključivo s poslovnim
                  korisnicima i pokrivamo dva područja koja im oduzimaju
                  nesrazmjerno mnogo vremena: telekomunikacije i uredski ispis.
                </p>

                <div className="mt-8 flex max-w-[var(--measure)] flex-col gap-5">
                  <p className="t-body">
                    Nismo operator i nismo proizvođač. Kao ugovorni partner A1-a
                    savjetujemo tvrtke pri odabiru telekomunikacijskih usluga. Kao
                    partner Canona isporučujemo, iznajmljujemo i održavamo
                    printere, skenere i multifunkcijske uređaje.
                  </p>
                  <p className="t-body">
                    Ta dva posla imaju više zajedničkog nego što se čini. Oba se
                    kupuju rijetko, oba se ugovaraju na duže i oba se pokvare u
                    najgorem trenutku. U oba slučaja najviše vrijedi to da imate
                    koga nazvati.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <Figure
            className="mt-20 sm:mt-24"
            src={images.office}
            alt="Uredski prostor s radnim mjestima i opremom"
            caption="Oprema, veze i podrška iza svakodnevnog rada"
            ratio="21 / 9"
            sizes="(min-width: 1344px) 1216px, 100vw"
          />
        </div>
      </section>

      {/* ── Kako radimo ── */}
      <section className="section bg-[var(--paper-warm)]">
        <div className="shell">
          <Reveal>
            <SectionLabel>Kako radimo</SectionLabel>
            <h2 className="t-h2 mt-7 max-w-[18ch]">
              Prvo pitanja, pa tek onda ponuda
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-y-12 sm:mt-20 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-7">
              <Reveal delay={70}>
                <div className="flex max-w-[var(--measure)] flex-col gap-5">
                  <p className="t-body">
                    Svaki razgovor počinje istim koracima: pogledamo postojeće
                    račune, brojila i to kako ured stvarno radi. Tek iz tih
                    brojeva izlazi prijedlog. Uređaj koji je premalen jednako je
                    loš izbor kao onaj koji je prevelik — prvi koči rad, drugi
                    se plaća bez potrebe.
                  </p>
                  <p className="t-body">
                    Ne prodajemo ono što je trenutno na skladištu. Ako procijenimo
                    da vam postojeće rješenje već odgovara, to i kažemo. Takav
                    razgovor donosi manje u tom mjesecu, ali čuva suradnju koja
                    traje.
                  </p>
                  <p className="t-body">
                    Nakon isporuke javljate se nama, a ne pozivnom centru. To je
                    prednost koju mala tvrtka ima nad velikim dobavljačem i jedina
                    koju vrijedi isticati.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={140}>
                <figure className="border-l-2 border-[var(--red)] pl-6">
                  <blockquote className="t-h3 max-w-[22ch] text-balance">
                    Ovo nije kraj prodaje — ovo je početak partnerstva.
                  </blockquote>
                  <figcaption className="t-label mt-4 text-[var(--muted)]">
                    Iz Biz Up pozdravne kartice
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partnerstva ── */}
      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-y-6 border-t border-[var(--line-strong)] pt-10 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-5">
                <SectionLabel>Partnerstva</SectionLabel>
                <h2 className="t-h2 mt-6 max-w-[13ch]">Dvije uloge, jasno razdvojene</h2>
              </div>
              <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
                Važno nam je da se zna tko što radi — i vama i njima.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border-t border-[var(--line-strong)] sm:mt-16 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col py-10 lg:border-r lg:border-[var(--line)] lg:pr-12">
                <span className="t-label text-[var(--red-on-light)]">01 — Ugovorni partner</span>
                <h3 className="t-h2 mt-5">A1</h3>
                <p className="t-body mt-6 max-w-[42ch]">
                  Savjetujemo poslovne korisnike pri odabiru telekomunikacijskih
                  usluga i vodimo ih kroz proces. A1 je pružatelj usluge; naša je
                  uloga da odaberete ono što vašoj tvrtki stvarno treba.
                </p>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="flex h-full flex-col py-10 lg:pl-12">
                <span className="t-label text-[var(--red-on-light)]">02 — Ovlašteni partner</span>
                <h3 className="t-h2 mt-5">Canon</h3>
                <p className="t-body mt-6 max-w-[42ch]">
                  Isporučujemo, iznajmljujemo i održavamo Canon printere, skenere
                  i multifunkcijske uređaje. Uz njih idu servis, automatska
                  dostava tonera i rješenja za digitalizaciju dokumenata.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Pitajte nas što god vas zanima."
        lead="Ne morate imati pripremljen popis zahtjeva. Dovoljno je opisati kako ured danas radi."
      />
    </>
  );
}
