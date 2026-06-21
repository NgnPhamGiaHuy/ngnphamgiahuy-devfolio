import React from "react";

import { createMockData } from "@/infrastructure/persistence/mocks";
import { PageChrome } from "@/components";
import ProjectBento from "@/components/features/career-graph/ProjectBento";
import { normalizeSectionConfigData } from "@/shared/utils/sections";

const PortfoliosPage = async (): Promise<React.JSX.Element> => {
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
            <ProjectBento id="portfolios" projects={data.projects} />
        </PageChrome>
    );
};

PortfoliosPage.displayName = "PortfoliosPage";

export default PortfoliosPage;
