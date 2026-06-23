/**
 * Single source of truth for the site's absolute base URL. Used by metadata
 * (canonical, OG), sitemap.xml, and robots.txt so they can never disagree.
 *
 * Resolution order: explicit base → site → Vercel-provided → localhost.
 * Always returned with a protocol and without a trailing slash.
 */
export const getSiteUrl = (): string => {
    const raw =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        "http://localhost:3000";

    const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
    return withProtocol.endsWith("/")
        ? withProtocol.slice(0, -1)
        : withProtocol;
};

export default getSiteUrl;
