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
