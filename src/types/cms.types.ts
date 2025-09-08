import { BlogPost, ContactItem, EducationItem, Pricing, Profile, Project, Service, SiteSettings, Skill, Testimonial } from "@/types/sanity.types";

export interface HomePageData {
    profile?: Profile | null;
    services?: Service[] | null;
    skills?: Skill[] | null;
    projects?: Project[] | null;
    testimonials?: Testimonial[] | null;
    experience?: Array<EducationItem | any> | null;
    education?: EducationItem[] | null;
    pricing?: Pricing[] | null;
    blogs?: BlogPost[] | null;
    contacts?: ContactItem[] | null;
    siteSettings?: SiteSettings | null;
}


