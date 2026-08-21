/**
 * The Biz Up wordmark, set in type rather than shipped as an image so it stays
 * crisp at any size and inverts cleanly over the dark hero.
 *
 * The base text follows `currentColor`, so a parent decides ink or paper.
 * "up" always keeps the brand red; "team" sits small and wide underneath.
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-end leading-none select-none ${className}`}
      style={{ fontFamily: "var(--font-archivo), sans-serif" }}
    >
      <span className="text-[1.375rem] font-bold tracking-[-0.055em]" aria-hidden="true">
        biz
      </span>
      <span
        className="ml-[0.11em] text-[1.375rem] font-bold tracking-[-0.055em] text-[var(--red)]"
        aria-hidden="true"
      >
        up
      </span>
      <span
        className="mb-[0.18em] ml-[0.3em] text-[0.5rem] font-medium uppercase tracking-[0.34em] opacity-70"
        aria-hidden="true"
      >
        team
      </span>
      <span className="sr-only">Biz Up Team</span>
    </span>
  );
}
