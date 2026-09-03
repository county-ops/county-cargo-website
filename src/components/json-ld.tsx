
/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> tag in the document head.
 * Use inside Next.js page/layout components (server components only).
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data must be raw JSON
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
