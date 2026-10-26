import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { usluge } from "@/lib/usluge";
import { withSlash } from "@/lib/url";

/* Statički izvoz traži da ruta bude eksplicitno statična; na Vercelu je
   ionako nema smisla generirati po zahtjevu. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/usluge", priority: 0.9 },
    ...usluge.map((u) => ({ path: `/usluge/${u.slug}`, priority: 0.8 })),
    { path: "/o-nama", priority: 0.7 },
    { path: "/zasto-biz-up", priority: 0.7 },
    { path: "/tim", priority: 0.6 },
    { path: "/kontakt", priority: 0.8 },
    { path: "/privatnost", priority: 0.2 },
    { path: "/uvjeti-koristenja", priority: 0.2 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${site.url}${withSlash(path || "/")}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
