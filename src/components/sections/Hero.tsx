import SectionLabel from "@/components/ui/SectionLabel";
import PrinterScene from "@/components/ui/PrinterScene";
import { ButtonLink } from "@/components/ui/Button";
import { a1, canon, site } from "@/lib/site";

/**
 * Hero with the 3D printer figure.
 *
 * Built from the client-approved prototype: a mid-grey field with the figure
 * on the right and the copy anchored bottom-left. The grey is deliberate —
 * the first hero was too dark and the pure-white alternative was rejected, so
 * this sits between the two.
 *
 * No `id="top"`: the navbar only goes transparent over an element carrying
 * that id, so without it the bar stays light, which is right on a light field.
 *
 * Server component. The only client code is PrinterScene, and it loads three
 * lazily, so the text and buttons are in the HTML before any 3D exists.
 */

const GREY = "linear-gradient(180deg, #d3d4d5 0%, #c3c4c6 100%)";

/* Darker than --red-on-light: on this grey the usual red measures 3.7:1,
   which is not enough for 11px text. */
const RED_ON_GREY = "#A5141A";

export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: GREY }}
    >
      {/* Below 700px the figure is a band in the flow, above the copy; from 700px
          up it is the full-bleed backdrop the copy sits over. The same 700 is
          the breakpoint PrinterScene uses to choose its framing. */}
      <PrinterScene className="relative mt-[72px] h-[min(42svh,320px)] w-full min-[700px]:absolute min-[700px]:inset-0 min-[700px]:mt-0 min-[700px]:h-auto -z-10" />

      {/* Keeps the headline clear of the figure on any width */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] hidden min-[700px]:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(205,206,207,.92) 0%, rgba(205,206,207,.6) 40%, rgba(205,206,207,0) 65%), linear-gradient(180deg, rgba(195,196,198,0) 60%, rgba(195,196,198,.9) 100%)",
        }}
      />

      <div className="shell pointer-events-none relative flex flex-1 flex-col justify-end pt-6 pb-8 min-[700px]:pt-32 sm:pb-10">
        <SectionLabel className="hero-cue !text-[rgba(11,11,12,0.72)]" style={{ "--i": 0 } as React.CSSProperties}>
          {site.cities} · Poslovna rješenja
        </SectionLabel>

        <h1
          className="t-display hero-cue mt-7 max-w-[19ch] text-[var(--ink)] md:max-w-[14ch] lg:text-[clamp(2.5rem,5.2vw,5rem)]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Jedan partner za sve što vaš ured drži u pogonu.
        </h1>

        <p
          className="t-lead hero-cue mt-7 max-w-[52ch] text-[rgba(11,11,12,0.78)]"
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
          <ButtonLink href="#kontakt" variant="solid">
            Kontaktirajte nas
          </ButtonLink>
          <ButtonLink href="#usluge" variant="outline">
            Istražite usluge
          </ButtonLink>
        </div>

        {/* Service index — answers "what is this company" above the fold,
            which is the whole job when someone arrives here from a QR code. */}
        <div
          className="hero-cue pointer-events-auto mt-12 grid gap-px border-t border-[rgba(11,11,12,0.18)] sm:mt-16 sm:grid-cols-2 lg:mt-20"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {[a1, canon].map((service) => (
            <a
              key={service.index}
              href="#usluge"
              className="group flex items-baseline gap-4 py-5 sm:py-6"
            >
              <span className="t-label" style={{ color: RED_ON_GREY }}>
                {service.index}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--red-on-light)]">
                  {service.brand}
                </span>
                <span className="mt-1 block text-sm text-[rgba(11,11,12,0.72)]">
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
