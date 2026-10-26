import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import PravniTekst, { type Tocka } from "@/components/ui/PravniTekst";
import { contact, site, uredi } from "@/lib/site";
import { og } from "@/lib/seo";
import { withSlash } from "@/lib/url";

export const metadata: Metadata = {
  title: "Izjava o privatnosti",
  description:
    "Kako Biz Up Team d.o.o. postupa s osobnim podacima poslanima putem ove stranice — što se prikuplja, zašto, koliko se čuva i koja su vaša prava.",
  alternates: { canonical: withSlash("/privatnost") },
  robots: { index: true, follow: true },
  openGraph: og({
    title: "Izjava o privatnosti",
    description: "Kako postupamo s podacima poslanima putem ove stranice.",
    url: "/privatnost",
  }),
};

const AZURIRANO = "26. listopada 2026.";

const A =
  "underline underline-offset-4 transition-colors duration-300 hover:text-[var(--red-on-light)]";

const sjediste = uredi.find((u) => u.hq)!;

const polja: readonly [string, string][] = [
  ["Ime i prezime", "obavezno"],
  ["E-mail adresa", "obavezno"],
  ["Poruka", "obavezno"],
  ["Naziv tvrtke", "neobavezno"],
  ["Broj telefona", "neobavezno"],
  ["Vrsta usluge koja vas zanima", "neobavezno"],
];

const prava = [
  "zatražiti pristup podacima koje o vama imamo",
  "tražiti ispravak netočnih ili dopunu nepotpunih podataka",
  "tražiti brisanje podataka",
  "tražiti ograničenje obrade",
  "uložiti prigovor na obradu koja se temelji na legitimnom interesu",
  "zatražiti prijenos podataka u strojno čitljivom obliku",
];

const tocke: Tocka[] = [
  {
    id: "voditelj",
    n: "01",
    naslov: "Tko obrađuje vaše podatke",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Voditelj obrade je <strong>{site.legalName}</strong>, {sjediste.street},{" "}
          {sjediste.cityLine}, OIB {site.oib}. Uz sjedište u
          Osijeku poslujemo i iz ureda u Zagrebu; podaci se u oba slučaja obrađuju
          na isti način i na istim poslužiteljima.
        </p>
        <p className="t-body mt-4">
          Za sva pitanja o obradi osobnih podataka javite se na{" "}
          <a href={contact.emailHref} className={A}>
            {contact.email}
          </a>{" "}
          ili na {contact.phone}.
        </p>
        <p className="t-body mt-4">
          Pravila korištenja same stranice opisana su u{" "}
          <Link href="/uvjeti-koristenja" className={A}>
            Uvjetima korištenja
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "podaci",
    n: "02",
    naslov: "Koje podatke prikupljamo",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Kroz obrazac na stranici{" "}
          <Link href="/kontakt" className={A}>
            Kontakt
          </Link>{" "}
          prikupljamo samo ono što sami upišete:
        </p>
        <ul className="mt-5 border-t border-[var(--line)]">
          {polja.map(([polje, status]) => (
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
          Uz to, poslužitelj privremeno bilježi <strong>IP adresu</strong> s koje je
          obrazac poslan. Koristi se isključivo za ograničavanje broja slanja —
          sprječava da automatizirane skripte zatrpaju obrazac — i briše se
          najkasnije nakon deset minuta.
        </p>
        <p className="t-body mt-4">
          IP adresa navodi se i u e-mailu s upitom, kako bismo zlouporabu obrasca
          mogli prepoznati. Ne pohranjuje se ni u kakvu bazu i ne povezuje se s vama
          ni na koji drugi način.
        </p>
      </>
    ),
  },
  {
    id: "svrha",
    n: "03",
    naslov: "Zašto i na kojoj osnovi",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Podatke iz obrasca koristimo{" "}
          <strong>isključivo da vam odgovorimo na upit</strong> i, ako do toga dođe,
          da pripremimo ponudu. Ne koristimo ih za slanje newslettera, ne dodajemo
          vas ni na kakvu listu i ne prodajemo ih nikome.
        </p>
        <p className="t-body mt-4">
          Na adresu koju ste upisali šaljemo i automatsku potvrdu da je upit
          zaprimljen. To je jedina poruka koju dobivate bez da ste je zatražili i ne
          ponavlja se.
        </p>
        <p className="t-body mt-4">
          Pravna osnova je članak 6. stavak 1. točka (b) Opće uredbe o zaštiti
          podataka — poduzimanje radnji na vaš zahtjev prije mogućeg sklapanja
          ugovora. Za bilježenje IP adrese osnova je članak 6. stavak 1. točka (f),
          naš legitimni interes da obrazac zaštitimo od zlouporabe.
        </p>
      </>
    ),
  },
  {
    id: "rokovi",
    n: "04",
    naslov: "Koliko dugo ih čuvamo",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Upite čuvamo <strong>2 godine</strong> od
          zadnje komunikacije, nakon čega ih brišemo. Ako iz upita nastane poslovni
          odnos, podaci prelaze u dokumentaciju o toj suradnji i čuvaju se prema
          rokovima koje propisuju računovodstveni i porezni propisi.
        </p>
        <p className="t-body mt-4">Možete i ranije zatražiti brisanje — vidi točku 07.</p>
      </>
    ),
  },
  {
    id: "primatelji",
    n: "05",
    naslov: "Tko im još ima pristup",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          Vaše podatke ne prodajemo i ne ustupamo trećim stranama u marketinške
          svrhe. Poruka iz obrasca stiže na našu e-mail adresu i vide je samo
          zaposlenici Biz Up Teama kojima je upit namijenjen.
        </p>
        <p className="t-body mt-4">
          Podatke možemo otkriti i nadležnim tijelima ako to od nas zatraže na
          temelju zakona.
        </p>
      </>
    ),
  },
  {
    id: "kolacici",
    n: "06",
    naslov: "Kolačići i praćenje",
    sadrzaj: (
      <>
        <p className="t-body mt-5">
          <strong>Ova stranica ne postavlja kolačiće.</strong> Nema Google
          Analyticsa, nema Facebook piksela, nema oglasnih mreža i nema skripti
          trećih strana koje bi vas mogle pratiti.
        </p>
        <p className="t-body mt-4">
          Zato ova stranica nema ni onaj skočni prozor s pristankom na kolačiće —
          nema na što pristati. Sve što stranica učita — fotografije, slova, kod —
          dolazi s njezine vlastite adrese.
        </p>
      </>
    ),
  },
  {
    id: "prava",
    n: "07",
    naslov: "Vaša prava",
    sadrzaj: (
      <>
        <p className="t-body mt-5">U svakom trenutku imate pravo:</p>
        <ul className="mt-5 flex flex-col gap-3">
          {prava.map((p) => (
            <li key={p} className="flex gap-3.5">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[var(--red)]"
              />
              <span className="text-[0.9375rem] leading-relaxed text-[var(--text-2)]">
                {p}
              </span>
            </li>
          ))}
        </ul>
        <p className="t-body mt-6">
          Zahtjev pošaljite na{" "}
          <a href={contact.emailHref} className={A}>
            {contact.email}
          </a>
          . Odgovorit ćemo u roku od mjesec dana.
        </p>
        <p className="t-body mt-4">
          Ako smatrate da s vašim podacima ne postupamo u skladu s propisima, možete
          se obratiti Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136,
          10000 Zagreb, ili na{" "}
          <a href="https://azop.hr" target="_blank" rel="noopener noreferrer" className={A}>
            azop.hr
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "sigurnost",
    n: "08",
    naslov: "Sigurnost",
    sadrzaj: (
      <p className="t-body mt-5">
        Stranica se poslužuje isključivo preko šifrirane veze (HTTPS). Obrazac
        provjerava unos i na uređaju i na poslužitelju, ograničava broj slanja i
        sadrži skrivenu zamku za automatizirane skripte. Poruka se s poslužitelja
        prosljeđuje na našu e-mail adresu i nigdje se drugdje ne pohranjuje — nema
        baze podataka u koju bi netko mogao provaliti.
      </p>
    ),
  },
  {
    id: "izmjene",
    n: "09",
    naslov: "Izmjene ove izjave",
    sadrzaj: (
      <p className="t-body mt-5">
        Ako se način na koji obrađujemo podatke promijeni, izmijenit ćemo i ovu
        izjavu i ažurirati datum na vrhu stranice. Zadnja izmjena: {AZURIRANO}
      </p>
    ),
  },
];

export default function PrivatnostPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Izjava o privatnosti" }]}
        eyebrow={`Ažurirano ${AZURIRANO}`}
        title="Izjava o privatnosti"
        lead="Ova stranica prikuplja samo ono što joj pošaljete kroz obrazac. Nema kolačića za praćenje, nema analitike i nema oglasnih mreža."
      />

      <PravniTekst tocke={tocke} />
    </>
  );
}
