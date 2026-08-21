# Status

**Zadnje ažurirano:** 21.08.2026.

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

Vizualni screenshot nije snimljen — preview pane nije bio prikazan, pa
preglednik nije kompozitirao sličice. Provjera je rađena kroz izračunate
stilove i geometriju. **Treba pogledati stranicu očima prije slanja klijentu.**

---

## Sljedeće

### Hitno

- [ ] **Pogledati stranicu u pregledniku** — jedina neprovjerena stvar
- [ ] Potvrditi kod klijenta: točna oznaka Canon uređaja (`1643` iz rukopisa)
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
- **Nema fotografija klijenta.** Nijedna izmišljena fotografija nije korištena.
- **Nema cijena.** Nigdje nije navedena nijedna brojka koju klijent nije dao.

---

## Odluke koje ne treba ponovno otvarati

- Jedna stranica, ne više njih — klijent je to izričito potvrdio
- Bez personaliziranih QR kodova; jedan zajednički QR na naslovnicu
- Četiri paketa, ne tri — klijentove stvarne brojke iz bilješki imaju četiri
- Bez animacijske biblioteke — IntersectionObserver i CSS su dovoljni i brži
