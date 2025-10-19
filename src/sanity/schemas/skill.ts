import { Rule } from "sanity";

export default {
    name: "skill",
    title: "Skills",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "experience_years",
            title: "Years of Experience",
            type: "number",
            validation: (Rule: Rule) => Rule.required().min(0),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            description: "Optional skill category for better organization",
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Display priority order (lower numbers appear first)",
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "experience_years",
        },
        prepare({ title, subtitle }: { title: string; subtitle: number }) {
            return {
                title,
                subtitle: `${subtitle} ${subtitle === 1 ? "year" : "years"} of experience`,
            };
        },
    },
};
