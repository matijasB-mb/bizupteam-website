import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { a1 } from "@/lib/site";

/**
 * Usluga 01 — A1. Rendered dark so the two services read as two different
 * rooms rather than two cards in the same grid.
 *
 * Copy discipline: Biz Up advises on A1 services, it does not resell them.
 * No products, prices or claims beyond what the client confirmed in writing.
 */
export default function ServiceA1() {
  return (
    <section className="section relative overflow-hidden bg-[var(--ink)] text-white">
      {/* faint red spill, bottom right — echoes the hero, nothing more */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/3 -right-[10%] h-[70vh] w-[55vw] opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(227,30,36,0.42), transparent 72%)",
        }}
      />

      <div className="shell relative">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          {/* Index column */}
          <div className="lg:col-span-3">
            <Reveal>
              <SectionLabel tone="paper">Usluga {a1.index}</SectionLabel>
              <p
                className="t-numeral mt-6 text-white/12"
                aria-hidden="true"
              >
                {a1.index}
              </p>
            </Reveal>
          </div>

          {/* Statement column */}
          <div className="lg:col-span-9">
            <Reveal delay={80}>
              <p className="t-label mb-5 text-[var(--red-on-dark)]">
                {a1.kicker} — {a1.brand}
              </p>
              <h2 className="t-h2 max-w-[16ch] text-white">{a1.title}</h2>
              <p className="t-lead mt-8 max-w-[54ch] text-white/72">{a1.lead}</p>
              <p className="mt-5 max-w-[54ch] text-white/50">{a1.body}</p>
            </Reveal>
          </div>
        </div>

        {/* Capability grid — hairlines instead of cards */}
        <div className="mt-16 grid gap-px border-t border-white/12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {a1.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="group">
              <div className="flex h-full flex-col border-white/12 py-8 sm:border-r sm:pr-8 sm:last:border-r-0 lg:py-10">
                <span
                  className="t-label text-white/55 transition-colors duration-300 group-hover:text-[var(--red-on-dark)]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-5 text-white">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/50">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[46ch] text-white/50">
              Niste sigurni koji vam model odgovara? Prođimo zajedno kroz
              trenutne račune i potrošnju.
            </p>
            <ButtonLink href="#kontakt" variant="solid" tone="paper" className="shrink-0">
              Dogovorite razgovor
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
