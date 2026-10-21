/**
 * Gdje obrazac šalje upit.
 *
 * Stranica mora raditi na dva hostinga koja se bitno razlikuju:
 *
 *   • Vercel — Next ruta `/api/kontakt` (zadano, radi bez ikakve varijable)
 *   • Apache s PHP-om (MyDataKnox) — `/upiti.php`, jer na statičkom izvozu
 *     Next rute ne postoje
 *
 * Vrijednost se ugrađuje u build, pa jedna varijabla okruženja odlučuje gdje
 * upit ide. Obrazac ne zna razliku: oba kraja vraćaju isti oblik JSON-a.
 *
 *   NEXT_PUBLIC_CONTACT_ENDPOINT=/upiti.php
 */
export const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/kontakt";
