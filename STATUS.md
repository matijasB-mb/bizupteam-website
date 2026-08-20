# Biz Up Team — Status Projekta

> Uvijek ažuriraj ovu datoteku na kraju svake sesije.

---

## Gdje smo stali

**Datum:** 2026-08-20  
**Faza:** Priprema (pre-development)

Završena priprema projekta:
- Odabran design direction (Clean SaaS, bijela + navy + plava)
- Odabrani fontovi: Plus Jakarta Sans + Inter
- Odabran stack: Next.js 15 + TypeScript + Tailwind v4 + Vercel
- Kreiran README.md s konvencijama
- Kreiran STATUS.md (ova datoteka)

---

## Zadnje napravljeno

- [2026-08-20] Pregledana trenutna stranica (bizupteam.hr) — vrlo jednostavna, 2 sekcije, WordPress
- [2026-08-20] Odabran design system i tipografija
- [2026-08-20] Kreiran projektni plan u README.md

---

## Treba napraviti

### Hitno
- [ ] Inicijalizirati Next.js 15 projekt (`npx create-next-app@latest`)
- [ ] Pushati na GitHub (novi repo: `bizupteam-website`)
- [ ] Spojiti GitHub repo s Vercelom
- [ ] Postaviti `dev` i `main` brancheve

### Prioritetno
- [ ] Instalirati fontove (Plus Jakarta Sans + Inter) via next/font
- [ ] Postaviti design tokene u Tailwind config (boje, spacing)
- [ ] Napraviti layout komponentu (Navbar + Footer)
- [ ] Hero sekcija homepage — placeholder dok ne generiramo Highfield video
- [ ] Planirati Highfield video prompt i pokrenuti generiranje

### Normalan prioritet
- [ ] Stranica `/trgovina` — grid printera
- [ ] Stranica `/najam-printera` — benefit sekcije + CTA
- [ ] Stranica `/o-nama`
- [ ] Stranica `/kontakt` — forma + mapa
- [ ] Stranica `/servis`
- [ ] SEO metadata za sve stranice
- [ ] Favicons + OG slike

### Nije hitno
- [ ] Animacije (scroll reveal, hover efekti)
- [ ] Dark mode (razgovoriti s klijentom)
- [ ] Blog/novosti sekcija
- [ ] Live chat integacija
- [ ] Google Analytics

---

## Ideje

- **Kalkulator uštedine** — interaktivni widget koji pokazuje koliko se štedi najmom vs. kupnjom printera
- **Usporedba modela** — side-by-side tablica modela printera
- **Testimonijali** — B2B reference (firme koje koriste usluge)
- **Ticker traka** — brendovi koje prodaju (HP, Canon, Epson...)
- **Chatbot** — AI asistent za pitanja o najmu
- **Webshop integracija** — veza s existingom webshopom ili novi

---

## Poznati problemi / blokeri

- Highfield video: samo 1 pokušaj dostupan — ne generirati dok hero sekcija nije gotova
- Nemamo pristup CMS-u ili sadržaju (slike printera, opisi modela) — treba od klijenta

---

## Kontakti

| Tko | Kontakt | Uloga |
|---|---|---|
| Biz Up Team | webshop@bizupteam.hr | Klijent |
| Biz Up Team | 091 636 7775 | Klijent tel. |
