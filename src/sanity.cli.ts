/* ============================================================
   File: sanity.cli.ts
   Purpose: Sanity CLI configuration for command-line operations
   Features: Environment-based configuration, API connection settings
   ============================================================ */

import { defineCliConfig } from "sanity/cli";

// ============================================================
// Environment Configuration
// ============================================================

/**
 * Sanity project ID from environment variables
 * Required for CLI operations and API connections
 * Used for identifying the specific Sanity project
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * Sanity dataset name from environment variables
 * Used for content isolation and environment management
 * Defaults to "production" if not specified in main config
 */
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

// ============================================================
// Configuration Validation
// ============================================================

/**
 * Validates required environment variables for CLI operations
 * Throws error if project ID is missing
 * CLI operations require valid project identification
 */
if (!projectId) {
    throw new Error(
        "NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required for CLI operations"
    );
}

// ============================================================
// CLI Configuration
// ============================================================

/**
 * Sanity CLI configuration
 * Defines API connection settings for command-line operations
 *
 * @returns Sanity CLI configuration object
 *
 * @example
 * ```typescript
 * // Configuration includes:
 * // - Project ID for API identification
 * // - Dataset for content targeting
 * // - Enables CLI operations like migrations, schema validation
 * ```
 */
export default defineCliConfig({
    // API connection configuration
    api: {
        // Project identification
        projectId,

        // Dataset targeting
        dataset,
    },
});
