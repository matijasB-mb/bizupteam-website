import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import LdJson from "@/components/ui/LdJson";
import { faq } from "@/lib/faq";

/**
 * Pitanja i odgovori, kao native <details>: radi bez JavaScripta, pristupačno
 * je tipkovnicom i čitačima, a odgovori ostaju u HTML-u pa ih tražilice i
 * AI sustavi vide u cijelosti. Strukturirani podaci dolaze iz istog popisa.
 */
export default function Faq() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="section bg-[var(--paper)]">
      <LdJson data={data} />
      <div className="shell">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionLabel>Pitanja</SectionLabel>
              <h2 className="t-h2 mt-7 max-w-[12ch]">Što nas najčešće pitaju</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={80}>
              <div className="border-t border-[var(--line-strong)]">
                {faq.map(({ q, a }) => (
                  <details key={q} className="group border-b border-[var(--line)]">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[1.0625rem] font-medium leading-snug transition-colors duration-300 hover:text-[var(--red-on-light)] [&::-webkit-details-marker]:hidden">
                      {q}
                      <span
                        aria-hidden="true"
                        className="mt-1 text-[var(--muted)] transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="t-body max-w-[60ch] pb-7">{a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
