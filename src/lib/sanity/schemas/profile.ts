import { Rule } from "sanity";
import seoFields from "./seoFields";

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
            name: "job_title",
            title: "Job Title",
            type: "string",
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Professional Summary",
            type: "text",
            validation: (Rule: Rule) => Rule.required(),
            description:
                "A compelling professional summary that highlights your expertise and value proposition",
        },
        {
            name: "location",
            title: "Location",
            type: "string",
        },
        {
            name: "email",
            title: "Email Address",
            type: "string",
            validation: (Rule: Rule) => Rule.required().email(),
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "string",
        },
        {
            name: "experience_years",
            title: "Years of Experience",
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
                            name: "url",
                            title: "URL",
                            type: "url",
                            validation: (Rule: Rule) => Rule.required(),
                        },
                        {
                            name: "platform",
                            title: "Platform",
                            type: "string",
                        },
                        {
                            name: "icon",
                            title: "Icon Image",
                            type: "image",
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: "alt",
                                    title: "Alternative Text",
                                    type: "string",
                                },
                                {
                                    name: "caption",
                                    title: "Caption",
                                    type: "string",
                                },
                            ],
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
            title: "Resume/CV",
            type: "file",
            description:
                "Upload your professional resume or CV as a PDF document",
            options: {
                accept: "application/pdf",
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        ...seoFields.fields,
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "job_title",
            media: "profile_image",
        },
    },
};
