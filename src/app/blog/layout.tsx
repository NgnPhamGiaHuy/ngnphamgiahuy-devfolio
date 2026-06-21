import React from "react";

import { PageChrome } from "@/components";
import { createMockData } from "@/infrastructure/persistence/mocks";
import { normalizeSectionConfigData } from "@/shared/utils/sections";

interface BlogLayoutProps {
    children: React.ReactNode;
}

const BlogLayout = async ({ children }: BlogLayoutProps) => {
    const data = createMockData();

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
