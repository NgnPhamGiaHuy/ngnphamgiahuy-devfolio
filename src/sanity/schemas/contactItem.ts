import { Rule } from "sanity";

export default {
    name: "contactItem",
    title: "Contact Items",
    type: "document",
    fields: [
        {
            name: "type",
            title: "Type",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
            options: {
                list: [
                    { title: "Email", value: "email" },
                    { title: "Phone", value: "phone" },
                    { title: "Location", value: "location" },
                    { title: "Office", value: "office" },
                ],
            },
        },
        {
            name: "value",
            title: "Value",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Order in which to display this contact item (lower numbers first)",
        },
    ],
    preview: {
        select: {
            title: "type",
            subtitle: "value",
        },
        prepare({ title, subtitle }: { title: string; subtitle: string }) {
            return {
                title: title.charAt(0).toUpperCase() + title.slice(1),
                subtitle,
            };
        },
    },
};
