import React from "react";

import { data } from "@/data/data";

import SectionWrapper from "@/components/sections/SectionWrapper";
import ContentSwiper from "@/components/ui/ContentSwiper";
import BackgroundText from "@/components/ui/BackgroundText";

const Services = () => {
    const { services } = data;

    return (
        <SectionWrapper title={"What I Do"} subtitle={"My Services"} background={"gradientDown"} vlinePosition={"right"}>
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
