import * as React from "react";

/**
 * Renders one or more JSON-LD documents as inline `<script>` tags.
 *
 * Why `dangerouslySetInnerHTML`? It's the recommended approach for
 * structured data in App Router (and is safe — we serialise our own
 * trusted, server-built objects with JSON.stringify).
 */
export function JsonLd({
  schema,
}: {
  schema: object | object[];
}) {
  const all = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {all.map((doc, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doc) }}
        />
      ))}
    </>
  );
}
