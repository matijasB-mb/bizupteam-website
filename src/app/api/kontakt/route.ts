import { NextResponse } from "next/server";
import { contact, site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Rate limiting ─────────────────────────────────────────────────────
   In-memory and therefore per-instance — enough to stop a script hammering
   the form, not a substitute for a real limiter if traffic ever justifies
   one. Swap in Upstash/Vercel KV here if that day comes.               */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

/* ── Validation ────────────────────────────────────────────────────── */

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Strips control characters and caps length. Never trust the client. */
function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";

  let out = "";
  for (const ch of value.slice(0, max * 2)) {
    const code = ch.codePointAt(0) ?? 0;
    // Code 10 is a newline — kept so multi-paragraph messages arrive intact.
    const isControl = (code < 32 && code !== 10) || code === 127;
    out += isControl ? " " : ch;
  }

  return out.trim().slice(0, max);
}

type Payload = {
  ime: string;
  tvrtka: string;
  email: string;
  telefon: string;
  poruka: string;
};

function validate(body: Record<string, unknown>) {
  const data: Payload = {
    ime: clean(body.ime, 100),
    tvrtka: clean(body.tvrtka, 120),
    email: clean(body.email, 200),
    telefon: clean(body.telefon, 40),
    poruka: clean(body.poruka, 4000),
  };

  const errors: Partial<Record<keyof Payload, string>> = {};

  if (data.ime.length < 2) errors.ime = "Unesite ime i prezime.";
  if (!EMAIL.test(data.email)) errors.email = "Unesite ispravnu e-mail adresu.";
  if (data.poruka.length < 10) errors.poruka = "Napišite nam nekoliko rečenica o upitu.";

  return { data, errors };
}

/* ── Delivery ──────────────────────────────────────────────────────────
   Resend over plain fetch so the site ships without another dependency.
   With no key configured the route says so plainly instead of pretending
   the message went out.                                                */

async function deliver(data: Payload): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!key || !from) return false;

  const lines = [
    `Ime i prezime: ${data.ime}`,
    `Tvrtka: ${data.tvrtka || "—"}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.telefon || "—"}`,
    "",
    data.poruka,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Upit sa ${site.url.replace("https://", "")} — ${data.ime}`,
      text: lines,
    }),
  });

  if (!res.ok) {
    console.error("[kontakt] delivery failed", res.status);
    throw new Error("delivery-failed");
  }

  return true;
}

/* ── Handler ───────────────────────────────────────────────────────── */

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Previše pokušaja. Pokušajte ponovno za nekoliko minuta." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Neispravan zahtjev." }, { status: 400 });
  }

  // Honeypot: real people never see this field, so anything in it is a bot.
  // Answer 200 so the bot has no signal that it was caught.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    const sent = await deliver(data);

    if (!sent) {
      return NextResponse.json(
        {
          ok: false,
          unconfigured: true,
          message: `Slanje obrasca još nije aktivirano. Javite nam se izravno na ${contact.email} ili ${contact.phone}.`,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Nothing internal leaks to the client.
    return NextResponse.json(
      {
        ok: false,
        message: `Slanje trenutno nije uspjelo. Pokušajte ponovno ili nam pišite na ${contact.email}.`,
      },
      { status: 502 },
    );
  }
}
