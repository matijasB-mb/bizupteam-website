/**
 * Single source of truth for every piece of business data on the site.
 *
 * Rule for this file: nothing in here is invented. Every value is taken from
 * the client's existing site, their written brief, or their handwritten notes.
 * Anything still unconfirmed is marked with a TODO and kept out of the UI.
 */

export const site = {
  name: "Biz Up Team",
  legalName: "Biz Up Team d.o.o.",
  oib: "68154006666",
  url: "https://bizupteam.hr",
  city: "Osijek",
  /* Obje lokacije, redoslijed: sjedište pa Zagreb. Koristi se u copyju. */
  cities: "Osijek i Zagreb",
  tagline: "Telekomunikacije i uredska tehnologija na jednom mjestu.",
  description:
    "Biz Up Team — partner A1-a za telekomunikacijske usluge i partner Canona za najam i prodaju printera, skenera te cloud rješenja za urede. Osijek i Zagreb.",
} as const;

/* ── Uredi ─────────────────────────────────────────────────────────────
   Dvije lokacije, potvrdio klijent. Poštanski broj Zagreba: 10000.       */

export type Ured = {
  id: string;
  label: string;
  city: string;
  street: string;
  postal: string;
  cityLine: string;
  /** Sjedište tvrtke — ono koje ide u pravne tekstove i strukturirane podatke. */
  hq: boolean;
};

export const uredi: readonly Ured[] = [
  {
    id: "osijek",
    label: "Osijek — sjedište",
    city: "Osijek",
    street: "ul. Ljudevita Posavskog 7",
    postal: "31000",
    cityLine: "31000 Osijek",
    hq: true,
  },
  {
    id: "zagreb",
    label: "Zagreb",
    city: "Zagreb",
    street: "Gustava Krkleca 38a",
    postal: "10000",
    cityLine: "10000 Zagreb",
    hq: false,
  },
] as const;

/** Retci adrese kad grad već stoji u naslovu bloka — bez ponavljanja imena. */
export function adresaLinije(u: Ured): string[] {
  return u.postal ? [u.street, u.cityLine] : [u.street];
}

/** Cijela adresa u jednom retku, za mjesta bez vlastitog naslova (podnožje). */
export function adresaRedak(u: Ured): string {
  return `${u.street}, ${u.cityLine}`;
}

export const contact = {
  /* Zadržano radi sjedišta: pravni tekstovi, JSON-LD i račun idu na Osijek. */
  street: "ul. Ljudevita Posavskog 7",
  postal: "31000",
  cityLine: "31000 Osijek",
  phone: "091 636 7770",
  phoneHref: "tel:+385916367770",
  email: "info@bizupteam.hr",
  emailHref: "mailto:info@bizupteam.hr",
} as const;

/* Navigation points at real routes. The homepage keeps its own in-page
   anchors for its section CTAs — those still work and are not nav targets. */
export const nav = [
  { label: "O nama", href: "/o-nama" },
  { label: "Usluge", href: "/usluge" },
  { label: "Zašto Biz Up", href: "/zasto-biz-up" },
  { label: "Tim", href: "/tim" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

/* ── Usluga 01 — A1 ────────────────────────────────────────────────────
   Framing matters here. The client was explicit: "ne nudimo usluge od A1".
   Biz Up advises and supports; A1 remains the operator. Copy stays in that
   lane so it survives A1's own review.                                   */

export const a1 = {
  index: "01",
  kicker: "Ugovorni partner",
  brand: "A1",
  title: "Telekomunikacije za poslovne korisnike",
  lead: "Kao ugovorni partner A1-a savjetujemo poslovne korisnike i vodimo ih kroz izbor telekomunikacijskih usluga — od prve procjene potreba do ugovora i podrške nakon njega.",
  body: "Ne nastupamo kao operator. A1 je pružatelj usluge; naša je uloga da vam pomognemo odabrati ono što vašoj tvrtki stvarno treba i da poslije imate koga nazvati.",
  items: [
    {
      title: "Poslovna mobilna telefonija",
      text: "Odabir tarifnog modela prema stvarnoj potrošnji tima, bez paketa koje nitko ne koristi.",
    },
    {
      title: "Fiksna telefonija",
      text: "Poslovni brojevi i fiksne linije usklađene s načinom na koji vaš ured zaista radi.",
    },
    {
      title: "Internet i povezivost",
      text: "Poslovni internet za ured, poslovnicu ili više lokacija.",
    },
    {
      title: "Međunarodna komunikacija",
      text: "Rješenja za timove koji redovito posluju izvan Hrvatske.",
    },
  ],
} as const;

/* ── Usluga 02 — Canon ─────────────────────────────────────────────── */

export const canon = {
  index: "02",
  kicker: "Ovlašteni partner",
  brand: "Canon",
  title: "Najam i prodaja uredskih uređaja",
  lead: "Specijalizirani smo za Canon printere, skenere i multifunkcijske uređaje — u najmu ili kupnji, uz servis, održavanje i automatsku dostavu tonera.",
  body: "Najam znači predvidiv mjesečni trošak umjesto velike početne investicije, uz uređaj koji ostaje najnoviji i podršku koja je uključena u cijenu.",
  pillars: [
    {
      title: "Automatska dostava tonera",
      text: "Uređaji su povezani sustavom koji prati brojač ispisa. Toner stiže prije nego što ponestane — bez naručivanja i bez zaliha na polici.",
    },
    {
      title: "Servis i održavanje",
      text: "Preventivno održavanje i redoviti servisi koji produljuju vijek uređaja i sprječavaju veće kvarove.",
    },
    {
      title: "Cloud i digitalizacija",
      text: "Skeniranje u cloud i arhiviranje dokumenata — papir koji dolazi u ured završava kao datoteka koju možete pronaći.",
    },
  ],
  /* The path a single document takes through the service. Drawn as the
     scroll-linked flow line — the page's one signature detail. */
  flow: [
    { step: "01", label: "Ispis", text: "Uređaj radi u vašem uredu." },
    { step: "02", label: "Skeniranje", text: "Papir postaje datoteka." },
    { step: "03", label: "Digitalizacija", text: "Prepoznato i složeno." },
    { step: "04", label: "Cloud", text: "Dostupno s bilo kojeg mjesta." },
    { step: "05", label: "Poslovanje", text: "Nađete ga kad zatreba." },
  ],
} as const;

/* ── Paketi najma ──────────────────────────────────────────────────────
   Cijene, količine i uređaji preuzeti su doslovno iz klijentove tablice
   (Mario, 21.10.2026.). Ništa nije preračunato ni zaokruženo.

   Redoslijed stupaca je klijentov: LOW → BASIC → MID → LARGE, dakle po
   rastućem opsegu, ne abecedno.

   Oznaka na MID paketu glasi „Preporučeni izbor", kako je u tablici.
   Klijent je u napomeni ostavio otvorenim da je kasnije zamijeni s
   „Najtraženiji paket" — tada se mijenja samo `badge` ispod.

   Cijene su BEZ PDV-a (potvrdio klijent) i vrijede za ugovorno razdoblje
   od 24 mjeseca. Svaki paket ima dvije cijene: standardnu i onu za korisnike
   A1-a — pa `cijena` i `cijenaA1`. Ušteda se uvijek izračunava iz njih, nikad
   ne upisuje rukom.                                                       */

export type Paket = {
  id: string;
  name: string;
  /** Oznaka iznad naziva; samo istaknuti paket je ima. */
  badge?: string;
  blurb: string;
  /** Standardna mjesečna cijena, bez PDV-a. */
  cijena: string;
  /** Mjesečna cijena za korisnike A1-a, bez PDV-a. */
  cijenaA1: string;
  uredaj: string;
  ispisi: string;
  skeniranja: string;
  servis: string;
  toner: string;
  dodatniIspis: string;
  dodatnoSkeniranje: string;
  featured?: boolean;
};

/** Ugovorno razdoblje na koje vrijede mjesečne cijene paketa. */
// Tekst koristi oblik „24 mjeseca"; kod druge brojke provjeriti padež.
export const paketiMjeseci = 24;

/** Svi iznosi na stranici bez PDV-a; PDV se obračunava dodatno. */
export const paketiPdv = "Sve cijene su bez PDV-a.";

/** "55 €" -> 55. Cijene su zapisane kao tekst, pa ih računi čitaju ovdje. */
export const iznos = (cijena: string) => parseInt(cijena.replace(/\D/g, ""), 10);

export const paketiUvod =
  "Primjer unaprijed definiranih paketa za uredski ispis. Uključene količine odnose se na jedan mjesec.";

export const paketi: readonly Paket[] = [
  {
    id: "low",
    name: "Low",
    blurb: "Za urede s povremenim ispisom.",
    cijena: "25 €",
    cijenaA1: "19 €",
    uredaj: "Canon i-SENSYS X 1440i",
    ispisi: "500",
    skeniranja: "100",
    servis: "Prema paketu",
    toner: "Uključen",
    dodatniIspis: "0,015 €",
    dodatnoSkeniranje: "0,001 €",
  },
  {
    id: "basic",
    name: "Basic",
    blurb: "Za urede u kojima ispis ide svaki dan.",
    cijena: "35 €",
    cijenaA1: "29 €",
    uredaj: "Canon i-SENSYS X 1440i",
    ispisi: "1.500",
    skeniranja: "500",
    servis: "Prema paketu",
    toner: "Uključen",
    dodatniIspis: "0,015 €",
    dodatnoSkeniranje: "0,001 €",
  },
  {
    id: "mid",
    name: "Mid",
    badge: "Preporučeni izbor",
    blurb: "Veći volumen, više skeniranja i brža servisna podrška.",
    cijena: "55 €",
    cijenaA1: "45 €",
    uredaj: "Canon imageRUNNER 1643i II",
    ispisi: "2.500",
    skeniranja: "1.250",
    servis: "Telefonski servis unutar 8 h",
    toner: "Uključen",
    dodatniIspis: "0,007 €",
    dodatnoSkeniranje: "0,001 €",
    featured: true,
  },
  {
    id: "large",
    name: "Large",
    blurb: "Za poslovanja u kojima ispis ne smije stati.",
    cijena: "75 €",
    cijenaA1: "65 €",
    uredaj: "Canon imageRUNNER 1643i II",
    ispisi: "5.000",
    skeniranja: "Neograničeno",
    servis: "Telefonski servis unutar 4 h",
    toner: "Uključen",
    dodatniIspis: "0,007 €",
    dodatnoSkeniranje: "Prema uvjetima paketa",
  },
] as const;

/** Jedan popis redaka za sva mjesta koja pakete prikazuju — kartice i tablica
    ne mogu se razići jer čitaju isti izvor. */
export const paketRedci = [
  { k: "Uređaj", get: (p: Paket) => p.uredaj },
  { k: "Uključeni BW ispisi", get: (p: Paket) => p.ispisi },
  { k: "Uključena skeniranja", get: (p: Paket) => p.skeniranja },
  { k: "Servis", get: (p: Paket) => p.servis },
  { k: "Toner", get: (p: Paket) => p.toner },
  { k: "Dodatni BW ispis", get: (p: Paket) => p.dodatniIspis },
  { k: "Dodatno skeniranje", get: (p: Paket) => p.dodatnoSkeniranje },
] as const;

/* Wording lifted from the card the client already prints and ships in the box,
   so the site reads as a continuation of it rather than a different company. */

export const prednosti = [
  {
    index: "01",
    title: "Jedan partner",
    text: "Telekomunikacije i uredska rješenja rješavate na jednom mjestu, s jednim ugovorom o suradnji i jednim brojem za nazvati.",
  },
  {
    index: "02",
    title: "Dvije lokacije",
    text: "Uredi u Osijeku i Zagrebu pokrivaju i istok i sjeverozapad zemlje. Poznajemo tržište na kojem poslujete i dolazimo kada treba doći.",
  },
  {
    index: "03",
    title: "Brza podrška",
    text: "Stručni savjet kada ga trebate i servis s dogovorenim rokom odziva, a ne s otvorenim krajem.",
  },
  {
    index: "04",
    title: "Bez komplikacija",
    text: "Predvidivi mjesečni troškovi, automatska dostava tonera i fleksibilni modeli suradnje umjesto dugih obveza.",
  },
] as const;

/* ── Tim ───────────────────────────────────────────────────────────────
   Imena, funkcije i brojevi stigli su od klijenta (Mario, 21.10.2026.).
   Brojevi su zapisani u međunarodnom obliku (385…) i ovdje su prikazani u
   domaćem formatu; `phoneHref` nosi izvorni broj s +.

   Prazno polje znači „nije dobiveno", a ne „ne postoji". Kartica svako
   neobavezno polje jednostavno preskoči — bez praznog retka, bez crtice i
   bez mrtve poveznice. Klijent nije poslao e-mail adrese ni lokacije po
   osobi, pa ih nema; središnji kontakt stoji ispod mreže.

   `image` smije biti prazan string — kartica tada renderira monogram u istom
   vizualnom jeziku umjesto praznog okvira. Namjerno nisu korišteni stock
   portreti: to su fotografije stvarnih, prepoznatljivih ljudi, a predstaviti
   ih imenom i brojem kao zaposlenike Biz Upa bilo bi lažno prikazivanje —
   i protivno Unsplash licenci.                                            */

export type ClanTima = {
  id: string;
  name: string;
  role: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  linkedin?: string;
  location?: string;
  image: string;
};

export const tim: readonly ClanTima[] = [
  {
    id: "marko-horvat",
    name: "Marko Horvat",
    role: "Voditelj prodaje",
    phone: "091 636 7771",
    phoneHref: "tel:+385916367771",
    image: "", // stavi na /images/team/marko-horvat.jpg
  },
  {
    id: "goran-pavlovic",
    name: "Goran Pavlović",
    role: "Business Consultant",
    phone: "091 636 7778",
    phoneHref: "tel:+385916367778",
    image: "", // stavi na /images/team/goran-pavlovic.jpg
  },
  {
    id: "branka-mutic",
    name: "Branka Mutić",
    role: "Business Consultant",
    phone: "091 613 8853",
    phoneHref: "tel:+385916138853",
    image: "", // stavi na /images/team/branka-mutic.jpg
  },
  {
    id: "goran-vujic",
    name: "Goran Vujić",
    role: "Business Consultant",
    phone: "091 621 5070",
    phoneHref: "tel:+385916215070",
    image: "", // stavi na /images/team/goran-vujic.jpg
  },
  {
    id: "tamara-preka",
    name: "Tamara Preka",
    role: "Business Consultant",
    image: "", // stavi na /images/team/tamara-preka.jpg
  },
  {
    id: "barbara-pavlovic",
    name: "Barbara Pavlović",
    role: "Business Consultant",
    image: "", // stavi na /images/team/barbara-pavlovic.jpg
  },
] as const;

/* ── Fotografije ───────────────────────────────────────────────────────
   Privremeni Unsplash materijal (slobodno za komercijalnu upotrebu).
   Zamjena: prepiši datoteku na istoj putanji, ništa drugo se ne mijenja. */

export const images = {
  office: "/images/office-interior.jpg",
  telecom: "/images/telecom-fiber.jpg",
  documents: "/images/documents-workflow.jpg",
  teamWorking: "/images/team-working.jpg",
} as const;

/* ── Hero media ────────────────────────────────────────────────────────
   Drop the finished cinematic file at these two paths and the hero picks
   it up with no code change. Until then the CSS scene below renders.     */

export const heroMedia = {
  video: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",
} as const;
