import { table } from "@sanity/table";
import { codeInput } from "@sanity/code-input";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";
import { defineConfig, SchemaTypeDefinition } from "sanity";

import { sanityDeskStructure, schemaTypes } from "@/infrastructure/persistence/sanity";

/* ===== Environment =====
 * Must use literal process.env.NEXT_PUBLIC_* access so Turbopack can inline
 * the values at compile time — dynamic bracket lookup (process.env[name])
 * prevents bundler inlining and always resolves to undefined in the browser.
 */
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!dataset) throw new Error("NEXT_PUBLIC_SANITY_DATASET is required but not set.");
if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required but not set.");

const sanityPlugins = [
    codeInput(),

    table(),

    structureTool({
        structure: sanityDeskStructure,
    }),

    markdownSchema(),
] as const;

const schema: { types: SchemaTypeDefinition[] } = {
    types: schemaTypes as SchemaTypeDefinition[],
};

export default defineConfig({
    name: "portfolio-studio",
    title: "Portfolio Studio",

    projectId,
    dataset,

    basePath: "/studio",

    plugins: [...sanityPlugins],

    schema,
});
