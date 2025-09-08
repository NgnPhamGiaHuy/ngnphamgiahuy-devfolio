import { Rule } from "sanity";

export default {
    name: "pricing",
    title: "Pricing Plans",
    type: "document",
    fields: [
        {
            name: "plan",
            title: "Plan Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "price",
            title: "Price",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "period",
            title: "Period",
            type: "string",
            description: "E.g. \"per month\" or \"per project\"",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "features",
            title: "Features",
            type: "object",
            fields: [
                {
                    name: "included",
                    title: "Included Features",
                    type: "array",
                    of: [{ type: "string" }],
                },
                {
                    name: "not_included",
                    title: "Not Included Features",
                    type: "array",
                    of: [{ type: "string" }],
                },
            ],
        },
        {
            name: "highlight",
            title: "Highlight This Plan",
            type: "boolean",
            description: "Mark this plan as recommended or highlighted",
            initialValue: false,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Order in which to display this plan (lower numbers first)",
        },
    ],
    preview: {
        select: {
            title: "plan",
            subtitle: "price",
        },
        prepare({ title, subtitle }: { title: string; subtitle: string }) {
            return {
                title,
                subtitle: `$${subtitle}`,
            };
        },
    },
};
