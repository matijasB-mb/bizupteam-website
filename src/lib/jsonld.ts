/**
 * Strukturirani podaci.
 *
 * Isto pravilo kao u site.ts: u graf ide samo ono što je potvrđeno. Nema
 * `priceRange`, nema `openingHours`, nema `aggregateRating` — Google te
 * oznake rado prikaže, ali netočan podatak u njima je gori nego nikakav.
 *
 * Graf ima jedan `Organization` i po jedan `LocalBusiness` za svaki ured,
 * povezan preko `branchOf`. Tako tražilica zna da su to dvije lokacije iste
 * tvrtke, a ne dvije tvrtke istog imena.
 */

import { contact, site, uredi, type Ured } from "@/lib/site";
import { withSlash } from "@/lib/url";

const ORG = `${site.url}/#organization`;
const WEBSITE = `${site.url}/#website`;

function postalAddress(u: Ured) {
  return {
    "@type": "PostalAddress",
    streetAddress: u.street,
    addressLocality: u.city,
    ...(u.postal ? { postalCode: u.postal } : {}),
    addressCountry: "HR",
  };
}

function branch(u: Ured) {
  return {
    "@type": "LocalBusiness",
    "@id": `${site.url}/#ured-${u.id}`,
    name: `${site.legalName} — ${u.city}`,
    branchOf: { "@id": ORG },
    url: site.url,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    address: postalAddress(u),
    areaServed: "HR",
  };
}

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: site.legalName,
      alternateName: site.name,
      taxID: site.oib,
      url: site.url,
      logo: `${site.url}/brand/logo-biz-up.png`,
      description: site.description,
      telephone: contact.phoneHref.replace("tel:", ""),
      email: contact.email,
      address: postalAddress(uredi.find((u) => u.hq)!),
      location: uredi.map((u) => ({ "@id": `${site.url}/#ured-${u.id}` })),
      areaServed: "HR",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: contact.phoneHref.replace("tel:", ""),
          email: contact.email,
          areaServed: "HR",
          availableLanguage: "hr",
        },
      ],
      knowsAbout: [
        "Najam printera",
        "Canon multifunkcijski uređaji",
        "Poslovne telekomunikacije",
        "Digitalizacija dokumenata",
      ],
    },
    ...uredi.map(branch),
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: site.url,
      name: site.name,
      inLanguage: "hr-HR",
      publisher: { "@id": ORG },
    },
  ],
};

/**
 * BreadcrumbList iz istih mrvica koje stranica i prikazuje — ne postoji
 * drugi popis koji bi se mogao razići s onim što korisnik vidi.
 */
export function breadcrumbGraph(crumbs: { label: string; href?: string }[]) {
  const items = [{ label: "Početna", href: "/" }, ...crumbs];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${withSlash(c.href)}` } : {}),
    })),
  };
}

/**
 * Service za stranicu usluge. Pružatelj je organizacija iz grafa u layoutu
 * (@id), pa se ne ponavlja adresa i telefon. Opis je isti kao meta opis —
 * jedan izvor, ne dva teksta koja se mogu razići.
 */
export function serviceGraph(u: {
  slug: string;
  title: string;
  metaDescription: string;
  grupa: "telekom" | "canon";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: u.title,
    description: u.metaDescription,
    url: `${site.url}${withSlash(`/usluge/${u.slug}`)}`,
    serviceType:
      u.grupa === "telekom"
        ? "Savjetovanje o poslovnim telekomunikacijama (ugovorni partner A1-a)"
        : "Najam i prodaja uredskih uređaja (partner Canona)",
    provider: { "@id": ORG },
    areaServed: { "@type": "Country", name: "Hrvatska" },
    audience: { "@type": "BusinessAudience", name: "Poslovni korisnici" },
  };
}
