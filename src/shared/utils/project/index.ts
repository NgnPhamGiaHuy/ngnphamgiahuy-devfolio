import type { ProjectType } from "@/schemas";

/**
 * Canonical slug for a project — the single source of this rule (was duplicated
 * across the graph builder, ProjectBento, the project route, and the sitemap).
 * Order: explicit slug → Firestore doc id → positional fallback.
 */
export const projectSlug = (p: ProjectType, index: number): string =>
    p.slug || p._id || `project-${index}`;
