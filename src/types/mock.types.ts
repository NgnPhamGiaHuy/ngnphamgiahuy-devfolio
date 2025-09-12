import type { BlogPost, ContactItem, Education, Experience, Pricing, Profile, Project, Service, Skill, Testimonial } from "./sanity.types";

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
    contacts: ContactItem[];
}