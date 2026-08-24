import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Figure from "@/components/ui/Figure";
import { images, tim, type ClanTima } from "@/lib/site";

function LinkedInMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.6 8.75 23 11 23 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.05-3.34-2.06 0-2.37 1.59-2.37 3.23V21h-4V9Z" />
    </svg>
  );
}

/** Initials, used when a portrait file is not in place yet. */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Portrait({ member }: { member: ClanTima }) {
  if (!member.image) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-[var(--ink)]">
        <span
          aria-hidden="true"
          className="text-[3.25rem] leading-none tracking-[-0.04em] text-white/22"
          style={{ fontFamily: "var(--font-archivo), sans-serif", fontWeight: 600 }}
        >
          {initials(member.name)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={member.image}
      alt={`${member.name}, ${member.role}`}
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      loading="lazy"
      className="object-cover grayscale-[35%] transition-[transform,filter] duration-[900ms] ease-out will-change-transform group-hover:scale-[1.05] group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
  );
}

function Card({ member, index }: { member: ClanTima; index: number }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <article className="group flex h-full flex-col border-t border-[var(--line-strong)] pt-5 transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0">
        <div className="relative overflow-hidden bg-[var(--paper-mute)]" style={{ aspectRatio: "4 / 5" }}>
          <Portrait member={member} />
        </div>

        <h3 className="t-h3 mt-6">{member.name}</h3>
        <p className="mt-1.5 text-[0.9375rem] text-[var(--muted)]">{member.role}</p>

        <div className="mt-5 flex flex-1 flex-col gap-2 border-t border-[var(--line)] pt-5 text-[0.9375rem]">
          <a
            href={member.phoneHref}
            className="inline-flex w-fit py-0.5 tabular-nums text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--red-on-light)]"
          >
            {member.phone}
          </a>
          <a
            href={`mailto:${member.email}`}
            className="inline-flex w-fit break-all py-0.5 text-[var(--text-2)] transition-colors duration-300 hover:text-[var(--red-on-light)]"
          >
            {member.email}
          </a>
        </div>

        <div className="mt-5 flex min-h-9 items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
          <span className="t-label text-[var(--muted)]">{member.location}</span>
          {/* Rendered only once a real profile URL is set — a dead "#" link is
              a control that lies about being clickable. */}
          {member.linkedin && member.linkedin !== "#" && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn profil — ${member.name}`}
              className="inline-flex h-9 w-9 items-center justify-center text-[var(--muted)] transition-colors duration-300 hover:text-[var(--red-on-light)] group-hover:text-[var(--text-2)]"
            >
              <LinkedInMark />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/**
 * The people section, set on the third neutral so it breaks the light/dark
 * alternation the rest of the page runs on without adding a third dark block
 * before the contact finale.
 *
 * Names and contacts are demo data — see the note in lib/site.ts.
 */
export default function Team({ showIntro = true }: { showIntro?: boolean } = {}) {
  return (
    <section id="tim" className="section bg-[var(--paper-mute)]">
      <div className="shell">
        {showIntro && (
        <Reveal>
          <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-16">
            <div className="lg:col-span-6">
              <SectionLabel>Naš tim</SectionLabel>
              <h2 className="t-h2 mt-7 max-w-[12ch]">
                Ljudi iza rješenja.
              </h2>
            </div>
            <p className="t-lead lg:col-span-5 lg:col-start-8 lg:self-end">
              Tehnologija je važna. Ljudi koji stoje iza nje još su važniji —
              kod nas znate koga zovete i tko vam odgovara.
            </p>
          </div>
        </Reveal>
        )}

        {/* Grounds the section in real work before the portrait grid */}
        <Figure
          className={showIntro ? "mt-16 sm:mt-20" : ""}
          src={images.teamWorking}
          alt="Tim za zajedničkim stolom radi na prijenosnim računalima"
          ratio="21 / 9"
          sizes="(min-width: 1344px) 1216px, 100vw"
        />

        <div className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {tim.map((member, i) => (
            <Card key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
