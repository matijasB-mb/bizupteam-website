import SectionLabel from "@/components/ui/SectionLabel";
import PrinterScene from "@/components/ui/PrinterScene";
import { ButtonLink } from "@/components/ui/Button";
import { a1, canon, site } from "@/lib/site";

/**
 * Hero with the 3D printer figure.
 *
 * Built from the client-approved prototype, here on the site's black: the
 * figure on the right and the copy anchored bottom-left.
 *
 * Carries `id="top"` so the navbar goes transparent over it, as on every
 * other dark opening band on the site.
 *
 * Server component. The only client code is PrinterScene, and it loads three
 * lazily, so the text and buttons are in the HTML before any 3D exists.
 */


export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--ink)]"
    >
      <PrinterScene className="absolute inset-0 -z-10" />

      {/* Legibility scrim. On a phone the figure sits behind the copy, so the
          picture fades to near-black below the head, where the text starts. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] min-[700px]:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,12,0) 0%, rgba(11,11,12,0) 20%, rgba(11,11,12,.8) 44%, rgba(11,11,12,.92) 100%)",
        }}
      />
      {/* Desktop and tablet: copy on the left, figure on the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] hidden min-[700px]:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,11,12,.92) 0%, rgba(11,11,12,.6) 40%, rgba(11,11,12,0) 65%), linear-gradient(180deg, rgba(11,11,12,0) 60%, rgba(11,11,12,.9) 100%)",
        }}
      />

      <div className="shell pointer-events-none relative flex flex-1 flex-col justify-end pt-32 pb-8 sm:pb-10">
        <SectionLabel tone="paper" className="hero-cue" style={{ "--i": 0 } as React.CSSProperties}>
          {site.cities} · Poslovna rješenja
        </SectionLabel>

        <h1
          className="t-display hero-cue mt-7 max-w-[19ch] text-white md:max-w-[14ch] lg:text-[clamp(2.5rem,5.2vw,5rem)]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Jedan partner za sve što vaš ured drži u pogonu.
        </h1>

        <p
          className="t-lead hero-cue mt-7 max-w-[52ch] text-white/70"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          Telekomunikacijske usluge kao ugovorni partner A1-a i uredska
          tehnologija kao partner Canona. Iz Osijeka i Zagreba, za tvrtke koje
          žele manje dobavljača i brže odgovore.
        </p>

        <div
          className="hero-cue pointer-events-auto mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <ButtonLink href="#kontakt" variant="solid" tone="paper">
            Kontaktirajte nas
          </ButtonLink>
          <ButtonLink href="#usluge" variant="outline" tone="paper">
            Istražite usluge
          </ButtonLink>
        </div>

        {/* Service index — answers "what is this company" above the fold.
            Hidden on a phone: there the copy already says it, and the room is
            what keeps the headline clear of the figure behind it. */}
        <div
          className="hero-cue pointer-events-auto mt-12 hidden gap-px border-t border-white/15 min-[700px]:grid sm:mt-16 sm:grid-cols-2 lg:mt-20"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {[a1, canon].map((service) => (
            <a
              key={service.index}
              href="#usluge"
              className="group flex items-baseline gap-4 py-5 sm:py-6"
            >
              <span className="t-label text-[var(--red-on-dark)]">
                {service.index}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium text-white transition-colors duration-300 group-hover:text-[var(--red-on-dark)]">
                  {service.brand}
                </span>
                <span className="mt-1 block text-sm text-white/55">
                  {service.brand === "A1"
                    ? "Telekomunikacije za poslovne korisnike"
                    : "Najam i prodaja uredskih uređaja"}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
