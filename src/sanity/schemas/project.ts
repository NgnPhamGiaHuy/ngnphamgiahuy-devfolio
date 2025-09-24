import { Rule } from "sanity";

export default {
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "image",
            title: "Image",
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
            name: "link",
            title: "Project URL",
            type: "url",
            description: "Link to the live project or repository",
        },
        {
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            description: "Mark this project as featured",
            initialValue: false,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Order in which to display this project (lower numbers first)",
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
            title: "name",
            subtitle: "category",
            media: "image",
        },
    },
};
