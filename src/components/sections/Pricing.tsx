import React from "react";

import { data } from "@/data/data";

import PricingGrid from "@/components/ui/grids/PricingGrid";
import BackgroundText from "@/components/ui/BackgroundText";
import SectionWrapper from "@/components/sections/SectionWrapper";

const Pricing = () => {
    const { pricing } = data;

    return (
        <SectionWrapper title={"Pricing"} subtitle={"My Price Board"} background={"none"} vlinePosition={"left"}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <PricingGrid pricing={pricing} />
                </div>
            </div>
            <BackgroundText text={"Pricing"} />
        </SectionWrapper>
    );
};

export default Pricing;
