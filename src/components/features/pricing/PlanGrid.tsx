import React from "react";

import type { PricingGridProps } from "@/types";

import { PlanCard } from "@/components/features/pricing";

const PlanGrid: React.FC<PricingGridProps> = ({ pricing }) => {
    return (
        <div className={"w-full grid-responsive relative z-2"}>
            {pricing.map((item, index) => {
                const stableKey =
                    (item as any).id ??
                    `${item.plan}-${item.price}-${item.period}-${index}`;
                return <PlanCard key={stableKey} item={item} />;
            })}
        </div>
    );
};

PlanGrid.displayName = "PlanGrid";

export default PlanGrid;
