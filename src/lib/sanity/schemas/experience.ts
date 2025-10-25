import { Rule } from "sanity";

export default {
    name: "experience",
    title: "Experience",
    type: "document",
    fields: [
        {
            name: "year",
            title: "Year/Period",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
            description:
                'Employment period (e.g., "2020 - Present", "Jan 2019 - Dec 2021")',
        },
        {
            name: "title",
            title: "Job Title",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "company",
            title: "Company",
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
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Display priority order (lower numbers appear first)",
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "company",
            description: "year",
        },
        prepare({
            title,
            subtitle,
            description,
        }: {
            title: string;
            subtitle: string;
            description: string;
        }) {
            return {
                title: `${title} at ${subtitle}`,
                subtitle: description,
            };
        },
    },
};
