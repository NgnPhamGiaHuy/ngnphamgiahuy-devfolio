import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";
import { ImageFieldSchema } from "../base/stored-image.schema";

/**
 * Case-study depth model. Every field below is optional so legacy/shallow
 * project documents (name/category/description/image/link only) still validate;
 * the COMMIT HISTORY graph + case-study UI light up progressively as these
 * fields are authored. The layer enum drives the architecture-diagram palette
 * (source -> ingest -> storage -> transform -> consumption).
 */
export const ArchitectureLayer = z.enum([
    "source",
    "ingest",
    "storage",
    "transform",
    "consumption",
]);

const ArchitectureNodeSchema = z.object({
    id: z.string(),
    label: z.string(),
    layer: ArchitectureLayer,
});

const ArchitectureEdgeSchema = z.object({
    from: z.string(),
    to: z.string(),
    label: z.string().optional(),
});

const DecisionSchema = z.object({
    decision: z.string(),
    alternative: z.string().optional(),
    whyRejected: z.string().optional(),
});

const MetricSchema = z.object({
    label: z.string(),
    value: z.string(),
});

const ProjectSchema = DocumentBaseSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("project"),
        name: z.string(),
        category: z.string(),
        description: z.string(),
        image: ImageFieldSchema,
        link: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
        /** Visibility gate for the public site (drafts are hidden + rule-protected). */
        published: z.boolean().optional(),

        // --- Case-study depth (all optional, authored progressively) ---
        slug: z.string().optional(),
        year: z.string().optional(),
        /** One-line system summary shown on the graph node / case-study head. */
        summary: z.string().optional(),
        /** The problem the system solves. */
        problem: z.string().optional(),
        /** Hard constraints the design had to respect. */
        constraints: z.array(z.string()).optional(),
        /** Typed architecture diagram (drives the self-drawing SVG). */
        architecture: z
            .object({
                nodes: z.array(ArchitectureNodeSchema),
                edges: z.array(ArchitectureEdgeSchema),
            })
            .optional(),
        /** Trade-offs: the #1 credibility signal. */
        decisions: z.array(DecisionSchema).optional(),
        /** Skill names used here -> drives skill->project lineage edges. */
        technologies: z.array(z.string()).optional(),
        /** Other project slugs this one genuinely depends on (pipeline edges). */
        dependsOn: z.array(z.string()).optional(),
        /** Quantified outcome. */
        outcome: z
            .object({
                summary: z.string().optional(),
                metrics: z.array(MetricSchema).optional(),
            })
            .optional(),
        /** Plain-language scale (e.g. "1M records/day"). */
        scale: z.string().optional(),
    })
);

export type ArchitectureLayerType = z.infer<typeof ArchitectureLayer>;
export type ArchitectureNode = z.infer<typeof ArchitectureNodeSchema>;
export type ArchitectureEdge = z.infer<typeof ArchitectureEdgeSchema>;
export type ProjectDecision = z.infer<typeof DecisionSchema>;
export type ProjectMetric = z.infer<typeof MetricSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;

export default ProjectSchema;
