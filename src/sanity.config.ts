import { structureTool } from "sanity/structure";
import { defineConfig, SchemaTypeDefinition } from "sanity";

import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemas";
import { deskStructure } from "./sanity/deskStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset =
    (process.env.NEXT_PUBLIC_SANITY_DATASET as string) || "production";

export default defineConfig({
    name: "portfolio-studio",
    title: "Portfolio Studio",
    projectId,
    dataset,
    basePath: "/studio",
    plugins: [
        codeInput(),
        structureTool({
            structure: deskStructure,
        }),
    ],
    schema: {
        types: schemaTypes as SchemaTypeDefinition[],
    },
});
