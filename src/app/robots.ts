import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/shared/utils";

/**
 * robots.txt — generated at the `/robots.txt` route. Public site is crawlable;
 * the private control center and API routes are not.
 */
export default function robots(): MetadataRoute.Robots {
    const base = getSiteUrl();

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api"],
            },
        ],
        sitemap: `${base}/sitemap.xml`,
        host: base,
    };
}
