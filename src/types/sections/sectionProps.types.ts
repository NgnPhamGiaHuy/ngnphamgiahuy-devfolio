import { Profile, Service, Skill, Project, Experience, Education, Testimonial, Pricing, BlogPost, ContactItem } from "../sanity.types";

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
    contacts: ContactItem[];
}

export interface MapSectionProps extends BaseSectionProps {
    profile: Profile;
    contacts: ContactItem[];
}

export type SectionProps =
    | HeroSectionProps
    | ServicesSectionProps
    | SkillsSectionProps
    | PortfoliosSectionProps
    | ResumeSectionProps
    | TestimonialsSectionProps
    | PricingSectionProps
    | BlogSectionProps
    | ContactSectionProps
    | MapSectionProps;