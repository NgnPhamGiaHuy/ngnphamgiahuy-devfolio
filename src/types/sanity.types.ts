export interface SanityDocument {
    _id: string;
    _type: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
}

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
    caption?: string;
}

export interface SeoFields {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
}

export interface Project extends SanityDocument, SeoFields {
    _type: "project";
    name: string;
    category: string;
    description: string;
    image: SanityImage;
    link?: string;
    featured?: boolean;
    order?: number;
}

export interface Service extends SanityDocument {
    _type: "service";
    category: string;
    title: string;
    description: string;
    icon?: string;
    order?: number;
}

export interface Skill extends SanityDocument {
    _type: "skill";
    name: string;
    experience_years: number;
    description: string;
    category?: string;
    order?: number;
}

export interface Profile extends SanityDocument, SeoFields {
    _type: "profile";
    name: string;
    title: string;
    subtitle: string;
    job_title: string;
    description: string;
    location: string;
    experience_years: number;
    completed_projects: number;
    profile_image: SanityImage;
    social_links: Array<{ platform: string; url: string }>;
    cv_link?: string;
}

export interface ExperienceItem extends SanityDocument {
    _type: "experience";
    year: string;
    title: string;
    company: string;
    description: string;
    order?: number;
}

export interface EducationItem extends SanityDocument {
    _type: "education";
    year: string;
    degree: string;
    institution: string;
    description: string;
    order?: number;
}

export interface Testimonial extends SanityDocument {
    _type: "testimonial";
    name: string;
    position: string;
    quote: string;
    image: SanityImage;
    order?: number;
}

export interface Pricing extends SanityDocument {
    _type: "pricing";
    plan: string;
    price: string;
    period: string;
    description: string;
    features: {
        included: string[];
        not_included: string[];
    };
    highlight?: boolean;
    order?: number;
}

export interface BlogPost extends SanityDocument, SeoFields {
    _type: "blogPost";
    title: string;
    date: string;
    excerpt: string;
    slug: {
        _type: "slug";
        current: string;
    };
    image: SanityImage;
    content?: any[];
    categories?: string[];
}

export interface ContactItem extends SanityDocument {
    _type: "contactItem";
    type: string;
    value: string;
    order?: number;
}

export interface SiteSettings extends SanityDocument, SeoFields {
    _type: "siteSettings";
    logo: string;
}