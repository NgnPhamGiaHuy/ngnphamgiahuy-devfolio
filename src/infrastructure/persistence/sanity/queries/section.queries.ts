import { profileQuery } from "./profile.queries";
import { projectsQuery } from "./portfolio.queries";
import { blogPostsQuery } from "./blog.queries";
import { settingsQuery } from "./settings.queries";

export const skillsQuery = `*[_type == "skill"] | order(order asc) {
    _id,
    name,
    experience_years,
    description,
    category
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
