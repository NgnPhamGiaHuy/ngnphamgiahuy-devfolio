import { Rule } from "sanity";
import seoFields from "./seoFields";

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
            description: "Direct link to the live project or source repository",
        },
        {
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            description: "Highlight this project as a featured showcase item",
            initialValue: false,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Display priority order (lower numbers appear first)",
        },
        ...seoFields.fields,
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "category",
            media: "image",
        },
    },
};
