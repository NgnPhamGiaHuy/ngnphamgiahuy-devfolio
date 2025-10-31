// ============================================================
// Component: PageChrome
// Purpose: Shared page chrome with header, footer, and utilities
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";

import type { Profile, SectionConfigItem } from "@/types/sanity.types";

import { SiteHeader, SiteFooter, ScrollToTopButton } from "@/components";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "page-chrome-root",
    header: "page-chrome-header",
    footer: "page-chrome-footer",
} as const;

// ============================================================
// Types
// ============================================================
interface PageChromeProps {
    profile: Profile;
    logo?: string;
    enabledSections?: SectionConfigItem[];
    children: React.ReactNode;
}

/**
 * PageChrome composes shared site chrome (header, footer, utilities) around routed content.
 * Designed for SSR safety and consistent layout across routes.
 *
 * @param props - Component props
 * @param props.profile - User/site profile data for header and footer
 * @param props.logo - Optional site logo URL
 * @param props.enabledSections - Optional list of enabled sections for nav
 * @param props.children - Routed page content
 * @returns JSX.Element - Rendered layout wrapper
 */

// ============================================================
// Component Definition
// ============================================================
const PageChrome = ({
    profile,
    logo,
    enabledSections,
    children,
}: PageChromeProps) => {
    return (
        <div
            className="min-h-[50vh] overflow-hidden relative"
            data-testid={TEST_IDS.root}
        >
            <SiteHeader
                profile={profile}
                logo={logo}
                enabledSections={enabledSections}
                data-testid={TEST_IDS.header}
            />
            {children}
            <SiteFooter
                socialLinks={profile.social_links}
                data-testid={TEST_IDS.footer}
            />
            <ScrollToTopButton />
        </div>
    );
};

// DX: Explicit display name for clearer React DevTools identification
PageChrome.displayName = "PageChrome";

// ============================================================
// Export
// ============================================================
export default PageChrome;
