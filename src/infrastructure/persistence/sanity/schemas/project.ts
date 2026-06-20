import { Rule } from "sanity";
import seoFields from "./seoFields";

const ARCH_LAYERS = [
    { title: "Source", value: "source" },
    { title: "Ingest", value: "ingest" },
    { title: "Storage", value: "storage" },
    { title: "Transform", value: "transform" },
    { title: "Consumption", value: "consumption" },
];

export default {
    name: "project",
    title: "Projects",
    type: "document",
    groups: [
        { name: "core", title: "Core", default: true },
        { name: "caseStudy", title: "Case study" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            group: "core",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            group: "core",
            description: "e.g. Data Engineering, Systems, AI",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "core",
            options: { source: "name", maxLength: 64 },
            description: "Stable id used for graph edges and deep links",
        },
        {
            name: "year",
            title: "Year",
            type: "string",
            group: "core",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            group: "core",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "summary",
            title: "One-line system summary",
            type: "string",
            group: "core",
            description: "Shown on the graph node and case-study header",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            group: "core",
            options: { hotspot: true },
            fields: [
                { name: "alt", title: "Alternative Text", type: "string" },
                { name: "caption", title: "Caption", type: "string" },
            ],
        },
        {
            name: "link",
            title: "Project URL",
            type: "url",
            group: "core",
            description: "Live project or source repository",
        },
        {
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            group: "core",
            initialValue: false,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            group: "core",
            description: "Lower numbers appear first",
        },

        // --- Case study ---
        {
            name: "problem",
            title: "Problem",
            type: "text",
            group: "caseStudy",
            description: "The problem this system solves",
        },
        {
            name: "constraints",
            title: "Constraints",
            type: "array",
            group: "caseStudy",
            of: [{ type: "string" }],
            description: "Hard constraints the design had to respect",
        },
        {
            name: "architecture",
            title: "Architecture diagram",
            type: "object",
            group: "caseStudy",
            description:
                "Typed nodes + edges. Drives the self-drawing architecture SVG.",
            fields: [
                {
                    name: "nodes",
                    title: "Nodes",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            fields: [
                                { name: "id", title: "ID", type: "string" },
                                {
                                    name: "label",
                                    title: "Label",
                                    type: "string",
                                },
                                {
                                    name: "layer",
                                    title: "Layer",
                                    type: "string",
                                    options: { list: ARCH_LAYERS },
                                },
                            ],
                            preview: {
                                select: { title: "label", subtitle: "layer" },
                            },
                        },
                    ],
                },
                {
                    name: "edges",
                    title: "Edges",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            fields: [
                                { name: "from", title: "From", type: "string" },
                                { name: "to", title: "To", type: "string" },
                                {
                                    name: "label",
                                    title: "Label",
                                    type: "string",
                                },
                            ],
                            preview: {
                                select: { title: "from", subtitle: "to" },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: "decisions",
            title: "Decisions (trade-offs)",
            type: "array",
            group: "caseStudy",
            description:
                "Each decision with the alternative considered and why it was rejected",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "decision", title: "Decision", type: "text" },
                        {
                            name: "alternative",
                            title: "Alternative considered",
                            type: "text",
                        },
                        {
                            name: "whyRejected",
                            title: "Why rejected",
                            type: "text",
                        },
                    ],
                    preview: { select: { title: "decision" } },
                },
            ],
        },
        {
            name: "technologies",
            title: "Technologies (skill names)",
            type: "array",
            group: "caseStudy",
            of: [{ type: "string" }],
            description:
                "Skill names used here — drives skill -> project lineage edges",
        },
        {
            name: "dependsOn",
            title: "Depends on (project slugs)",
            type: "array",
            group: "caseStudy",
            of: [{ type: "string" }],
            description:
                "Other project slugs this one genuinely consumes (pipeline edges). Only add if true.",
        },
        {
            name: "outcome",
            title: "Outcome",
            type: "object",
            group: "caseStudy",
            fields: [
                { name: "summary", title: "Summary", type: "text" },
                {
                    name: "metrics",
                    title: "Metrics",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            fields: [
                                {
                                    name: "label",
                                    title: "Label",
                                    type: "string",
                                },
                                {
                                    name: "value",
                                    title: "Value",
                                    type: "string",
                                },
                            ],
                            preview: {
                                select: { title: "value", subtitle: "label" },
                            },
                        },
                    ],
                },
            ],
        },
        {
            name: "scale",
            title: "Scale",
            type: "string",
            group: "caseStudy",
            description: 'Plain-language scale, e.g. "1M records/day"',
        },

        ...seoFields.fields.map((f: Record<string, unknown>) => ({
            ...f,
            group: "seo",
        })),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "category",
            media: "image",
        },
    },
};
