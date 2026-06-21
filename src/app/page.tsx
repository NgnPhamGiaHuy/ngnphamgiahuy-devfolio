import React from "react";

import { getPortfolioData } from "@/application/use-cases/content";
import { PageChrome } from "@/components";
import { renderSection } from "@/components/section/SectionRenderer";
import { normalizeSectionConfigData } from "@/shared/utils/sections";

export const revalidate = 300;

export default async function Home(): Promise<React.JSX.Element> {
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
            <div className="relative">
                {enabledSections.map((section) =>
                    renderSection(section, { sectionProps: data })
                )}
            </div>
        </PageChrome>
    );
}
