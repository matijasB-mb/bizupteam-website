import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Izjava o privatnosti",
  description:
    "Kako Biz Up Team d.o.o. postupa s osobnim podacima poslanima putem ove stranice — što se prikuplja, zašto, koliko se čuva i koja su vaša prava.",
  alternates: { canonical: "/privatnost" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Izjava o privatnosti",
    description: "Kako postupamo s podacima poslanima putem ove stranice.",
    url: "/privatnost",
  },
};

/** Marks a value the client still has to confirm. Deliberately conspicuous —
 *  a placeholder that blends in is a placeholder that ships. */
function Dopuniti({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-[var(--red-wash)] px-1.5 py-0.5 font-medium text-[var(--red-on-light)]">
      {children}
    </mark>
  );
}

const AZURIRANO = "25. kolovoza 2026.";

export default function PrivatnostPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Izjava o privatnosti" }]}
        eyebrow={`Ažurirano ${AZURIRANO}`}
        title="Izjava o privatnosti"
        lead="Ova stranica prikuplja samo ono što joj pošaljete kroz obrazac. Nema kolačića za praćenje, nema analitike i nema oglasnih mreža."
      />

      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            {/* Sadržaj */}
            <nav aria-label="Sadržaj" className="lg:col-span-3">
              <Reveal>
                <p className="t-label text-[var(--muted)]">Sadržaj</p>
                <ol className="mt-5 flex flex-col gap-2.5 border-t border-[var(--line)] pt-5">
                  {[
                    ["01", "Tko obrađuje vaše podatke", "voditelj"],
                    ["02", "Koje podatke prikupljamo", "podaci"],
                    ["03", "Zašto i na kojoj osnovi", "svrha"],
                    ["04", "Koliko dugo ih čuvamo", "rokovi"],
                    ["05", "Tko im još ima pristup", "primatelji"],
                    ["06", "Kolačići i praćenje", "kolacici"],
                    ["07", "Vaša prava", "prava"],
                    ["08", "Sigurnost", "sigurnost"],
                    ["09", "Izmjene", "izmjene"],
                  ].map(([n, label, id]) => (
                    <li key={id} className="flex gap-3">
                      <span className="t-label w-5 shrink-0 pt-1 text-[var(--muted)]">{n}</span>
                      <a
                        href={`#${id}`}
                        className="text-[0.9375rem] leading-snug text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--red-on-light)]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </nav>

            {/* Tekst */}
            <div className="lg:col-span-8 lg:col-start-5">
              <Reveal delay={80}>
                <div className="flex max-w-[var(--measure)] flex-col gap-16">
                  <section id="voditelj" className="scroll-mt-28">
                    <h2 className="t-h3">01 — Tko obrađuje vaše podatke</h2>
                    <p className="t-body mt-5">
                      Voditelj obrade je <strong>{site.legalName}</strong>,{" "}
                      {contact.street}, {contact.cityLine}, OIB{" "}
                      <Dopuniti>upisati OIB</Dopuniti>.
                    </p>
                    <p className="t-body mt-4">
                      Za sva pitanja o obradi osobnih podataka javite se na{" "}
                      <a
                        href={contact.emailHref}
                        className="underline underline-offset-4 transition-colors duration-300 hover:text-[var(--red-on-light)]"
                      >
                        {contact.email}
                      </a>{" "}
                      ili na {contact.phone}.
                    </p>
                  </section>

                  <section id="podaci" className="scroll-mt-28">
                    <h2 className="t-h3">02 — Koje podatke prikupljamo</h2>
                    <p className="t-body mt-5">
                      Kroz obrazac na stranici{" "}
                      <Link href="/kontakt" className="underline underline-offset-4 hover:text-[var(--red-on-light)]">
                        Kontakt
                      </Link>{" "}
                      prikupljamo samo ono što sami upišete:
                    </p>
                    <ul className="mt-5 border-t border-[var(--line)]">
                      {[
                        ["Ime i prezime", "obavezno"],
                        ["E-mail adresa", "obavezno"],
                        ["Poruka", "obavezno"],
                        ["Naziv tvrtke", "neobavezno"],
                        ["Broj telefona", "neobavezno"],
                        ["Vrsta usluge koja vas zanima", "neobavezno"],
                      ].map(([polje, status]) => (
                        <li
                          key={polje}
                          className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-3"
                        >
                          <span className="text-[0.9375rem] text-[var(--text)]">{polje}</span>
                          <span className="t-label shrink-0 text-[var(--muted)]">{status}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="t-body mt-6">
                      Uz to, poslužitelj privremeno bilježi <strong>IP adresu</strong> s
                      koje je obrazac poslan. Koristi se isključivo za ograničavanje
                      broja slanja — sprječava da automatizirane skripte zatrpaju
                      obrazac — i briše se najkasnije nakon deset minuta. IP adresa se
                      ne sprema uz vašu poruku i ne šalje se e-mailom.
                    </p>
                  </section>

                  <section id="svrha" className="scroll-mt-28">
                    <h2 className="t-h3">03 — Zašto i na kojoj osnovi</h2>
                    <p className="t-body mt-5">
                      Podatke iz obrasca koristimo <strong>isključivo da vam odgovorimo
                      na upit</strong> i, ako do toga dođe, da pripremimo ponudu. Ne
                      koristimo ih za slanje newslettera, ne dodajemo vas ni na kakvu
                      listu i ne prodajemo ih nikome.
                    </p>
                    <p className="t-body mt-4">
                      Pravna osnova je članak 6. stavak 1. točka (b) Opće uredbe o
                      zaštiti podataka — poduzimanje radnji na vaš zahtjev prije
                      mogućeg sklapanja ugovora. Za bilježenje IP adrese osnova je
                      članak 6. stavak 1. točka (f), naš legitimni interes da obrazac
                      zaštitimo od zlouporabe.
                    </p>
                  </section>

                  <section id="rokovi" className="scroll-mt-28">
                    <h2 className="t-h3">04 — Koliko dugo ih čuvamo</h2>
                    <p className="t-body mt-5">
                      Upite čuvamo <Dopuniti>potvrditi rok — prijedlog: 2 godine</Dopuniti>{" "}
                      od zadnje komunikacije, nakon čega ih brišemo. Ako iz upita
                      nastane poslovni odnos, podaci prelaze u dokumentaciju o toj
                      suradnji i čuvaju se prema rokovima koje propisuju računovodstveni
                      i porezni propisi.
                    </p>
                    <p className="t-body mt-4">
                      Možete i ranije zatražiti brisanje — vidi točku 07.
                    </p>
                  </section>

                  <section id="primatelji" className="scroll-mt-28">
                    <h2 className="t-h3">05 — Tko im još ima pristup</h2>
                    <p className="t-body mt-5">
                      Vaše podatke ne prodajemo i ne ustupamo trećim stranama u
                      marketinške svrhe. U tehničkoj isporuci sudjeluju dva izvršitelja
                      obrade:
                    </p>
                    <dl className="mt-6 border-t border-[var(--line)]">
                      <div className="border-b border-[var(--line)] py-4">
                        <dt className="text-[0.9375rem] font-medium text-[var(--text)]">
                          Vercel Inc.
                        </dt>
                        <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                          Poslužitelj na kojem stranica radi. Obrađuje tehničke zapise
                          poslužitelja.
                        </dd>
                      </div>
                      <div className="border-b border-[var(--line)] py-4">
                        <dt className="text-[0.9375rem] font-medium text-[var(--text)]">
                          Resend (Plus Five Five, Inc.)
                        </dt>
                        <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                          Servis koji poruku iz obrasca dostavlja na našu e-mail adresu.
                        </dd>
                      </div>
                    </dl>
                    <p className="t-body mt-6">
                      Oba su društva sa sjedištem u Sjedinjenim Američkim Državama.
                      Prijenos podataka izvan Europskog gospodarskog prostora odvija se
                      na temelju standardnih ugovornih klauzula Europske komisije,
                      odnosno okvira EU–US Data Privacy Framework.
                    </p>
                    <p className="t-body mt-4">
                      Podatke možemo otkriti i nadležnim tijelima ako to od nas zatraže
                      na temelju zakona.
                    </p>
                  </section>

                  <section id="kolacici" className="scroll-mt-28">
                    <h2 className="t-h3">06 — Kolačići i praćenje</h2>
                    <p className="t-body mt-5">
                      <strong>Ova stranica ne postavlja kolačiće.</strong> Nema Google
                      Analyticsa, nema Facebook piksela, nema oglasnih mreža i nema
                      skripti trećih strana koje bi vas mogle pratiti.
                    </p>
                    <p className="t-body mt-4">
                      Zato ova stranica nema ni onaj skočni prozor s pristankom na
                      kolačiće — nema na što pristati. Sve što stranica učita —
                      fotografije, slova, kod — dolazi s njezine vlastite adrese.
                    </p>
                  </section>

                  <section id="prava" className="scroll-mt-28">
                    <h2 className="t-h3">07 — Vaša prava</h2>
                    <p className="t-body mt-5">
                      U svakom trenutku imate pravo:
                    </p>
                    <ul className="mt-5 flex flex-col gap-3">
                      {[
                        "zatražiti pristup podacima koje o vama imamo",
                        "tražiti ispravak netočnih ili dopunu nepotpunih podataka",
                        "tražiti brisanje podataka",
                        "tražiti ograničenje obrade",
                        "uložiti prigovor na obradu koja se temelji na legitimnom interesu",
                        "zatražiti prijenos podataka u strojno čitljivom obliku",
                      ].map((p) => (
                        <li key={p} className="flex gap-3.5">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[var(--red)]" />
                          <span className="text-[0.9375rem] leading-relaxed text-[var(--text-2)]">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="t-body mt-6">
                      Zahtjev pošaljite na{" "}
                      <a
                        href={contact.emailHref}
                        className="underline underline-offset-4 transition-colors duration-300 hover:text-[var(--red-on-light)]"
                      >
                        {contact.email}
                      </a>
                      . Odgovorit ćemo u roku od mjesec dana.
                    </p>
                    <p className="t-body mt-4">
                      Ako smatrate da s vašim podacima ne postupamo u skladu s propisima,
                      možete se obratiti Agenciji za zaštitu osobnih podataka (AZOP),
                      Selska cesta 136, 10000 Zagreb, ili na{" "}
                      <a
                        href="https://azop.hr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 transition-colors duration-300 hover:text-[var(--red-on-light)]"
                      >
                        azop.hr
                      </a>
                      .
                    </p>
                  </section>

                  <section id="sigurnost" className="scroll-mt-28">
                    <h2 className="t-h3">08 — Sigurnost</h2>
                    <p className="t-body mt-5">
                      Stranica se poslužuje isključivo preko šifrirane veze (HTTPS).
                      Obrazac provjerava unos i na uređaju i na poslužitelju, ograničava
                      broj slanja i sadrži skrivenu zamku za automatizirane skripte.
                      Poruka se s poslužitelja prosljeđuje na našu e-mail adresu i nigdje
                      se drugdje ne pohranjuje.
                    </p>
                  </section>

                  <section id="izmjene" className="scroll-mt-28">
                    <h2 className="t-h3">09 — Izmjene ove izjave</h2>
                    <p className="t-body mt-5">
                      Ako se način na koji obrađujemo podatke promijeni, izmijenit ćemo
                      i ovu izjavu i ažurirati datum na vrhu stranice. Zadnja izmjena:{" "}
                      {AZURIRANO}
                    </p>
                  </section>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
