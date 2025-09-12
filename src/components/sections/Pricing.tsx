import React, { useMemo } from "react";

import { data } from "@/data";
import type { PricingSectionProps } from "@/types";
import { Wrapper, PricingGrid, BackgroundText } from "@/components";

const Pricing: React.FC<PricingSectionProps> = ({ pricing, resetAnimationOnView }) => {
    const pricingData = useMemo(() => pricing?.length ? pricing : data.pricing, [pricing]);

    return (
        <Wrapper title={"Pricing"} subtitle={"My Price Board"} background={"none"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <div className={"w-full text-left"}>
                        <div className={"mx-[-20px] flex flex-wrap"}>
                            <PricingGrid pricing={pricingData} />
                        </div>
                    </div>
                </div>
            </div>
            <BackgroundText text={"Pricing"} />
        </Wrapper>
    );
};

export default Pricing;
