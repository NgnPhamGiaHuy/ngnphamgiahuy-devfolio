import React from "react";

import { PricingCard } from "@/components";
import type { PricingGridProps } from "@/types";

const PricingGrid: React.FC<PricingGridProps> = ({ pricing }) => {
    return (
        <div className={"pricing-grid"}>
            {pricing.map((item, index) => (
                <PricingCard key={index} item={item} />
            ))}
        </div>
    );
};

export default PricingGrid;
