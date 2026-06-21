// ============================================================
// Module: Firestore collection registry
// Purpose: Single source for (collection name -> injected `_type` literal).
//          Collection name => _type; doc id => _id. Documents never store
//          either; the read layer re-attaches them before schema.parse().
// ============================================================
export const COLLECTIONS = {
    profile: "profile",
    settings: "settings",
    education: "education",
    experience: "experience",
    skills: "skills",
    projects: "projects",
    // DEFERRED (no live content yet): blogPosts, services, pricing,
    // testimonials, certificates, map. Schemas exist; collections are not
    // created until content is authored.
    blogPosts: "blogPosts",
} as const;

/** Fixed document ids for the singleton collections. */
export const SINGLETON_IDS = {
    profile: "main",
    settings: "site",
} as const;
