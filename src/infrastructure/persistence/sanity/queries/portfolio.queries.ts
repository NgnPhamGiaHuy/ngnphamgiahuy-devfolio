export const projectsQuery = `*[_type == "project"] | order(order asc) {
    _id,
    name,
    category,
    "slug": slug.current,
    year,
    description,
    summary,
    image {
        asset,
        alt,
        caption
    },
    link,
    featured,
    problem,
    constraints,
    architecture,
    decisions,
    technologies,
    dependsOn,
    outcome,
    scale
}`;
