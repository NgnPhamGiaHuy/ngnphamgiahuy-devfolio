import { Rule } from "sanity";

export default {
    name: "education",
    title: "Education",
    type: "document",
    fields: [
        {
            name: "year",
            title: "Year/Period",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
            description:
                'Academic period (e.g., "2014 - 2018", "Sep 2020 - May 2024")',
        },
        {
            name: "degree",
            title: "Degree/Certification",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "institution",
            title: "Institution",
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
            title: "degree",
            subtitle: "institution",
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
                title,
                subtitle: `${subtitle} (${description})`,
            };
        },
    },
};
