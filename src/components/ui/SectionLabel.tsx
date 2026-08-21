import type { CSSProperties, ReactNode } from "react";

/** Small uppercase eyebrow with a short red rule — the site's section marker. */
export default function SectionLabel({
  children,
  tone = "ink",
  className = "",
  style,
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      style={style}
      className={`t-label inline-flex items-center gap-3 ${
        tone === "paper" ? "text-white/60" : "text-[var(--muted)]"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-px w-7 bg-[var(--red)]" />
      {children}
    </span>
  );
}
