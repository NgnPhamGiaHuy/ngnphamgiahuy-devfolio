import {
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
} from "../sanity.types";

export interface BaseSectionProps {
    id: string;
    resetAnimationOnView?: boolean;
}

export interface HeroSectionProps extends BaseSectionProps {
    profile: Profile;
    projects: Project[];
}

export interface ServicesSectionProps extends BaseSectionProps {
    services: Service[];
}

export interface SkillsSectionProps extends BaseSectionProps {
    skills: Skill[];
}

export interface PortfoliosSectionProps extends BaseSectionProps {
    projects: Project[];
    maxItems?: number;
    hideSeeMore?: boolean;
    backgroundVariant?: "gradientUp" | "gradientDown" | "none";
}

export interface ResumeSectionProps extends BaseSectionProps {
    education: Education[];
    experience: Experience[];
}

export interface CertificatesSectionProps extends BaseSectionProps {
    certificates: Certificate[];
}

export interface TestimonialsSectionProps extends BaseSectionProps {
    testimonials: Testimonial[];
}

export interface PricingSectionProps extends BaseSectionProps {
    pricing: Pricing[];
}

export interface BlogSectionProps extends BaseSectionProps {
    blogs: BlogPost[];
}

export interface ContactSectionProps extends BaseSectionProps {
    contactItems: Array<{ type: string; value: string; label: string }>;
}

export interface MapSectionProps extends BaseSectionProps {
    profile: Profile;
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
