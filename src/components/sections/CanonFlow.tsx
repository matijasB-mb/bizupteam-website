"use client";

import { useEffect, useRef } from "react";
import { canon } from "@/lib/site";

/**
 * The path one document takes through the Canon service, drawn as a red line
 * that fills while the section crosses the viewport.
 *
 * This is the page's signature detail, so it is built to survive: the line is
 * a scaled 1px element rather than an SVG path, which means it reflows with the
 * layout and needs no viewBox maths; horizontal on desktop, vertical on mobile,
 * from the same markup. Progress is written to a CSS custom property once per
 * frame and CSS does the rest, so scrolling costs one style write, not five.
 *
 * Without JS, or with reduced motion, the line renders complete and every
 * station reads as reached — the content never depends on the animation.
 */
export default function CanonFlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--flow", "1");
      root.querySelectorAll("[data-station]").forEach((n) =>
        n.setAttribute("data-station", "on"),
      );
      return;
    }

    const stations = Array.from(root.querySelectorAll("[data-station]"));
    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;

      /* Start once the block is a third of the way up the viewport and finish
         as its foot clears the same point — the fill tracks reading position,
         not raw page offset. */
      const start = vh * 0.85;
      const end = vh * 0.3;
      const span = Math.max(1, rect.height + (start - end));
      const progress = Math.min(1, Math.max(0, (start - rect.top) / span));

      if (Math.abs(progress - last) < 0.004) return;
      last = progress;

      root.style.setProperty("--flow", progress.toFixed(3));

      stations.forEach((node, i) => {
        // A station lights just before the line physically reaches it.
        const threshold = i / Math.max(1, stations.length - 1);
        const on = progress >= threshold * 0.92;
        const next = on ? "on" : "off";
        if (node.getAttribute("data-station") !== next) {
          node.setAttribute("data-station", next);
        }
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      // Complete by default: if the script never runs, the diagram is still true.
      style={{ ["--flow" as string]: 1 }}
      className="relative"
    >
      {/* Two tracks rather than one that changes axis: each keeps a single
          transform declaration, so nothing fights over the style attribute. */}
      <div
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--line-strong)] md:hidden"
      >
        <div
          className="h-full w-px origin-top bg-[var(--red)]"
          style={{ transform: "scaleY(var(--flow))" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[7px] hidden h-px bg-[var(--line-strong)] md:block"
      >
        <div
          className="h-px w-full origin-left bg-[var(--red)]"
          style={{ transform: "scaleX(var(--flow))" }}
        />
      </div>

      <ol className="relative grid gap-y-9 md:grid-cols-5 md:gap-x-6">
        {canon.flow.map((station) => (
          <li key={station.step} data-station="off" className="group/st relative pl-9 md:pl-0">
            {/* Node on the track */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 block h-[15px] w-[15px] rounded-full border border-[var(--line-strong)] bg-[var(--paper-warm)] transition-colors duration-500 group-data-[station=on]/st:border-[var(--red)] group-data-[station=on]/st:bg-[var(--red)] md:relative md:top-0 md:mb-7"
            />
            <span className="t-label block text-[var(--muted)] transition-colors duration-500 group-data-[station=on]/st:text-[var(--red-on-light)]">
              {station.step}
            </span>
            <h4
              className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              {station.label}
            </h4>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-[var(--muted)]">
              {station.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
