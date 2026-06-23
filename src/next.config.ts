import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "firebasestorage.googleapis.com" },
            { protocol: "https", hostname: "picsum.photos" },
            { protocol: "https", hostname: "via.placeholder.com" },
            { protocol: "https", hostname: "avatars.githubusercontent.com" },
        ],
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    eslint: {
        dirs: ["app", "components", "lib", "utils", "hooks", "types"],
        ignoreDuringBuilds: process.env.NODE_ENV === "development",
    },
    typescript: {
        ignoreBuildErrors: process.env.NODE_ENV === "development",
    },
    // Baseline security headers (Sprint C). A document-level Content-Security-
    // Policy is intentionally NOT set here yet — it needs careful per-source
    // allowlisting (GA4, Firebase, Google Fonts, inline JSON-LD) and dedicated
    // testing, tracked as a follow-up. These headers are safe and universal.
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    { key: "X-DNS-Prefetch-Control", value: "on" },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
        ];
    },
};

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
})(nextConfig);
