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
        {
            name: "metaTitle",
            title: "Default Meta Title",
            type: "string",
            description:
                "Default title for SEO purposes (for pages without specific meta titles)",
        },
        {
            name: "metaDescription",
            title: "Default Meta Description",
            type: "text",
            description:
                "Default description for SEO purposes (for pages without specific meta descriptions)",
        },
        {
            name: "ogImage",
            title: "Default Social Sharing Image",
            type: "image",
            description:
                "Default image for social media sharing (for pages without specific OG images)",
            options: {
                hotspot: true,
            },
        },
        {
            name: "sectionsTitle",
            title: "Sections Configuration Title",
            type: "string",
            initialValue: "Website Sections Configuration",
            readOnly: true,
            description:
                "This is the main configuration for your website sections",
        },
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
                    description: "Show the main hero section with your profile",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show your service offerings",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show your technical skills and expertise",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show your project showcase",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show work experience and education",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show your professional certifications",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show client testimonials",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show service pricing plans",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show latest blog posts",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show contact information and form",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
                    description: "Show location map",
                },
                {
                    name: "resetAnimationOnView",
                    title: "Reset Animation on View",
                    type: "boolean",
                    initialValue: false,
                    description:
                        "Reset animations when scrolling back to this section",
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
            sectionsTitle: "sectionsTitle",
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
            sectionsTitle,
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
            sectionsTitle: string;
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
