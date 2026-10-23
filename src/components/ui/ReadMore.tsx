"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Collapses long copy on a phone behind a "Pročitaj više" control.
 *
 * Below `md` the children are clipped to a few lines with a fade into the page
 * colour; from `md` up nothing is clipped and the button is not rendered, so
 * the desktop page reads exactly as before. The text stays in the DOM either
 * way — it is hidden by clipping, not removed, so it is still indexed and
 * still there for screen readers (the button reports aria-expanded).
 */
export default function ReadMore({
  children,
  fade = "var(--paper)",
  collapsed = "7.5rem",
}: {
  children: ReactNode;
  /** Page colour behind the text, so the fade melts into it. */
  fade?: string;
  /** Height shown while collapsed. */
  collapsed?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        <div
          id={id}
          className="overflow-hidden md:max-h-none!"
          style={{ maxHeight: open ? "none" : collapsed }}
        >
          {children}
        </div>

        {!open && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:hidden"
            style={{ background: `linear-gradient(to top, ${fade}, transparent)` }}
          />
        )}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group mt-5 inline-flex items-center gap-2.5 border-b border-[var(--line-strong)] pb-1.5 text-[0.9375rem] font-medium transition-colors duration-300 hover:border-[var(--red)] hover:text-[var(--red-on-light)] md:hidden"
      >
        {open ? "Prikaži manje" : "Pročitaj više"}
        <span
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>
    </div>
  );
}
