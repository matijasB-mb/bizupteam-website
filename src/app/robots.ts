import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/* Statički izvoz traži da ruta bude eksplicitno statična; na Vercelu je
   ionako nema smisla generirati po zahtjevu. */
export const dynamic = "force-static";


export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
