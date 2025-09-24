import React from "react";

import type { PricingSectionProps } from "@/types";

import { Wrapper, PlanGrid, BackdropText } from "@/components";

const Pricing: React.FC<PricingSectionProps> = ({ id, pricing, resetAnimationOnView }) => {
    return (
        <Wrapper id={id} title={"Pricing"} subtitle={"My Price Board"} backgroundVariant={"none"} verticalRulePosition={"left"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"flex-full"}>
                <div className={"p-[10px] flex-wrap-start"}>
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
