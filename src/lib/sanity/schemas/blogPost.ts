import { Rule } from "sanity";
import seoFields from "./seoFields";

const blogPostSchema = {
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
            name: "author",
            title: "Author",
            type: "string",
            description: "Optional author name for the post",
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
            description:
                "A concise, engaging summary that highlights your blog's main insight for readers and SEO",
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
                // Official Sanity table plugin type
                { type: "table" },
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
                            description:
                                "Essential for SEO optimization and accessibility compliance",
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
        ...seoFields.fields,
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "date",
            media: "image",
        },
    },
};

export default blogPostSchema;
