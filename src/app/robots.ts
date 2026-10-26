import type { MetadataRoute } from "next";
import { indexable } from "@/lib/seo";
import { site } from "@/lib/site";

/* Statički izvoz traži da ruta bude eksplicitno statična. */
export const dynamic = "force-static";

/**
 * Crawleri umjetne inteligencije su ovdje izričito dopušteni, ne samo
 * "podrazumijevano": za tvrtku koja se prodaje preko preporuke, biti u
 * odgovoru ChatGPT-a, Perplexityja ili Claudea znači biti pronađen. Pravila
 * su ista kao za ostale, ali se vide kao namjerna odluka.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    // Isključeno varijablom SITE_INDEXABLE=false: ništa se ne indeksira.
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
