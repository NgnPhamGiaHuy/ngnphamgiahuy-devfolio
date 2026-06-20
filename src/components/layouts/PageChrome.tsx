import React from "react";

import type { ProfileType, SectionConfigItemType } from "@/schemas";

import { ScrollToTopButton, SiteFooter, SiteHeader } from "@/components";

const TEST_IDS = {
    root: "page-chrome-root",
    header: "page-chrome-header",
    footer: "page-chrome-footer",
} as const;

interface PageChromeProps {
    profile: ProfileType;
    logo?: string;
    enabledSections?: SectionConfigItemType[];
    children: React.ReactNode;
}

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
            <main id="main">{children}</main>
            <SiteFooter
                socialLinks={profile.social_links}
                data-testid={TEST_IDS.footer}
            />
            <ScrollToTopButton />
        </div>
    );
};

PageChrome.displayName = "PageChrome";

export default PageChrome;
