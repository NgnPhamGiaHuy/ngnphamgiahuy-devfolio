import type {
    BlogPostType,
    CertificateType,
    EducationType,
    ExperienceType,
    MapConfigItemType,
    PricingType,
    ProfileType,
    ProjectType,
    ServiceType,
    SkillType,
    TestimonialType,
} from "@/schemas";

export interface BaseSectionProps {
    id: string;
    resetAnimationOnView?: boolean;
}

export interface HeroSectionProps extends BaseSectionProps {
    profile: ProfileType;
    projects: ProjectType[];
}

export interface ServicesSectionProps extends BaseSectionProps {
    services: ServiceType[];
}

export interface SkillsSectionProps extends BaseSectionProps {
    skills: SkillType[];
}

export interface PortfoliosSectionProps extends BaseSectionProps {
    projects: ProjectType[];
    maxItems?: number;
    hideSeeMore?: boolean;
    backgroundVariant?: "gradientUp" | "gradientDown" | "none";
}

export interface ResumeSectionProps extends BaseSectionProps {
    education: EducationType[];
    experience: ExperienceType[];
}

export interface CertificatesSectionProps extends BaseSectionProps {
    certificates: CertificateType[];
}

export interface TestimonialsSectionProps extends BaseSectionProps {
    testimonials: TestimonialType[];
}

export interface PricingSectionProps extends BaseSectionProps {
    pricing: PricingType[];
}

export interface BlogSectionProps extends BaseSectionProps {
    blogs: BlogPostType[];
}

export interface ContactSectionProps extends BaseSectionProps {
    contactItems: Array<{ type: string; value: string; label: string }>;
}

export interface MapSectionProps extends BaseSectionProps {
    mapConfig: MapConfigItemType;
}

export type SectionProps =
    | HeroSectionProps
    | ServicesSectionProps
    | SkillsSectionProps
    | PortfoliosSectionProps
    | ResumeSectionProps
    | CertificatesSectionProps
    | TestimonialsSectionProps
    | PricingSectionProps
    | BlogSectionProps
    | ContactSectionProps
    | MapSectionProps;
