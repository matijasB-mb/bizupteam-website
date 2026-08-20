# Biz Up Team — Web Rekonstrukcija

Rekonstrukcija web stranice za **Biz Up Team d.o.o.** — prodaja i najam printera i uredske opreme, Osijek.

**Produkcija:** [bizupteam.hr](https://bizupteam.hr)  
**Klijent:** Biz Up Team d.o.o., ul. Ljudevita Posavskog 7, 31000 Osijek  
**Kontakt:** webshop@bizupteam.hr · 091 636 7775

---

## Stack

| Tehnologija | Verzija | Razlog |
|---|---|---|
| Next.js (App Router) | 15+ | SSR/SSG, routing, Image optimization |
| TypeScript | latest | Type safety |
| Tailwind CSS | v4 | Utility-first, brzo razvijanje |
| Vercel | — | Hosting, deployment |
| GitHub | — | Version control |

---

## Design System

### Paleta boja

```
--color-bg:        #FFFFFF   (pozadina)
--color-bg-alt:    #F8FAFC   (sekcije alternativne)
--color-text:      #0F172A   (primarni tekst)
--color-text-muted:#64748B   (muted tekst)
--color-accent:    #2563EB   (CTA, linkovi, hover)
--color-accent-dk: #1D4ED8   (hover stanje akcenta)
--color-border:    #E2E8F0   (borderi, linije)
```

### Tipografija

- **Heading:** Plus Jakarta Sans (700, 600)
- **Body:** Inter (400, 500)
- Oba fonta: Google Fonts

### Princip dizajna

- Svjetla pozadina, minimalistično
- Nema emojija u UI-u
- Apple-like spacing i proporcije
- B2B profesionalnost — trust, jasnoća, brzina

---

## Konvencije koje pratimo

### Kod

- Sve komponente u `/components`, stranice u `/app`
- Svi nazivi komponenti PascalCase, datoteke kebab-case
- Nema `any` u TypeScriptu
- Tailwind klase — ne pisati inline style osim iznimno
- Svaka stranica ima `metadata` export (SEO)

### Git

- `main` — produkcija (Vercel deploy)
- `dev` — razvoj
- `feature/naziv-feature` — feature branch
- Commit poruke na **engleskom**, opisne: `feat: add hero section`, `fix: mobile nav`

### Komponente

- Atomic design: atoms → molecules → organisms → templates
- Svaka sekcija homepage-a = zasebna komponenta

---

## Stranice (planirane)

| Stranica | URL | Status |
|---|---|---|
| Početna | `/` | Planiranje |
| Prodaja printera | `/trgovina` | Planiranje |
| Najam printera | `/najam-printera` | Planiranje |
| Servis | `/servis` | Planiranje |
| O nama | `/o-nama` | Planiranje |
| Kontakt | `/kontakt` | Planiranje |

---

## Highfield Video (Hero)

**1 pokušaj, 10 kredita — plan prije generiranja!**

Koncept: Scroll-triggered hero video — printer u akciji (papir izlazi, printer radi).  
Ugradnja: `<video autoplay muted loop playsInline>` u hero sekciju index.html.  
Format: MP4, landscape, min 1920×1080, trajanje ~5-8s loop.

**Prompt za generiranje:**  
> "Professional office printer printing documents, clean white background, smooth cinematic motion, close-up of paper coming out of printer, modern corporate setting, neutral colors, 4K quality"

**Čekamo** dok hero sekcija nije dizajnirana i dimenzije poznate.

---

## Deploy

```bash
# Development
npm run dev

# Build
npm run build

# Vercel (automatski iz main branch)
git push origin main
```
