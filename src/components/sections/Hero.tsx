import SectionLabel from "@/components/ui/SectionLabel";
import ParticleScene from "@/components/ui/ParticleScene";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Hero with the particle-and-printer scene.
 *
 * Built from the client's prototype (BizUp Hero Printer Scroll): near-black
 * field, the printer and its cloud of particles on the right, the copy at the
 * left. The prototype was a four-screen scroll story; here it is the opening
 * band only, and its scroll-driven part — the printer lifting away while the
 * cloud pulls into rings — runs as this band scrolls out of view.
 *
 * Carries `id="top"` so the navbar goes transparent over it, as on every other
 * dark opening band.
 *
 * Server component. The only client code is ParticleScene, which loads three
 * lazily, so the text and buttons are in the HTML before any 3D exists.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050505] text-white"
    >
      {/* On a phone the scene sits behind the copy, so it is held back */}
      <ParticleScene className="absolute inset-0 -z-10 max-[699px]:opacity-40" />

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
        <div className="min-[700px]:max-w-[58%]">
          <SectionLabel tone="paper" className="hero-cue" style={{ "--i": 0 } as React.CSSProperties}>
            {site.cities} · Poslovna rješenja
          </SectionLabel>

          <h1
            className="hero-cue mt-7 max-w-[17ch] text-white"
            style={
              {
                "--i": 1,
                fontFamily: "var(--font-archivo), sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                fontSize: "clamp(2.5rem, min(6vw, 10vh), 5.6rem)",
                textWrap: "balance",
              } as React.CSSProperties
            }
          >
            Jedan partner za sve što vaš ured drži u pogonu.
          </h1>

          <p
            className="t-lead hero-cue mt-7 max-w-[48ch] text-white/70"
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
