import createCertificate from "@/infrastructure/persistence/mocks/factories/certificate.factory";
import createEducation from "@/infrastructure/persistence/mocks/factories/education.factory";
import createExperience from "@/infrastructure/persistence/mocks/factories/experience.factory";
import createPricing from "@/infrastructure/persistence/mocks/factories/pricing.factory";
import createProject from "@/infrastructure/persistence/mocks/factories/project.factory";
import createService from "@/infrastructure/persistence/mocks/factories/service.factory";
import createSkill from "@/infrastructure/persistence/mocks/factories/skill.factory";
import createTestimonial from "@/infrastructure/persistence/mocks/factories/testimonial.factory";
import createBlogPost from "@/infrastructure/persistence/mocks/factories/blog-post.factory";

export const mockFactories = {
    certificate: createCertificate,
    education: createEducation,
    experience: createExperience,
    pricing: createPricing,
    project: createProject,
    service: createService,
    skill: createSkill,
    testimonial: createTestimonial,
    blogPost: createBlogPost,
};

export type MockFactoryKey = keyof typeof mockFactories;
