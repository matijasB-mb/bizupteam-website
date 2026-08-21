"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Brings its children into place once, when they first enter view.
 *
 * `variant="media"` swaps the text lift for a clip-path wipe — see the two
 * blocks in globals.css. An IntersectionObserver and a data attribute instead
 * of an animation library: a few hundred bytes, and because the CSS handles
 * `prefers-reduced-motion` the static layout is already correct before any JS
 * runs.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "text",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: "text" | "media";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const attribute = variant === "media" ? "data-reveal-media" : "data-reveal";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.setAttribute(attribute, "in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute(attribute, "in");
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [attribute]);

  const props = {
    ref,
    [attribute]: "",
    style: delay
      ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
      : undefined,
    className,
  };

  return <Tag {...props}>{children}</Tag>;
}
