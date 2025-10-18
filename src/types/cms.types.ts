import type {
    BlogPost,
    Education,
    Experience,
    Pricing,
    Profile,
    Project,
    Service,
    Settings,
    Skill,
    Testimonial,
    Certificate,
} from "./sanity.types";

export interface HomePageData {
    profile?: Profile | null;
    services?: Service[] | null;
    skills?: Skill[] | null;
    projects?: Project[] | null;
    testimonials?: Testimonial[] | null;
    experience?: Experience[] | null;
    education?: Education[] | null;
    certificates?: Certificate[] | null;
    pricing?: Pricing[] | null;
    blogs?: BlogPost[] | null;
    settings?: Settings | null;
}
