"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Wordmark from "@/components/ui/Wordmark";
import { pauseScroll, resumeScroll } from "@/lib/smoothScroll";
import { contact, nav } from "@/lib/site";
import { grupe, uslugeUGrupi } from "@/lib/usluge";

const BAR_HEIGHT = 72;

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true" className={className}>
      <path d="M1 1.25 4.5 4.75 8 1.25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

function ItemArrow() {
  return (
    <svg
      width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"
      className="mt-[7px] shrink-0 -translate-x-1 opacity-0 transition-all duration-300 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100 motion-reduce:transition-none"
    >
      <path d="M0 4.5h12M8 1l3.5 3.5L8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const overHero = useRef(true);
  const menuOpen = useRef(false);

  const [open, setOpen] = useState(false);          // mobile sheet
  const [servicesOpen, setServicesOpen] = useState(false);   // desktop dropdown
  const [mobileServices, setMobileServices] = useState(false); // mobile accordion
  const closeTimer = useRef<number | null>(null);

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"),
    [pathname],
  );

  /* Bar treatment is written straight onto the DOM: it changes on every scroll
     near the fold and has no business triggering React renders. */
  const paint = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;
    header.dataset.theme = overHero.current || menuOpen.current ? "dark" : "light";
  }, []);

  useEffect(() => {
    // Every page opens on a dark hero carrying id="top"; without one the bar
    // simply stays light.
    const hero = document.getElementById("top");
    let frame = 0;

    const measure = () => {
      frame = 0;
      overHero.current = hero ? hero.getBoundingClientRect().bottom > BAR_HEIGHT : false;
      paint();
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [paint, pathname]);

  useEffect(() => { menuOpen.current = open; paint(); }, [open, paint]);

  /* Hold the page still behind the mobile sheet; Escape closes it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      resumeScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setServicesOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  /* A short grace period stops the panel flickering shut as the pointer
     crosses the gap between the trigger and the panel. */
  const closeAll = useCallback(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServices(false);
  }, []);

  const openServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
  };
  useEffect(() => () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); }, []);

  const linkBase =
    "group/link relative py-1 text-[0.9375rem] font-medium transition-colors duration-300 " +
    "text-[var(--text-2)] hover:text-[var(--ink)] " +
    "group-data-[theme=dark]/nav:text-white/70 group-data-[theme=dark]/nav:hover:text-white";
  const linkActive =
    "text-[var(--ink)] group-data-[theme=dark]/nav:text-white";

  return (
    <>
      <header
        ref={headerRef}
        data-theme="dark"
        className="group/nav fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]/92 text-[var(--ink)] backdrop-blur-md transition-[background-color,border-color,color] duration-500 ease-out supports-[backdrop-filter]:bg-[var(--paper)]/78 data-[theme=dark]:border-white/10 data-[theme=dark]:bg-transparent data-[theme=dark]:text-white data-[theme=dark]:backdrop-blur-none data-[theme=dark]:supports-[backdrop-filter]:bg-transparent"
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Biz Up Team — početna" className="-my-3 shrink-0 py-3">
            <Wordmark />
          </Link>

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              if (item.href !== "/usluge") {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${linkBase} ${active ? linkActive : ""}`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--red)] transition-transform duration-300 ease-out group-hover/link:scale-x-100 motion-reduce:transition-none ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                );
              }

              /* ── Usluge: trigger + panel ── */
              const active = isActive("/usluge");
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleClose}
                  onFocus={openServices}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                  }}
                >
                  <Link
                    href="/usluge"
                    aria-expanded={servicesOpen}
                    aria-current={active ? "page" : undefined}
                    className={`${linkBase} ${active ? linkActive : ""} inline-flex items-center gap-2`}
                  >
                    {item.label}
                    <Chevron
                      className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--red)] transition-transform duration-300 ease-out group-hover/link:scale-x-100 motion-reduce:transition-none ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>

                  <div
                    aria-hidden={!servicesOpen}
                    /* visibility must not be part of the eased transition:
                       as a discrete property it would flip halfway through,
                       so the panel would fade in while still invisible. It
                       switches instantly on open and waits out the fade on
                       close, which keeps the panel off the tab order whenever
                       it is not actually on screen. */
                    style={{
                      visibility: servicesOpen ? "visible" : "hidden",
                      transition:
                        "opacity 300ms var(--ease), transform 300ms var(--ease), visibility 0s" +
                        (servicesOpen ? "" : " 300ms"),
                    }}
                    className={`absolute left-1/2 top-full z-10 translate-x-[-50%] pt-4 ${
                      servicesOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="w-[min(46rem,calc(100vw-4rem))] border border-[var(--line)] bg-[var(--paper)] shadow-[0_24px_60px_-24px_rgba(11,11,12,0.28)]">
                      <div className="grid grid-cols-12">
                        <div className="col-span-4 border-r border-[var(--line)] bg-[var(--paper-warm)] p-7">
                          <span className="t-label inline-flex items-center gap-3 text-[var(--muted)]">
                            <span aria-hidden="true" className="h-px w-6 bg-[var(--red)]" />
                            Naša rješenja
                          </span>
                          <p className="mt-5 text-[0.9375rem] leading-relaxed text-[var(--text-2)]">
                            Odaberite rješenje koje odgovara potrebama vašeg poslovanja.
                          </p>
                          <Link
                            href="/usluge"
                            onClick={closeAll}
                            className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[var(--ink)] transition-colors duration-300 hover:text-[var(--red-on-light)]"
                          >
                            Sve usluge
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>

                        <div className="col-span-8 p-2">
                          {grupe.map((g, gi) => (
                            <div key={g.id} className={gi > 0 ? "mt-1 border-t border-[var(--line)] pt-3" : ""}>
                              <p className="t-label px-5 pb-1 pt-2 text-[var(--muted)]">{g.label}</p>
                              <ul>
                                {uslugeUGrupi(g.id).map((u) => {
                                  const href = `/usluge/${u.slug}`;
                                  const on = pathname === href;
                                  return (
                                    <li key={u.slug}>
                                      <Link
                                        href={href}
                                        onClick={closeAll}
                                        aria-current={on ? "page" : undefined}
                                        className={`group/item flex items-start justify-between gap-4 px-5 py-2.5 transition-colors duration-300 hover:bg-[var(--paper-warm)] ${
                                          on ? "bg-[var(--paper-warm)]" : ""
                                        }`}
                                      >
                                        <span className="min-w-0">
                                          <span
                                            className={`block text-[0.9375rem] font-semibold tracking-[-0.015em] transition-colors duration-300 group-hover/item:text-[var(--red-on-light)] ${
                                              on ? "text-[var(--red-on-light)]" : "text-[var(--ink)]"
                                            }`}
                                            style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                                          >
                                            {u.nav}
                                          </span>
                                          <span className="mt-0.5 block text-[0.8125rem] text-[var(--muted)]">
                                            {u.navOpis}
                                          </span>
                                        </span>
                                        <span className="text-[var(--red)]"><ItemArrow /></span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={contact.phoneHref}
              className="text-[0.9375rem] font-medium tabular-nums text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--ink)] group-data-[theme=dark]/nav:text-white/70 group-data-[theme=dark]/nav:hover:text-white"
            >
              {contact.phone}
            </a>
            <Link
              href="/kontakt"
              className="bg-[var(--ink)] px-5 py-2.5 text-[0.9375rem] font-medium leading-none text-white transition-colors duration-300 hover:bg-[var(--red)] group-data-[theme=dark]/nav:bg-white group-data-[theme=dark]/nav:text-[var(--ink)] group-data-[theme=dark]/nav:hover:bg-[var(--red)] group-data-[theme=dark]/nav:hover:text-white"
            >
              Kontaktirajte nas
            </Link>
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
              <span aria-hidden="true" className={`absolute left-0 block h-px w-6 bg-current transition-all duration-300 ease-out ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span aria-hidden="true" className={`absolute left-0 block h-px bg-current transition-all duration-300 ease-out ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`} />
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile sheet ─────────────────────────────────────────────── */}
      <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-40 bg-[var(--ink)] lg:hidden">
        <div className="shell flex h-full flex-col justify-between overflow-y-auto pt-[72px] pb-10">
          <nav aria-label="Mobilna navigacija" className="flex flex-col pt-8">
            {nav.map((item, i) => {
              const idx = String(i + 1).padStart(2, "0");

              if (item.href !== "/usluge") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-5 text-white"
                  >
                    <span className="t-label w-6 text-white/55">{idx}</span>
                    <span className={`t-h3 transition-colors duration-300 group-hover:text-[var(--red-on-dark)] ${isActive(item.href) ? "text-[var(--red-on-dark)]" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              }

              return (
                <div key={item.href} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setMobileServices((v) => !v)}
                    aria-expanded={mobileServices}
                    aria-controls="mobile-usluge"
                    className="flex w-full items-baseline gap-4 py-5 text-left text-white"
                  >
                    <span className="t-label w-6 text-white/55">{idx}</span>
                    <span className={`t-h3 flex-1 ${isActive("/usluge") ? "text-[var(--red-on-dark)]" : ""}`}>
                      {item.label}
                    </span>
                    <Chevron className={`mb-1 transition-transform duration-300 ${mobileServices ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    id="mobile-usluge"
                    hidden={!mobileServices}
                    className="pb-3 pl-10"
                  >
                    <Link
                      href="/usluge"
                      onClick={closeAll}
                      className="block border-t border-white/10 py-3.5 text-[0.9375rem] text-white/80 transition-colors duration-300 hover:text-white"
                    >
                      Sve usluge
                    </Link>
                    {grupe.map((g) => (
                      <div key={g.id}>
                        <p className="t-label border-t border-white/10 pb-1 pt-4 text-white/45">
                          {g.label}
                        </p>
                        {uslugeUGrupi(g.id).map((u) => (
                          <Link
                            key={u.slug}
                            href={`/usluge/${u.slug}`}
                            onClick={closeAll}
                            className={`block py-3 text-[0.9375rem] transition-colors duration-300 hover:text-white ${
                              pathname === `/usluge/${u.slug}` ? "text-[var(--red-on-dark)]" : "text-white/80"
                            }`}
                          >
                            {u.nav}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex flex-col gap-4 pt-10">
            <a href={contact.phoneHref} onClick={closeAll} className="text-lg font-medium tabular-nums text-white">
              {contact.phone}
            </a>
            <a href={contact.emailHref} onClick={closeAll} className="text-white/60">{contact.email}</a>
            <Link
              href="/kontakt"
              onClick={closeAll}
              className="mt-3 inline-flex items-center justify-center bg-white px-6 py-4 font-medium text-[var(--ink)]"
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
