/* ============================================================
   File: sanity.config.ts
   Purpose: Sanity CMS configuration for portfolio content management
   Features: Custom desk structure, code input, schema management
   ============================================================ */

import { structureTool } from "sanity/structure";
import { defineConfig, SchemaTypeDefinition } from "sanity";

import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./lib/sanity/schemas";
import { deskStructure } from "./lib/sanity/deskStructure";

// ============================================================
// Environment Configuration
// ============================================================

/**
 * Sanity project ID from environment variables
 * Required for connecting to Sanity backend
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;

/**
 * Sanity dataset name from environment variables
 * Defaults to "production" if not specified
 * Used for content isolation and environment management
 */
const dataset =
    (process.env.NEXT_PUBLIC_SANITY_DATASET as string) || "production";

// ============================================================
// Configuration Validation
// ============================================================

/**
 * Validates required environment variables
 * Throws error if project ID is missing
 */
if (!projectId) {
    throw new Error(
        "NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required"
    );
}

// ============================================================
// Sanity Configuration
// ============================================================

/**
 * Sanity Studio configuration
 * Defines the CMS interface, plugins, and schema structure
 *
 * @returns Sanity configuration object
 *
 * @example
 * ```typescript
 * // Configuration includes:
 * // - Custom desk structure for content organization
 * // - Code input plugin for technical content
 * // - Schema types for all content models
 * // - Environment-specific project and dataset settings
 * ```
 */
export default defineConfig({
    // Studio identification
    name: "portfolio-studio",
    title: "Portfolio Studio",

    // Sanity backend connection
    projectId,
    dataset,

    // Studio URL path
    basePath: "/studio",

    // Plugin configuration
    plugins: [
        // Code input plugin for syntax highlighting
        codeInput(),

        // Custom desk structure for content organization
        structureTool({
            structure: deskStructure,
        }),
    ],

    // Schema configuration
    schema: {
        // All content type definitions
        types: schemaTypes as SchemaTypeDefinition[],
    },
});
