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
        resetAnimationOnView,
        verticalRuleDirection
    },
    services {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    skills {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    portfolios {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    resume {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    certificates {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    testimonials {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    pricing {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    blog {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    contact {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection
    },
    map {
        enabled,
        resetAnimationOnView,
        verticalRuleDirection,
        embedUrl,
        height
    }
}`;
