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
                "Certificate title (e.g., 'AWS Certified Solutions Architect - Associate')",
        },
        {
            name: "issuer",
            title: "Issuing Organization",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
            description: "Organization that issued the certificate",
        },
        {
            name: "issueDate",
            title: "Issue Date",
            type: "date",
            validation: (Rule: Rule) => Rule.required(),
            description: "Date when the certificate was issued",
        },
        {
            name: "expiryDate",
            title: "Expiry Date",
            type: "date",
            description:
                "Date when the certificate expires (leave empty if no expiry)",
        },
        {
            name: "credentialId",
            title: "Credential ID",
            type: "string",
            description: "Unique identifier for the certificate",
        },
        {
            name: "credentialUrl",
            title: "Verification URL",
            type: "url",
            description: "Link to verify the certificate online",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            description: "Brief description of what the certificate represents",
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
                    description: "Alternative text for accessibility",
                },
            ],
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            description:
                "Category to group certificates (e.g., Cloud Computing, DevOps, Frontend Development, etc.)",
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description:
                "Order in which to display this certificate (lower numbers first)",
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
