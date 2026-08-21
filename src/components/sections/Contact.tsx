"use client";

import { useId, useState, type FormEvent } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/site";

type Field = "ime" | "tvrtka" | "email" | "telefon" | "poruka";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Mirrors the server's rules so people see problems before a round trip. */
function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.ime.trim().length < 2) errors.ime = "Unesite ime i prezime.";
  if (!EMAIL.test(values.email.trim())) errors.email = "Unesite ispravnu e-mail adresu.";
  if (values.poruka.trim().length < 10) errors.poruka = "Napišite nam nekoliko rečenica o upitu.";
  return errors;
}

const fieldBase =
  "w-full border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-2 " +
  "text-white placeholder:text-white/50 " +
  "transition-colors duration-300 focus:border-[var(--red-on-dark)] focus:outline-none focus:ring-0";

export default function Contact() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = new FormData(form);

    const values = {
      ime: String(raw.get("ime") ?? ""),
      tvrtka: String(raw.get("tvrtka") ?? ""),
      email: String(raw.get("email") ?? ""),
      telefon: String(raw.get("telefon") ?? ""),
      poruka: String(raw.get("poruka") ?? ""),
    };

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("idle");
      setNotice("");
      form.querySelector<HTMLElement>(`[aria-invalid="true"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    setNotice("");

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: String(raw.get("website") ?? "") }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        form.reset();
        setStatus("sent");
        return;
      }

      if (result.errors) setErrors(result.errors as Errors);
      setStatus("failed");
      setNotice(
        typeof result.message === "string"
          ? result.message
          : "Provjerite unesene podatke i pokušajte ponovno.",
      );
    } catch {
      setStatus("failed");
      setNotice(
        `Slanje nije uspjelo. Provjerite vezu ili nam pišite na ${contact.email}.`,
      );
    }
  }

  const busy = status === "sending";

  return (
    <section id="kontakt" className="section bg-[var(--ink)] text-white">
      <div className="shell">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-16">
          {/* ── Left: the invitation ─────────────────────────────── */}
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

          {/* ── Right: the form ──────────────────────────────────── */}
          <div className="lg:col-span-6 lg:col-start-7">
            {status === "sent" ? (
              <div
                role="status"
                className="flex h-full min-h-[22rem] flex-col justify-center border-l-2 border-[var(--red-on-dark)] pl-8"
              >
                <p className="t-label text-[var(--red-on-dark)]">Upit zaprimljen</p>
                <p className="t-h3 mt-5 max-w-[24ch] text-white">
                  Hvala. Javljamo vam se u najkraćem mogućem roku.
                </p>
                <p className="mt-4 max-w-[38ch] text-white/50">
                  Ako je hitno, nazovite nas na{" "}
                  <a
                    href={contact.phoneHref}
                    className="tabular-nums text-white underline underline-offset-4 hover:text-[var(--red-on-dark)]"
                  >
                    {contact.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
                {/* Honeypot — off-screen, never announced, never tabbable */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                  <label htmlFor={`${uid}-website`}>Ne ispunjavajte ovo polje</label>
                  <input
                    id={`${uid}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <TextField
                    uid={uid}
                    name="ime"
                    label="Ime i prezime"
                    autoComplete="name"
                    required
                    error={errors.ime}
                    disabled={busy}
                  />
                  <TextField
                    uid={uid}
                    name="tvrtka"
                    label="Tvrtka"
                    autoComplete="organization"
                    disabled={busy}
                  />
                  <TextField
                    uid={uid}
                    name="email"
                    label="E-mail"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                    disabled={busy}
                  />
                  <TextField
                    uid={uid}
                    name="telefon"
                    label="Telefon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    disabled={busy}
                  />
                </div>

                <div>
                  <label htmlFor={`${uid}-poruka`} className="t-label block text-white/55">
                    Poruka <span className="text-[var(--red-on-dark)]">*</span>
                  </label>
                  <textarea
                    id={`${uid}-poruka`}
                    name="poruka"
                    rows={4}
                    required
                    disabled={busy}
                    aria-invalid={Boolean(errors.poruka)}
                    aria-describedby={errors.poruka ? `${uid}-poruka-err` : undefined}
                    placeholder="Čime se bavite i što tražite?"
                    className={`${fieldBase} mt-3 resize-y ${
                      errors.poruka ? "border-[var(--red)]" : ""
                    }`}
                  />
                  {errors.poruka && (
                    <p id={`${uid}-poruka-err`} className="mt-2 text-sm text-[var(--red-on-dark)]">
                      {errors.poruka}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" variant="solid" tone="paper" disabled={busy}>
                    {busy ? "Šaljem…" : "Pošaljite upit"}
                  </Button>
                  <p className="max-w-[30ch] text-xs leading-relaxed text-white/55">
                    Podatke koristimo isključivo za odgovor na vaš upit.
                  </p>
                </div>

                {/* Announced to screen readers the moment it appears */}
                <p
                  role="alert"
                  aria-live="polite"
                  className={`text-sm ${status === "failed" ? "text-[var(--red-on-dark)]" : "sr-only"}`}
                >
                  {notice}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Field ─────────────────────────────────────────────────────────── */

function TextField({
  uid,
  name,
  label,
  error,
  required,
  ...rest
}: {
  uid: string;
  name: Field;
  label: string;
  error?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `${uid}-${name}`;

  return (
    <div>
      <label htmlFor={id} className="t-label block text-white/55">
        {label} {required && <span className="text-[var(--red-on-dark)]">*</span>}
      </label>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`${fieldBase} mt-3 ${error ? "border-[var(--red)]" : ""}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-[var(--red-on-dark)]">
          {error}
        </p>
      )}
    </div>
  );
}
