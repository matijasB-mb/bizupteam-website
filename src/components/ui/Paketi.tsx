import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  iznos,
  paketi,
  paketRedci,
  paketiMjeseci,
  paketiPdv,
  paketiUvod,
  type Paket,
} from "@/lib/site";

/**
 * Paketi najma — jedna komponenta za oba mjesta na kojima se prikazuju
 * (naslovnica i /usluge/najam-printera). Prije je isti blok postojao dvaput;
 * razlika bi se prije ili kasnije uvukla u sadržaj.
 *
 * Dva prikaza, jedan izvor podataka:
 *   • od `lg` naviše — usporedna tablica, kakvu je klijent i poslao. Retci se
 *     poravnavaju po samoj konstrukciji tablice, bez pogađanja visina.
 *   • ispod `lg` — kartice. Tablica od pet stupaca na mobitelu je horizontalni
 *     scroll i ništa drugo.
 *
 * Istaknuti paket nosi crvenu samo u svom stupcu. Crvena je na ovoj stranici
 * signal, ne ukras — ako je dobije cijelo zaglavlje, prestane išta značiti.
 */

function Badge({ text }: { text: string }) {
  return <span className="t-label inline-block bg-[var(--red)] px-2 py-1 text-white">{text}</span>;
}

function Cijena({ value, dark = false }: { value: string; dark?: boolean }) {
  return (
    <>
      <span
        className="block text-[2.5rem] leading-none tabular-nums tracking-[-0.04em]"
        style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
      >
        {value}
      </span>
      <span
        className={`mt-2 block text-[0.8125rem] ${dark ? "text-white/45" : "text-[var(--muted)]"}`}
      >
        mjesečno + PDV
      </span>
    </>
  );
}

/* ── Tablica (lg i više) ───────────────────────────────────────────────── */

function Tablica({ ctaHref }: { ctaHref: string }) {
  return (
    <table className="w-full table-fixed border-collapse text-left">
      <caption className="sr-only">
        Usporedba paketa najma: uključene količine, servis i mjesečna cijena
      </caption>

      <colgroup>
        <col style={{ width: "20%" }} />
        {paketi.map((p) => (
          <col key={p.id} style={{ width: "20%" }} />
        ))}
      </colgroup>

      <thead>
        <tr>
          <td className="border-b-2 border-[var(--ink)] pb-5 pr-6 align-bottom">
            <span className="t-label text-[var(--muted)]">Stavka</span>
          </td>
          {paketi.map((p) => (
            <th
              key={p.id}
              scope="col"
              className={`border-b-2 px-6 pb-5 align-bottom font-normal ${
                p.featured
                  ? "border-[var(--red)] bg-[var(--red-wash)]"
                  : "border-[var(--ink)]"
              }`}
            >
              <span className="flex min-h-7 items-start">
                {p.badge && <Badge text={p.badge} />}
              </span>
              <span
                className="t-h3 mt-4 block"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                {p.name}
              </span>
              <span className="mt-3 block text-[0.875rem] leading-snug text-[var(--muted)]">
                {p.blurb}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {paketRedci.map((redak) => (
          <tr key={redak.k} className="group">
            <th
              scope="row"
              className="border-b border-[var(--line)] py-4 pr-6 align-top font-normal"
            >
              <span className="t-label text-[var(--muted)]">{redak.k}</span>
            </th>
            {paketi.map((p) => (
              <td
                key={p.id}
                className={`border-b border-[var(--line)] px-6 py-4 align-top text-[0.9375rem] leading-snug text-[var(--text-2)] ${
                  p.featured ? "bg-[var(--red-wash)]" : ""
                }`}
              >
                {redak.get(p)}
              </td>
            ))}
          </tr>
        ))}

        <tr>
          <th scope="row" className="py-6 pr-6 align-top font-normal">
            <span className="t-label text-[var(--muted)]">Mjesečna cijena</span>
          </th>
          {paketi.map((p) => (
            <td
              key={p.id}
              className={`px-6 py-6 align-top ${p.featured ? "bg-[var(--red-wash)]" : ""}`}
            >
              <Cijena value={p.cijena} />
            </td>
          ))}
        </tr>

        <tr>
          <th scope="row" className="border-t border-[var(--line)] py-6 pr-6 align-top font-normal">
            <span className="t-label text-[var(--red-on-light)]">A1 korisnici</span>
          </th>
          {paketi.map((p) => (
            <td
              key={p.id}
              className={`border-t border-[var(--line)] px-6 py-6 align-top ${p.featured ? "bg-[var(--red-wash)]" : ""}`}
            >
              <Cijena value={p.cijenaA1} />
            </td>
          ))}
        </tr>

        <tr>
          <td className="pt-2" />
          {paketi.map((p) => (
            <td key={p.id} className={`px-6 pb-7 pt-2 align-top ${p.featured ? "bg-[var(--red-wash)]" : ""}`}>
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 border-b border-[var(--line-strong)] pb-1 text-[0.875rem] font-medium transition-colors duration-300 hover:border-[var(--red)] hover:text-[var(--red-on-light)]"
              >
                Zatražite ponudu
                <span aria-hidden="true">→</span>
                <span className="sr-only">za paket {p.name}</span>
              </Link>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

/* ── Kartice (ispod lg) ────────────────────────────────────────────────── */

function Kartica({ p, ctaHref, index }: { p: Paket; ctaHref: string; index: number }) {
  const dark = Boolean(p.featured);

  return (
    <Reveal delay={index * 70} className="h-full">
      <article
        className={`flex h-full flex-col p-7 ${
          dark ? "bg-[var(--ink)] text-white" : "bg-[var(--paper)]"
        }`}
      >
        <div className="flex min-h-7 items-start">
          {p.badge && <Badge text={p.badge} />}
        </div>

        <h4
          className="t-h3 mt-4"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          {p.name}
        </h4>
        <p className={`mt-3 text-[0.9375rem] ${dark ? "text-white/55" : "text-[var(--muted)]"}`}>
          {p.blurb}
        </p>

        <div className="mt-7">
          <Cijena value={p.cijena} dark={dark} />
          <p className={`mt-4 text-[0.9375rem] ${dark ? "text-white/70" : "text-[var(--text-2)]"}`}>
            <span className={`t-label mr-2 ${dark ? "text-[var(--red-on-dark)]" : "text-[var(--red-on-light)]"}`}>
              A1 korisnici
            </span>
            <span className="tabular-nums font-medium">{p.cijenaA1}</span>
          </p>
        </div>

        <dl
          className={`mt-7 flex flex-1 flex-col border-t text-[0.9375rem] ${
            dark ? "border-white/15" : "border-[var(--line)]"
          }`}
        >
          {paketRedci.map((redak) => (
            <div
              key={redak.k}
              className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-3 ${
                dark ? "border-white/10" : "border-[var(--line)]"
              }`}
            >
              <dt className={`t-label ${dark ? "text-white/45" : "text-[var(--muted)]"}`}>
                {redak.k}
              </dt>
              <dd className={`ml-auto min-w-0 text-right leading-snug ${dark ? "text-white/85" : "text-[var(--text-2)]"}`}>
                {redak.get(p)}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={ctaHref}
          className={`mt-7 inline-flex items-center justify-between gap-3 text-[0.9375rem] font-medium transition-colors duration-300 ${
            dark ? "text-white hover:text-[var(--red-on-dark)]" : "hover:text-[var(--red-on-light)]"
          }`}
        >
          Zatražite ponudu
          <span aria-hidden="true">→</span>
          <span className="sr-only">za paket {p.name}</span>
        </Link>
      </article>
    </Reveal>
  );
}

/* ── Uvjeti ugovora ────────────────────────────────────────────────────── */

/** Ušteda se računa iz cijena u site.ts, ne upisuje rukom: ako se cijena
    promijeni, ovaj iznos se promijeni s njom i ne može se razići s tablicom. */
function Uvjeti() {
  const istaknut = paketi.find((p) => p.featured) ?? paketi[0];
  const mjesecnaUsteda = iznos(istaknut.cijena) - iznos(istaknut.cijenaA1);
  const ukupnaUsteda = mjesecnaUsteda * paketiMjeseci;

  const redci: { k: string; v: string; d?: string; accent?: boolean }[] = [
    {
      k: "Ugovorno razdoblje",
      v: `${paketiMjeseci} mjeseca`,
      d: `Mjesečne cijene vrijede za ugovoreno razdoblje od ${paketiMjeseci} mjeseca.`,
    },
    {
      k: "Najtraženiji izbor",
      v: `${istaknut.name} paket — ${istaknut.cijena}/mj. ili ${istaknut.cijenaA1}/mj. za A1 korisnike`,
      accent: true,
    },
    {
      k: "Ušteda za A1 korisnika",
      v: `${ukupnaUsteda} € kroz ${paketiMjeseci} mjeseca u odnosu na standardnu cijenu`,
    },
  ];

  return (
    <dl className="mt-10 border-t-2 border-[var(--ink)]">
      {redci.map((r) => (
        <div
          key={r.k}
          className="grid gap-x-8 gap-y-1 border-b border-[var(--line)] py-5 sm:grid-cols-12 sm:items-baseline"
        >
          <dt
            className={`t-label sm:col-span-4 ${r.accent ? "text-[var(--red-on-light)]" : "text-[var(--muted)]"}`}
          >
            {r.k}
          </dt>
          <dd className="sm:col-span-8">
            <span className="block text-[1.0625rem] font-medium leading-snug text-[var(--ink)]">{r.v}</span>
            {r.d && <span className="mt-1 block text-[0.875rem] text-[var(--muted)]">{r.d}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Sastavljeno ───────────────────────────────────────────────────────── */

export default function Paketi({
  ctaHref,
  heading = "h3",
}: {
  /** "#kontakt" na naslovnici, "/kontakt" na podstranicama. */
  ctaHref: string;
  /** Razina naslova ovisi o tome što je iznad bloka na toj stranici. */
  heading?: "h2" | "h3";
}) {
  const Naslov = heading;

  return (
    <div>
      <Reveal>
        <div className="flex flex-col gap-6 border-t border-[var(--line-strong)] pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Paketi najma</SectionLabel>
            <Naslov className="t-h2 mt-6 max-w-[18ch]">Odaberite prema opsegu ispisa</Naslov>
          </div>
          <p className="max-w-[38ch] text-[0.9375rem] text-[var(--muted)]">{paketiUvod}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 hidden lg:block">
          <Tablica ctaHref={ctaHref} />
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
        {paketi.map((p, i) => (
          <Kartica key={p.id} p={p} ctaHref={ctaHref} index={i} />
        ))}
      </div>

      <Reveal delay={60}>
        <Uvjeti />
      </Reveal>

      <Reveal delay={100}>
        <p className="mt-8 max-w-[62ch] text-[0.875rem] leading-relaxed text-[var(--muted)]">
          {paketiPdv} Konačna cijena ovisi o broju uređaja i opsegu ispisa te se
          potvrđuje u pisanoj ponudi. Uz najam nudimo i kupnju uz servisni ugovor.
        </p>
      </Reveal>
    </div>
  );
}
