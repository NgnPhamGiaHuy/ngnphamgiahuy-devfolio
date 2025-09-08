import { Rule } from "sanity";

export default {
    name: "blogPost",
    title: "Blog Posts",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "date",
            title: "Publication Date",
            type: "date",
            options: {
                dateFormat: "YYYY-MM-DD",
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            validation: (Rule: Rule) => Rule.required().max(160),
            description: "A short summary of the blog post (max 160 characters)",
        },
        {
            name: "image",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "string",
                },
                {
                    name: "caption",
            title: "Caption",
            type: "string",
                },
            ],
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [
                {
                    type: "block",
                },
                {
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            title: "Alternative text",
                            type: "string",
                            description: "Important for SEO and accessibility",
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                        },
                    ],
                },
                {
                    type: "code",
                    options: {
                        withFilename: true,
                    },
                },
            ],
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "string" }],
        },
        {
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            description: "Title for SEO purposes",
        },
        {
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            description: "Description for SEO purposes",
        },
        {
            name: "ogImage",
            title: "Social Sharing Image",
            type: "image",
            description: "Image for social media sharing",
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "date",
            media: "image",
        },
    },
};
