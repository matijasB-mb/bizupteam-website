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

export type Usluga = {
  slug: UslugaSlug;
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
    slug: "a3-kolor",
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

/* ── Uređaji po kategoriji ─────────────────────────────────────────────
   Podaci iz službenih Canon specifikacija (canon-europe.com). Brzine su
   navedene onako kako ih Canon navodi — po modelu, ne kao raspon serije. */

export const uredaji: Record<
  Exclude<UslugaSlug, "najam-printera">,
  readonly Uredaj[]
> = {
  "a3-kolor": [
    {
      id: "irdx-c3900",
      serija: "imageRUNNER ADVANCE DX C3900",
      modeli: ["C3922i", "C3926i", "C3930i", "C3935i"],
      opis:
        "A3 multifunkcijski uređaji u boji za urede koji rade s dokumentima svaki dan. Serija je građena oko rada s oblakom i dijeljenja dokumenata unutar tima.",
      podaci: [
        { k: "Format", v: "A3 / A4" },
        { k: "Ispis", v: "U boji i crno-bijelo" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje, slanje" },
        { k: "Softver", v: "uniFLOW Online Express" },
      ],
      image: "/images/canon/irdx-c3900.jpg",
    },
    {
      id: "irdx-c3800",
      serija: "imageRUNNER ADVANCE DX C3800",
      modeli: ["22 ppm", "26 ppm", "30 ppm", "35 ppm"],
      opis:
        "Serija A3 kolor uređaja s izborom brzine prema stvarnom opsegu ispisa — od mirnijeg ureda do odjela s stalnim protokom dokumenata.",
      podaci: [
        { k: "Format", v: "A3 / A4" },
        { k: "Brzina ispisa", v: "22 / 26 / 30 / 35 str./min (A4)" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje, slanje" },
      ],
      image: "/images/canon/irdx-c3800.jpg",
    },
    {
      id: "irdx-c3700",
      serija: "imageRUNNER ADVANCE DX C3700",
      modeli: ["20 ppm", "25 ppm", "30 ppm"],
      opis:
        "Kompaktnija A3 kolor serija za urede kojima treba puni format, ali ne i najveći volumen.",
      podaci: [
        { k: "Format", v: "A3 / A4" },
        { k: "Brzina ispisa", v: "20 / 25 / 30 str./min (A4)" },
        { k: "Skeniranje", v: "Do 270 slika/min, obostrano" },
      ],
      image: "/images/canon/irdx-c3700.jpg",
    },
  ],

  "a3-monokromatski": [
    {
      id: "irdx-4845i",
      serija: "imageRUNNER ADVANCE DX 4845i",
      modeli: ["4845i"],
      opis:
        "Najbrži model serije. Za odjele u kojima ispis ide bez prekida i u kojima zastoj košta.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 45 str./min (A4)" },
        { k: "Brzina ispisa A3", v: "Do 22 str./min" },
        { k: "Skeniranje", v: "Do 270 slika/min, obostrano" },
        { k: "Sigurnost", v: "Trusted Platform Module 2.0" },
      ],
      image: "/images/canon/irdx-4845i.jpg",
    },
    {
      id: "irdx-4835i",
      serija: "imageRUNNER ADVANCE DX 4835i",
      modeli: ["4835i"],
      opis:
        "Srednji model serije — ravnoteža brzine i troška za urede s redovitim dnevnim volumenom.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 35 str./min (A4)" },
        { k: "Brzina ispisa A3", v: "Do 17 str./min" },
        { k: "Skeniranje", v: "Do 270 slika/min, obostrano" },
      ],
      image: "/images/canon/irdx-4835i.jpg",
    },
    {
      id: "irdx-4825i",
      serija: "imageRUNNER ADVANCE DX 4825i",
      modeli: ["4825i"],
      opis:
        "Ulazni model A3 mono serije, za urede kojima treba format A3 uz umjeren volumen.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 25 str./min (A4)" },
        { k: "Brzina ispisa A3", v: "Do 15 str./min" },
        { k: "Skeniranje", v: "Do 270 slika/min, obostrano" },
      ],
      image: "/images/canon/irdx-4825i.jpg",
    },
  ],

  "a4-kolor": [
    {
      id: "isensys-c1538if",
      serija: "i-SENSYS X C1538iF II",
      modeli: ["C1538iF II"],
      opis:
        "Kompaktan A4 kolor multifunkcijski uređaj s najvišom brzinom u seriji. Stane na ormarić, a nosi opterećenje cijelog manjeg ureda.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 38 str./min (A4R)" },
        { k: "Kapacitet papira", v: "550 listova, proširivo do 2.300" },
        { k: "Ispis s uređaja", v: "AirPrint, Mopria, Universal Print" },
        { k: "Softver", v: "uniFLOW Online Express" },
      ],
      image: "/images/canon/isensys-c1538if.jpg",
    },
    {
      id: "isensys-c1533if",
      serija: "i-SENSYS X C1533iF II",
      modeli: ["C1533iF II"],
      opis:
        "Isti oblik i iste mogućnosti uz nešto nižu brzinu — za urede kojima kolor treba redovito, ali ne stalno.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 33 str./min (A4R)" },
        { k: "Kapacitet papira", v: "550 listova, proširivo do 2.300" },
        { k: "Ispis s uređaja", v: "AirPrint, Mopria, Universal Print" },
      ],
      image: "/images/canon/isensys-c1533if.jpg",
    },
    {
      id: "isensys-c1533p",
      serija: "i-SENSYS X C1533P / C1538P",
      modeli: ["C1533P", "C1538P"],
      opis:
        "Verzija bez skenera, za radna mjesta na kojima treba samo ispis u boji.",
      podaci: [
        { k: "Tip", v: "Jednofunkcijski pisač" },
        { k: "Format", v: "A4" },
        { k: "Ispis", v: "U boji" },
      ],
      image: "/images/canon/isensys-c1533p.jpg",
    },
  ],

  "a4-monokromatski": [
    {
      id: "isensys-1440i",
      serija: "i-SENSYS X 1440i",
      modeli: ["1440i", "1440iF"],
      opis:
        "Kompaktan i brz A4 crno-bijeli multifunkcijski uređaj. Za urede u kojima je ispis svakodnevan alat, a ne poseban događaj.",
      podaci: [
        { k: "Brzina ispisa", v: "Do 40 str./min" },
        { k: "Format", v: "A4" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje" },
      ],
      image: "/images/canon/isensys-1440i.jpg",
    },
    {
      id: "isensys-1643i",
      serija: "i-SENSYS X 1643i",
      modeli: ["1643i"],
      opis:
        "Uređaj koji nudimo u svim našim paketima najma — provjeren u radu i jednostavan za održavanje.",
      podaci: [
        { k: "Format", v: "A4" },
        { k: "Ispis", v: "Crno-bijelo" },
        { k: "Funkcije", v: "Ispis, kopiranje, skeniranje" },
      ],
      image: "/images/canon/isensys-1643i.jpg",
    },
    {
      id: "isensys-1440p",
      serija: "i-SENSYS X 1440P",
      modeli: ["1440P"],
      opis:
        "Jednofunkcijska verzija za radna mjesta kojima treba samo ispis, bez skenera i kopirke.",
      podaci: [
        { k: "Tip", v: "Jednofunkcijski pisač" },
        { k: "Format", v: "A4" },
        { k: "Ispis", v: "Crno-bijelo" },
      ],
      image: "/images/canon/isensys-1440p.jpg",
    },
  ],
};
