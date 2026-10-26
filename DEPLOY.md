# Objava na bizupteam.hr (MyDataKnox, Apache + PHP)

Produkcijska stranica je **statički izvoz** na hostingu s PHP-om. Vercel služi
kao probna adresa za klijenta (ima `X-Robots-Tag: noindex`, canonical svejedno
pokazuje na `https://bizupteam.hr`).

## 1. Složiti paket

```bash
npm run build:static
```

Rezultat je **`bizupteam-hosting.zip`** u korijenu projekta (≈ 2,3 MB). Skripta
sama provjeri da paket sadrži sve bitno (`index.html`, `404.html`, `upiti.php`,
`.htaccess`, `robots.txt`, `sitemap.xml`, `llms.txt`) i da je obrazac spojen na
`/upiti.php`. Ako nešto nedostaje, ne složi paket i javi što.

## 2. Postaviti na hosting

1. cPanel / File Manager → `public_html` (isprazniti staru stranicu; prije toga
   napraviti sigurnosnu kopiju).
2. **Upload** `bizupteam-hosting.zip` u `public_html` → **Extract**.
3. Provjeriti da u `public_html` stoje `index.html`, `upiti.php` i
   **`.htaccess`** (točka-datoteka; u File Manageru uključiti *Show Hidden Files*).
4. Obrisati ZIP.

## 3. E-mail (obrazac)

`upiti.php` šalje na **info@bizupteam.hr**, a pošiljatelj je isti sandučić.
Zato:

- sandučić `info@bizupteam.hr` mora postojati na hostingu;
- u DNS-u domene trebaju biti **SPF** i **DKIM** (u cPanelu: *Email Deliverability*
  → *Repair*) — bez njih Gmail i Outlook šalju poruke u spam;
- ako se adresa ikad promijeni: tri konstante na vrhu `upiti.php`
  (`PRIMATELJ`, `POSILJATELJ`, `POSILJATELJ_IME`).

Kupac nakon slanja dobiva automatsku potvrdu; isključuje se s
`AUTOODGOVOR = false`.

## 4. Provjera nakon objave (5 minuta)

| Što | Kako | Očekivano |
|---|---|---|
| Početna | `https://bizupteam.hr/` | hero s printerom |
| Čiste adrese | `https://bizupteam.hr/o-nama/` | 200 (bez `.html`) |
| Bez završne crte | `https://bizupteam.hr/o-nama` | preusmjeri na `/o-nama/` |
| www | `https://www.bizupteam.hr/` | 301 na `https://bizupteam.hr/` |
| HTTP | `http://bizupteam.hr/` | 301 na HTTPS |
| 404 | `https://bizupteam.hr/nema-ovoga/` | naša 404 stranica |
| Obrazac | poslati upit na `/kontakt/` | „Upit zaprimljen" + mail u `info@` |
| robots | `https://bizupteam.hr/robots.txt` | `Allow: /` + sitemap |
| sitemap | `https://bizupteam.hr/sitemap.xml` | 14 adresa, sve s `/` na kraju |

Ako obrazac javlja grešku: u cPanelu *Errors* / `error_log` piše razlog
(`[upiti] mail() nije uspio…` znači da hosting nije prihvatio poruku — provjeriti
da sandučić postoji).

## 5. Nakon lansiranja

1. **Google Search Console**: dodati `bizupteam.hr` (DNS provjera), poslati
   `https://bizupteam.hr/sitemap.xml`.
2. **Bing Webmaster Tools**: isto (napaja i dio AI pretraživača).
3. **Google Business Profile** za oba ureda (Osijek, Zagreb) — najveći pojedinačni
   učinak na lokalno pretraživanje, a ne može se riješiti kodom.
4. Provjeriti dijeljenje poveznice (WhatsApp/LinkedIn) — mora se pojaviti slika.

## Kako ažurirati stranicu

Promjena u kodu → `npm run build:static` → ponovno uploadati ZIP i Extract
(Override). Na Vercelu se isto objavljuje samo `git push`.

## Varijable okruženja

| Varijabla | Gdje | Za što |
|---|---|---|
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | build | kamo obrazac šalje (`/upiti.php` u `build:static`) |
| `SITE_INDEXABLE=false` | build | privremeno isključi indeksiranje (robots `Disallow: /`, meta `noindex`) |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | samo Vercel | slanje obrasca s Vercela; na hostingu se ne koriste |

## Ako bizupteam.hr ikad ide na Vercel

Dodati domenu u Vercel projekt. Ništa drugo se ne mijenja: canonical, sitemap
i robots već koriste `bizupteam.hr`, a `noindex` vrijedi samo za `*.vercel.app`.
Obrazac tada traži `RESEND_API_KEY` i verificiranu domenu (vidi README).
