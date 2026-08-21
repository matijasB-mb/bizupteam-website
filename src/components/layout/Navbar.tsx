"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Wordmark from "@/components/ui/Wordmark";
import { contact, nav } from "@/lib/site";

/**
 * Transparent while it sits on the dark hero, solid light once past it.
 *
 * That switch is driven straight onto the DOM through `data-over` rather than
 * through React state: it is a synchronisation with an external system (the
 * scroll position), it changes on every scroll near the fold, and keeping it
 * out of the render loop means no cascading renders and no first-paint flash.
 * Menu open/closed stays in state, because that one is genuinely user intent.
 */
const BAR_HEIGHT = 72;

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);

  // Two inputs decide the bar's treatment; neither belongs in render.
  const overHero = useRef(true);
  const menuOpen = useRef(false);

  // `open` stays in state because the menu's markup and aria depend on it.
  const [open, setOpen] = useState(false);

  const paint = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    // Dark over the hero, and dark again over the fullscreen menu — a light
    // bar floating on the ink overlay would read as a rendering mistake.
    header.dataset.theme =
      overHero.current || menuOpen.current ? "dark" : "light";
  }, []);

  useEffect(() => {
    const hero = document.getElementById("top");
    let frame = 0;

    const measure = () => {
      frame = 0;
      // The hero still covers the bar for as long as its foot sits below it.
      overHero.current = hero
        ? hero.getBoundingClientRect().bottom > BAR_HEIGHT
        : false;
      paint();
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
  }, [paint]);

  useEffect(() => {
    menuOpen.current = open;
    paint();
  }, [open, paint]);

  /* Hold the page still behind the fullscreen menu; Escape closes it. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  /* One attribute drives both treatments. Every class below is written out in
     full: Tailwind scans source text, so a name assembled from variables at
     runtime never gets generated. The header styles itself with `data-*` and
     its children with `group-data-*` — a `group-data-*` on the element that
     carries the group compiles to a descendant selector and matches nothing. */

  return (
    <>
      <header
        ref={headerRef}
        data-theme="dark"
        className="group/nav fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/92 text-[var(--ink)] backdrop-blur-md transition-[background-color,border-color,color] duration-500 ease-out supports-[backdrop-filter]:bg-[var(--paper)]/78 data-[theme=dark]:border-white/10 data-[theme=dark]:bg-transparent data-[theme=dark]:text-white data-[theme=dark]:backdrop-blur-none data-[theme=dark]:supports-[backdrop-filter]:bg-transparent"
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <a
            href="#top"
            aria-label="Biz Up Team — početak stranice"
            className="-my-3 shrink-0 py-3"
          >
            <Wordmark />
          </a>

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group/link relative py-1 text-[0.9375rem] font-medium text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--ink)] group-data-[theme=dark]/nav:text-white/70 group-data-[theme=dark]/nav:hover:text-white"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--red)] transition-transform duration-300 ease-out group-hover/link:scale-x-100 motion-reduce:transition-none"
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={contact.phoneHref}
              className="text-[0.9375rem] font-medium tabular-nums text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--ink)] group-data-[theme=dark]/nav:text-white/70 group-data-[theme=dark]/nav:hover:text-white"
            >
              {contact.phone}
            </a>
            <a
              href="#kontakt"
              className="bg-[var(--ink)] px-5 py-2.5 text-[0.9375rem] font-medium leading-none text-white transition-colors duration-300 hover:bg-[var(--red)] group-data-[theme=dark]/nav:bg-white group-data-[theme=dark]/nav:text-[var(--ink)] group-data-[theme=dark]/nav:hover:bg-[var(--red)] group-data-[theme=dark]/nav:hover:text-white"
            >
              Kontaktirajte nas
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zatvori izbornik" : "Otvori izbornik"}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                aria-hidden="true"
                className={[
                  "absolute left-0 block h-px w-6 bg-current transition-all duration-300 ease-out",
                  open ? "top-1.5 rotate-45" : "top-0",
                ].join(" ")}
              />
              <span
                aria-hidden="true"
                className={[
                  "absolute left-0 block h-px bg-current transition-all duration-300 ease-out",
                  open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen mobile menu */}
      <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-40 bg-[var(--ink)] lg:hidden">
        <div className="shell flex h-full flex-col justify-between overflow-y-auto pt-[72px] pb-10">
          <nav aria-label="Mobilna navigacija" className="flex flex-col pt-10">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="group flex items-baseline gap-4 border-b border-white/10 py-5 text-white"
              >
                <span className="t-label w-6 text-white/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-h3 transition-colors duration-300 group-hover:text-[var(--red-on-dark)]">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pt-10">
            <a
              href={contact.phoneHref}
              onClick={close}
              className="text-lg font-medium tabular-nums text-white"
            >
              {contact.phone}
            </a>
            <a href={contact.emailHref} onClick={close} className="text-white/60">
              {contact.email}
            </a>
            <a
              href="#kontakt"
              onClick={close}
              className="mt-3 inline-flex items-center justify-center bg-white px-6 py-4 font-medium text-[var(--ink)]"
            >
              Kontaktirajte nas
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
