import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { contact, site } from "@/lib/site";
import "./globals.css";

/* Archivo carries the headlines — a grotesk with enough width and weight to
   hold at display size. Inter does the reading, where Croatian diacritics and
   small UI text need its clarity more than they need character. */

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Telekomunikacije i uredska tehnologija | Osijek`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "najam printera Osijek",
    "Canon printeri Osijek",
    "A1 poslovni korisnici",
    "uredska tehnologija",
    "multifunkcijski uređaji",
    "Biz Up Team",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Telekomunikacije i uredska tehnologija`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Telekomunikacije i uredska tehnologija`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  colorScheme: "light",
};

/* LocalBusiness data, built only from values the client confirmed. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    addressLocality: site.city,
    postalCode: contact.postal,
    addressCountry: "HR",
  },
  areaServed: "HR",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <a
          href="#o-nama"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--ink)] focus:px-5 focus:py-3 focus:text-white"
        >
          Preskoči na sadržaj
        </a>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // Serialised from a local object literal — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
