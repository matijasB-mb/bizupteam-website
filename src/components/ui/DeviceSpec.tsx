import type { Uredaj } from "@/lib/usluge";

/**
 * The four figures that decide a purchase, then the full table on demand.
 *
 * Two levels on purpose. A buyer weighing devices needs speed, format and
 * capacity at a glance; nobody standing in front of a landing page reads
 * warm-up time in seconds. So the highlights stay open and the rest sits
 * behind a native <details>, which costs no JavaScript and works before
 * hydration.
 *
 * Every row is transcribed from canon.hr, and the link at the foot goes to
 * that page — Canon stays the authority on their own product, and the table
 * here cannot silently go stale against it.
 */
export default function DeviceSpec({ device }: { device: Uredaj }) {
  return (
    <div>
      <ul className="border-t border-[var(--line-strong)]">
        {device.istaknuto.map((line) => (
          <li
            key={line}
            className="flex items-baseline gap-3.5 border-b border-[var(--line)] py-3.5"
          >
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--red)]" />
            <span className="text-[0.9375rem] leading-snug text-[var(--text)]">{line}</span>
          </li>
        ))}
      </ul>

      <details className="group/spec mt-7 border-b border-[var(--line)]">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
          <span className="t-label text-[var(--ink)]">Sve specifikacije</span>
          <span
            aria-hidden="true"
            className="grid h-7 w-7 shrink-0 place-items-center border border-[var(--line-strong)] transition-colors duration-300 group-open/spec:border-[var(--red)] group-open/spec:bg-[var(--red)] group-open/spec:text-white"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 0v10M0 5h10"
                stroke="currentColor"
                strokeWidth="1.3"
                className="origin-center transition-transform duration-300 group-open/spec:rotate-45"
              />
            </svg>
          </span>
        </summary>

        <dl className="border-t border-[var(--line)] pb-6">
          {device.spec.map((row) => (
            <div
              key={row.k}
              className="grid gap-x-6 gap-y-1 border-b border-[var(--line)] py-3.5 last:border-b-0 sm:grid-cols-5"
            >
              <dt className="text-[0.8125rem] text-[var(--muted)] sm:col-span-2">{row.k}</dt>
              <dd className="text-[0.875rem] leading-snug text-[var(--text)] sm:col-span-3">
                {row.v}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={device.canonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mb-5 inline-flex items-center gap-2 text-[0.8125rem] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--red-on-light)]"
        >
          Potpuni tehnički podaci na canon.hr
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M3 9 9 3M9 3H4.5M9 3v4.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
          <span className="sr-only">(otvara se u novoj kartici)</span>
        </a>
      </details>
    </div>
  );
}
