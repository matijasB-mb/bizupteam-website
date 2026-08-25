import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { custom } from "@/lib/usluge";

/**
 * "Custom rješenja" — the counterweight to a short device list.
 *
 * Five named devices read as the whole catalogue unless something says
 * otherwise, so the same message appears on every service page, in the same
 * words. One shared component means it stays one message rather than five
 * slightly different promises.
 *
 * `variant="band"` is the full section used at the foot of a page;
 * `variant="note"` is the one-line version that sits under a device list.
 */
export default function CustomSolutions({
  variant = "band",
  tone = "light",
}: {
  variant?: "band" | "note";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  if (variant === "note") {
    return (
      <Reveal delay={100}>
        <div
          className={`mt-12 flex flex-col items-start gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between ${
            dark ? "border-white/12" : "border-[var(--line)]"
          }`}
        >
          <p
            className={`max-w-[52ch] text-[0.9375rem] leading-relaxed ${
              dark ? "text-white/55" : "text-[var(--muted)]"
            }`}
          >
            {custom.kratko}
          </p>
          <Link
            href="/kontakt"
            className={`group inline-flex shrink-0 items-center gap-2.5 border-b pb-1.5 text-[0.9375rem] font-medium transition-colors duration-300 ${
              dark
                ? "border-white/25 text-white hover:border-[var(--red-on-dark)] hover:text-[var(--red-on-dark)]"
                : "border-[var(--line-strong)] hover:border-[var(--red)] hover:text-[var(--red-on-light)]"
            }`}
          >
            {custom.cta}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Reveal>
    );
  }

  return (
    <section className={`section ${dark ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-mute)]"}`}>
      <div className="shell">
        <Reveal>
          <div className="grid gap-y-8 border-t-2 border-[var(--red)] pt-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <SectionLabel tone={dark ? "paper" : "ink"}>{custom.label}</SectionLabel>
              <h2 className={`t-h2 mt-7 max-w-[13ch] ${dark ? "text-white" : ""}`}>
                {custom.naslov}
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
              <p className={`t-lead max-w-[52ch] ${dark ? "text-white/65" : "text-[var(--text-2)]"}`}>
                {custom.tekst}
              </p>
              <Link
                href="/kontakt"
                className={`group mt-8 inline-flex items-center gap-2.5 px-6 py-3.5 text-[0.9375rem] font-medium leading-none transition-colors duration-300 ${
                  dark
                    ? "bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white"
                    : "bg-[var(--ink)] text-white hover:bg-[var(--red)]"
                }`}
              >
                {custom.cta}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
