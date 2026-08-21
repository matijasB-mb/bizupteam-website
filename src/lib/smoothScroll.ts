import type Lenis from "lenis";

/**
 * Module-level handle on the running Lenis instance.
 *
 * The scroller is a single page-wide resource, so anything that needs to pause
 * it (the fullscreen menu) or drive it (anchor links) reaches for it here
 * rather than through context — no provider, no re-renders, no prop drilling.
 * Every getter is null-safe, so reduced-motion visitors, who never get an
 * instance, fall through to native browser behaviour.
 */

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

/** Freeze the page behind an overlay. No-op when Lenis is not running. */
export function pauseScroll() {
  instance?.stop();
}

export function resumeScroll() {
  instance?.start();
}

/**
 * Scroll to an in-page target, clearing the fixed header.
 * Falls back to the platform's own anchor jump when Lenis is absent.
 */
export function scrollToTarget(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  const offset = hash === "#top" ? 0 : -72;

  if (instance) {
    instance.scrollTo(target as HTMLElement, { offset, duration: 1.1 });
    return;
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "auto" });
}
