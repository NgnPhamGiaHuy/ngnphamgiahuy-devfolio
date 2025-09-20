import React from "react";

import { PlanCard } from "@/components/features/pricing";
import type { PricingGridProps } from "@/types";

const PlanGrid: React.FC<PricingGridProps> = ({ pricing }) => {
    return (
        <div className={"w-full grid-responsive relative z-2"}>
            {pricing.map((item, index) => (
                <PlanCard key={index} item={item} />
            ))}
        </div>
    );
};

export default PlanGrid;
