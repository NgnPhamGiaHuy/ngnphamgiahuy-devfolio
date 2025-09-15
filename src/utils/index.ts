// Utility functions
export { contactFormSchema, type ContactFormData } from "./contactFormSchema";
export { getHeaderClasses } from "./headerUtils";
export { resolveImageUrl, getImageAlt, processImage, processPortfolioImage } from "./imageUtils";
export { useKeyboardHandler } from "./keyboardUtils";
export { sectionComponents, renderSection } from "./sectionComponents";
export { generateSocialLinks, getIconForPlatform } from "./socialLinks";
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
  normalizeContactsData
} from "./sectionDataHelpers";
