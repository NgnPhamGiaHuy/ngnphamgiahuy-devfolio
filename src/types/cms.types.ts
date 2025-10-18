import type {
    BlogPost,
    ContactItem,
    Education,
    Experience,
    Pricing,
    Profile,
    Project,
    Service,
    SiteSettings,
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
    contacts?: ContactItem[] | null;
    siteSettings?: SiteSettings | null;
}
