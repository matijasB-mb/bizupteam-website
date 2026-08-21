import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * An editorial image: fixed ratio, clip-path reveal, a slow zoom on hover, and
 * an optional caption set in the same uppercase micro-label as the rest of the
 * site. The zoom lives on the inner wrapper so the frame itself never moves.
 */
export default function Figure({
  src,
  alt,
  caption,
  ratio = "4 / 3",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  delay = 0,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Reveal variant="media" delay={delay}>
        <div
          className="group relative overflow-hidden bg-[var(--paper-mute)]"
          style={{ aspectRatio: ratio }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* Sits the image into the page instead of letting it float free */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,12,0.28)] via-transparent to-transparent"
          />
        </div>
      </Reveal>

      {caption && (
        <figcaption className="t-label mt-4 flex items-center gap-3 text-[var(--muted)]">
          <span aria-hidden="true" className="h-px w-5 bg-[var(--red)]" />
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
