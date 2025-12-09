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
    categories,
    author
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
        },
        author
    }
`;
