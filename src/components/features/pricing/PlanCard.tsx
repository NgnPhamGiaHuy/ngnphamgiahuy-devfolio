// ============================================================
// Component: PlanCard
// Purpose: Individual pricing plan card with features and pricing
// ============================================================

import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

import type { PricingCardProps } from "@/types";

// ============================================================
// Constants
// ============================================================

const CONTACT_ROUTE = "/contact"; // Update this to your actual contact route

// ============================================================
// Component Definition
// ============================================================

/**
 * PlanCard component renders an individual pricing plan card.
 * Displays plan details, pricing, features, and call-to-action button.
 *
 * @param props - Component props
 * @param props.item - Pricing plan data object
 * @returns Pricing plan card component
 */
const PlanCard: React.FC<PricingCardProps> = ({ item, ...props }) => {
    // ============================================================
    // Render
    // ============================================================

    return (
        <article
            className="plan-card-wrapper"
            data-testid="pricing-card"
            {...props}
        >
            {/* Popular Badge */}
            {item.highlight && (
                <div className="plan-card-badge">
                    <span>Popular</span>
                </div>
            )}

            {/* Card Content */}
            <div
                className={clsx(
                    "plan-card",
                    item.highlight ? "border-border-inverse" : "border-white"
                )}
            >
                {/* Plan Name */}
                <header>
                    <h3 className="text-[13px] text-inverse font-bold uppercase tracking-wider">
                        {item.plan}
                    </h3>
                </header>

                {/* Price Section */}
                <div className="mt-[15px] min-h-[50px] text-[41px] text-primary leading-none"></div>
                <div className="mb-[20px] text-[30px] text-inverse font-bold leading-none">
                    <span
                        aria-label={`Price ${item.price} dollars per ${item.period}`}
                    >
                        {item.price}
                        <b className="text-primary">$</b>
                    </span>
                    <em className="ml-[15px] text-[16px] not-italic font-bold">
                        {item.period}
                    </em>
                </div>

                {/* Description */}
                <div className="min-h-[145px] pb-[30px] opacity-80">
                    <p>{item.description}</p>
                </div>

                {/* Features List */}
                <div>
                    <ul role="list" aria-label={`${item.plan} plan features`}>
                        {/* Included Features */}
                        {item.features.included.map((feature, index) => (
                            <li
                                key={`included-${feature}-${index}`}
                                className="my-[5px] pl-[30px] list-none relative"
                            >
                                <CheckIcon
                                    className="size-[16px] top-[4px] stroke-4 left-0 text-primary absolute"
                                    aria-hidden="true"
                                />
                                <span>{feature}</span>
                            </li>
                        ))}

                        {/* Excluded Features */}
                        {item.features.not_included.map((feature, index) => (
                            <li
                                key={`excluded-${feature}-${index}`}
                                className="my-[5px] pl-[30px] list-none relative"
                            >
                                <em className="text-[#b3b3b3] not-italic line-through">
                                    {feature}
                                </em>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Call to Action */}
                <Link
                    href={CONTACT_ROUTE}
                    className="w-full mt-[30px] z-2 secondary-button inline-flex justify-center"
                    aria-label={`Start ${item.plan} plan`}
                    prefetch={false}
                >
                    <span className="relative z-2">Start Project</span>
                </Link>

                {/* Decorative Pattern */}
                <div className="card-pattern" aria-hidden="true"></div>
            </div>
        </article>
    );
};

PlanCard.displayName = "PlanCard";

export default PlanCard;
