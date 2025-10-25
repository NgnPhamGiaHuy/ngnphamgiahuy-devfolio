import { Rule } from "sanity";

export default {
    name: "certificate",
    title: "Certificates",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Certificate Title",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
            description:
                "Professional certification title (e.g., 'AWS Certified Solutions Architect - Associate')",
        },
        {
            name: "issuer",
            title: "Issuing Organization",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
            description: "Official organization that issued this certification",
        },
        {
            name: "issueDate",
            title: "Issue Date",
            type: "date",
            validation: (Rule: Rule) => Rule.required(),
            description: "Date when the certification was officially issued",
        },
        {
            name: "expiryDate",
            title: "Expiry Date",
            type: "date",
            description:
                "Expiration date for time-limited certifications (leave empty if permanent)",
        },
        {
            name: "credentialId",
            title: "Credential ID",
            type: "string",
            description:
                "Unique credential identifier for verification purposes",
        },
        {
            name: "credentialUrl",
            title: "Verification URL",
            type: "url",
            description: "Direct link to verify this certification online",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            description:
                "Brief overview of the certification's scope and value",
        },
        {
            name: "image",
            title: "Certificate Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                    description: "Descriptive text for accessibility and SEO",
                },
            ],
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            description:
                "Professional category for organizing certifications (e.g., Cloud Computing, DevOps, Frontend Development)",
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
            subtitle: "issuer",
            media: "image",
            issueDate: "issueDate",
        },
        prepare({
            title,
            subtitle,
            media,
            issueDate,
        }: {
            title: string;
            subtitle: string;
            media: unknown;
            issueDate: string;
        }) {
            const date = new Date(issueDate);
            const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });

            return {
                title,
                subtitle: `${subtitle} - ${formattedDate}`,
                media,
            };
        },
    },
    orderings: [
        {
            title: "Issue Date (Newest First)",
            name: "issueDateDesc",
            by: [{ field: "issueDate", direction: "desc" }],
        },
        {
            title: "Issue Date (Oldest First)",
            name: "issueDateAsc",
            by: [{ field: "issueDate", direction: "asc" }],
        },
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
        {
            title: "Title A-Z",
            name: "titleAsc",
            by: [{ field: "title", direction: "asc" }],
        },
    ],
};
