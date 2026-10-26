import { site } from "@/lib/site";
import { withSlash } from "@/lib/url";

/**
 * Open Graph po stranici.
 *
 * Next sam dodaje `opengraph-image.png` iz app mape, ali čim stranica
 * definira vlastiti `openGraph` objekt, on zamijeni naslijeđeni — i slika
 * nestane. Zato svaka stranica prolazi kroz ovaj pomoćnik; da se to rješava
 * ručno, prva sljedeća stranica bi opet ostala bez pregleda pri dijeljenju.
 */

export const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Biz Up Team — telekomunikacije i uredska tehnologija, Osijek i Zagreb",
};

export function og({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    type: "website" as const,
    locale: "hr_HR",
    siteName: site.name,
    title,
    description,
    url: withSlash(url),
    images: [ogImage],
  };
}

/**
 * Stranica se uvijek predstavlja kao bizupteam.hr: canonical, sitemap, robots,
 * Open Graph i strukturirani podaci svi koriste site.url, bez obzira na to
 * gdje je build objavljen. Probna Vercel adresa (*.vercel.app) pritom dobiva
 * X-Robots-Tag: noindex u next.config.ts, pa se ne natječe s pravom domenom.
 *
 * SITE_INDEXABLE=false isključuje indeksiranje cijelog builda (npr. za
 * privremenu verziju prije lansiranja).
 */
export const indexable = process.env.SITE_INDEXABLE !== "false";
