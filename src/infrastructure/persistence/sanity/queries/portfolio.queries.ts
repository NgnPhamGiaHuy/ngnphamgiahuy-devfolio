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
