import React from "react";

import { data } from "@/data/data";

import PricingGrid from "@/components/ui/grids/PricingGrid";
import BackgroundText from "@/components/ui/BackgroundText";
import Wrapper from "@/components/sections/wrapper/Wrapper";

const Pricing = () => {
    const { pricing } = data;

    return (
        <Wrapper title={"Pricing"} subtitle={"My Price Board"} background={"none"} vlinePosition={"left"}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <div className={"w-full text-left"}>
                        <div className={"mx-[-20px] flex flex-wrap"}>
                            <PricingGrid pricing={pricing} />
                        </div>
                    </div>
                </div>
            </div>
            <BackgroundText text={"Pricing"} />
        </Wrapper>
    );
};

export default Pricing;
