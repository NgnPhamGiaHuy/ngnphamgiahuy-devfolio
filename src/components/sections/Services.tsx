import React from "react";

import data from "@/data/data.json";

import SectionWrapper from "@/components/sections/SectionWrapper";
import ContentSwiper from "@/components/ui/ContentSwiper";
import BackgroundText from "@/components/ui/BackgroundText";

const Services = () => {
    const { services } = data;

    return (
        <SectionWrapper title={"What I Do"} subtitle={"My Services"} background={"bg-[linear-gradient(rgb(255,255,255)_0%_0%,rgb(240,235,227)_100%)]"} vlinePosition={"right"}>
            <div className={"services-wrapper"}>
                <div className={"services-content-wrapper"}>
                    <ContentSwiper cards={services} />
                    <BackgroundText text={"Services"} />
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Services;
