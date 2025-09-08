import { Rule } from "sanity";

export default {
    name: "service",
    title: "Services",
    type: "document",
    fields: [
        {
            name: "category",
            title: "Category",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "title",
            title: "Title",
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
            name: "icon",
            title: "Icon",
            type: "string",
            description: "Icon name from your icon library",
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Order in which to display this service (lower numbers first)",
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
        },
    },
};
