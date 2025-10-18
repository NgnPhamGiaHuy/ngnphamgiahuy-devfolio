import { structureTool } from "sanity/structure";
import { defineConfig, SchemaTypeDefinition } from "sanity";

import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset =
    (process.env.NEXT_PUBLIC_SANITY_DATASET as string) || "production";
const apiVersion =
    (process.env.NEXT_PUBLIC_SANITY_API_VERSION as string) || "2024-01-01";

export default defineConfig({
    name: "portfolio-studio",
    title: "Portfolio Studio",
    projectId,
    dataset,
    apiVersion,
    basePath: "/studio",
    plugins: [codeInput(), structureTool()],
    schema: {
        types: schemaTypes as SchemaTypeDefinition[],
    },
});
