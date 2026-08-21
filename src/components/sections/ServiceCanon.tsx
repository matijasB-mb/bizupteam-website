import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import { canon, paketi } from "@/lib/site";

function Check({ dark }: { dark: boolean }) {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      aria-hidden="true"
      className={`mt-[0.45rem] shrink-0 ${
        dark ? "text-[var(--red-on-dark)]" : "text-[var(--red-on-light)]"
      }`}
    >
      <path
        d="M1 5.2 4.2 8.4 11 1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Usluga 02 — Canon. Light, warm ground; the rented device is the subject. */
export default function ServiceCanon() {
  return (
    <section className="section bg-[var(--paper-warm)]">
      <div className="shell">
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
              <div className="flex h-full flex-col border-[var(--line)] py-8 lg:border-r lg:pr-10 lg:py-10 lg:last:border-r-0">
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

        {/* ── Paketi ─────────────────────────────────────────────── */}
        <div className="mt-24 sm:mt-32">
          <Reveal>
            <div className="flex flex-col gap-6 border-t border-[var(--line-strong)] pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>Paketi najma</SectionLabel>
                <h3 className="t-h2 mt-6 max-w-[18ch]">
                  Odaberite prema opsegu ispisa
                </h3>
              </div>
              <p className="max-w-[36ch] text-[0.9375rem] text-[var(--muted)]">
                Isti Canon uređaj u svim paketima. Razlika je u mjesečnom
                opsegu ispisa i razini podrške koja ide uz njega.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {paketi.map((paket, i) => {
              const dark = Boolean(paket.featured);

              return (
                <Reveal key={paket.id} delay={i * 70} className="h-full">
                  <article
                    className={[
                      "flex h-full flex-col p-7 lg:p-8",
                      dark
                        ? "bg-[var(--ink)] text-white lg:-my-5 lg:py-13"
                        : "bg-[var(--paper)] lg:bg-transparent lg:border-r lg:border-[var(--line)] lg:last:border-r-0",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4
                        className="t-h3"
                        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                      >
                        {paket.name}
                      </h4>
                      {dark && (
                        <span className="t-label shrink-0 bg-[var(--red)] px-2 py-1 text-white">
                          Najtraženiji
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-6 text-[0.9375rem] ${dark ? "text-white/55" : "text-[var(--muted)]"}`}
                    >
                      {paket.blurb}
                    </p>

                    <div className="mt-8">
                      <span
                        className="block text-[2.75rem] leading-none tabular-nums tracking-[-0.04em]"
                        style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
                      >
                        {paket.volume}
                      </span>
                      <span
                        className={`mt-2 block text-[0.8125rem] ${dark ? "text-white/45" : "text-[var(--muted)]"}`}
                      >
                        {paket.volumeNote}
                      </span>
                    </div>

                    <ul
                      className={`mt-8 flex flex-1 flex-col gap-3 border-t pt-7 text-[0.9375rem] ${
                        dark ? "border-white/15 text-white/80" : "border-[var(--line)] text-[var(--text-2)]"
                      }`}
                    >
                      {paket.includes.map((line) => (
                        <li key={line} className="flex gap-3 leading-snug">
                          <Check dark={dark} />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#kontakt"
                      className={[
                        "mt-8 inline-flex items-center justify-between gap-3 border-t pt-5 text-[0.9375rem] font-medium transition-colors duration-300",
                        dark
                          ? "border-white/15 text-white hover:text-[var(--red-on-light)]"
                          : "border-[var(--line)] hover:text-[var(--red-on-light)]",
                      ].join(" ")}
                    >
                      Zatražite ponudu
                      <span aria-hidden="true">→</span>
                      <span className="sr-only">za paket {paket.name}</span>
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={100}>
            <p className="mt-10 max-w-[62ch] text-[0.875rem] leading-relaxed text-[var(--muted)]">
              Cijena najma ovisi o broju uređaja, opsegu ispisa i trajanju
              suradnje, pa je određujemo nakon kratke analize vaših potreba.
              Nudimo i najam bez dugoročne obveze te kupnju uz servisni ugovor.
            </p>
          </Reveal>

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
