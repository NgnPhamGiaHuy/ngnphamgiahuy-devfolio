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

let _fallbackData: CompleteMockData | null = null;

const getFallbackData = (): CompleteMockData => {
    if (!_fallbackData) {
        _fallbackData = createMockData();
    }
    return _fallbackData;
};

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

    return getFallbackData().profile;
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

/**
 * Factory producing an array normalizer bound to a mock-data key.
 * Replaces nine near-identical `normalize<Section>Data` wrappers.
 */
const createArrayNormalizer =
    <T>(dataKey: keyof MockDataType) =>
    (
        data?: T[] | null,
        fallbackData?: MockDataType | CompleteMockData
    ): T[] => {
        const fallback = fallbackData || toMockDataType(getFallbackData());
        return normalizeData(
            data,
            fallback,
            dataKey,
            getFallbackData()[dataKey] as T[]
        );
    };

export const normalizeServicesData =
    createArrayNormalizer<ServiceType>("services");
export const normalizeSkillsData = createArrayNormalizer<SkillType>("skills");
export const normalizeProjectsData =
    createArrayNormalizer<ProjectType>("projects");
export const normalizeExperienceData =
    createArrayNormalizer<ExperienceType>("experience");
export const normalizeEducationData =
    createArrayNormalizer<EducationType>("education");
export const normalizeTestimonialsData =
    createArrayNormalizer<TestimonialType>("testimonials");
export const normalizePricingData =
    createArrayNormalizer<PricingType>("pricing");
export const normalizeBlogsData = createArrayNormalizer<BlogPostType>("blogs");
export const normalizeCertificatesData =
    createArrayNormalizer<CertificateType>("certificates");

export const normalizeContactData = (
    profile?: ProfileType | null,
    fallbackData?: MockDataType | CompleteMockData
): ContactDataItem[] => {
    const normalizedProfile = normalizeProfileData(profile, fallbackData);

    const contactItems: ContactDataItem[] = [
        { type: "email", value: normalizedProfile.email, label: "Email" },
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

export const normalizeSectionConfigData = (
    settings?: SettingsType | null
): SectionConfigItemType[] => {
    if (!settings) {
        return [...DEFAULT_SECTION_CONFIG];
    }

    return [
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
};

type SectionBuilder = (
    props: any,
    fallbackData?: MockDataType | CompleteMockData
) => Record<string, unknown>;

/**
 * Maps a section id to the data it needs. Replaces the former 11-case switch.
 */
const SECTION_BUILDERS: Record<string, SectionBuilder> = {
    hero: (props, fb) => ({
        profile: normalizeProfileData(props.profile, fb),
        projects: normalizeProjectsData(props.projects, fb),
    }),
    services: (props, fb) => ({
        services: normalizeServicesData(props.services, fb),
    }),
    skills: (props, fb) => ({
        skills: normalizeSkillsData(props.skills, fb),
    }),
    portfolios: (props, fb) => ({
        maxItems: PORTFOLIO_CONFIG.MAX_ITEMS,
        projects: normalizeProjectsData(props.projects, fb),
    }),
    resume: (props, fb) => ({
        experience: normalizeExperienceData(props.experience, fb),
        education: normalizeEducationData(props.education, fb),
    }),
    certificates: (props, fb) => ({
        certificates: normalizeCertificatesData(props.certificates, fb),
    }),
    testimonials: (props, fb) => ({
        testimonials: normalizeTestimonialsData(props.testimonials, fb),
    }),
    pricing: (props, fb) => ({
        pricing: normalizePricingData(props.pricing, fb),
    }),
    blog: (props, fb) => ({
        blogs: normalizeBlogsData(props.blogs, fb),
    }),
    contact: (props, fb) => ({
        contactItems: normalizeContactData(props.profile, fb),
    }),
    map: (props) => ({
        mapConfig: props.settings?.map || DEFAULT_MAP_CONFIG,
    }),
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

    const builder = SECTION_BUILDERS[sectionId];

    return {
        ...(builder ? builder(props, fallbackData) : {}),
        verticalRulePosition,
    };
};
