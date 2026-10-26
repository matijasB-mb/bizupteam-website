/**
 * URL-ovi stranice imaju završnu kosu crtu: /o-nama/, ne /o-nama.
 *
 * Razlog je hosting. Next izvozi stranicu kao mapu s index.html, pa Apache
 * (MyDataKnox) i Vercel poslužuju isti URL bez ijednog rewrite pravila — nema
 * se što pogrešno konfigurirati i nema 403 na "mapi bez indexa".
 *
 * Posljedica: canonical, sitemap i strukturirani podaci moraju koristiti isti
 * oblik, inače tražilica vidi dva URL-a za jednu stranicu. Sve to ide kroz
 * ovu funkciju.
 */
export function withSlash(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  const cut = path.search(/[?#]/);
  const base = cut === -1 ? path : path.slice(0, cut);
  const rest = cut === -1 ? "" : path.slice(cut);

  if (base === "/" || base.endsWith("/") || /\.[a-z0-9]+$/i.test(base)) return base + rest;
  return `${base}/${rest}`;
}
