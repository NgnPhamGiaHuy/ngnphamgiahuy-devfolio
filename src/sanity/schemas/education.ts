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
            description: "Time period of education (e.g., \"2014 - 2018\")",
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
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Order in which to display this education item (lower numbers first)",
        },
    ],
    preview: {
        select: {
            title: "degree",
            subtitle: "institution",
            description: "year",
        },
        prepare({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
            return {
                title,
                subtitle: `${subtitle} (${description})`,
            };
        },
    },
};
