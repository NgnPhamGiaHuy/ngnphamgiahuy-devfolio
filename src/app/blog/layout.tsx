import React from "react";

// Syntax-highlighting theme for Markdown code blocks (scoped to /blog routes).
import "highlight.js/styles/github.css";

import { PageChrome } from "@/components";
import { getPortfolioData } from "@/application/use-cases/content";
import { normalizeSectionConfigData } from "@/shared/utils/sections";

export const revalidate = 300;

interface BlogLayoutProps {
    children: React.ReactNode;
}

const BlogLayout = async ({ children }: BlogLayoutProps) => {
    const data = await getPortfolioData();

    const enabledSections = normalizeSectionConfigData(data.settings).filter(
        (section) => section.enabled
    );

    return (
        <PageChrome
            profile={data.profile}
            logo={data.settings.logo}
            enabledSections={enabledSections}
        >
            {children}
        </PageChrome>
    );
};

export default BlogLayout;
