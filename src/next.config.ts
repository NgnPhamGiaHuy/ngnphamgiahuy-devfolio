import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "cdn.sanity.io" },
            { protocol: "https", hostname: "picsum.photos" },
        ],
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    eslint: {
        // Limit ESLint to specific directories for better performance
        dirs: ["app", "components", "lib", "utils", "hooks", "types"],
        // Only run ESLint during builds, not during dev
        ignoreDuringBuilds: process.env.NODE_ENV === "development",
    },
    typescript: {
        // Only run TypeScript checks during builds, not during dev
        ignoreBuildErrors: process.env.NODE_ENV === "development",
    },
};

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
})(nextConfig);
