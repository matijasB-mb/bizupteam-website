"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Canon product gallery: one large frame plus thumbnails beneath it.
 *
 * The shots are transparent PNGs on no background, so the frame supplies the
 * ground and `object-contain` with padding keeps the device from touching the
 * edges — the same treatment DeviceFrame used, so a page mixing the two still
 * reads as one system.
 *
 * Thumbnails are real buttons: arrow keys and tab reach them, and the active
 * one is marked with `aria-current` as well as the red rule, so the state is
 * not carried by colour alone.
 */
export default function DeviceGallery({
  images,
  alt,
  label,
  tone = "light",
  priority = false,
  sizes = "(min-width: 1024px) 46vw, 100vw",
  className = "",
}: {
  images: readonly string[];
  alt: string;
  label?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const dark = tone === "dark";
  const ground = dark ? "bg-[var(--ink-soft)]" : "bg-[var(--paper-warm)]";

  return (
    <div className={className}>
      <div className={`group relative overflow-hidden ${ground}`} style={{ aspectRatio: "4 / 3" }}>
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? alt : ""}
            aria-hidden={i !== active}
            fill
            sizes={sizes}
            priority={priority && i === 0}
            loading={priority && i === 0 ? undefined : "lazy"}
            className={`object-contain p-[7%] transition-opacity duration-500 ease-out motion-reduce:transition-none ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {label && (
          <span
            className={`t-label pointer-events-none absolute left-5 top-5 ${
              dark ? "text-white/55" : "text-[var(--muted)]"
            }`}
          >
            {label}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {images.map((src, i) => {
            const on = i === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "true" : undefined}
                aria-label={`Prikaži fotografiju ${i + 1} od ${images.length}`}
                className={`relative overflow-hidden border-t-2 pt-2 transition-colors duration-300 ${
                  on
                    ? "border-[var(--red)]"
                    : dark
                      ? "border-white/15 hover:border-white/40"
                      : "border-[var(--line-strong)] hover:border-[var(--muted)]"
                }`}
              >
                <span className={`relative block ${ground}`} style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15vw, 30vw"
                    loading="lazy"
                    className={`object-contain p-[8%] transition-opacity duration-300 ${
                      on ? "opacity-100" : "opacity-65 hover:opacity-100"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
