import { Rule } from "sanity";

export default {
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        {
            name: "logo",
            title: "Logo Text",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "metaTitle",
            title: "Default Meta Title",
            type: "string",
            description: "Default title for SEO purposes (for pages without specific meta titles)",
        },
        {
            name: "metaDescription",
            title: "Default Meta Description",
            type: "text",
            description: "Default description for SEO purposes (for pages without specific meta descriptions)",
        },
        {
            name: "ogImage",
            title: "Default Social Sharing Image",
            type: "image",
            description: "Default image for social media sharing (for pages without specific OG images)",
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        prepare() {
            return {
                title: "Site Settings",
            };
        },
    },
};
