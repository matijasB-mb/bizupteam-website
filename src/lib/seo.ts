import { site } from "@/lib/site";

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
    url,
    images: [ogImage],
  };
}
