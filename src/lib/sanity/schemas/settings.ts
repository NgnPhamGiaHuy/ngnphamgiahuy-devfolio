import { Rule } from "sanity";
import seoFields from "./seoFields";

export default {
    name: "settings",
    title: "Settings",
    type: "document",
    fields: [
        {
            name: "logo",
            title: "Logo Text",
            type: "string",
        },
        ...seoFields.fields,
        {
            name: "hero",
            title: "Hero Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Hero Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Display the main hero section featuring your professional profile",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "services",
            title: "Services Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Services Section",
                    type: "boolean",
                    initialValue: true,
                    description: "Showcase your professional service offerings",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "right",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "skills",
            title: "Skills Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Skills Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Display your technical skills and professional expertise",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "portfolios",
            title: "Portfolios Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Portfolios Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Showcase your portfolio projects and creative work",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "right",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "resume",
            title: "Resume Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Resume Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Display your work experience and educational background",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "certificates",
            title: "Certificates Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Certificates Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Showcase your professional certifications and achievements",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "testimonials",
            title: "Testimonials Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Testimonials Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Display client testimonials and professional recommendations",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "right",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "pricing",
            title: "Pricing Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Pricing Section",
                    type: "boolean",
                    initialValue: true,
                    description:
                        "Display your service pricing plans and packages",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "blog",
            title: "Blog Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Blog Section",
                    type: "boolean",
                    initialValue: true,
                    description: "Display your latest blog posts and articles",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "right",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "contact",
            title: "Contact Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Contact Section",
                    type: "boolean",
                    initialValue: true,
                    description: "Display contact information and inquiry form",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
        {
            name: "map",
            title: "Map Section",
            type: "object",
            fields: [
                {
                    name: "enabled",
                    title: "Enable Map Section",
                    type: "boolean",
                    initialValue: true,
                    description: "Display an interactive location map",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Restart animations when users scroll back to this section",
                },
                {
                    name: "verticalRuleDirection",
                    title: "Vertical Rule Direction",
                    type: "string",
                    options: {
                        list: [
                            { title: "Left", value: "left" },
                            { title: "Right", value: "right" },
                        ],
                        layout: "radio",
                    },
                    initialValue: "left",
                    description:
                        "Position of the vertical rule for this section",
                },
                {
                    name: "embedUrl",
                    title: "Google Maps Embed URL",
                    type: "url",
                    description:
                        "Google Maps embed URL for your location (get from Google Maps > Share > Embed a map)",
                    validation: (Rule: Rule) =>
                        Rule.uri({
                            scheme: ["https"],
                        }),
                },
                {
                    name: "height",
                    title: "Map Height",
                    type: "number",
                    initialValue: 580,
                    description: "Height of the map in pixels",
                    validation: (Rule: Rule) => Rule.min(300).max(800),
                },
            ],
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
    ],
    preview: {
        select: {
            logo: "logo",
            hero: "hero.enabled",
            services: "services.enabled",
            skills: "skills.enabled",
            portfolios: "portfolios.enabled",
            resume: "resume.enabled",
            certificates: "certificates.enabled",
            testimonials: "testimonials.enabled",
            pricing: "pricing.enabled",
            blog: "blog.enabled",
            contact: "contact.enabled",
            map: "map.enabled",
        },
        prepare({
            logo,
            hero,
            services,
            skills,
            portfolios,
            resume,
            certificates,
            testimonials,
            pricing,
            blog,
            contact,
            map,
        }: {
            logo: string;
            hero: boolean;
            services: boolean;
            skills: boolean;
            portfolios: boolean;
            resume: boolean;
            certificates: boolean;
            testimonials: boolean;
            pricing: boolean;
            blog: boolean;
            contact: boolean;
            map: boolean;
        }) {
            const sections = [
                hero,
                services,
                skills,
                portfolios,
                resume,
                certificates,
                testimonials,
                pricing,
                blog,
                contact,
                map,
            ];
            const enabledCount = sections.filter(Boolean).length;
            const totalCount = sections.length;
            return {
                title: "Settings",
                subtitle: `Logo: ${logo} | ${enabledCount}/${totalCount} sections enabled`,
            };
        },
    },
};
