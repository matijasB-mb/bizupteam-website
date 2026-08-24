import Link from "next/link";
import type { ReactNode } from "react";
import AmbientFlow from "@/components/ui/AmbientFlow";

export type Crumb = { label: string; href?: string };

/**
 * The opening band every internal page shares.
 *
 * Dark, carrying `id="top"` so the fixed header reads it and goes transparent
 * exactly as it does on the homepage — the bar stays one continuous element
 * across the whole site rather than changing character room to room.
 *
 * `aside` takes whatever the page wants beside the headline: a device, a
 * figure, a stat block. Pages that pass nothing get a full-width statement,
 * which is how the quieter pages keep their own personality.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  const wide = !aside;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[var(--ink)] pt-[calc(72px+clamp(3.5rem,7vw,6.5rem))] pb-[clamp(3.5rem,7vw,6.5rem)] text-white"
    >
      <AmbientFlow tone="dark" variant={wide ? "full" : "quiet"} />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.2) 45%, rgba(11,11,12,0.75) 100%)",
        }}
      />

      <div className="shell relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Putanja" className="hero-cue mb-9" style={{ "--i": 0 } as React.CSSProperties}>
            <ol className="t-label flex flex-wrap items-center gap-2 text-white/45">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-white/25">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors duration-300 hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={wide ? "" : "grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-16"}>
          <div className={wide ? "" : "lg:col-span-6"}>
            {eyebrow && (
              <span
                className="t-label hero-cue inline-flex items-center gap-3 text-white/60"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                <span aria-hidden="true" className="h-px w-7 bg-[var(--red)]" />
                {eyebrow}
              </span>
            )}

            <h1
              className={`hero-cue mt-7 text-white ${wide ? "t-display max-w-[17ch]" : "t-h2 max-w-[15ch]"}`}
              style={{ "--i": 2 } as React.CSSProperties}
            >
              {title}
            </h1>

            {lead && (
              <p
                className="t-lead hero-cue mt-7 max-w-[52ch] text-white/70"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                {lead}
              </p>
            )}

            {children && (
              <div className="hero-cue mt-10" style={{ "--i": 4 } as React.CSSProperties}>
                {children}
              </div>
            )}
          </div>

          {aside && (
            <div
              className="hero-cue lg:col-span-6"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
