# Biz Up Team — web

Jednostranična korporativna stranica za **Biz Up Team d.o.o.**, Osijek.

**Produkcija:** [bizupteam.hr](https://bizupteam.hr)
**Klijent:** Biz Up Team d.o.o., ul. Ljudevita Posavskog 7, 31000 Osijek
**Kontakt:** webshop@bizupteam.hr · 091 636 7770

---

## Što stranica radi

Dvije usluge, jasno odvojene, na jednoj stranici:

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
| Animacija | IntersectionObserver + CSS — bez animacijske biblioteke |
| Hosting | Vercel |

Nula runtime ovisnosti izvan Next/React. Sve se poslužuje s vlastite domene,
pa je CSP tijesan.

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
