import { table } from "@sanity/table";
import { codeInput } from "@sanity/code-input";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";
import { defineConfig, SchemaTypeDefinition } from "sanity";

import { getRequiredEnvVar } from "@/shared";
import { sanityDeskStructure, schemaTypes } from "@/infrastructure";

/* ===== Environment ===== */
const DATASET_ENV = "NEXT_PUBLIC_SANITY_DATASET";
const PROJECT_ID_ENV = "NEXT_PUBLIC_SANITY_PROJECT_ID";

const dataset = getRequiredEnvVar(DATASET_ENV);
const projectId = getRequiredEnvVar(PROJECT_ID_ENV);

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
