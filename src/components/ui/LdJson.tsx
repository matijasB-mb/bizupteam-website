/** Jedan <script type="application/ld+json">, da se serijalizacija ne ponavlja. */
export default function LdJson({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Serijalizirano iz lokalnog objekta — ničiji unos ne dolazi ovamo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
