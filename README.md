# Biz Up Team — web

Korporativna web stranica za **Biz Up Team d.o.o.**, Osijek.

**Produkcija:** [bizupteam.hr](https://bizupteam.hr)
**Klijent:** Biz Up Team d.o.o., ul. Ljudevita Posavskog 7, 31000 Osijek
**Kontakt:** webshop@bizupteam.hr · 091 636 7770

---

## Struktura

```
/                          naslovnica
/o-nama
/usluge                    pregled
  /usluge/a1-telekomunikacije
  /usluge/a3-kolor
  /usluge/a3-monokromatski
  /usluge/a4-kolor
  /usluge/a4-monokromatski
  /usluge/najam-printera
/zasto-biz-up
/tim
/kontakt
```

Navigacija vodi na prave rute. Naslovnica zadržava vlastita sidra (`#usluge`,
`#kontakt`) za svoje CTA-e — rade i dalje, samo više nisu meta izbornika.
„Usluge" otvara padajući panel na desktopu i harmoniku na mobitelu; aktivno
stanje se izvodi iz `usePathname`, pa je „Usluge" istaknuto i na svakoj
podstranici.

Usluge su **grupirane u dva stupa**, ne u šest ravnopravnih stavki — A1 nije
kategorija printera pa bi kao šesti red ispod „A4 monokromatski" izgledao kao
greška u taksonomiji:

```
Telekomunikacije        →  A1 poslovne usluge
Uredska tehnologija     →  A3/A4 kolor i mono, najam
```

Grupe su definirane jednom u `lib/usluge.ts` (`grupe`, `uslugeUGrupi`) i iz
njih se renderiraju dropdown, mobilna harmonika, `/usluge` i podnožje.

Svaka podstranica ima **vlastiti raspored**, ne isti predložak pet puta:
A3 kolor drži uređaj lijevo i specifikacije desno, A3 mono je zrcali (tekst
lijevo, uređaj desno) i dodaje primjene u četiri stupca, A4 kolor otvara prozom
uz numerirani popis primjena, A4 mono je namjerno najmirnija stranica — jedan
uređaj velik pa kompaktnija alternativa — a najam je servisna prodajna stranica
s tri koraka, biračem kategorije i paketima.

**A1 stranica je namjerno najkraća.** Svaka rečenica o A1 mora proći njihov
pregled, pa navodi ulogu savjetnika, četiri područja i staje. Bez tarifa,
paketa i brojki — to nije naše za objaviti. Ako A1 kasnije odobri više
detalja, ima mjesta dopuniti; nema mjesta povući krivu tvrdnju.

---

## Što stranica radi

Dvije usluge, jasno odvojene, na naslovnici:

1. **A1** — savjetovanje i podrška poslovnim korisnicima za telekomunikacijske
   usluge. Biz Up je **ugovorni partner**, nije operator. Tekst je namjerno
   pisan u toj ulozi jer ga A1 mora odobriti.
2. **Canon** — najam i prodaja printera, skenera i multifunkcijskih uređaja,
   servis, automatska dostava tonera, cloud skeniranje i arhiviranje.

Glavni ulazni kanal je **QR kod** s papirnate kartice koja ide u brendiranu
kutiju uz A1 narudžbu. Jedan zajednički QR, vodi na naslovnicu. Osoba koja ga
skenira već zna Biz Up kao A1 partnera — cilj naslovnice je da u prvom ekranu
sazna i za Canon uslugu. Zato hero ispod CTA-a nosi indeks obiju usluga.

Nema personaliziranih QR kodova, portala, prijave ni baze. Stranica je statična.

---

## Stack

| Sloj | Izbor |
|---|---|
| Framework | Next.js 16 (App Router) |
| Jezik | TypeScript |
| Stilovi | Tailwind CSS v4 + CSS varijable |
| Fontovi | Archivo (naslovi) + Inter (tekst), `next/font` |
| Scroll | Lenis (~3 kB) |
| Animacija | IntersectionObserver + CSS — bez animacijske biblioteke |
| Hosting | Vercel |

Lenis je jedina runtime ovisnost izvan Next/React. Sve se poslužuje s vlastite
domene, pa je CSP tijesan.

---

## Design system

Sve u [`src/app/globals.css`](src/app/globals.css).

```
--ink          #0B0B0C    tamna podloga, tekst
--paper        #FFFFFF    dominantna podloga
--paper-warm   #F6F3F2    alternativne sekcije
--line         #E0DBDA    hairline granice
--text-2       #4A4544    tekst odlomka
--muted        #6E6765    sekundarni tekst
--red          #E31E24    brend — ISPUNE (gumbi, linije, logo)
--red-on-dark  #FF4A50    sitni crveni TEKST na tamnom
--red-on-light #C8171C    sitni crveni TEKST na svijetlom
```

**Zašto tri crvene:** `#E31E24` je brend vrijednost i ostaje točna gdje god je
ispuna. Kao *sitan tekst* daje 4.05:1 na `--ink` i 4.33:1 na `--paper-warm` —
oboje ispod WCAG AA. Dvije pomaknute nijanse čuvaju ton i prelaze 4.5:1.

**Ritam podloga:** hero (tamno) → o nama (bijelo) → A1 (tamno) → Canon (toplo
bijelo) → zašto (bijelo) → kontakt (tamno) → podnožje (tamno). Dvije usluge su
namjerno na različitim podlogama.

### Tri pravila koja je lako slučajno prekršiti

1. **Bazni stilovi moraju biti u `@layer base`.** Neslojeviti CSS pobjeđuje
   svaki slojeviti bez obzira na specifičnost — `a { color: inherit }` izvan
   sloja utiša svaku Tailwind `text-*` klasu na linkovima.
2. **Nazive klasa piši u cijelosti.** Tailwind skenira izvorni tekst; klasa
   sastavljena iz varijable (`` `${x}bg-white` ``) nikad se ne generira.
3. **`group-data-*` ne ide na element koji nosi `group`.** Prevodi se u
   selektor potomka. Element sam sebe stilizira s `data-[...]`.

---

## Pokret

Tri sloja, svaki se sam gasi pod `prefers-reduced-motion`.

**Scroll** — [`SmoothScroll.tsx`](src/components/ui/SmoothScroll.tsx) +
[`smoothScroll.ts`](src/lib/smoothScroll.ts). Namješten na kontrolu, ne na
lebdenje: kratko trajanje (0.9 s) i krivulja koja tvrdo sleti, pa stranica prati
kotačić i stane kad stane unos. `syncTouch` je isključen — trackpad i mobitel
voze na vlastitom scrollu preglednika, jer bi im Lenis dodao drugi sloj inercije
povrh onog koji OS već radi. Jedan delegirani listener hvata **svaki** `#`
anchor na stranici; Cmd/Ctrl-klik i vanjski linkovi prolaze netaknuti.

**Ambijent** — [`AmbientFlow.tsx`](src/components/ui/AmbientFlow.tsx). Potpis
stranice: svjetlosna polja koja lagano plove, tanke linije kroz koje putuje
impuls (telekom), i listovi papira koji se polako dižu kroz kadar (ispis →
digitalizacija). Opacity 0.03–0.12, najsporiji ciklus 46 s. CSS na `transform` i
`opacity`, bez canvasa. Dekorativno, pa je skriveno od čitača ekrana.

**Put dokumenta** — [`CanonFlow.tsx`](src/components/sections/CanonFlow.tsx).
Crvena linija koja se puni dok sekcija prelazi zaslon: ISPIS → SKENIRANJE →
DIGITALIZACIJA → CLOUD → POSLOVANJE. Linija je skalirani element od 1 px, ne SVG
putanja, pa se sama prelama s layoutom — vodoravno na desktopu, okomito na
mobitelu, iz istog markupa. Napredak se jednom po kadru upiše u CSS varijablu.
Bez JS-a linija je nacrtana do kraja: sadržaj nikad ne ovisi o animaciji.

---

## Fotografije

U [`public/images/`](public/images/). Privremeni Unsplash materijal, slobodan za
komercijalnu upotrebu. Zamjena: prepiši datoteku na istoj putanji.

| Datoteka | Gdje |
|---|---|
| `office-interior.jpg` | O nama |
| `telecom-support.jpg` | A1 — s natpisom u kadru |
| `documents-workflow.jpg` | Canon — put dokumenta |
| `team-working.jpg` | Naš tim |

Slike su namjerno u **četiri od sedam** sekcija. Hero, „Zašto Biz Up" i Kontakt
nose samo tipografiju — da stranica ne postane niz slika s tekstom između.

### Canon fotografije

`canon.hr` vraća 403 na automatski dohvat, pa slike uređaja nisu preuzete.
`DeviceFrame` renderira tehnički crtež multifunkcijskog uređaja u istom
hairline jeziku kao ostatak stranice i oznaku „Fotografija u pripremi".

Putanje su fiksne — ubaci datoteku i slika se sama pojavi, bez izmjene koda:

Svaki uređaj ima **tri snimka** s Canonovog CDN-a — sprijeda, pod kutom i
detalj — u `public/images/canon/<uređaj>-1..3.png`:

```
irdx-c3926i-1..3.png    imageRUNNER ADVANCE DX C3926i
ir-2930i-1..3.png       imageRUNNER 2930i
ir-c1533if-1..3.png     imageRUNNER C1533iF   (Canon ih objavljuje kao C1538iF/C1533iF)
ir-1643i-1..3.png       imageRUNNER 1643i II
isensys-1440i-1..3.png  i-SENSYS X 1440i
```

`DeviceGallery` prikazuje veliki kadar i tri sličice; `DeviceSpec` četiri
istaknuta retka pa punu tablicu u `<details>`.

### Odakle specifikacije

**Svaki redak je s canon.hr, ništa nije procijenjeno.** `canon.hr` vraća 403 na
`curl`, ali se otvara u pravom pregledniku — podaci su čitani odande i upisani u
`spec` polje svakog uređaja. Uz tablicu stoji poveznica na Canonovu stranicu
(`canonUrl`), pa Canon ostaje autoritet za vlastiti proizvod, a naša tablica ne
može tiho zastarjeti u odnosu na njegovu.

Ovo je **točno ono što klijent drži u ponudi** — pet uređaja, ne katalog.
Puni nazivi provjereni u Canon Europe specifikacijama.

Pazi na nazive serija: samo je **C3926i** iz serije imageRUNNER **ADVANCE** DX.
C1533iF, 2930i i 1643i su imageRUNNER (bez ADVANCE), a 1440i je i-SENSYS X.
Ne spajati ih pod jedan naziv.

Uz pet uređaja ide i poruka o **custom rješenjima** — bez nje popis izgleda kao
granica ponude. Tekst je na jednom mjestu (`custom` u `lib/usluge.ts`) i
renderira ga `CustomSolutions`, kao kratka bilješka ispod uređaja i kao traka
pri dnu stranice.

**Portreti tima nisu stock.** Kartica bez fotografije renderira monogram u istom
vizualnom jeziku. Stock portreti su fotografije stvarnih, prepoznatljivih ljudi;
predstaviti ih imenom, funkcijom i brojem telefona kao zaposlenike Biz Upa bilo
bi lažno prikazivanje — i protivno Unsplash licenci. Stavi prave fotografije na
putanje navedene u `lib/site.ts` i kartice ih same pokupe.

**Podaci o timu su DEMO.** Nijedna osoba nije stvarna, nijedan kontakt ne radi.
Zamijeni prije nego stranica ode live.

---

## Hero video

Hero je već ožičen za film. Ubaci dvije datoteke i radi, bez ijedne izmjene koda:

```
public/media/hero.mp4          Highfield film, u petlji
public/media/hero-poster.jpg   prvi kadar
```

Detalji i upute za snimanje: [`public/media/README.md`](public/media/README.md).

Dok datoteka nema, hero renderira komponiranu CSS scenu — tamno arhitektonsko
polje s crvenim odsjajem. To je namjerni fallback, ne prazan okvir. Postojanje
filma provjerava se na serveru u build-u, pa preglednik ne šalje zahtjev koji
bi vratio 404.

---

## Obrazac za kontakt

Ruta: [`src/app/api/kontakt/route.ts`](src/app/api/kontakt/route.ts)

- validacija na klijentu **i** na serveru (klijentskoj se ne vjeruje)
- honeypot polje `website` — bot dobije 200 pa nema signal da je uhvaćen
- rate limit 5 zahtjeva / 10 min po IP-u, u memoriji instance
- dostava preko Resend API-ja, bez dodatne ovisnosti

**Slanje još nije aktivirano.** Bez `RESEND_API_KEY` ruta vraća 503 i pošten
tekst koji posjetitelja upućuje na e-mail i telefon — ne glumi da je poslala
poruku. Za aktivaciju postavi varijable iz [`.env.example`](.env.example) u
Vercelu.

---

## Konvencije

- Poslovni podaci **samo** u [`src/lib/site.ts`](src/lib/site.ts). Ništa u tom
  fileu nije izmišljeno; nepotvrđeno je označeno s `TODO (klijent)`.
- Sekcije u `src/components/sections`, layout u `src/components/layout`,
  primitivi u `src/components/ui`.
- Bez `any`. Bez inline `style` osim za CSS varijable i gradijente.
- Git: `main` = produkcija (Vercel auto-deploy), `dev` = razvoj.
  Commit poruke na engleskom: `feat: …`, `fix: …`.

---

## Naredbe

```bash
npm run dev
```

```bash
npm run build
```
