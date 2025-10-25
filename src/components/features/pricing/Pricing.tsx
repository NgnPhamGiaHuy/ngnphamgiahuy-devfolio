// ============================================================
// Component: Pricing
// Purpose: Display pricing plans in a responsive grid layout
// ============================================================

import React from "react";

import type { PricingSectionProps } from "@/types";

import { Wrapper, PlanGrid, BackdropText } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Pricing component renders a section displaying pricing plans.
 * Features a responsive grid layout with individual pricing cards.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.pricing - Array of pricing plan data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Pricing section component
 */
const Pricing: React.FC<PricingSectionProps> = ({
    id,
    pricing,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Pricing"
            subtitle="My Price Board"
            backgroundVariant="none"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className="flex-full">
                <div className="p-[10px] flex-wrap-start">
                    <div
                        className="w-full text-left"
                        data-testid="pricing-container"
                    >
                        <div className="mx-[-20px] flex flex-wrap">
                            <PlanGrid pricing={pricing} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative backdrop text */}
            <BackdropText text="Pricing" />
        </Wrapper>
    );
};

Pricing.displayName = "Pricing";

export default Pricing;
