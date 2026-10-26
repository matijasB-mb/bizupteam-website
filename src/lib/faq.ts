/**
 * Često postavljana pitanja o najmu.
 *
 * Svaki odgovor sastavljen je isključivo od podataka koji već stoje na
 * stranici (paketi, uređaji, uredi) — ništa novo se ne obećava. Isti popis
 * hrani i vidljivi blok na stranici i FAQPage strukturirane podatke; Google
 * traži da se oznaka podudara s onim što posjetitelj vidi.
 */

import { paketi, uredi } from "@/lib/site";
import { uredaji } from "@/lib/usluge";

const nazivi = Object.values(uredaji)
  .flat()
  .map((u) => u.serija);

const low = paketi[0];
const large = paketi[paketi.length - 1];
const mid = paketi.find((p) => p.featured);

export const faq: readonly { q: string; a: string }[] = [
  {
    q: "Što je uključeno u mjesečni paket najma?",
    a: `U svakom paketu uključeni su uređaj, toner te određen broj crno-bijelih ispisa i skeniranja mjesečno. Servis ovisi o paketu${
      mid ? `: u paketu ${mid.name} telefonski servis ${mid.servis.replace("Telefonski servis ", "")}` : ""
    }${large ? `, a u paketu ${large.name} ${large.servis.replace("Telefonski servis ", "")}` : ""}.`,
  },
  {
    q: "Koliko košta najam printera?",
    a: `Primjeri unaprijed definiranih paketa kreću od ${low.cijena} mjesečno (${low.name}) do ${large.cijena} mjesečno (${large.name}). Konačna cijena ovisi o broju uređaja, opsegu ispisa i trajanju suradnje te se potvrđuje u pisanoj ponudi.`,
  },
  {
    q: "Što ako ispišem više od uključene količine?",
    a: `Dodatni crno-bijeli ispis iznad uključene količine naplaćuje se ${paketi[0].dodatniIspis} u paketima ${paketi[0].name} i ${paketi[1].name}, a ${paketi[2].dodatniIspis} u paketima ${paketi[2].name} i ${paketi[3].name}. Dodatno skeniranje iznosi ${paketi[0].dodatnoSkeniranje} u paketima ${paketi[0].name}, ${paketi[1].name} i ${paketi[2].name}; za paket ${large.name} vrijede uvjeti paketa.`,
  },
  {
    q: "Koje Canon uređaje nudite?",
    a: `U ponudi su ${nazivi.join(", ")}. Ako vam treba nešto što nije na popisu, javite se: nudimo i prilagođena rješenja.`,
  },
  {
    q: "Radite li s privatnim osobama?",
    a: "Ne. Biz Up Team posluje isključivo s poslovnim korisnicima.",
  },
  {
    q: "Gdje se nalazite?",
    a: `Imamo dva ureda: ${uredi.map((u) => `${u.city} (${u.street}${u.hq ? ", sjedište" : ""})`).join(" i ")}.`,
  },
];

