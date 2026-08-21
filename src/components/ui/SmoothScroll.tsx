"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis, scrollToTarget } from "@/lib/smoothScroll";

/**
 * Page-wide smooth scrolling.
 *
 * Tuned for control rather than float: a short duration and an easing curve
 * that lands hard means the page tracks the wheel closely and stops when the
 * input stops. Trackpads and touch run on the browser's own scrolling —
 * Lenis only smooths discrete wheel steps, which is where native scrolling
 * actually looks stepped. That keeps momentum feeling native on a Mac and on
 * a phone instead of adding a second layer of inertia on top of the OS.
 *
 * Renders nothing. With `prefers-reduced-motion` it never starts at all, and
 * every consumer falls back to native scrolling.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      // Steep at the start, flat at the end: responds immediately, settles fast.
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false, // let the phone do what phones do
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    setLenis(lenis);

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    /* One delegated listener covers every in-page anchor on the site —
       navbar, hero CTAs, package links, footer — with no per-link wiring. */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      const hash = anchor?.getAttribute("href");
      if (!hash || !hash.startsWith("#") || hash.length < 2) return;
      if (!document.querySelector(hash)) return;

      event.preventDefault();
      scrollToTarget(hash);
      // Keep the URL and the back button honest.
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
