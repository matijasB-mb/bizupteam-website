"use client";

import { useEffect, useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import AmbientFlow from "@/components/ui/AmbientFlow";
import { ButtonLink } from "@/components/ui/Button";
import { a1, canon, heroMedia } from "@/lib/site";

/**
 * Cinematic hero, built video-first but designed to stand on its own today.
 *
 * Three layers, each falling back to the one beneath it:
 *   1. /media/hero.mp4        — the finished Highfield film
 *   2. /media/hero-poster.jpg — its first frame, shown while the film loads
 *   3. the CSS scene below    — an architectural dark field that is a
 *                               deliberate composition, not an empty box
 *
 * Dropping the two files into /public/media is the only step needed to go live
 * with the film; nothing here changes. `hasVideo` is resolved on the server at
 * build time, so until the film exists the browser is never asked for it.
 */
export default function Hero({ hasVideo }: { hasVideo: boolean }) {
  const [mediaFailed, setMediaFailed] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Scroll-linked parallax: the film settles back and dims while the copy
     lifts away, so the hero hands the page off instead of just scrolling out.
     One rAF-throttled listener, transform + opacity only — no layout work. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const media = mediaRef.current;
      const content = contentRef.current;
      if (!media || !content) return;

      const progress = Math.min(1, window.scrollY / window.innerHeight);

      media.style.transform = `scale(${1 + progress * 0.09})`;
      media.style.opacity = `${1 - progress * 0.5}`;
      content.style.transform = `translate3d(0, ${progress * -60}px, 0)`;
      content.style.opacity = `${Math.max(0, 1 - progress * 1.45)}`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--ink)]"
    >
      {/* ── Layer 3: composed fallback scene ───────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[var(--ink)]">
        {/* window light, upper right */}
        <div
          className="absolute -right-[10%] -top-[20%] h-[85vh] w-[70vw] opacity-[0.55]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 55%, transparent 78%)",
          }}
        />
        {/* red spill, lower left — the brand's only presence in the scene */}
        <div
          className="absolute -bottom-[25%] -left-[12%] h-[70vh] w-[60vw] opacity-[0.34]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(227,30,36,0.5), rgba(227,30,36,0.12) 50%, transparent 76%)",
          }}
        />
        {/* architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "clamp(72px, 8vw, 130px) clamp(72px, 8vw, 130px)",
            maskImage:
              "radial-gradient(120% 90% at 65% 25%, #000 20%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(120% 90% at 65% 25%, #000 20%, transparent 82%)",
          }}
        />
      </div>

      {/* ── Layers 1 + 2: film and poster ──────────────────────────── */}
      {hasVideo && !mediaFailed && (
        <div ref={mediaRef} className="absolute inset-0 -z-10 will-change-transform">
          <video
            className="h-full w-full object-cover opacity-70"
            poster={heroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setMediaFailed(true)}
          >
            <source src={heroMedia.video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* The signature ambient layer, over the scene and under the scrim so it
          reads the same whether or not the film is in place. */}
      <AmbientFlow tone="dark" className="-z-[8]" />

      {/* Legibility scrim — keeps headline contrast well past AA on any frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5]"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,12,0.82) 0%, rgba(11,11,12,0.5) 32%, rgba(11,11,12,0.62) 72%, rgba(11,11,12,0.94) 100%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="shell relative flex flex-1 flex-col justify-end pt-32 pb-8 sm:pb-10">
        <div ref={contentRef} className="will-change-transform">
          <SectionLabel tone="paper" className="hero-cue" style={{ "--i": 0 } as React.CSSProperties}>
            Osijek · Poslovna rješenja
          </SectionLabel>

          <h1
            className="t-display hero-cue mt-7 max-w-[19ch] text-white"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            Jedan partner za sve što vaš ured drži u pogonu.
          </h1>

          <p
            className="t-lead hero-cue mt-7 max-w-[52ch] text-white/70"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Telekomunikacijske usluge kao ugovorni partner A1-a i uredska
            tehnologija kao partner Canona. Iz Osijeka, za tvrtke koje žele
            manje dobavljača i brže odgovore.
          </p>

          <div
            className="hero-cue mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <ButtonLink href="#kontakt" variant="solid" tone="paper">
              Kontaktirajte nas
            </ButtonLink>
            <ButtonLink href="#usluge" variant="outline" tone="paper">
              Istražite usluge
            </ButtonLink>
          </div>
        </div>

        {/* Service index — answers "what is this company" above the fold,
            which is the whole job when someone arrives here from a QR code. */}
        <div
          className="hero-cue mt-10 grid gap-px border-t border-white/15 pt-px sm:mt-16 sm:grid-cols-2 lg:mt-20"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          {[a1, canon].map((service) => (
            <a
              key={service.index}
              href="#usluge"
              className="group flex items-baseline gap-4 py-5 sm:py-6"
            >
              <span className="t-label text-[var(--red-on-dark)]">{service.index}</span>
              <span className="min-w-0">
                <span className="block text-[0.9375rem] font-medium text-white transition-colors duration-300 group-hover:text-[var(--red-on-dark)]">
                  {service.brand}
                </span>
                <span className="mt-1 block text-sm text-white/50">
                  {service.brand === "A1"
                    ? "Telekomunikacije za poslovne korisnike"
                    : "Najam i prodaja uredskih uređaja"}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Marks the point where the navbar turns light */}
      <div id="hero-end" aria-hidden="true" className="h-px w-full" />
    </section>
  );
}
