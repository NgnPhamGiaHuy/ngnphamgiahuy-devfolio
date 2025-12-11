export const EXPORT_CARDS = {
    QUICK_EXPORT: {
        category: "Quick Export",
        icon: "fas fa-download",
        title: "Export All Data",
        description:
            "Export your complete portfolio data with default settings. Perfect for creating backups or migrating to another system.",
    },
    ADVANCED_EXPORT: {
        category: "Advanced Export",
        icon: "fas fa-cogs",
        title: "Custom Export",
        description:
            "Choose specific content types and export options. Customize what data to include and how it's formatted.",
    },
} as const;

export const EXPORT_PAGE_CONFIG = {
    WRAPPER: {
        id: "export",
        title: "Data Export",
        subtitle: "Export Your Portfolio",
        backgroundVariant: "gradientUp" as const,
        contentMaxWidth: "1300px",
        verticalRulePosition: "right" as const,
        resetAnimationOnView: false,
    },
} as const;

export const EXPORT_CONTENT_TYPES = [
    "profile",
    "skills",
    "projects",
    "experience",
    "education",
    "services",
    "testimonials",
    "pricing",
    "blogs",
    "certificates",
    "settings",
] as const;

export const EXPORT_DEFAULTS = {
    includeAssets: true,
    includeMetadata: true,
    format: "json" as const,
    contentTypes: ["all"] as const,
} as const;
