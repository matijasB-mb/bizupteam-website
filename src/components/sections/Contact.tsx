import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/ui/ContactForm";
import { contact } from "@/lib/site";

/**
 * Homepage contact section. The form itself now lives in ui/ContactForm so the
 * dedicated /kontakt page shares one implementation of validation, the honeypot
 * and the API contract — this section renders it without the service picker,
 * exactly as it looked before the split.
 */
export default function Contact() {
  return (
    <section id="kontakt" className="section bg-[var(--ink)] text-white">
      <div className="shell">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <SectionLabel tone="paper">Kontakt</SectionLabel>
            <h2 className="t-h2 mt-7 max-w-[13ch] text-white">
              Razgovarajmo o vašem poslovanju.
            </h2>
            <p className="t-lead mt-7 max-w-[42ch] text-white/60">
              Recite nam čime se bavite i što vas trenutno koči. Javljamo se s
              konkretnim prijedlogom, bez obveze.
            </p>

            <dl className="mt-14 grid gap-px border-t border-white/12 sm:grid-cols-2 lg:grid-cols-1">
              <div className="pt-6 lg:border-b lg:border-white/12 lg:pb-6">
                <dt className="t-label text-white/55">Adresa</dt>
                <dd className="mt-3 text-white/85">
                  {contact.street}
                  <br />
                  {contact.cityLine}
                </dd>
              </div>
              <div className="pt-6 lg:border-b lg:border-white/12 lg:pb-6">
                <dt className="t-label text-white/55">Telefon</dt>
                <dd className="mt-3">
                  <a
                    href={contact.phoneHref}
                    className="inline-block py-1 tabular-nums text-white/85 transition-colors duration-300 hover:text-[var(--red-on-dark)]"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div className="pt-6">
                <dt className="t-label text-white/55">E-mail</dt>
                <dd className="mt-3">
                  <a
                    href={contact.emailHref}
                    className="inline-block py-1 text-white/85 transition-colors duration-300 hover:text-[var(--red-on-dark)]"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
