import SectionLabel from "@/components/ui/SectionLabel";
import PrinterScene from "@/components/ui/PrinterScene";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Hero with the 3D printer.
 *
 * Built from the client's prototype (BizUp Hero Printer Scroll): near-black
 * field, the printer on the right and the copy at the left. The printer rises
 * into place on load and, as the page scrolls, shrinks and lifts away while
 * the element marked `data-hero-copy` fades — PrinterScene does both. On a
 * phone the printer is small and sits in the top-right corner, by the headline.
 *
 * Carries `id="top"` so the navbar goes transparent over it, as on every other
 * dark opening band.
 *
 * Server component. The only client code is PrinterScene, which loads three
 * lazily, so the text and buttons are in the HTML before any 3D exists.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050505] text-white"
    >
      <PrinterScene className="absolute inset-0 -z-10" />

      {/* Red glow behind the scene, and a fade from the left under the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, rgba(227,30,36,.16), transparent 60%), linear-gradient(90deg, rgba(5,5,5,.75) 0%, rgba(5,5,5,0) 55%)",
        }}
      />

      <div className="shell pointer-events-none relative flex flex-1 flex-col justify-start pt-[6.5rem] pb-12 min-[700px]:justify-center min-[700px]:pt-28 min-[700px]:pb-20">
        <div data-hero-copy className="will-change-[opacity,transform] min-[700px]:max-w-[58%]">
          <SectionLabel tone="paper" className="hero-cue" style={{ "--i": 0 } as React.CSSProperties}>
            {site.cities} · Poslovna rješenja
          </SectionLabel>

          <h1
            className="t-display hero-cue mt-7 max-w-[17ch] text-[clamp(2.25rem,min(6vw,10vh),5.6rem)] leading-[0.98] text-white max-[699px]:mt-5 max-[699px]:max-w-[62%] max-[699px]:text-[2.15rem]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Jedan partner za sve što vaš ured drži u pogonu.
          </h1>

          <p
            className="t-lead hero-cue mt-7 max-w-[48ch] text-white/70 max-[699px]:mt-5"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Telekomunikacijske usluge kao ugovorni partner A1-a i uredska
            tehnologija kao partner Canona. Iz Osijeka i Zagreba, za tvrtke koje
            žele manje dobavljača i brže odgovore.
          </p>

          <div
            className="hero-cue pointer-events-auto mt-10 flex flex-col gap-3 max-[699px]:mt-7 sm:flex-row sm:items-center sm:gap-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <ButtonLink
              href="#kontakt"
              variant="solid"
              tone="paper"
              className="border-[var(--red)]! bg-[var(--red)]! text-white! hover:border-[var(--red-on-dark)]! hover:bg-[var(--red-on-dark)]!"
            >
              Kontaktirajte nas
            </ButtonLink>
            <ButtonLink href="#usluge" variant="outline" tone="paper">
              Istražite usluge
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
