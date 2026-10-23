import SectionLabel from "@/components/ui/SectionLabel";
import GoldScene from "@/components/ui/GoldScene";
import { ButtonLink } from "@/components/ui/Button";
import { a1, canon, site } from "@/lib/site";

/**
 * Hero with the gold 3D scene.
 *
 * Built from the client's prototype (BizUp Hero Gold): near-black field, gold
 * metal branches on the right, the copy anchored bottom-left. Gold is used for
 * the hero only — the call to action, the index numerals and the label rule —
 * and the rest of the site keeps the brand red.
 *
 * Carries `id="top"` so the navbar goes transparent over it, as on every other
 * dark opening band.
 *
 * Server component. The only client code is GoldScene, which loads three
 * lazily, so the text and buttons are in the HTML before any 3D exists.
 */

const GOLD_LIGHT = "#E8C170";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050505] text-white"
    >
      {/* Warm glow behind the scene */}
      <div
        aria-hidden="true"
        className="absolute -right-[10%] top-[5%] -z-20 h-[90vh] w-[70vw] max-[699px]:-right-[40%] max-[699px]:-top-[5%] max-[699px]:h-[55vh] max-[699px]:w-[120vw]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,150,52,.22), rgba(201,150,52,.06) 55%, transparent 78%)",
        }}
      />

      <GoldScene className="absolute inset-0 -z-10 max-[699px]:opacity-60" />

      {/* Legibility scrims. Desktop fades in from the left, where the copy is;
          on a phone the copy runs over the lower part of the scene, so the
          picture dissolves into the page from the middle down. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] hidden min-[700px]:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,.9) 0%, rgba(5,5,5,.6) 38%, rgba(5,5,5,0) 62%), linear-gradient(180deg, rgba(5,5,5,0) 70%, rgba(5,5,5,.95) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5] min-[700px]:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0) 28%, rgba(5,5,5,.88) 52%, #050505 70%)",
        }}
      />

      <div className="shell pointer-events-none relative flex flex-1 flex-col justify-end pt-32 pb-8 sm:pb-10">
        <SectionLabel
          tone="paper"
          className="hero-cue [&>span:first-child]:bg-[#D8A94E]!"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {site.cities} · Poslovna rješenja
        </SectionLabel>

        <h1
          className="t-display hero-cue mt-7 max-w-[19ch] text-white md:text-[clamp(2.75rem,6.4vw,5.9rem)]"
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
          <ButtonLink
            href="#kontakt"
            variant="solid"
            tone="paper"
            className="border-[#D8A94E]! bg-[#D8A94E]! text-[#0B0B0C]! hover:border-[#E8C170]! hover:bg-[#E8C170]!"
          >
            Kontaktirajte nas
          </ButtonLink>
          <ButtonLink href="#usluge" variant="outline" tone="paper">
            Istražite usluge
          </ButtonLink>
        </div>

        {/* Service index — answers "what is this company" above the fold,
            which is the whole job when someone arrives here from a QR code. */}
        <div
          className="hero-cue pointer-events-auto mt-12 grid gap-px border-t border-white/15 sm:mt-16 sm:grid-cols-2 lg:mt-20"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {[a1, canon].map((service) => (
            <a
              key={service.index}
              href="#usluge"
              className="group flex items-baseline gap-4 py-5 sm:py-6"
            >
              <span className="t-label" style={{ color: GOLD_LIGHT }}>
                {service.index}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium text-white transition-colors duration-300 group-hover:text-[#E8C170]">
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

