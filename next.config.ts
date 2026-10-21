import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

/**
 * Dva odredišta, jedan izvor.
 *
 *   • zadano — Vercel: Next ruta /api/kontakt, zaglavlja iz headers()
 *   • BUILD_TARGET=static — Apache s PHP-om: statički izvoz u /out, obrazac
 *     ide na /upiti.php, a zaglavlja preuzima public/.htaccess jer headers()
 *     na statičkom izvozu ne postoji
 *
 * Izvoz se pokreće s `npm run build:static` — vidi scripts/build-static.mjs.
 */
const staticExport = process.env.BUILD_TARGET === "static";

/**
 * Everything the site needs comes from its own origin — next/font self-hosts
 * the two typefaces, there are no analytics, and the only network call is the
 * same-origin contact endpoint. So the policy can be tight almost everywhere.
 *
 * `unsafe-inline` on scripts is Next's hydration payload; locking that down
 * properly needs per-request nonces through middleware, which is more moving
 * parts than a static marketing site earns. `unsafe-eval` is dev-only (React
 * Refresh) and never ships to production.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = staticExport
  ? {
      poweredByHeader: false,
      reactStrictMode: true,
      output: "export",
      // Apache nema Next optimizator slika, pa datoteke idu kakve jesu.
      images: { unoptimized: true },
      // headers() se na izvozu ne primjenjuje; preuzima ga public/.htaccess.
    }
  : {
      poweredByHeader: false,
      reactStrictMode: true,
      async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
      },
    };

export default nextConfig;
