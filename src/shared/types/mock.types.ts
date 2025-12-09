import type {
    BlogPost,
    Education,
    Experience,
    Pricing,
    Profile,
    Project,
    Service,
    Skill,
    Testimonial,
    Certificate,
} from "./sanity.types";

export interface MockDataType {
    logo: string;
    profile: Profile;
    services: Service[];
    skills: Skill[];
    projects: Project[];
    education: Education[];
    experience: Experience[];
    testimonials: Testimonial[];
    pricing: Pricing[];
    blogs: BlogPost[];
    certificates: Certificate[];
}
