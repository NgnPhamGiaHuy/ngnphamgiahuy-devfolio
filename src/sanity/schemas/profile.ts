import { Rule } from "sanity";

export default {
    name: "profile",
    title: "Profile",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        },
        {
            name: "job_title",
            title: "Job Title",
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
            name: "location",
            title: "Location",
            type: "string",
        },
        {
            name: "experience_years",
            title: "Years of Experience",
            type: "number",
            validation: (Rule: Rule) => Rule.required().min(0),
        },
        {
            name: "completed_projects",
            title: "Completed Projects",
            type: "number",
            validation: (Rule: Rule) => Rule.required().min(0),
        },
        {
            name: "profile_image",
            title: "Profile Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alternative Text",
                    type: "string",
                },
            ],
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "social_links",
            title: "Social Links",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Facebook", value: "Facebook" },
                                    { title: "Twitter", value: "Twitter" },
                                    { title: "Instagram", value: "Instagram" },
                                    { title: "LinkedIn", value: "Linkedin" },
                                    { title: "GitHub", value: "GitHub" },
                                    { title: "YouTube", value: "YouTube" },
                                    { title: "Dribbble", value: "Dribbble" },
                                    { title: "Behance", value: "Behance" },
                                    { title: "Medium", value: "Medium" },
                                ],
                            },
                        },
                        {
                            name: "url",
                            title: "URL",
                            type: "url",
                            validation: (Rule: Rule) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            title: "platform",
                            subtitle: "url",
                        },
                    },
                },
            ],
        },
        {
            name: "cv_link",
            title: "CV/Resume Download Link",
            type: "url",
            description: "Link to downloadable CV/Resume file",
        },
        {
            name: "metaTitle",
            title: "Meta Title",
            type: "string",
            description: "Title for SEO purposes",
        },
        {
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            description: "Description for SEO purposes",
        },
        {
            name: "ogImage",
            title: "Social Sharing Image",
            type: "image",
            description: "Image for social media sharing",
            options: {
                hotspot: true,
            },
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "job_title",
            media: "profile_image",
        },
    },
};
