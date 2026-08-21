import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Tone = "ink" | "paper";

const shared =
  "group relative inline-flex items-center justify-center gap-2.5 " +
  "px-6 py-3.5 text-[0.9375rem] font-medium leading-none " +
  "transition-[background-color,border-color,color] duration-300 ease-out " +
  "disabled:cursor-not-allowed disabled:opacity-55";

function styles(variant: Variant, tone: Tone) {
  if (variant === "solid") {
    return tone === "paper"
      ? "bg-white text-[var(--ink)] hover:bg-[var(--red)] hover:text-white"
      : "bg-[var(--ink)] text-white hover:bg-[var(--red)]";
  }
  if (variant === "outline") {
    return tone === "paper"
      ? "border border-white/30 text-white hover:border-white hover:bg-white/5"
      : "border border-[var(--line-strong)] text-[var(--ink)] hover:border-[var(--ink)]";
  }
  return tone === "paper"
    ? "px-0 py-1 text-white/75 hover:text-white"
    : "px-0 py-1 text-[var(--muted)] hover:text-[var(--ink)]";
}

/** Arrow slides on hover — the one animated detail every CTA shares. */
function Arrow() {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      aria-hidden="true"
      className="translate-x-0 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
    >
      <path
        d="M0 5h13M9 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

type Props = {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  arrow?: boolean;
  className?: string;
};

export function ButtonLink({
  children,
  href,
  variant = "solid",
  tone = "ink",
  arrow = true,
  className = "",
  ...rest
}: Props & ComponentPropsWithoutRef<"a">) {
  const external = href?.startsWith("http");

  return (
    <a
      href={href}
      className={`${shared} ${styles(variant, tone)} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}

export function Button({
  children,
  variant = "solid",
  tone = "ink",
  arrow = true,
  className = "",
  ...rest
}: Props & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${shared} ${styles(variant, tone)} ${className}`}
      {...rest}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
