/**
 * Katalog usluga i Canon uređaja.
 *
 * Pravilo kao i u site.ts: ništa se ne izmišlja. Nazivi serija i modela te
 * brzine ispisa preuzeti su iz službenih Canon Europe specifikacija. Gdje
 * podatak nije potvrđen, polje jednostavno ne postoji — radije prazno nego
 * izmišljeno.
 *
 * Slike uređaja: `image` pokazuje na /public/images/canon/<slug>.jpg. Dok
 * datoteke nema, komponenta renderira dizajniranu zamjenu u istom vizualnom
 * jeziku. Ubaci fotografiju na tu putanju i sama se pojavi.
 */

export type UslugaSlug =
  | "a1-telekomunikacije"
  | "a3-kolor"
  | "a3-monokromatski"
  | "a4-kolor"
  | "a4-monokromatski"
  | "najam-printera";

export type Uredaj = {
  id: string;
  serija: string;
  modeli: readonly string[];
  opis: string;
  /** Samo potvrđeni podaci iz Canon specifikacija. */
  podaci: readonly { k: string; v: string }[];
  image: string;
};

/* Two halves of the business, not six siblings. A1 is not a printer category,
   so the navigation groups rather than lists — see Navbar and /usluge. */
export type Grupa = "telekom" | "canon";

export const grupe: readonly { id: Grupa; label: string; opis: string }[] = [
  {
    id: "telekom",
    label: "Telekomunikacije",
    opis: "Savjetovanje i podrška kao ugovorni partner A1-a.",
  },
  {
    id: "canon",
    label: "Uredska tehnologija",
    opis: "Canon printeri i multifunkcijski uređaji, u kupnji ili najmu.",
  },
];

export type Usluga = {
  slug: UslugaSlug;
  grupa: Grupa;
  nav: string;
  navOpis: string;
  breadcrumb: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  heroLead: string;
  format: string;
  boja: string;
};

/* ── Navigacija ────────────────────────────────────────────────────────── */

export const usluge: readonly Usluga[] = [
  {
    slug: "a1-telekomunikacije",
    grupa: "telekom",
    nav: "A1 poslovne usluge",
    navOpis: "Telekomunikacije za tvrtke",
    breadcrumb: "A1 telekomunikacije",
    title: "A1 telekomunikacije",
    metaTitle: "A1 Poslovne Usluge",
    metaDescription:
      "Biz Up Team je ugovorni partner A1-a. Savjetujemo poslovne korisnike pri odabiru mobilne i fiksne telefonije, interneta i međunarodne komunikacije.",
    hero: "Telekomunikacije, odabrane prema poslu.",
    heroLead:
      "Kao ugovorni partner A1-a vodimo tvrtke kroz izbor telekomunikacijskih usluga — od prve procjene potreba do podrške nakon ugovora.",
    format: "Poslovni korisnici",
    boja: "A1",
  },
  {
    slug: "a3-kolor",
    grupa: "canon",
    nav: "A3 kolor",
    navOpis: "Profesionalni A3 ispis u boji",
    breadcrumb: "A3 kolor",
    title: "A3 kolor",
    metaTitle: "A3 Kolor Pisači",
    metaDescription:
      "Canon A3 multifunkcijski uređaji u boji za profesionalni uredski ispis. Najam ili kupnja uz servis i podršku — Biz Up Team, Osijek.",
    hero: "Profesionalni A3 ispis u boji.",
    heroLead:
      "Pouzdana rješenja za kvalitetan, brz i učinkovit ispis u svakodnevnom poslovanju.",
    format: "A3",
    boja: "Kolor",
  },
  {
    slug: "a3-monokromatski",
    grupa: "canon",
    nav: "A3 monokromatski",
    navOpis: "Pouzdan A3 crno-bijeli ispis",
    breadcrumb: "A3 monokromatski",
    title: "A3 monokromatski",
    metaTitle: "A3 Monokromatski Pisači",
    metaDescription:
      "Canon A3 crno-bijeli multifunkcijski uređaji za velike dnevne volumene ispisa. Servis, toner i podrška — Biz Up Team, Osijek.",
    hero: "Brz. Pouzdan. Precizan.",
    heroLead:
      "Profesionalni crno-bijeli A3 ispis za poslovanja kojima je važna učinkovitost.",
    format: "A3",
    boja: "Monokromatski",
  },
  {
    slug: "a4-kolor",
    grupa: "canon",
    nav: "A4 kolor",
    navOpis: "Kompaktna rješenja za A4 kolor ispis",
    breadcrumb: "A4 kolor",
    title: "A4 kolor",
    metaTitle: "A4 Kolor Pisači",
    metaDescription:
      "Canon A4 multifunkcijski uređaji u boji za svakodnevni uredski ispis. Kompaktno rješenje uz servis i podršku — Biz Up Team, Osijek.",
    hero: "Boja koja izgleda profesionalno.",
    heroLead:
      "Kompaktna i učinkovita rješenja za svakodnevni uredski ispis.",
    format: "A4",
    boja: "Kolor",
  },
  {
    slug: "a4-monokromatski",
    grupa: "canon",
    nav: "A4 monokromatski",
    navOpis: "Učinkovit A4 crno-bijeli ispis",
    breadcrumb: "A4 monokromatski",
    title: "A4 monokromatski",
    metaTitle: "A4 Monokromatski Pisači",
    metaDescription:
      "Canon A4 crno-bijeli uređaji za svakodnevne poslovne potrebe. Jednostavno, brzo i pouzdano — Biz Up Team, Osijek.",
    hero: "Jednostavno. Brzo. Pouzdano.",
    heroLead: "Crno-bijeli ispis za svakodnevne poslovne potrebe.",
    format: "A4",
    boja: "Monokromatski",
  },
  {
    slug: "najam-printera",
    grupa: "canon",
    nav: "Najam printera",
    navOpis: "Fleksibilno rješenje za poslovni ispis",
    breadcrumb: "Najam printera",
    title: "Najam printera",
    metaTitle: "Najam Printera",
    metaDescription:
      "Najam Canon printera bez velikog početnog ulaganja. Uređaj, servis i potrošni materijal prema dogovoru — Biz Up Team, Osijek.",
    hero: "Printer bez velikog početnog ulaganja.",
    heroLead:
      "Odaberite uređaj koji odgovara vašem poslovanju, a mi ćemo se pobrinuti za ostatak.",
    format: "A3 i A4",
    boja: "Kolor i monokromatski",
  },
] as const;

export function uslugaBySlug(slug: string): Usluga | undefined {
  return usluge.find((u) => u.slug === slug);
}

export function uslugeUGrupi(grupa: Grupa): readonly Usluga[] {
  return usluge.filter((u) => u.grupa === grupa);
}

/* ── Uređaji ───────────────────────────────────────────────────────────
   Točno ono što klijent drži u ponudi — pet uređaja, ne katalog. Puni nazivi
   provjereni u Canon Europe specifikacijama.

   Napomena o nazivima: samo je C3926i iz serije imageRUNNER **ADVANCE** DX.
   C1533iF, 2930i i 1643i su imageRUNNER (bez ADVANCE), a 1440i je i-SENSYS X.
   Ne spajati ih pod jedan naziv serije.                                    */

export const uredaji: Record<
  Exclude<UslugaSlug, "najam-printera" | "a1-telekomunikacije">,
  readonly Uredaj[]
> = {
  "a3-kolor": [
    {
      id: "irdx-c3926i",
      serija: "imageRUNNER ADVANCE DX C3926i",
      modeli: ["C3926i"],
      opis:
        "A3 multifunkcijski uređaj u boji iz serije C3900. Građen oko rada s oblakom i dijeljenja dokumenata unutar tima — ispisuje, kopira, skenira i šalje iz istog kućišta.",
      podaci: [
        { k: "Format", v: "A3 / A4" },
        { k: "Ispis", v: "U boji i crno-bijelo" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje, slanje" },
        { k: "Softver", v: "uniFLOW Online Express" },
      ],
      image: "/images/canon/irdx-c3926i.png",
    },
  ],

  "a3-monokromatski": [
    {
      id: "ir-2930i",
      serija: "imageRUNNER 2930i",
      modeli: ["2930i"],
      opis:
        "A3 crno-bijeli multifunkcijski uređaj iz serije 2900. Rađen za urede u kojima ispis ide svaki dan i u kojima zastoj košta više od uređaja.",
      podaci: [
        { k: "Format", v: "A3 / A4" },
        { k: "Ispis", v: "Crno-bijelo" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje, slanje" },
        { k: "Podavač dokumenata", v: "Do A3 (DADF)" },
      ],
      image: "/images/canon/ir-2930i.png",
    },
  ],

  "a4-kolor": [
    {
      id: "ir-c1533if",
      serija: "imageRUNNER C1533iF",
      modeli: ["C1533iF"],
      opis:
        "Kompaktan A4 multifunkcijski uređaj u boji. Stane na ormarić, spaja se na postojeću mrežu i nosi kolor ispis cijelog manjeg ureda.",
      podaci: [
        { k: "Format", v: "A4" },
        { k: "Ispis", v: "U boji" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje, slanje" },
      ],
      image: "/images/canon/ir-c1533if.jpg",
    },
  ],

  "a4-monokromatski": [
    {
      id: "ir-1643i",
      serija: "imageRUNNER 1643i",
      modeli: ["1643i"],
      opis:
        "Uređaj koji nudimo u svim paketima najma. Brz, provjeren u radu i jednostavan za održavanje — radna konjica za svakodnevni uredski ispis.",
      podaci: [
        { k: "Brzina ispisa", v: "45 str./min (A4)" },
        { k: "Format", v: "A4" },
        { k: "Ispis", v: "Crno-bijelo" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje, slanje" },
      ],
      image: "/images/canon/ir-1643i.jpg",
    },
    {
      id: "isensys-1440i",
      serija: "i-SENSYS X 1440i",
      modeli: ["1440i"],
      opis:
        "Kompaktniji A4 crno-bijeli multifunkcijski uređaj za radna mjesta i manje urede kojima ne treba puni volumen većeg modela.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 40 str./min" },
        { k: "Format", v: "A4" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje" },
      ],
      image: "/images/canon/isensys-1440i.png",
    },
  ],
};

/* ── Custom rješenja ───────────────────────────────────────────────────
   Pet uređaja gore je redovna ponuda, ne granica. Bez ove poruke popis
   izgleda kao "to je sve što imaju", pa se ponavlja na svakoj stranici
   usluge — jednom, kratko, uvijek istim riječima.                       */

export const custom = {
  label: "Custom rješenja",
  naslov: "Ne vidite ono što tražite?",
  tekst:
    "Uređaji iznad su ono što nudimo u pravilu. Ako vaše poslovanje traži nešto drugo — drugi format, veći volumen, više uređaja na više lokacija ili poseban način rada s dokumentima — složimo rješenje prema potrebi.",
  kratko:
    "Ovo je redovna ponuda. Za drugačije potrebe slažemo rješenje po mjeri.",
  cta: "Recite nam što trebate",
} as const;
