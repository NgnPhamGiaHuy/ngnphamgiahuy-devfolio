export const profileQuery = `*[_type == "profile"][0] {
    _id,
    name,
    job_title,
    description,
    location,
    email,
    phone,
    experience_years,
    profile_image {
        asset,
        alt,
        caption
    },
    social_links[] {
        url,
        platform,
        icon {
            asset,
            alt,
            caption
        }
    },
    "cv_link": cv_link.asset->url,
    metaTitle,
    metaDescription,
    ogImage {
        asset,
        alt,
        caption
    }
}`;

export const skillsQuery = `*[_type == "skill"] | order(order asc) {
    _id,
    name,
    experience_years,
    description,
    category
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc) {
    _id,
    name,
    category,
    description,
    image {
        asset,
        alt,
        caption
    },
    link,
    featured
}`;

export const experienceQuery = `*[_type == "experience"] | order(order asc) {
    _id,
    year,
    title,
    company,
    description
}`;

export const educationQuery = `*[_type == "education"] | order(order asc) {
    _id,
    year,
    degree,
    institution,
    description
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc) {
    _id,
    category,
    title,
    description,
    icon
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    position,
    quote,
    image {
        asset,
        alt
    }
}`;

export const pricingQuery = `*[_type == "pricing"] | order(order asc) {
    _id,
    plan,
    price,
    period,
    description,
    features,
    highlight
}`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    excerpt,
    image {
        asset,
        alt,
        caption
    },
    categories
}`;

export const certificatesQuery = `*[_type == "certificate"] | order(order asc) {
    _id,
    title,
    issuer,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    description,
    image {
        asset,
        alt,
        caption
    },
    category
}`;

export const settingsQuery = `*[_type == "settings"][0] {
    _id,
    logo,
    metaTitle,
    metaDescription,
    ogImage {
        asset,
        alt,
        caption
    },
    hero {
        enabled,
        resetAnimationOnView
    },
    services {
        enabled,
        resetAnimationOnView
    },
    skills {
        enabled,
        resetAnimationOnView
    },
    portfolios {
        enabled,
        resetAnimationOnView
    },
    resume {
        enabled,
        resetAnimationOnView
    },
    certificates {
        enabled,
        resetAnimationOnView
    },
    testimonials {
        enabled,
        resetAnimationOnView
    },
    pricing {
        enabled,
        resetAnimationOnView
    },
    blog {
        enabled,
        resetAnimationOnView
    },
    contact {
        enabled,
        resetAnimationOnView
    },
    map {
        enabled,
        resetAnimationOnView,
        embedUrl,
        height
    }
}`;

export const blogPostBySlugQuery = (slug: string) => `
    *[_type == "blogPost" && slug.current == "${slug}"][0] {
        _id,
        title,
        slug,
        date,
        content,
        image {
            asset,
            alt,
            caption
        },
        categories,
        metaTitle,
        metaDescription,
        ogImage {
            asset,
            alt,
            caption
        }
    }
`;

export const homePageDataQuery = `{
    "profile": ${profileQuery},
    "services": ${servicesQuery},
    "skills": ${skillsQuery},
    "projects": ${projectsQuery},
    "testimonials": ${testimonialsQuery},
    "experience": ${experienceQuery},
    "education": ${educationQuery},
    "certificates": ${certificatesQuery},
    "pricing": ${pricingQuery},
    "blogs": ${blogPostsQuery},
    "settings": ${settingsQuery}
}`;
