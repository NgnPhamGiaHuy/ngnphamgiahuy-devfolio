import type {
    BlogPostType,
    EducationType,
    ExperienceType,
    ProfileType,
    ProjectType,
    SkillType,
} from "@/schemas";

export interface BaseSectionProps {
    id: string;
    resetAnimationOnView?: boolean;
}

export interface HeroSectionProps extends BaseSectionProps {
    profile: ProfileType;
    projects: ProjectType[];
}

export interface SkillsSectionProps extends BaseSectionProps {
    skills: SkillType[];
    projects: ProjectType[];
}

export interface ProjectsSectionProps extends BaseSectionProps {
    projects: ProjectType[];
}

export interface NowSectionProps extends BaseSectionProps {
    profile: ProfileType;
    experience: ExperienceType[];
}

export interface ResumeSectionProps extends BaseSectionProps {
    education: EducationType[];
    experience: ExperienceType[];
}

export interface BlogSectionProps extends BaseSectionProps {
    blogs: BlogPostType[];
}

export interface ContactSectionProps extends BaseSectionProps {
    contactItems: Array<{ type: string; value: string; label: string }>;
}

export type SectionProps =
    | HeroSectionProps
    | SkillsSectionProps
    | ProjectsSectionProps
    | NowSectionProps
    | ResumeSectionProps
    | BlogSectionProps
    | ContactSectionProps;
