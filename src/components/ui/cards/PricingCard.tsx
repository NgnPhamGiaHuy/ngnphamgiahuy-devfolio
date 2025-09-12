import clsx from "clsx";
import React from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

import type { PricingCardProps } from "@/types";

const PricingCard: React.FC<PricingCardProps> = ({ item }) => {
    return (
        <div className={"pricing-card-wrapper"}>
            {item.highlight && (
                <div className={"pricing-card-badge"}>
                    <span>Popular</span>
                </div>
            )}
            <div className={clsx("pricing-card", item.highlight ? "pricing-card-highlighted" : "pricing-card-standard")}>
                <div className={"pricing-card-plan"}>
                    <span>
                        {item.plan}
                    </span>
                </div>
                <div className={"pricing-card-icon-placeholder"}></div>
                <div className={"pricing-card-price"}>
                    <span>
                        {item.price}<b className={"pricing-card-price-currency"}>$</b>
                    </span>
                    <em className={"pricing-card-period"}>{item.period}</em>
                </div>
                <div className={"pricing-card-description"}>
                    <p>{item.description}</p>
                </div>
                <div>
                    <ul>
                        {item.features.included.map((item, index) => (
                            <li key={index} className={"pricing-card-features-list"}>
                                <CheckIcon className={"pricing-card-feature-icon"} />
                                {item}
                            </li>
                        ))}
                        {item.features.not_included.map((item, index) => (
                            <li key={index} className={"pricing-card-features-list"}>
                                <em className={"pricing-card-feature-excluded"}>{item}</em>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href={"/"}>
                    <span className={"pricing-card-button secondary-button"}>
                        <span className={"pricing-card-button-text"}>
                            Start Project
                        </span>
                    </span>
                </Link>
                <div className={"content-card-pattern"}></div>
            </div>
        </div>
    );
};

export default PricingCard;
