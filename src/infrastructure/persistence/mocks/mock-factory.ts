import createBlogPost from "./factories/blog-post.factory";
import createCertificate from "./factories/certificate.factory";
import createEducation from "./factories/education.factory";
import createExperience from "./factories/experience.factory";
import createPricing from "./factories/pricing.factory";
import createProject from "./factories/project.factory";
import createService from "./factories/service.factory";
import createSkill from "./factories/skill.factory";
import createTestimonial from "./factories/testimonial.factory";
import createProfile from "@/infrastructure/persistence/mocks/factories/profile.factory";

export const MockRegistry = {
    blogPost: createBlogPost,
    certificate: createCertificate,
    education: createEducation,
    experience: createExperience,
    pricing: createPricing,
    profile: createProfile,
    project: createProject,
    service: createService,
    skill: createSkill,
    testimonial: createTestimonial,
} as const;

export type MockType = keyof typeof MockRegistry;

export type MockReturn<T extends MockType> = ReturnType<
    (typeof MockRegistry)[T]
>;

export function createMock<T extends MockType>(
    type: T,
    overrides: Partial<MockReturn<T>> = {}
): MockReturn<T> {
    return MockRegistry[type](overrides);
}

export function createMany<T extends MockType>(
    type: T,
    count: number
): MockReturn<T>[] {
    return Array.from({ length: count }, () => createMock(type));
}
