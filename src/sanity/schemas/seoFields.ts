import { Rule } from "sanity";

export const seoFieldsSchema = {
    name: "seoFields",
    title: "SEO Fields",
    type: "object",
    fields: [
        {
            name: "metaTitle",
            title: "SEO Title",
            type: "string",
            description:
                "Optimized title for search engines and social media sharing (50-60 characters recommended)",
            validation: (Rule: Rule) => Rule.max(60),
        },
        {
            name: "metaDescription",
            title: "SEO Description",
            type: "text",
            description:
                "Compelling meta description for search results and social previews (150-160 characters recommended)",
            validation: (Rule: Rule) => Rule.max(160),
        },
        {
            name: "ogImage",
            title: "Social Media Image",
            type: "image",
            description:
                "High-quality image for social media sharing and link previews (1200x630px recommended)",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                    description: "Alternative text for accessibility",
                },
            ],
        },
    ],
    options: {
        collapsible: true,
        collapsed: false,
    },
};

export default seoFieldsSchema;
