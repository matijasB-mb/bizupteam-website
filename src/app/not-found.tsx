import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Stranica nije pronađena",
  robots: { index: false, follow: true },
};

/**
 * 404. Na statičkom hostingu ovo postaje 404.html, pa Apache (ErrorDocument)
 * pogrešan URL dočeka stranicom s izbornikom i izlazom, a ne golim tekstom.
 */
export default function NotFound() {
  return (
    <PageHero
      eyebrow="Greška 404"
      title="Ove stranice nema."
      lead="Poveznica je možda stara ili je adresa krivo upisana. Počnite od početne ili nam se javite izravno."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <ButtonLink href="/" variant="solid" tone="paper">
          Na početnu
        </ButtonLink>
        <ButtonLink href="/kontakt" variant="outline" tone="paper">
          Kontakt
        </ButtonLink>
      </div>
    </PageHero>
  );
}
