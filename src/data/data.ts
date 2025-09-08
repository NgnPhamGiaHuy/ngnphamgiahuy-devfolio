export interface Portfolio {
    name: string;
    category: string;
    description: string;
    image: string;
    link: string;
}

export interface Service {
    category: string;
    title: string;
    description: string;
}

export interface Skill {
    name: string;
    experience_years: number;
    description: string;
}

export interface Profile {
    name: string;
    title: string;
    subtitle: string;
    job_title: string;
    description: string;
    location: string;
    experience_years: number;
    completed_projects: number;
    profile_image: string;
    social_links: Array<{ platform: string; url: string }>;
    cv_link: string;
}

export interface Resume {
    experience: Array<{
        year: string;
        title: string;
        company: string;
        description: string;
    }>;
    education: Array<{
        year: string;
        degree: string;
        institution: string;
        description: string;
    }>;
}

export interface Testimonial {
    name: string;
    position: string;
    quote: string;
    image: string;
}

export interface Pricing {
    plan: string;
    price: string;
    period: string;
    description: string;
    features: {
        included: string[];
        not_included: string[];
    };
    highlight?: boolean;
}

export interface BlogPost {
    title: string;
    date: string;
    excerpt: string;
    link: string;
    image: string;
}

export interface ContactItem {
    type: string;
    value: string;
}

export interface AppData {
    logo: string;
    profile: Profile;
    services: Service[];
    skills: Skill[];
    portfolios: Portfolio[];
    resume: Resume;
    testimonials: Testimonial[];
    pricing: Pricing[];
    blogs: BlogPost[];
    contacts: ContactItem[];
}

export const data: AppData = {
    logo: "NgnPham",
    profile: {
        name: "Ngn Huy",
        title: "Lorem Title",
        subtitle: "Lorem subtitle",
        job_title: "Web developer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        location: "Lorem City, Country",
        experience_years: 12,
        completed_projects: 330,
        profile_image: "https://via.placeholder.com/300x300.png?text=Profile+Image",
        social_links: [
            { platform: "Facebook", url: "#" },
            { platform: "GitHub", url: "#" },
            { platform: "Linkedin", url: "#" }
        ],
        cv_link: "#"
    },
    services: [
        {
            category: "Lorem Category 1",
            title: "Lorem Service 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus."
        },
        {
            category: "Lorem Category 2",
            title: "Lorem Service 2",
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
        },
        {
            category: "Lorem Category 3",
            title: "Lorem Service 3",
            description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laborisam."
        },
        {
            category: "Lorem Category 4",
            title: "Lorem Service 4",
            description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
        },
        {
            category: "Lorem Category 5",
            title: "Lorem Service 5",
            description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
        }
    ],
    skills: [
        { name: "Skill 1", experience_years: 2, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { name: "Skill 2", experience_years: 1, description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem." },
        { name: "Skill 3", experience_years: 6, description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam." },
        { name: "Skill 4", experience_years: 3, description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut." },
        { name: "Skill 5", experience_years: 10, description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet." },
        { name: "Skill 6", experience_years: 2, description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit." }
    ],
    portfolios: [
        {
            name: "Lorem Project 1",
            category: "Category 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 2",
            category: "Category 2",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 3",
            category: "Category 3",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 4",
            category: "Category 4",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 5",
            category: "Category 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod temporLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 6",
            category: "Category 2",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 7",
            category: "Category 3",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        },
        {
            name: "Lorem Project 8",
            category: "Category 4",
            description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "https://picsum.photos/600/400?random",
            link: "#"
        }
    ],
    resume: {
        experience: [
            {
                year: "2020 - Present",
                title: "Senior Developer",
                company: "Lorem Corp",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                year: "2018 - 2020",
                title: "Frontend Developer",
                company: "Ipsum Studio",
                description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        ],
        education: [
            {
                year: "2014 - 2018",
                degree: "Bachelor of Information Technology",
                institution: "Lorem University",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
            },
            {
                year: "2012 - 2014",
                degree: "High School Diploma",
                institution: "Ipsum High School",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
            }
        ]
    },
    testimonials: [
        { name: "John Doe", position: "CEO, Company", quote: "Lorem ipsum dolor sit amet.", image: "https://picsum.photos/600/400?random" },
        { name: "John Doe", position: "CEO, Company", quote: "Lorem ipsum dolor sit amet.", image: "https://picsum.photos/600/400?random" },
        { name: "John Doe", position: "CEO, Company", quote: "Lorem ipsum dolor sit amet.", image: "https://picsum.photos/600/400?random" },
    ],
    pricing: [
        {
            plan: "Basic",
            price: "199",
            period: "per project",
            description: "A starter package for small websites and personal projects.",
            features: {
                included: [
                    "Up to 3 pages",
                    "Responsive design",
                    "Basic SEO setup"
                ],
                not_included: [
                    "Custom animations",
                    "Priority support"
                ]
            }
        },
        {
            plan: "Standard",
            price: "499",
            period: "per project",
            description: "Best for small businesses needing a professional presence.",
            features: {
                included: [
                    "Up to 10 pages",
                    "Custom design",
                    "1 month free support"
                ],
                not_included: [
                    "Unlimited revisions",
                    "Dedicated account manager"
                ]
            },
            highlight: true
        },
        {
            plan: "Premium",
            price: "999",
            period: "per project",
            description: "Full-scale solution for businesses that need advanced features.",
            features: {
                included: [
                    "Unlimited pages",
                    "Custom animations",
                    "6 months premium support"
                ],
                not_included: [
                    "On-site consulting",
                    "Lifetime updates"
                ]
            }
        }
    ],
    blogs: [
        { title: "Lorem blog post", date: "2024-08-01", excerpt: "Lorem ipsum dolor sit amet.", link: "#", image: "https://picsum.photos/600/400?random" },
        { title: "Lorem blog post", date: "2024-08-01", excerpt: "Lorem ipsum dolor sit amet.", link: "#", image: "https://picsum.photos/600/400?random" },
        { title: "Lorem blog post", date: "2024-08-01", excerpt: "Lorem ipsum dolor sit amet.", link: "#", image: "https://picsum.photos/600/400?random" },
        { title: "Lorem blog post", date: "2024-08-01", excerpt: "Lorem ipsum dolor sit amet.", link: "#", image: "https://picsum.photos/600/400?random" },
    ],
    contacts: [
        { type: "email", value: "lorem@example.com" },
        { type: "phone", value: "+00 123 456 789" },
        { type: "location", value: "Lorem Street, Ipsum City" },
        { type: "office", value: "Lorem Company HQ" }
    ]
};
