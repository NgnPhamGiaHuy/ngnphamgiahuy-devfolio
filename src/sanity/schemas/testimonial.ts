import { Rule } from "sanity";

export default {
    name: "testimonial",
    title: "Testimonials",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "position",
            title: "Position",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "quote",
            title: "Quote",
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
            ],
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Order in which to display this testimonial (lower numbers first)",
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "position",
            media: "image",
        },
    },
};
