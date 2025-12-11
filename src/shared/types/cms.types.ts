import type {
    BlogPostType,
    CertificateType,
    EducationType,
    ExperienceType,
    PricingType,
    ProfileType,
    ProjectType,
    ServiceType,
    SettingsType,
    SkillType,
    TestimonialType,
} from "@/schemas";

export interface HomePageData {
    profile?: ProfileType | null;
    services?: ServiceType[] | null;
    skills?: SkillType[] | null;
    projects?: ProjectType[] | null;
    testimonials?: TestimonialType[] | null;
    experience?: ExperienceType[] | null;
    education?: EducationType[] | null;
    certificates?: CertificateType[] | null;
    pricing?: PricingType[] | null;
    blogs?: BlogPostType[] | null;
    settings?: SettingsType | null;
}
