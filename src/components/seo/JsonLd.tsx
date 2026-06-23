import React from "react";

// ============================================================
// Component: JsonLd
// Purpose: Emit a JSON-LD <script> for structured data. Server component — the
//          markup ships in the SSR HTML where crawlers read it. Builders live in
//          shared/utils/seo so the schema objects are typed and reusable.
// ============================================================
interface JsonLdProps {
    data: Record<string, unknown>;
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
    <script
        type="application/ld+json"
        // Structured data is build/server-generated from our own typed objects.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
);

JsonLd.displayName = "JsonLd";

export default JsonLd;
