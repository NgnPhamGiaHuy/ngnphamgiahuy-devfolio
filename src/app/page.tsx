import React from "react";

import { createMockData } from "@/infrastructure/persistence/mocks";
import { PageChrome } from "@/components";
import { renderSection } from "@/components/section/SectionRenderer";
import { normalizeSectionConfigData } from "@/shared/utils/sections";

export default async function Home(): Promise<React.JSX.Element> {
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
            <div className="relative">
                {enabledSections.map((section) =>
                    renderSection(section, { sectionProps: data })
                )}
            </div>
        </PageChrome>
    );
}
