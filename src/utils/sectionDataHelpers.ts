// ============================================================
// Utility: Section Data Helpers
// Purpose: Data normalization and section configuration utilities
// ============================================================

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

// ============================================================
// Constants
// ============================================================

/** Fallback data for when Sanity data is unavailable */
const FALLBACK_DATA = data;

/** Default vertical rule positions for each section */
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

/** Default section configuration when settings are unavailable */
const DEFAULT_SECTION_CONFIG: SectionConfigItem[] = [
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

/** Default map configuration */
const DEFAULT_MAP_CONFIG = {
    enabled: true,
    embedUrl: undefined,
    height: 580,
} as const;

/** Portfolio section configuration */
const PORTFOLIO_CONFIG = {
    MAX_ITEMS: 6,
} as const;

// ============================================================
// Types
// ============================================================

/** Vertical rule position options */
export type VerticalRulePosition = "left" | "right";

/** Contact data item structure */
interface ContactDataItem {
    type: string;
    value: string;
    label: string;
}

/** Section data result interface */
interface SectionDataResult {
    verticalRulePosition: VerticalRulePosition;
    [key: string]: any;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Gets vertical rule position for a section based on Sanity settings.
 * Provides fallback logic for when settings are unavailable.
 *
 * @param settings - Sanity settings object
 * @param sectionId - Section identifier
 * @param fallbackPosition - Fallback position if settings not available
 * @returns Vertical rule position
 *
 * @example
 * ```typescript
 * const position = getVerticalRulePosition(settings, "hero", "left");
 * console.log(position); // "left" or "right"
 * ```
 */
export const getVerticalRulePosition = (
    settings?: Settings | null,
    sectionId?: string,
    fallbackPosition: VerticalRulePosition = "right"
): VerticalRulePosition => {
    // Validate inputs
    if (!sectionId) {
        return fallbackPosition;
    }

    // Use per-section settings if available
    if (settings) {
        const sectionConfig = settings[sectionId as keyof Settings];

        if (
            sectionConfig &&
            typeof sectionConfig === "object" &&
            "verticalRuleDirection" in sectionConfig
        ) {
            const config = sectionConfig as SectionConfigItem;
            if (config.verticalRuleDirection) {
                return config.verticalRuleDirection;
            }
        }
    }

    // Fallback to section-specific defaults
    return SECTION_VERTICAL_RULE_DEFAULTS[sectionId] || fallbackPosition;
};

/**
 * Normalizes profile data with fallback support.
 * Ensures profile data is always available for rendering.
 *
 * @param profile - Profile data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized profile data
 *
 * @example
 * ```typescript
 * const profile = normalizeProfileData(sanityProfile, fallbackData);
 * console.log(profile.name); // Always available
 * ```
 */
export const normalizeProfileData = (
    profile?: Profile | null,
    fallbackData?: MockDataType
): Profile => {
    // Return Sanity profile if available
    if (profile) return profile;

    // Return fallback profile if available
    if (fallbackData?.profile) return fallbackData.profile;

    // Return default fallback profile
    return FALLBACK_DATA.profile;
};

/**
 * Normalizes array data with comprehensive fallback logic.
 * Handles various data states and provides consistent array output.
 *
 * @param data - Array data to normalize
 * @param fallbackData - Fallback array data
 * @param defaultFallback - Default fallback array
 * @returns Normalized array data
 *
 * @example
 * ```typescript
 * const services = normalizeArrayData(sanityServices, fallbackServices, []);
 * console.log(services.length); // Always >= 0
 * ```
 */
export const normalizeArrayData = <T>(
    data?: T[] | null,
    fallbackData?: T[],
    defaultFallback: T[] = []
): T[] => {
    // Return data if it's a valid non-empty array
    if (data && Array.isArray(data) && data.length > 0) {
        return data;
    }

    // Return fallback data if it's a valid non-empty array
    if (
        fallbackData &&
        Array.isArray(fallbackData) &&
        fallbackData.length > 0
    ) {
        return fallbackData;
    }

    // Return default fallback
    return defaultFallback;
};

/**
 * Generic normalize function for array data with fallback.
 * Provides a consistent interface for normalizing different data types.
 *
 * @param data - Array data to normalize
 * @param fallbackData - Fallback data object
 * @param dataKey - Key to extract from fallback data
 * @param defaultFallback - Default fallback array
 * @returns Normalized array data
 *
 * @example
 * ```typescript
 * const services = normalizeData(sanityServices, fallbackData, "services", []);
 * ```
 */
export const normalizeData = <T>(
    data: T[] | null | undefined,
    fallbackData: MockDataType,
    dataKey: keyof MockDataType,
    defaultFallback: T[] = []
): T[] => {
    return normalizeArrayData(
        data,
        fallbackData[dataKey] as T[],
        defaultFallback
    );
};

// ============================================================
// Specific Data Normalization Functions
// ============================================================

/**
 * Normalizes services data with fallback support.
 *
 * @param services - Services data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized services array
 */
export const normalizeServicesData = (
    services?: Service[] | null,
    fallbackData?: MockDataType
): Service[] => {
    return normalizeData(
        services,
        fallbackData || FALLBACK_DATA,
        "services",
        FALLBACK_DATA.services
    );
};

/**
 * Normalizes skills data with fallback support.
 *
 * @param skills - Skills data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized skills array
 */
export const normalizeSkillsData = (
    skills?: Skill[] | null,
    fallbackData?: MockDataType
): Skill[] => {
    return normalizeData(
        skills,
        fallbackData || FALLBACK_DATA,
        "skills",
        FALLBACK_DATA.skills
    );
};

/**
 * Normalizes projects data with fallback support.
 *
 * @param projects - Projects data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized projects array
 */
export const normalizeProjectsData = (
    projects?: Project[] | null,
    fallbackData?: MockDataType
): Project[] => {
    return normalizeData(
        projects,
        fallbackData || FALLBACK_DATA,
        "projects",
        FALLBACK_DATA.projects
    );
};

/**
 * Normalizes experience data with fallback support.
 *
 * @param experience - Experience data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized experience array
 */
export const normalizeExperienceData = (
    experience?: Experience[] | null,
    fallbackData?: MockDataType
): Experience[] => {
    return normalizeData(
        experience,
        fallbackData || FALLBACK_DATA,
        "experience",
        FALLBACK_DATA.experience
    );
};

/**
 * Normalizes education data with fallback support.
 *
 * @param education - Education data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized education array
 */
export const normalizeEducationData = (
    education?: Education[] | null,
    fallbackData?: MockDataType
): Education[] => {
    return normalizeData(
        education,
        fallbackData || FALLBACK_DATA,
        "education",
        FALLBACK_DATA.education
    );
};

/**
 * Normalizes testimonials data with fallback support.
 *
 * @param testimonials - Testimonials data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized testimonials array
 */
export const normalizeTestimonialsData = (
    testimonials?: Testimonial[] | null,
    fallbackData?: MockDataType
): Testimonial[] => {
    return normalizeData(
        testimonials,
        fallbackData || FALLBACK_DATA,
        "testimonials",
        FALLBACK_DATA.testimonials
    );
};

/**
 * Normalizes pricing data with fallback support.
 *
 * @param pricing - Pricing data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized pricing array
 */
export const normalizePricingData = (
    pricing?: Pricing[] | null,
    fallbackData?: MockDataType
): Pricing[] => {
    return normalizeData(
        pricing,
        fallbackData || FALLBACK_DATA,
        "pricing",
        FALLBACK_DATA.pricing
    );
};

/**
 * Normalizes blogs data with fallback support.
 *
 * @param blogs - Blogs data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized blogs array
 */
export const normalizeBlogsData = (
    blogs?: BlogPost[] | null,
    fallbackData?: MockDataType
): BlogPost[] => {
    return normalizeData(
        blogs,
        fallbackData || FALLBACK_DATA,
        "blogs",
        FALLBACK_DATA.blogs
    );
};

/**
 * Normalizes contact data from profile information.
 * Extracts contact information and filters out empty values.
 *
 * @param profile - Profile data containing contact information
 * @param fallbackData - Fallback data object
 * @returns Array of contact data items
 *
 * @example
 * ```typescript
 * const contactItems = normalizeContactData(profile, fallbackData);
 * console.log(contactItems); // [{ type: "email", value: "...", label: "Email" }]
 * ```
 */
export const normalizeContactData = (
    profile?: Profile | null,
    fallbackData?: MockDataType
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

    // Filter out items with empty values
    return contactItems.filter(
        (item) => item.value && item.value.trim() !== ""
    );
};

/**
 * Normalizes certificates data with fallback support.
 *
 * @param certificates - Certificates data from Sanity
 * @param fallbackData - Fallback data object
 * @returns Normalized certificates array
 */
export const normalizeCertificatesData = (
    certificates?: Certificate[] | null,
    fallbackData?: MockDataType
): Certificate[] => {
    return normalizeData(
        certificates,
        fallbackData || FALLBACK_DATA,
        "certificates",
        FALLBACK_DATA.certificates
    );
};

// ============================================================
// Section Configuration Functions
// ============================================================

/**
 * Normalizes section configuration data from Sanity settings.
 * Provides default configuration when settings are unavailable.
 *
 * @param settings - Sanity settings object
 * @returns Array of section configuration items
 *
 * @example
 * ```typescript
 * const sections = normalizeSectionConfigData(settings);
 * console.log(sections); // [{ id: "hero", enabled: true }, ...]
 * ```
 */
export const normalizeSectionConfigData = (
    settings?: Settings | null
): SectionConfigItem[] => {
    // Return default configuration if no settings
    if (!settings) {
        return [...DEFAULT_SECTION_CONFIG];
    }

    // Build sections array with settings data
    const sections: SectionConfigItem[] = [
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

// ============================================================
// Section Data Retrieval Functions
// ============================================================

/**
 * Gets normalized data for a specific section.
 * Provides section-specific data with fallback support and vertical rule positioning.
 *
 * @param sectionId - Section identifier
 * @param props - Section props containing data
 * @param fallbackData - Fallback data object
 * @returns Normalized section data
 *
 * @example
 * ```typescript
 * const heroData = getSectionData("hero", props, fallbackData);
 * console.log(heroData.profile); // Normalized profile data
 * console.log(heroData.verticalRulePosition); // "left" or "right"
 * ```
 */
export const getSectionData = (
    sectionId: string,
    props: any,
    fallbackData?: MockDataType
): SectionDataResult => {
    // Get vertical rule position for the section
    const verticalRulePosition = getVerticalRulePosition(
        props.settings,
        sectionId
    );

    // Handle different section types
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
            // Return minimal data for unknown sections
            return {
                verticalRulePosition,
            };
    }
};
