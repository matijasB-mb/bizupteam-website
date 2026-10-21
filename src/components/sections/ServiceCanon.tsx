import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Figure from "@/components/ui/Figure";
import AmbientFlow from "@/components/ui/AmbientFlow";
import CanonFlow from "@/components/sections/CanonFlow";
import { ButtonLink } from "@/components/ui/Button";
import CustomSolutions from "@/components/ui/CustomSolutions";
import Paketi from "@/components/ui/Paketi";
import { canon, images } from "@/lib/site";


/** Usluga 02 — Canon. Light, warm ground; the rented device is the subject. */
export default function ServiceCanon() {
  return (
    <section className="section relative overflow-hidden bg-[var(--paper-warm)]">
      <AmbientFlow tone="light" variant="quiet" />

      <div className="shell relative">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-3">
            <Reveal>
              <SectionLabel>Usluga {canon.index}</SectionLabel>
              <p className="t-numeral mt-6 text-[var(--line-strong)]/60" aria-hidden="true">
                {canon.index}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal delay={80}>
              <p className="t-label mb-5 text-[var(--red-on-light)]">
                {canon.kicker} — {canon.brand}
              </p>
              <h2 className="t-h2 max-w-[16ch]">{canon.title}</h2>
              <p className="t-lead mt-8 max-w-[54ch] text-[var(--text-2)]">
                {canon.lead}
              </p>
              <p className="mt-5 max-w-[54ch] text-[var(--muted)]">{canon.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Three things that make the rental worth having */}
        <div className="mt-16 grid gap-px border-t border-[var(--line-strong)] sm:mt-20 lg:grid-cols-3">
          {canon.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="flex h-full flex-col border-[var(--line)] py-8 lg:pr-10 lg:py-10">
                <span className="t-label text-[var(--muted)]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-5">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Put dokumenta ──────────────────────────────────────────
            The section's centrepiece: image, then the flow the service
            actually performs on what that image shows.                  */}
        <div className="mt-24 grid gap-y-12 sm:mt-32 lg:grid-cols-12 lg:gap-x-16">
          <Figure
            className="lg:col-span-5"
            src={images.documents}
            alt="Dvije osobe za stolom pregledavaju ispisane dokumente"
            ratio="4 / 3"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <Reveal>
              <SectionLabel>Put dokumenta</SectionLabel>
              <h3 className="t-h2 mt-6 max-w-[16ch]">
                Od papira do datoteke koju možete pronaći
              </h3>
              <p className="t-body mt-6 max-w-[46ch]">
                Ista oprema koja ispisuje ujedno i skenira. Uz cloud skeniranje
                i arhiviranje dokument ne ostaje u ladici — završi na mjestu
                gdje ga za godinu dana i dalje možete naći.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--line-strong)] pt-14 sm:mt-20">
          <CanonFlow />
        </div>

        {/* ── Paketi ─────────────────────────────────────────────── */}
        <div className="mt-24 sm:mt-32">
          <Paketi ctaHref="#kontakt" />

          <CustomSolutions variant="note" />

          <Reveal delay={140}>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ButtonLink href="#kontakt">Zatražite ponudu</ButtonLink>
              <ButtonLink href="#kontakt" variant="ghost" arrow={false}>
                ili nazovite i objasnimo u pet minuta
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
