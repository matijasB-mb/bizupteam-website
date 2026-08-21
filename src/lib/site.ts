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
  url: "https://bizupteam.hr",
  city: "Osijek",
  tagline: "Telekomunikacije i uredska tehnologija na jednom mjestu.",
  description:
    "Biz Up Team iz Osijeka — partner A1-a za telekomunikacijske usluge i partner Canona za najam i prodaju printera, skenera te cloud rješenja za urede.",
} as const;

export const contact = {
  street: "ul. Ljudevita Posavskog 7",
  postal: "31000",
  cityLine: "31000 Osijek",
  phone: "091 636 7770",
  phoneHref: "tel:+385916367770",
  email: "webshop@bizupteam.hr",
  emailHref: "mailto:webshop@bizupteam.hr",
} as const;

export const nav = [
  { label: "O nama", href: "#o-nama" },
  { label: "Usluge", href: "#usluge" },
  { label: "Zašto Biz Up", href: "#zasto" },
  { label: "Kontakt", href: "#kontakt" },
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
} as const;

/* Volumes, inclusions and the shared device come from the client's own notes.
   TODO (klijent): potvrditi točnu oznaku uređaja i mjesečne cijene po paketu. */

export type Paket = {
  id: string;
  name: string;
  volume: string;
  volumeNote: string;
  blurb: string;
  includes: readonly string[];
  featured?: boolean;
};

export const paketi: readonly Paket[] = [
  {
    id: "basic",
    name: "Basic",
    volume: "500",
    volumeNote: "crno-bijelih ispisa mjesečno",
    blurb: "Za manje urede s umjerenim ispisom.",
    includes: ["Canon uređaj 1643", "Servis", "Toner"],
  },
  {
    id: "low",
    name: "Low",
    volume: "1.500",
    volumeNote: "crno-bijelih ispisa mjesečno",
    blurb: "Za urede u kojima ispis ide svaki dan.",
    includes: ["Canon uređaj 1643", "Servis", "Toner"],
  },
  {
    id: "mid",
    name: "Mid",
    volume: "2.500",
    volumeNote: "crno-bijelih ispisa mjesečno",
    blurb: "Za timove koji rastu i trebaju zajamčen odziv servisa.",
    includes: [
      "Canon uređaj 1643",
      "Servis u roku 8 sati",
      "Toner",
      "Telefonska podrška",
    ],
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    volume: "5.000",
    volumeNote: "crno-bijelih ispisa mjesečno",
    blurb: "Za poslovanja u kojima ispis ne smije stati.",
    includes: [
      "Canon uređaj 1643",
      "Prioritetni servis u roku 4 sata",
      "Toner",
      "Cloud skeniranje",
      "Arhiviranje dokumenata",
      "Zamjenski uređaj isti dan",
      "Telefonska podrška",
    ],
  },
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
    title: "Lokalno",
    text: "Sjedište nam je u Osijeku. Poznajemo tržište na kojem poslujete i dolazimo kada treba doći.",
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

/* ── Hero media ────────────────────────────────────────────────────────
   Drop the finished cinematic file at these two paths and the hero picks
   it up with no code change. Until then the CSS scene below renders.     */

export const heroMedia = {
  video: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",
} as const;
