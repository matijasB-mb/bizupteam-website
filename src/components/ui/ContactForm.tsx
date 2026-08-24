"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { contact } from "@/lib/site";
import { usluge } from "@/lib/usluge";

type Field = "ime" | "tvrtka" | "email" | "telefon" | "usluga" | "poruka";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Mirrors the server's rules so people see problems before a round trip. */
function validate(v: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (v.ime.trim().length < 2) errors.ime = "Unesite ime i prezime.";
  if (!EMAIL.test(v.email.trim())) errors.email = "Unesite ispravnu e-mail adresu.";
  if (v.poruka.trim().length < 10) errors.poruka = "Napišite nam nekoliko rečenica o upitu.";
  return errors;
}

const fieldBase =
  "w-full border-0 border-b border-white/20 bg-transparent px-0 pb-3 pt-2 " +
  "text-white placeholder:text-white/50 " +
  "transition-colors duration-300 focus:border-[var(--red-on-dark)] focus:outline-none focus:ring-0";

/**
 * The one contact form on the site.
 *
 * Shared by the homepage section and the contact page so there is a single
 * place where validation, the honeypot and the API contract live. `withService`
 * adds the service picker the dedicated page needs; the homepage omits it and
 * is otherwise byte-for-byte the form it always was.
 */
export default function ContactForm({
  withService = false,
  defaultService,
}: {
  withService?: boolean;
  defaultService?: string;
}) {
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
      usluga: String(raw.get("usluga") ?? ""),
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
      setNotice(`Slanje nije uspjelo. Provjerite vezu ili nam pišite na ${contact.email}.`);
    }
  }

  const busy = status === "sending";

  if (status === "sent") {
    return (
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
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {/* Honeypot — off-screen, never announced, never tabbable */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Ne ispunjavajte ovo polje</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField uid={uid} name="ime" label="Ime i prezime" autoComplete="name" required error={errors.ime} disabled={busy} />
        <TextField uid={uid} name="tvrtka" label="Tvrtka" autoComplete="organization" disabled={busy} />
        <TextField uid={uid} name="email" label="E-mail" type="email" inputMode="email" autoComplete="email" required error={errors.email} disabled={busy} />
        <TextField uid={uid} name="telefon" label="Telefon" type="tel" inputMode="tel" autoComplete="tel" disabled={busy} />
      </div>

      {withService && (
        <div>
          <label htmlFor={`${uid}-usluga`} className="t-label block text-white/55">
            Vrsta usluge
          </label>
          <select
            id={`${uid}-usluga`}
            name="usluga"
            defaultValue={defaultService ?? ""}
            disabled={busy}
            className={`${fieldBase} mt-3 appearance-none bg-[right_0.25rem_center] bg-no-repeat pr-8 [&>option]:bg-[var(--ink)] [&>option]:text-white`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' fill='none'%3E%3Cpath d='M1 1.5 5 5.5 9 1.5' stroke='rgba(255,255,255,0.5)' stroke-width='1.3'/%3E%3C/svg%3E\")",
              backgroundSize: "10px 7px",
            }}
          >
            <option value="">Odaberite…</option>
            {usluge.map((u) => (
              <option key={u.slug} value={u.nav}>{u.nav}</option>
            ))}
            <option value="Ostalo">Ostalo</option>
          </select>
        </div>
      )}

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
          className={`${fieldBase} mt-3 resize-y ${errors.poruka ? "border-[var(--red-on-dark)]" : ""}`}
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

      <p
        role="alert"
        aria-live="polite"
        className={`text-sm ${status === "failed" ? "text-[var(--red-on-dark)]" : "sr-only"}`}
      >
        {notice}
      </p>
    </form>
  );
}

function TextField({
  uid, name, label, error, required, ...rest
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
        className={`${fieldBase} mt-3 ${error ? "border-[var(--red-on-dark)]" : ""}`}
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-[var(--red-on-dark)]">{error}</p>
      )}
    </div>
  );
}
