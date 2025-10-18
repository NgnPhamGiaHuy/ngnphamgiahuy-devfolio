import { data } from "@/data";
import {
    MockDataType,
    Profile,
    Service,
    Skill,
    Project,
    Experience,
    Education,
    Testimonial,
    Pricing,
    BlogPost,
    Certificate,
    SectionConfigItem,
    Settings,
} from "@/types";

const FALLBACK_DATA = data;

export const normalizeProfileData = (
    profile?: Profile | null,
    fallbackData?: MockDataType
): Profile => {
    if (profile) return profile;
    if (fallbackData?.profile) return fallbackData.profile;
    return FALLBACK_DATA.profile;
};

export const normalizeArrayData = <T>(
    data?: T[] | null,
    fallbackData?: T[],
    defaultFallback: T[] = []
): T[] => {
    if (data && Array.isArray(data) && data.length > 0) return data;
    if (fallbackData && Array.isArray(fallbackData) && fallbackData.length > 0)
        return fallbackData;
    return defaultFallback;
};

export const normalizeServicesData = (
    services?: Service[] | null,
    fallbackData?: MockDataType
): Service[] => {
    return normalizeArrayData(
        services,
        fallbackData?.services,
        FALLBACK_DATA.services
    );
};

export const normalizeSkillsData = (
    skills?: Skill[] | null,
    fallbackData?: MockDataType
): Skill[] => {
    return normalizeArrayData(
        skills,
        fallbackData?.skills,
        FALLBACK_DATA.skills
    );
};

export const normalizeProjectsData = (
    projects?: Project[] | null,
    fallbackData?: MockDataType
): Project[] => {
    return normalizeArrayData(
        projects,
        fallbackData?.projects,
        FALLBACK_DATA.projects
    );
};

export const normalizeExperienceData = (
    experience?: Experience[] | null,
    fallbackData?: MockDataType
): Experience[] => {
    return normalizeArrayData(
        experience,
        fallbackData?.experience,
        FALLBACK_DATA.experience
    );
};

export const normalizeEducationData = (
    education?: Education[] | null,
    fallbackData?: MockDataType
): Education[] => {
    return normalizeArrayData(
        education,
        fallbackData?.education,
        FALLBACK_DATA.education
    );
};

export const normalizeTestimonialsData = (
    testimonials?: Testimonial[] | null,
    fallbackData?: MockDataType
): Testimonial[] => {
    return normalizeArrayData(
        testimonials,
        fallbackData?.testimonials,
        FALLBACK_DATA.testimonials
    );
};

export const normalizePricingData = (
    pricing?: Pricing[] | null,
    fallbackData?: MockDataType
): Pricing[] => {
    return normalizeArrayData(
        pricing,
        fallbackData?.pricing,
        FALLBACK_DATA.pricing
    );
};

export const normalizeBlogsData = (
    blogs?: BlogPost[] | null,
    fallbackData?: MockDataType
): BlogPost[] => {
    return normalizeArrayData(blogs, fallbackData?.blogs, FALLBACK_DATA.blogs);
};

export const normalizeContactData = (
    profile?: Profile | null,
    fallbackData?: MockDataType
): Array<{ type: string; value: string; label: string }> => {
    const normalizedProfile = normalizeProfileData(profile, fallbackData);

    return [
        {
            type: "email",
            value: normalizedProfile.email,
            label: "Email",
        },
        {
            type: "phone",
            value: normalizedProfile.phone || "",
            label: "Phone",
        },
        {
            type: "location",
            value: normalizedProfile.location || "",
            label: "Location",
        },
    ].filter((item) => item.value);
};
export const normalizeCertificatesData = (
    certificates?: Certificate[] | null,
    fallbackData?: MockDataType
): Certificate[] => {
    return normalizeArrayData(
        certificates,
        fallbackData?.certificates,
        FALLBACK_DATA.certificates
    );
};

export const normalizeSectionConfigData = (
    settings?: Settings | null
): SectionConfigItem[] => {
    if (!settings) {
        return [
            { id: "hero", enabled: true },
            { id: "services", enabled: true, resetAnimationOnView: false },
            { id: "skills", enabled: true, resetAnimationOnView: false },
            { id: "portfolios", enabled: true, resetAnimationOnView: false },
            { id: "resume", enabled: true, resetAnimationOnView: false },
            { id: "certificates", enabled: true, resetAnimationOnView: false },
            { id: "testimonials", enabled: true, resetAnimationOnView: false },
            { id: "pricing", enabled: true, resetAnimationOnView: false },
            { id: "blog", enabled: true, resetAnimationOnView: false },
            { id: "contact", enabled: true, resetAnimationOnView: false },
            { id: "map", enabled: true },
        ];
    }

    const sections = [
        { id: "hero", ...settings.hero },
        { id: "services", ...settings.services },
        { id: "skills", ...settings.skills },
        { id: "portfolios", ...settings.portfolios },
        { id: "resume", ...settings.resume },
        { id: "certificates", ...settings.certificates },
        { id: "testimonials", ...settings.testimonials },
        { id: "pricing", ...settings.pricing },
        { id: "blog", ...settings.blog },
        { id: "contact", ...settings.contact },
        { id: "map", ...settings.map },
    ];

    return sections; // All sections now have id field
};

export const getSectionData = (
    sectionId: string,
    props: any,
    fallbackData?: MockDataType
) => {
    switch (sectionId) {
        case "hero":
            return {
                profile: normalizeProfileData(props.profile, fallbackData),
                projects: normalizeProjectsData(props.projects, fallbackData),
            };

        case "services":
            return {
                services: normalizeServicesData(props.services, fallbackData),
            };

        case "skills":
            return {
                skills: normalizeSkillsData(props.skills, fallbackData),
            };

        case "portfolios":
            return {
                maxItems: 6,
                projects: normalizeProjectsData(props.projects, fallbackData),
            };

        case "resume":
            return {
                experience: normalizeExperienceData(
                    props.experience,
                    fallbackData
                ),
                education: normalizeEducationData(
                    props.education,
                    fallbackData
                ),
            };

        case "certificates":
            return {
                certificates: normalizeCertificatesData(
                    props.certificates,
                    fallbackData
                ),
            };

        case "testimonials":
            return {
                testimonials: normalizeTestimonialsData(
                    props.testimonials,
                    fallbackData
                ),
            };

        case "pricing":
            return {
                pricing: normalizePricingData(props.pricing, fallbackData),
            };

        case "blog":
            return {
                blogs: normalizeBlogsData(props.blogs, fallbackData),
            };

        case "contact":
            return {
                contactItems: normalizeContactData(props.profile, fallbackData),
            };

        case "map":
            return {
                profile: normalizeProfileData(props.profile, fallbackData),
            };

        default:
            return {};
    }
};
