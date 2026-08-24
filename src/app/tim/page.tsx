import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CTABand from "@/components/ui/CTABand";
import Team from "@/components/sections/Team";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tim",
  description:
    "Ljudi iza Biz Up Teama u Osijeku — kontakti za telekomunikacijske usluge, Canon opremu i tehničku podršku.",
  alternates: { canonical: "/tim" },
  openGraph: {
    title: "Tim",
    description: "Tehnologija je važna. Ljudi koji stoje iza nje još su važniji.",
    url: "/tim",
  },
};

export default function TimPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Tim" }]}
        eyebrow="Naš tim"
        title="Ljudi iza rješenja."
        lead="Tehnologija je važna. Ljudi koji stoje iza nje još su važniji — kod nas znate koga zovete i tko vam odgovara."
      />

      {/* Reuses the homepage section without its own intro, so the two pages
          stay in sync and the heading is not said twice. */}
      <Team showIntro={false} />

      <section className="section bg-[var(--paper)]">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel>Kome se javiti</SectionLabel>
                <h2 className="t-h2 mt-7 max-w-[14ch]">
                  Ako niste sigurni — nazovite centralu
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={90}>
                <p className="t-lead text-[var(--text)]">
                  Ne morate pogoditi pravu osobu iz prve. Jedan poziv na centralu
                  i preusmjerimo vas onome tko vam može odgovoriti.
                </p>
                <dl className="mt-10 border-t border-[var(--line-strong)]">
                  <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-5">
                    <dt className="t-label text-[var(--muted)]">Telefon</dt>
                    <dd>
                      <a
                        href={contact.phoneHref}
                        className="text-[1.0625rem] tabular-nums transition-colors duration-300 hover:text-[var(--red-on-light)]"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 border-b border-[var(--line)] py-5">
                    <dt className="t-label text-[var(--muted)]">E-mail</dt>
                    <dd>
                      <a
                        href={contact.emailHref}
                        className="break-all text-[1.0625rem] transition-colors duration-300 hover:text-[var(--red-on-light)]"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 py-5">
                    <dt className="t-label text-[var(--muted)]">Adresa</dt>
                    <dd className="text-right text-[1.0625rem]">
                      {contact.street}, {contact.cityLine}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Trebate nekoga tko poznaje vaš ured?"
        lead="Javite se i dogovorimo kratak razgovor — bez obveze i bez pripreme s vaše strane."
      />
    </>
  );
}
