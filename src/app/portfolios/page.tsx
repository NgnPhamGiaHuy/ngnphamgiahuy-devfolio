import React from "react";

import { getPortfolioData } from "@/application/use-cases/content";
import { PageChrome } from "@/components";
import ProjectBento from "@/components/features/career-graph/ProjectBento";
import { normalizeSectionConfigData } from "@/shared/utils/sections";

export const revalidate = 300;

const PortfoliosPage = async (): Promise<React.JSX.Element> => {
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
            <ProjectBento id="portfolios" projects={data.projects} />
        </PageChrome>
    );
};

PortfoliosPage.displayName = "PortfoliosPage";

export default PortfoliosPage;
