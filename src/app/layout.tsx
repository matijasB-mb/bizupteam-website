import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import LdJson from "@/components/ui/LdJson";
import { siteGraph } from "@/lib/jsonld";
import { ogImage } from "@/lib/seo";
import { site } from "@/lib/site";
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
    default: "Najam Canon printera i A1 poslovne usluge | Biz Up Team",
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
    images: [ogImage],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <a
          href="#sadrzaj"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--ink)] focus:px-5 focus:py-3 focus:text-white"
        >
          Preskoči na sadržaj
        </a>
        <SmoothScroll />
        <Navbar />
        <main id="sadrzaj">{children}</main>
        <Footer />
        <LdJson data={siteGraph} />
      </body>
    </html>
  );
}
