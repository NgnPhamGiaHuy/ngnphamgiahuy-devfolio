export {
    createMockData,
    type CompleteMockData,
    type CreateMockDataOptions,
} from "./create-mock-data";

export { default as createBlogPost } from "./factories/blog-post.factory";
export { default as createCertificate } from "./factories/certificate.factory";
export { default as createEducation } from "./factories/education.factory";
export { default as createExperience } from "./factories/experience.factory";
export { default as createPricing } from "./factories/pricing.factory";
export { default as createProfile } from "./factories/profile.factory";
export { default as createProject } from "./factories/project.factory";
export { default as createService } from "./factories/service.factory";
export { default as createSkill } from "./factories/skill.factory";
export { default as createTestimonial } from "./factories/testimonial.factory";

export {
    fakeSanityImage,
    fakeSanityDocument,
    fakeSanityReference,
} from "./factories/sanity";
