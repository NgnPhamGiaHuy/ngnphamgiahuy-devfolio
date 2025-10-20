export { contactFormSchema, type ContactFormData } from "./contactFormSchema";
export { getHeaderClasses, type HeaderState } from "./headerUtils";
export {
    resolveImageUrl,
    getImageAlt,
    processImage,
    processPortfolioImage,
} from "./imageUtils";
export { useKeyboardHandler } from "./keyboardUtils";
export { sectionComponents, renderSection } from "./sectionComponents";
export {
    getSectionData,
    normalizeProfileData,
    normalizeServicesData,
    normalizeSkillsData,
    normalizeProjectsData,
    normalizeExperienceData,
    normalizeEducationData,
    normalizeTestimonialsData,
    normalizePricingData,
    normalizeBlogsData,
    normalizeCertificatesData,
    normalizeContactData,
    normalizeSectionConfigData,
} from "./sectionDataHelpers";
export { generateSocialLinks, getIconForPlatform } from "./socialLinks";
export { formatDate } from "./dateUtils";
