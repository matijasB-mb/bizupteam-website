import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import AmbientFlow from "@/components/ui/AmbientFlow";
import { contact } from "@/lib/site";

/**
 * The closing statement every internal page ends on. One shared component so
 * the whole site finishes in the same voice, with the page supplying its own
 * line rather than repeating a generic call to action.
 */
export default function CTABand({
  title,
  lead,
  primary = { label: "Kontaktirajte nas", href: "/kontakt" },
  secondaryPhone = true,
}: {
  title: string;
  lead?: string;
  primary?: { label: string; href: string };
  secondaryPhone?: boolean;
}) {
  return (
    <section className="section relative overflow-hidden bg-[var(--ink)] text-white">
      <AmbientFlow tone="dark" variant="quiet" />

      <div className="shell relative">
        <Reveal>
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-7">
              <h2 className="t-h2 max-w-[18ch] text-white">{title}</h2>
              {lead && <p className="t-lead mt-6 max-w-[46ch] text-white/60">{lead}</p>}
            </div>

            <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:col-start-9 lg:items-end lg:justify-end">
              <Link
                href={primary.href}
                className="group inline-flex items-center gap-2.5 bg-white px-6 py-3.5 text-[0.9375rem] font-medium leading-none text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--red)] hover:text-white"
              >
                {primary.label}
                <svg
                  width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  <path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </Link>

              {secondaryPhone && (
                <a
                  href={contact.phoneHref}
                  className="text-[0.9375rem] tabular-nums text-white/55 transition-colors duration-300 hover:text-white"
                >
                  ili nazovite {contact.phone}
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
