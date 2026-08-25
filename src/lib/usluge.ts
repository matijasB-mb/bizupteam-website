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
  /** Tri snimka s Canonovog CDN-a: sprijeda, pod kutom, detalj. */
  slike: readonly string[];
  /** Četiri retka koja stoje uz galeriju, bez otvaranja tablice. */
  istaknuto: readonly string[];
  /** Puna tablica — svaki redak prepisan s canon.hr, ništa procijenjeno. */
  spec: readonly { k: string; v: string }[];
  /** Canonova stranica s potpunim tehničkim podacima. */
  canonUrl: string;
  /** Prvi snimak; zadržan radi komponenti koje traže jednu sliku. */
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

const CANON =
  "https://www.canon.hr/business/products/office-printers/multifunction";

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
      slike: [
        "/images/canon/irdx-c3926i-1.png",
        "/images/canon/irdx-c3926i-2.png",
        "/images/canon/irdx-c3926i-3.png",
      ],
      istaknuto: [
        "26 ppm ispis u boji i crno-bijelo (A4)",
        "270 ipm obostrano skeniranje",
        "Dodirni zaslon u boji od 10,1 inča",
        "Do 2.300 listova kapaciteta papira",
      ],
      spec: [
        { k: "Tip uređaja", v: "Laserski višefunkcijski A3 uređaj u boji" },
        { k: "Osnovne funkcije", v: "Ispisivanje, kopiranje, skeniranje, slanje, pohranjivanje i opcionalno faksiranje" },
        { k: "Brzina ispisivanja", v: "Do 26 ppm (A4), do 15 ppm (A3), do 20 ppm (A4R)" },
        { k: "Razlučivost ispisivanja", v: "1200 × 600 dpi, 1200 × 1200 dpi (pola brzine)" },
        { k: "Brzina skeniranja", v: "Do 270 ipm obostrano (300 × 300 dpi, slanje)" },
        { k: "Kapacitet zalihe papira", v: "Standardno 1.200 listova, maksimalno 2.300 listova" },
        { k: "Izlazni kapacitet papira", v: "Standardno 250 listova, maksimalno 3.450 listova" },
        { k: "Upravljačka ploča", v: "TFT LCD WSVGA dodirni zaslon u boji od 10,1 inča" },
        { k: "Povezivanje", v: "1000Base-T / 100Base-TX / 10Base-T, opcionalno bežični LAN" },
        { k: "Vrijeme do prve kopije", v: "Pribl. 6,1 s ili manje" },
      ],
      canonUrl: CANON + "/colour/imagerunner-advance-dx-c3900-series/specifications/imagerunner-advance-dx-c3926i.html",
      image: "/images/canon/irdx-c3926i-1.png",
    },
  ],

  "a3-monokromatski": [
    {
      id: "ir-2930i",
      serija: "imageRUNNER 2930i",
      modeli: ["2930i"],
      opis:
        "A3 crno-bijeli multifunkcijski uređaj iz serije 2900. Rađen za urede u kojima ispis ide svaki dan i u kojima zastoj košta više od uređaja.",
      slike: [
        "/images/canon/ir-2930i-1.png",
        "/images/canon/ir-2930i-2.png",
        "/images/canon/ir-2930i-3.png",
      ],
      istaknuto: [
        "30 ppm crno-bijeli ispis (A4)",
        "15 ppm u punom A3 formatu",
        "Dodirni zaslon u boji od 7 inča",
        "Do 2.300 listova kapaciteta papira",
      ],
      spec: [
        { k: "Tip uređaja", v: "A3 monokromatski laserski višefunkcijski uređaj" },
        { k: "Osnovne funkcije", v: "Ispisivanje, kopiranje, skeniranje, slanje i opcionalno faksiranje" },
        { k: "Brzina ispisivanja", v: "Do 30 ppm (A4), do 15 ppm (A3), do 20 ppm (A4R)" },
        { k: "Razlučivost ispisivanja", v: "Do 1200 × 1200 dpi" },
        { k: "Brzina skeniranja", v: "35/25 ipm jednostrano (300 × 300 dpi, slanje)" },
        { k: "Kapacitet zalihe papira", v: "Standardno 1.200 listova, maksimalno 2.300 listova" },
        { k: "Izlazni kapacitet papira", v: "Standardno 250 listova, maksimalno 645 listova" },
        { k: "Upravljačka ploča", v: "TFT LCD WVGA dodirni zaslon u boji od 7 inča" },
        { k: "Povezivanje", v: "1000Base-T / 100Base-TX / 10Base-T, bežični LAN, izravna Wi-Fi veza" },
      ],
      canonUrl: CANON + "/black-and-white/imagerunner-2900-series/specifications/imagerunner-2930i.html",
      image: "/images/canon/ir-2930i-1.png",
    },
  ],

  "a4-kolor": [
    {
      id: "ir-c1533if",
      serija: "imageRUNNER C1533iF",
      modeli: ["C1533iF"],
      opis:
        "Kompaktan A4 multifunkcijski uređaj u boji. Stane na ormarić, spaja se na postojeću mrežu i nosi kolor ispis cijelog manjeg ureda.",
      // Canon objavljuje snimke serije C1530 pod zajedničkom oznakom
      // C1538iF / C1533iF — isto kućište, razlika je u brzini.
      slike: [
        "/images/canon/ir-c1533if-1.png",
        "/images/canon/ir-c1533if-2.png",
        "/images/canon/ir-c1533if-3.png",
      ],
      istaknuto: [
        "33 ppm u boji i crno-bijelo",
        "Ispis, kopiranje, skeniranje i faks",
        "Dodirni zaslon u boji od 7 inča",
        "Do 2.300 listova kapaciteta papira",
      ],
      spec: [
        { k: "Tip uređaja", v: "Laserski višefunkcijski A4 uređaj u boji" },
        { k: "Osnovne funkcije", v: "Ispis, kopiranje, skeniranje, slanje i faksiranje" },
        { k: "Brzina ispisivanja", v: "Do 33/33 ppm (A4R), u boji i crno-bijelo" },
        { k: "Razlučivost ispisivanja", v: "Do 1200 × 1200 dpi" },
        { k: "Brzina skeniranja", v: "95 ipm jednostrano (300 dpi, slanje)" },
        { k: "Kapacitet zalihe papira", v: "Standardno 650 listova, maksimalno 2.300 listova" },
        { k: "Izlazni kapacitet papira", v: "200 listova" },
        { k: "Upravljačka ploča", v: "TFT WVGA LCD dodirna ploča u boji od 17,8 cm (7 inča)" },
        { k: "Povezivanje", v: "1000Base-T / 100Base-TX / 10Base-T, bežični LAN" },
      ],
      canonUrl: CANON + "/colour/imagerunner-c1530-series/specifications/",
      image: "/images/canon/ir-c1533if-1.png",
    },
  ],

  "a4-monokromatski": [
    {
      id: "ir-1643i",
      serija: "imageRUNNER 1643i II",
      modeli: ["1643i II"],
      opis:
        "Uređaj koji nudimo u svim paketima najma. Brz, provjeren u radu i jednostavan za održavanje — radna konjica za svakodnevni uredski ispis.",
      slike: [
        "/images/canon/ir-1643i-1.png",
        "/images/canon/ir-1643i-2.png",
        "/images/canon/ir-1643i-3.png",
      ],
      istaknuto: [
        "43 ppm jednostrano (A4)",
        "36 ppm obostrano (A4)",
        "Dodirni zaslon u boji od 5 inča",
        "Do 2.300 listova kapaciteta papira",
      ],
      spec: [
        { k: "Tip uređaja", v: "Crno-bijeli laserski višefunkcijski uređaj" },
        { k: "Osnovne funkcije", v: "Ispisivanje, kopiranje, skeniranje i slanje" },
        { k: "Brzina ispisivanja", v: "Jednostrano do 43 ppm, obostrano do 36 ppm (A4)" },
        { k: "Razlučivost ispisivanja", v: "Do 1200 × 1200 dpi" },
        { k: "Brzina skeniranja", v: "38 ipm jednostrano, 70 ipm obostrano (crno-bijelo)" },
        { k: "Kapacitet zalihe papira", v: "Standardno 650 listova, maksimalno 2.300 listova" },
        { k: "Izlazni kapacitet papira", v: "150 listova" },
        { k: "Upravljačka ploča", v: "TFT LCD WVGA dodirna ploča u boji od 12,7 cm (5 inča)" },
        { k: "Povezivanje", v: "1000Base-T / 100Base-TX / 10Base-T, bežični LAN, izravna Wi-Fi veza" },
      ],
      canonUrl: CANON + "/black-and-white/imagerunner-1643-ii-series/specifications/imagerunner-1643i-ii.html",
      image: "/images/canon/ir-1643i-1.png",
    },
    {
      id: "isensys-1440i",
      serija: "i-SENSYS X 1440i",
      modeli: ["1440i"],
      opis:
        "Kompaktniji A4 crno-bijeli multifunkcijski uređaj za radna mjesta i manje urede kojima ne treba puni volumen većeg modela.",
      slike: [
        "/images/canon/isensys-1440i-1.png",
        "/images/canon/isensys-1440i-2.png",
        "/images/canon/isensys-1440i-3.png",
      ],
      istaknuto: [
        "40 ppm jednostrano (A4)",
        "50 ipm skeniranje",
        "Dodirni zaslon u boji od 12,7 cm",
        "Ispis, kopiranje i skeniranje",
      ],
      spec: [
        { k: "Tip uređaja", v: "Crno-bijeli laserski uređaj sve u jednom" },
        { k: "Brzina ispisivanja", v: "Jednostrano do 40 ppm (A4), obostrano do 33,6 ipm" },
        { k: "Razlučivost ispisivanja", v: "Do 1200 × 1200 dpi" },
        { k: "Brzina skeniranja", v: "50 ipm jednostrano, 100 ipm obostrano (300 × 300 dpi)" },
        { k: "Upravljačka ploča", v: "LCD dodirni zaslon u boji dijagonale 12,7 cm" },
      ],
      canonUrl: CANON + "/black-and-white/i-sensys-x-1440i-series/specifications/i-sensys-x-1440i.html",
      image: "/images/canon/isensys-1440i-1.png",
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
