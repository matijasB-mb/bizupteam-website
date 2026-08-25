# Status

**Zadnje ažurirano:** 24.08.2026. (unutarnje stranice)

---

## Gdje smo stali

Naslovnica je izgrađena i prolazi build, lint i typecheck. Opseg se bitno
smanjio nakon razgovora s klijentom — nema personaliziranih QR kodova, nema
portala, nema Supabasea. Jedna stranica, jedan zajednički QR koji vodi na nju.

### Gotovo

- Design system s tokenima (`globals.css`) — ink/paper/crvena, tri crvene
  nijanse zbog kontrasta
- Navbar — proziran nad hero-om, prelazi u svijetli; fullscreen mobilni
  izbornik s Escape i zaključavanjem scrolla
- Hero — spreman za video, s komponiranom CSS scenom kao fallbackom;
  scroll parallax; indeks obiju usluga iznad preloma
- O nama — uključuje klijentovu vlastitu rečenicu s kartice
- Usluga 01 — A1, u ulozi savjetnika, ne operatora
- Usluga 02 — Canon, tri stupa + 4 paketa (Basic / Low / Mid / Premium)
- Zašto Biz Up — 4 prednosti, isti redoslijed kao na tiskanoj kartici
- Kontakt — obrazac s validacijom na obje strane, honeypot, rate limit
- Podnožje
- SEO — metadata, OG, LocalBusiness JSON-LD, sitemap, robots
- Sigurnosna zaglavlja — CSP, HSTS, nosniff, frame-ancestors, Permissions-Policy

### Unutarnje stranice

- 12 ruta, sve statički generirane
- Navbar: padajući panel „Usluge", mobilna harmonika, aktivna stanja
- Usluge grupirane u dva stupa: Telekomunikacije (A1) i Uredska tehnologija (Canon)
- `/usluge/a1-telekomunikacije` — namjerno kratka, radi A1 odobrenja
- Podnožje s poveznicama na sve usluge
- `DeviceFrame` — Canon slot s tehničkim crtežom dok fotografije nema
- `ContactForm` izdvojen: naslovnica i /kontakt dijele jednu implementaciju
- Kontakt obrazac dobio polje „Vrsta usluge" (i u e-mailu koji ruta šalje)
- Sitemap pokriva svih 10 ruta

### Polish pass

- Smooth scroll (Lenis) — jedan delegirani listener hvata svaki `#` anchor
- Ambijentalni sloj „protok" — potpis stranice, u heroju, A1 i Canon sekciji
- **Put dokumenta** — crvena linija koja se puni na scroll, ISPIS → CLOUD
- Nova sekcija **Naš tim** — 4 kartice, demo podaci
- Fotografije u 4 od 7 sekcija, clip-path reveal i zoom na hover
- Natpis „Povezani. Gdje god posao treba." u kadru A1 fotografije

### Provjereno u pregledniku

| Provjera | Rezultat |
|---|---|
| Build / lint / typecheck | prolazi, bez upozorenja |
| Horizontalni scroll na 320 / 375 / 390 / 768 / 1440 / 1920 | nema |
| Kontrast teksta (240 čvorova, WCAG AA) | prolazi |
| Mobilni izbornik: otvaranje, Escape, zaključavanje scrolla | radi |
| Obrazac: klijentska validacija | blokira, 0 mrežnih poziva |
| Obrazac: valjan unos | 1 poziv, poštena poruka o neaktivnom slanju |
| API: 422 / 429 / honeypot 200 | ispravno |
| Konzola | bez grešaka |
| Fotografije se učitavaju, WebP, 352 kB → 142 kB (1920w) / 33 kB (640w) | da |
| Anchor linkovi: svi ciljevi postoje, Cmd-klik i vanjski linkovi prolaze | da |
| Put dokumenta: napredak 0 → 1 kroz vidno polje | da |
| Kontrast natpisa preko A1 fotografije (uzorkovani pikseli) | 16.6:1 |
| Tim: 2 stupca na 768, 1 na 320 | da |
| Svih 12 ruta: 200, jedan H1, jedinstven title i description | da |
| Mrtvih poveznica (`href="#"`) i internih 404 | 0 |
| Kontrast na podstranicama (uzorkovano po stranici) | prolazi |
| Padajući izbornik: hover, fokus, Escape; zatvoren je izvan tab reda | da |
| Mobilna harmonika: otvaranje, 6 poveznica, zaključavanje scrolla | da |
| Tablica na 320 px skrola unutar svog okvira, ne stranice | da |
| Naslovnica nakon refaktora: iste sekcije, iste visine | da |

Vizualni screenshot nije snimljen — preview pane nije bio prikazan, pa
preglednik nije kompozitirao sličice. Provjera je rađena kroz izračunate
stilove i geometriju. **Treba pogledati stranicu očima prije slanja klijentu.**

---

## Sljedeće

### Hitno

- [ ] **Pogledati stranicu u pregledniku** — jedina neprovjerena stvar.
      Posebno: osjećaj smooth scrolla i tempo crvene linije u „Putu dokumenta".
      Oboje je namješteno naslijepo, kroz brojke, ne okom.
- [ ] **Zamijeniti demo podatke tima** prije nego stranica ode live —
      imena, funkcije, brojevi i LinkedIn u `lib/site.ts`
- [ ] Prave fotografije tima na putanje iz `lib/site.ts` (sad su monogrami)
- [x] ~~Fotografije uređaja~~ — svih pet ima Canon CDN snimak
- [ ] **Zamijeniti dva privremena snimka** prije launcha: na A4 kolor stranici
      stoji fotografija **C1538iF** (piše na kućištu) iako stranica govori o
      C1533iF, a na A4 mono stoji **1643i II**. Iz istih serija su i kućište je
      isto, ali tko pogleda izbliza vidi drugu oznaku. Klijent je najavio svoje
      fotografije.
- [ ] Potvrditi generaciju 1643i koju klijent drži — original ili II
- [ ] Za padajuću sekciju „Specifikacije" trebaju **datasheet PDF linkovi**
      (canon.a.bigcontent.io) — te mogu čitati, pa specifikacije izvlačim sam.
- [x] ~~Potvrditi oznaku Canon uređaja~~ — klijent potvrdio pet uređaja
      (C3926i, C1533iF, 2930i, 1643i, 1440i); katalog zamijenjen
- [ ] **Reći klijentu:** nije sve „imageRUNNER ADVANCE serija". Samo C3926i je
      ADVANCE DX; C1533iF, 2930i i 1643i su imageRUNNER, a 1440i je i-SENSYS X.
      Canonov predstavnik bi to primijetio.
- [ ] Potvrditi telefon — stara stranica ima `0916367770`, ranija bilješka `7775`

### Prioritet

- [ ] Highfield video — **1 pokušaj, 10 kredita.** Hero je sada dizajniran,
      pa su kadar i proporcije poznati. Upute za snimanje u
      `public/media/README.md`. Generirati tek kad se klijent složi s konceptom.
- [ ] Aktivirati slanje obrasca: Resend ključ + verificirani pošiljatelj u Vercelu
- [ ] Prava fotografija umjesto CSS scene, ako video ne prođe

### Normalno

- [ ] Reference — klijent ih je nabrojao rukom (Vinodolska općina,
      Požeško-slavonska županija i drugi). Rukopis nije čitljiv dovoljno
      pouzdano da bih ih napisao. Tražiti popis u tekstu **i dopuštenje** za
      objavu imena.
- [ ] Sekcija „Tim" — samo ako stignu dobre fotografije. Bez njih je stranica
      jača nego s lošim portretima.
- [ ] OG slika (`opengraph-image`) — trenutno nema, pa dijeljenje linka nema
      pregled
- [ ] Favicon — još uvijek Next.js zadani

### Nije hitno

- [ ] Cijene paketa, ako ih klijent želi javno
- [ ] Google Analytics ili Plausible, ako klijent traži
- [ ] Stranica privatnosti, ako obrazac krene skupljati podatke

---

## Blokade

- **A1 mora odobriti tekst.** Sve o A1 pisano je u ulozi savjetnika, nikad
  operatora, upravo zato. Ne mijenjati taj ton bez njihove suglasnosti.
  Sada postoji i `/usluge/a1-telekomunikacije` — držana kratkom baš zato što
  je svaka rečenica dodatna površina za njihov pregled.
- **Nema fotografija klijenta.** Nijedna izmišljena fotografija nije korištena.
- **Nema cijena.** Nigdje nije navedena nijedna brojka koju klijent nije dao.

---

## Odluke koje ne treba ponovno otvarati

- Jedna stranica, ne više njih — klijent je to izričito potvrdio
- Bez personaliziranih QR kodova; jedan zajednički QR na naslovnicu
- Četiri paketa, ne tri — klijentove stvarne brojke iz bilješki imaju četiri
- Bez animacijske biblioteke — IntersectionObserver i CSS su dovoljni i brži
