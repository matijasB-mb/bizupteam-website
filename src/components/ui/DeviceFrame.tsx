import Image from "next/image";
import { hasPublicFile } from "@/lib/assets";

/**
 * A Canon device in its frame.
 *
 * With the photograph in place it renders the photograph. Without it, a
 * hairline technical drawing of a multifunction device stands in — the same
 * architectural language the rest of the site uses, so a page with no product
 * photography yet still reads as designed rather than unfinished.
 *
 * Drop the file at the path named in lib/usluge.ts and it appears; nothing
 * else changes.
 */
export default function DeviceFrame({
  src,
  alt,
  label,
  tone = "light",
  ratio = "4 / 3",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  label?: string;
  tone?: "light" | "dark";
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  const present = hasPublicFile(src);

  const stroke = dark ? "rgba(255,255,255,0.30)" : "rgba(11,11,12,0.26)";
  const strokeFaint = dark ? "rgba(255,255,255,0.14)" : "rgba(11,11,12,0.12)";

  return (
    <div
      className={`group relative overflow-hidden ${
        dark ? "bg-[var(--ink-soft)]" : "bg-[var(--paper-warm)]"
      } ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {present ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-contain p-[8%] transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-[12%]" role="img" aria-label={alt}>
          <svg viewBox="0 0 240 200" fill="none" className="h-full w-full" aria-hidden="true">
            {/* output tray */}
            <path d="M74 66h92" stroke={stroke} strokeWidth="1.2" />
            {/* scanner lid */}
            <rect x="52" y="34" width="136" height="30" rx="2" stroke={stroke} strokeWidth="1.2" />
            <rect x="150" y="42" width="28" height="14" rx="1" stroke={strokeFaint} strokeWidth="1.2" />
            {/* body */}
            <rect x="52" y="64" width="136" height="62" rx="2" stroke={stroke} strokeWidth="1.2" />
            <path d="M74 92h56" stroke={strokeFaint} strokeWidth="1.2" />
            {/* paper drawers */}
            <rect x="58" y="126" width="124" height="20" rx="1.5" stroke={stroke} strokeWidth="1.2" />
            <rect x="58" y="146" width="124" height="20" rx="1.5" stroke={strokeFaint} strokeWidth="1.2" />
            <path d="M112 136h16M112 156h16" stroke={strokeFaint} strokeWidth="1.2" />
            {/* sheet emerging */}
            <path d="M88 66V44h44v22" stroke="var(--red)" strokeWidth="1.2" strokeLinejoin="round" opacity="0.75" />
            <path d="M96 52h28M96 58h20" stroke="var(--red)" strokeWidth="1.2" opacity="0.4" />
            {/* floor line */}
            <path d="M28 166h184" stroke={strokeFaint} strokeWidth="1.2" />
          </svg>
        </div>
      )}

      {label && (
        <span
          className={`t-label absolute left-5 top-5 ${
            dark ? "text-white/55" : "text-[var(--muted)]"
          }`}
        >
          {label}
        </span>
      )}

      {!present && (
        <span
          className={`t-label absolute bottom-5 left-5 ${
            dark ? "text-white/55" : "text-[var(--muted)]"
          }`}
        >
          Fotografija u pripremi
        </span>
      )}
    </div>
  );
}
