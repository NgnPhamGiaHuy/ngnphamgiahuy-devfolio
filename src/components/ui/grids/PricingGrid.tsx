import React from "react";

import { Pricing } from "@/data/data";

import PricingCard from "@/components/ui/cards/PricingCard";

interface PricingGridProps {
    pricing: Pricing[];
}

const PricingGrid: React.FC<PricingGridProps> = ({ pricing }) => {
    return (
        <div className={"pricing-grid"}>
            { pricing.map((item, index) => (
                <PricingCard key={index} item={item} />
            )) }
        </div>
    );
};

export default PricingGrid;
