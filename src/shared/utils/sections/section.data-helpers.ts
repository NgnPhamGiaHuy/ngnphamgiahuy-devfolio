import type {
    BlogPostType,
    CertificateType,
    EducationType,
    ExperienceType,
    MockDataType,
    PricingType,
    ProfileType,
    ProjectType,
    SectionConfigItemType,
    ServiceType,
    SettingsType,
    SkillType,
    TestimonialType,
} from "@/schemas";

import { type CompleteMockData, createMockData } from "@/infrastructure";

const FALLBACK_DATA = createMockData();

const toMockDataType = (data: CompleteMockData): MockDataType => ({
    logo: data.logo,
    profile: data.profile,
    services: data.services,
    skills: data.skills,
    projects: data.projects,
    education: data.education,
    experience: data.experience,
    testimonials: data.testimonials,
    pricing: data.pricing,
    blogs: data.blogs,
    certificates: data.certificates,
});

const SECTION_VERTICAL_RULE_DEFAULTS: Record<string, "left" | "right"> = {
    hero: "left",
    services: "right",
    skills: "left",
    portfolios: "right",
    resume: "left",
    certificates: "right",
    testimonials: "left",
    pricing: "right",
    blog: "left",
    contact: "right",
    map: "left",
} as const;

const DEFAULT_SECTION_CONFIG: SectionConfigItemType[] = [
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
] as const;

const DEFAULT_MAP_CONFIG = {
    enabled: true,
    embedUrl: undefined,
    height: 580,
} as const;

const PORTFOLIO_CONFIG = {
    MAX_ITEMS: 6,
} as const;

export type VerticalRulePosition = "left" | "right";

interface ContactDataItem {
    type: string;
    value: string;
    label: string;
}

interface SectionDataResult {
    verticalRulePosition: VerticalRulePosition;
    [key: string]: any;
}

export const getVerticalRulePosition = (
    settings?: SettingsType | null,
    sectionId?: string,
    fallbackPosition: VerticalRulePosition = "right"
): VerticalRulePosition => {
    if (!sectionId) {
        return fallbackPosition;
    }

    if (settings) {
        const sectionConfig = settings[sectionId as keyof SettingsType];

        if (
            sectionConfig &&
            typeof sectionConfig === "object" &&
            "verticalRuleDirection" in sectionConfig
        ) {
            const config = sectionConfig as SectionConfigItemType;
            if (config.verticalRuleDirection) {
                return config.verticalRuleDirection;
            }
        }
    }

    return SECTION_VERTICAL_RULE_DEFAULTS[sectionId] || fallbackPosition;
};

export const normalizeProfileData = (
    profile?: ProfileType | null,
    fallbackData?: MockDataType | CompleteMockData
): ProfileType => {
    if (profile) return profile;

    if (fallbackData?.profile) return fallbackData.profile;

    return FALLBACK_DATA.profile;
};

export const normalizeArrayData = <T>(
    data?: T[] | null,
    fallbackData?: T[],
    defaultFallback: T[] = []
): T[] => {
    if (data && Array.isArray(data) && data.length > 0) {
        return data;
    }

    if (
        fallbackData &&
        Array.isArray(fallbackData) &&
        fallbackData.length > 0
    ) {
        return fallbackData;
    }

    return defaultFallback;
};

export const normalizeData = <T>(
    data: T[] | null | undefined,
    fallbackData: MockDataType | CompleteMockData,
    dataKey: keyof MockDataType,
    defaultFallback: T[] = []
): T[] => {
    return normalizeArrayData(
        data,
        fallbackData[dataKey] as T[],
        defaultFallback
    );
};

export const normalizeServicesData = (
    services?: ServiceType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): ServiceType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(
        services,
        fallback,
        "services",
        FALLBACK_DATA.services
    );
};

export const normalizeSkillsData = (
    skills?: SkillType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): SkillType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(skills, fallback, "skills", FALLBACK_DATA.skills);
};

export const normalizeProjectsData = (
    projects?: ProjectType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): ProjectType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(
        projects,
        fallback,
        "projects",
        FALLBACK_DATA.projects
    );
};

export const normalizeExperienceData = (
    experience?: ExperienceType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): ExperienceType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(
        experience,
        fallback,
        "experience",
        FALLBACK_DATA.experience
    );
};

export const normalizeEducationData = (
    education?: EducationType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): EducationType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(
        education,
        fallback,
        "education",
        FALLBACK_DATA.education
    );
};

export const normalizeTestimonialsData = (
    testimonials?: TestimonialType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): TestimonialType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(
        testimonials,
        fallback,
        "testimonials",
        FALLBACK_DATA.testimonials
    );
};

export const normalizePricingData = (
    pricing?: PricingType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): PricingType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(pricing, fallback, "pricing", FALLBACK_DATA.pricing);
};

export const normalizeBlogsData = (
    blogs?: BlogPostType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): BlogPostType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(blogs, fallback, "blogs", FALLBACK_DATA.blogs);
};

export const normalizeContactData = (
    profile?: ProfileType | null,
    fallbackData?: MockDataType | CompleteMockData
): ContactDataItem[] => {
    const normalizedProfile = normalizeProfileData(profile, fallbackData);

    const contactItems: ContactDataItem[] = [
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
    ];

    return contactItems.filter(
        (item) => item.value && item.value.trim() !== ""
    );
};

export const normalizeCertificatesData = (
    certificates?: CertificateType[] | null,
    fallbackData?: MockDataType | CompleteMockData
): CertificateType[] => {
    const fallback = fallbackData || toMockDataType(FALLBACK_DATA);

    return normalizeData(
        certificates,
        fallback,
        "certificates",
        FALLBACK_DATA.certificates
    );
};

export const normalizeSectionConfigData = (
    settings?: SettingsType | null
): SectionConfigItemType[] => {
    if (!settings) {
        return [...DEFAULT_SECTION_CONFIG];
    }

    const sections: SectionConfigItemType[] = [
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

    return sections;
};

export const getSectionData = (
    sectionId: string,
    props: any,
    fallbackData?: MockDataType | CompleteMockData
): SectionDataResult => {
    const verticalRulePosition = getVerticalRulePosition(
        props.settings,
        sectionId
    );

    switch (sectionId) {
        case "hero":
            return {
                profile: normalizeProfileData(props.profile, fallbackData),
                projects: normalizeProjectsData(props.projects, fallbackData),
                verticalRulePosition,
            };

        case "services":
            return {
                services: normalizeServicesData(props.services, fallbackData),
                verticalRulePosition,
            };

        case "skills":
            return {
                skills: normalizeSkillsData(props.skills, fallbackData),
                verticalRulePosition,
            };

        case "portfolios":
            return {
                maxItems: PORTFOLIO_CONFIG.MAX_ITEMS,
                projects: normalizeProjectsData(props.projects, fallbackData),
                verticalRulePosition,
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
                verticalRulePosition,
            };

        case "certificates":
            return {
                certificates: normalizeCertificatesData(
                    props.certificates,
                    fallbackData
                ),
                verticalRulePosition,
            };

        case "testimonials":
            return {
                testimonials: normalizeTestimonialsData(
                    props.testimonials,
                    fallbackData
                ),
                verticalRulePosition,
            };

        case "pricing":
            return {
                pricing: normalizePricingData(props.pricing, fallbackData),
                verticalRulePosition,
            };

        case "blog":
            return {
                blogs: normalizeBlogsData(props.blogs, fallbackData),
                verticalRulePosition,
            };

        case "contact":
            return {
                contactItems: normalizeContactData(props.profile, fallbackData),
                verticalRulePosition,
            };

        case "map":
            return {
                mapConfig: props.settings?.map || DEFAULT_MAP_CONFIG,
                verticalRulePosition,
            };

        default:
            return {
                verticalRulePosition,
            };
    }
};
