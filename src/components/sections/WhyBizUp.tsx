import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { prednosti } from "@/lib/site";

/**
 * Four reasons, set as an indexed list rather than icon cards.
 * The numbering is real structure here — it mirrors the four benefits the
 * client already lists on the printed card, in the same order.
 */
export default function WhyBizUp() {
  return (
    <section id="zasto" className="section bg-[var(--paper)]">
      <div className="shell">
        <Reveal>
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-5">
              <SectionLabel>Zašto Biz Up</SectionLabel>
              <h2 className="t-h2 mt-7 max-w-[15ch]">
                Vaše pogodnosti kao Biz Up partnera
              </h2>
            </div>
            <p className="t-lead lg:col-span-6 lg:col-start-7 lg:self-end">
              Ništa od ovoga nije obećanje za budućnost — to je način na koji
              radimo sa svakim klijentom od prvog dana.
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 border-t border-[var(--line)] sm:mt-20">
          {prednosti.map((item, i) => (
            <Reveal as="li" key={item.index} delay={i * 70}>
              <div className="group grid gap-y-3 border-b border-[var(--line)] py-8 transition-colors duration-500 hover:bg-[var(--paper-warm)] sm:grid-cols-12 sm:items-baseline sm:gap-x-8 sm:py-10 lg:py-12">
                <span
                  className="t-label text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--red-on-light)] sm:col-span-1"
                  aria-hidden="true"
                >
                  {item.index}
                </span>
                <h3 className="t-h2 sm:col-span-5 lg:col-span-4">{item.title}</h3>
                <p className="t-body max-w-[52ch] sm:col-span-6 lg:col-span-6 lg:col-start-7">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
