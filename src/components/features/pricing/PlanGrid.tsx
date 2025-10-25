// ============================================================
// Component: PlanGrid
// Purpose: Responsive grid container for pricing plan cards
// ============================================================

import React from "react";

import type { PricingGridProps } from "@/types";

import { PlanCard } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * PlanGrid component renders a responsive grid of pricing plan cards.
 * Features proper key generation and accessibility support.
 *
 * @param props - Component props
 * @param props.pricing - Array of pricing plan data
 * @returns Pricing grid component
 */
const PlanGrid: React.FC<PricingGridProps> = ({ pricing }) => {
    // ============================================================
    // Render
    // ============================================================

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
