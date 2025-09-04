import React from "react";

import { sectionsConfig } from "@/config/sections.config";
import { renderSection } from "@/utils/sectionComponents";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import ScrollToTopButton from "@/components/ui/button/ScrollToTopButton";

const Home: React.FC = () => {
    const enabledSections = sectionsConfig.filter(section => section.enabled);

    return (
        <div className={"min-h-[50vh] overflow-hidden relative"}>
            <Header />
            <div className={"wrapper"}>
                { enabledSections.map(section => renderSection(section.id)) }
            </div>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
};

export default Home;
