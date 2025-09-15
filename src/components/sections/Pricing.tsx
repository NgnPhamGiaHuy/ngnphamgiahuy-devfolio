import React from "react";

import type { PricingSectionProps } from "@/types";

import { Wrapper, PlanGrid, BackdropText } from "@/components";

const Pricing: React.FC<PricingSectionProps> = ({ pricing, resetAnimationOnView }) => {
    return (
        <Wrapper title={"Pricing"} subtitle={"My Price Board"} background={"none"} vlinePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"items-wrapper"}>
                <div className={"items-content-wrapper"}>
                    <div className={"w-full text-left"}>
                        <div className={"mx-[-20px] flex flex-wrap"}>
                            <PlanGrid pricing={pricing} />
                        </div>
                    </div>
                </div>
            </div>
            <BackdropText text={"Pricing"} />
        </Wrapper>
    );
};

export default Pricing;
