import React from "react";

import type { PricingType } from "@/schemas";

import { PlanCard } from "@/components";

const PlanGrid = ({ pricing }: { pricing: PricingType[] }) => {
    return (
        <div
            className="w-full grid-responsive relative z-2"
            data-testid="pricing-grid"
            role="list"
            aria-label="Pricing plans"
        >
            {pricing.map((item, index) => {
                const stableKey =
                    (item as any).id ??
                    `${item.plan}-${item.price}-${item.period}-${index}`;

                return (
                    <PlanCard
                        key={stableKey}
                        item={item}
                        data-testid={`pricing-card-${index}`}
                    />
                );
            })}
        </div>
    );
};

PlanGrid.displayName = "PlanGrid";

export default PlanGrid;
