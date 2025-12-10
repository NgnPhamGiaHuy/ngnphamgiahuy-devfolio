import { faker } from "@faker-js/faker";
import { z } from "zod";

import {
    createBlogPost,
    createCertificate,
    createEducation,
    createExperience,
    createPricing,
    createProfile,
    createProject,
    createService,
    createSkill,
    createTestimonial,
} from "./factories";
import BlogPostSchema from "@/schemas/content/blog-post.schema";
import CertificateSchema from "@/schemas/content/certificate.schema";
import EducationSchema from "@/schemas/content/education.schema";
import ExperienceSchema from "@/schemas/content/experience.schema";
import PricingSchema from "@/schemas/content/pricing.schema";
import ProfileSchema from "@/schemas/content/profile.schema";
import ProjectSchema from "@/schemas/content/project.schema";
import ServiceSchema from "@/schemas/content/service.schema";
import SkillSchema from "@/schemas/content/skill.schema";
import TestimonialSchema from "@/schemas/content/testimonial.schema";
import MockDataSchema from "@/schemas/mock/mock-data.schema";
import MapConfigItemSchema from "@/schemas/setting/map-config-item.schema";
import SectionConfigItemSchema from "@/schemas/setting/section-config-item.schema";
import SettingSchema from "@/schemas/setting/setting.schema";

type BlogPost = z.infer<typeof BlogPostSchema>;
type Certificate = z.infer<typeof CertificateSchema>;
type Education = z.infer<typeof EducationSchema>;
type Experience = z.infer<typeof ExperienceSchema>;
type Pricing = z.infer<typeof PricingSchema>;
type Profile = z.infer<typeof ProfileSchema>;
type Project = z.infer<typeof ProjectSchema>;
type Service = z.infer<typeof ServiceSchema>;
type Skill = z.infer<typeof SkillSchema>;
type Testimonial = z.infer<typeof TestimonialSchema>;
type Setting = z.infer<typeof SettingSchema>;

const CompleteMockDataSchema = MockDataSchema.extend({
    settings: SettingSchema,
});

export type CompleteMockData = z.infer<typeof CompleteMockDataSchema>;

type SingleOptions<T> = {
    overrides?: Partial<T>;
};

type CollectionOptions<T> = {
    count?: number;
    overrides?: Array<Partial<T>>;
    all?: Partial<T>;
};

type SettingsOptions = {
    overrides?: Partial<Setting>;
    sectionStates?: Partial<Record<SettingSectionKey, boolean>>;
    mapEmbedUrl?: string;
};

export type CreateMockDataOptions = {
    logo?: string;
    profile?: SingleOptions<Profile>;
    services?: CollectionOptions<Service>;
    skills?: CollectionOptions<Skill>;
    projects?: CollectionOptions<Project> & { featuredCount?: number };
    education?: CollectionOptions<Education>;
    experience?: CollectionOptions<Experience>;
    testimonials?: CollectionOptions<Testimonial>;
    pricing?: CollectionOptions<Pricing>;
    blogs?: CollectionOptions<BlogPost>;
    certificates?: CollectionOptions<Certificate>;
    settings?: SettingsOptions;
};

type SettingSectionKey =
    | "hero"
    | "services"
    | "skills"
    | "portfolios"
    | "resume"
    | "certificates"
    | "testimonials"
    | "pricing"
    | "blog"
    | "contact"
    | "map";

type FactoryWithOverrides<T> = (overrides?: Partial<T>) => T;

const withOverrides = <T>(
    factory: () => T,
    schema: z.ZodSchema<T>
): FactoryWithOverrides<T> => {
    return (overrides: Partial<T> = {}) =>
        schema.parse({ ...factory(), ...overrides });
};

const createProfileWithOverrides = withOverrides(createProfile, ProfileSchema);
const createServiceWithOverrides = withOverrides(createService, ServiceSchema);
const createSkillWithOverrides = withOverrides(createSkill, SkillSchema);
const createProjectWithOverrides = withOverrides(createProject, ProjectSchema);
const createEducationWithOverrides = withOverrides(
    createEducation,
    EducationSchema
);
const createExperienceWithOverrides = withOverrides(
    createExperience,
    ExperienceSchema
);
const createTestimonialWithOverrides = withOverrides(
    createTestimonial,
    TestimonialSchema
);
const createPricingWithOverrides = withOverrides(createPricing, PricingSchema);
const createBlogPostWithOverrides = withOverrides(
    createBlogPost,
    BlogPostSchema
);
const createCertificateWithOverrides = withOverrides(
    createCertificate,
    CertificateSchema
);

type ListArgs<T> = {
    count: number;
    factory: FactoryWithOverrides<T>;
    shared?: Partial<T>;
    overrides?: Array<Partial<T>>;
    derive?: (index: number) => Partial<T>;
};

const generateList = <T>({
    count,
    factory,
    shared,
    overrides = [],
    derive,
}: ListArgs<T>): T[] => {
    return Array.from({ length: count }, (_, index) =>
        factory({
            ...shared,
            ...(derive ? derive(index) : {}),
            ...(overrides[index] ?? {}),
        })
    );
};

import { DEFAULT_MOCK_COUNTS } from "./config";

const DEFAULT_COUNTS = DEFAULT_MOCK_COUNTS;

const pickRandom = <T>(items: T[]): T | undefined =>
    items.length ? faker.helpers.arrayElement(items) : undefined;

const buildSection = (
    key: SettingSectionKey,
    sectionStates?: Partial<Record<SettingSectionKey, boolean>>
) =>
    SectionConfigItemSchema.parse({
        id: key,
        enabled: sectionStates?.[key] ?? true,
        resetAnimationOnView: false,
    });

const buildSettings = (
    logo: string,
    sectionStates?: Partial<Record<SettingSectionKey, boolean>>,
    mapEmbedUrl?: string,
    overrides: Partial<Setting> = {}
): Setting => {
    const city = faker.location.city();
    const data = {
        _id: faker.string.uuid(),
        _type: "settings",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),
        metaTitle: faker.company.name(),
        metaDescription: faker.lorem.sentence(),
        logo,
        hero: buildSection("hero", sectionStates),
        services: buildSection("services", sectionStates),
        skills: buildSection("skills", sectionStates),
        portfolios: buildSection("portfolios", sectionStates),
        resume: buildSection("resume", sectionStates),
        certificates: buildSection("certificates", sectionStates),
        testimonials: buildSection("testimonials", sectionStates),
        pricing: buildSection("pricing", sectionStates),
        blog: buildSection("blog", sectionStates),
        contact: buildSection("contact", sectionStates),
        map: MapConfigItemSchema.parse({
            ...buildSection("map", sectionStates),
            embedUrl:
                mapEmbedUrl ??
                `https://www.google.com/maps?q=${encodeURIComponent(city)}`,
            height: 320,
        }),
    };

    return SettingSchema.parse({ ...data, ...overrides });
};

export const createMockData = (
    options: CreateMockDataOptions = {}
): CompleteMockData => {
    const logo = options.logo ?? faker.image.url();

    const profile = createProfileWithOverrides(options.profile?.overrides);

    const services = generateList<Service>({
        count: options.services?.count ?? DEFAULT_COUNTS.services,
        factory: createServiceWithOverrides,
        shared: options.services?.all,
        overrides: options.services?.overrides,
    });

    const skills = generateList<Skill>({
        count: options.skills?.count ?? DEFAULT_COUNTS.skills,
        factory: createSkillWithOverrides,
        shared: options.skills?.all,
        overrides: options.skills?.overrides,
    });

    const serviceCategories = services.map((service) => service.category);
    const skillNames = skills.map((skill) => skill.name);
    const blogCategoryPool = [...serviceCategories, ...skillNames];

    const projects = generateList<Project>({
        count: options.projects?.count ?? DEFAULT_COUNTS.projects,
        factory: createProjectWithOverrides,
        shared: options.projects?.all,
        overrides: options.projects?.overrides,
        derive: (index) => ({
            category:
                pickRandom(serviceCategories) ?? faker.commerce.department(),
            featured:
                index <
                (options.projects?.featuredCount ??
                    Math.max(
                        1,
                        Math.floor(
                            (options.projects?.count ??
                                DEFAULT_COUNTS.projects) / 3
                        )
                    )),
        }),
    });

    const education = generateList<Education>({
        count: options.education?.count ?? DEFAULT_COUNTS.education,
        factory: createEducationWithOverrides,
        shared: options.education?.all,
        overrides: options.education?.overrides,
    });

    const experience = generateList<Experience>({
        count: options.experience?.count ?? DEFAULT_COUNTS.experience,
        factory: createExperienceWithOverrides,
        shared: options.experience?.all,
        overrides: options.experience?.overrides,
    });

    const testimonials = generateList<Testimonial>({
        count: options.testimonials?.count ?? DEFAULT_COUNTS.testimonials,
        factory: createTestimonialWithOverrides,
        shared: options.testimonials?.all,
        overrides: options.testimonials?.overrides,
        derive: () => ({
            position:
                pickRandom(services)?.title ??
                faker.helpers.arrayElement([
                    "Client",
                    "Partner",
                    "Mentor",
                    "Manager",
                ]),
        }),
    });

    const pricing = generateList<Pricing>({
        count: options.pricing?.count ?? DEFAULT_COUNTS.pricing,
        factory: createPricingWithOverrides,
        shared: options.pricing?.all,
        overrides: options.pricing?.overrides,
        derive: (index) => ({ highlight: index === 0 }),
    });

    const blogs = generateList<BlogPost>({
        count: options.blogs?.count ?? DEFAULT_COUNTS.blogs,
        factory: createBlogPostWithOverrides,
        shared: options.blogs?.all,
        overrides: options.blogs?.overrides,
        derive: () => ({
            author: profile.name,
            categories:
                faker.helpers.arrayElements(
                    blogCategoryPool.length
                        ? blogCategoryPool
                        : ["tech", "engineering"],
                    faker.number.int({ min: 1, max: 3 })
                ) ?? [],
        }),
    });

    const certificates = generateList<Certificate>({
        count: options.certificates?.count ?? DEFAULT_COUNTS.certificates,
        factory: createCertificateWithOverrides,
        shared: options.certificates?.all,
        overrides: options.certificates?.overrides,
    });

    const settings = buildSettings(
        logo,
        options.settings?.sectionStates,
        options.settings?.mapEmbedUrl,
        options.settings?.overrides
    );

    return CompleteMockDataSchema.parse({
        logo,
        profile,
        services,
        skills,
        projects,
        education,
        experience,
        testimonials,
        pricing,
        blogs,
        certificates,
        settings,
    });
};

export default createMockData;
