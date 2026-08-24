import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Javite se Biz Up Teamu u Osijeku — telekomunikacijske usluge i uredska tehnologija. Telefon 091 636 7770, webshop@bizupteam.hr.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt",
    description: "Recite nam što vam je potrebno i pomoći ćemo vam pronaći odgovarajuće rješenje.",
    url: "/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Kontakt" }]}
        eyebrow={`${site.city} · Poslovni korisnici`}
        title="Razgovarajmo o vašem ispisu."
        lead="Recite nam što vam je potrebno i pomoći ćemo vam pronaći odgovarajuće rješenje."
      />

      <section className="section bg-[var(--ink)] pt-0 text-white">
        <div className="shell">
          <div className="grid gap-y-16 border-t border-white/12 pt-16 lg:grid-cols-12 lg:gap-x-16">
            {/* ── Podaci ── */}
            <div className="lg:col-span-5">
              <SectionLabel tone="paper">Gdje smo</SectionLabel>

              <dl className="mt-10 border-t border-white/12">
                <div className="border-b border-white/12 py-6">
                  <dt className="t-label text-white/55">Adresa</dt>
                  <dd className="mt-3 text-[1.0625rem] text-white/85">
                    {contact.street}
                    <br />
                    {contact.cityLine}
                  </dd>
                </div>
                <div className="border-b border-white/12 py-6">
                  <dt className="t-label text-white/55">Telefon</dt>
                  <dd className="mt-3">
                    <a
                      href={contact.phoneHref}
                      className="inline-block py-1 text-[1.0625rem] tabular-nums text-white/85 transition-colors duration-300 hover:text-[var(--red-on-dark)]"
                    >
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-white/12 py-6">
                  <dt className="t-label text-white/55">E-mail</dt>
                  <dd className="mt-3">
                    <a
                      href={contact.emailHref}
                      className="inline-block break-all py-1 text-[1.0625rem] text-white/85 transition-colors duration-300 hover:text-[var(--red-on-dark)]"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="t-label text-white/55">Tvrtka</dt>
                  <dd className="mt-3 text-[1.0625rem] text-white/85">{site.legalName}</dd>
                </div>
              </dl>

              <p className="mt-10 max-w-[40ch] text-[0.9375rem] leading-relaxed text-white/55">
                Radimo s poslovnim korisnicima. Ako niste sigurni što točno
                trebate, nazovite — kroz par pitanja obično bude jasno.
              </p>
            </div>

            {/* ── Obrazac ── */}
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="t-label mb-10 text-white/55">Pošaljite upit</p>
                <ContactForm withService />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
