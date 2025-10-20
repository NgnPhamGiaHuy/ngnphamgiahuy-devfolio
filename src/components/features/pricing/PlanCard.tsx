import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

import type { PricingCardProps } from "@/types";

const PlanCard: React.FC<PricingCardProps> = ({ item }) => {
    return (
        <div className={"plan-card-wrapper"}>
            {item.highlight && (
                <div className={"plan-card-badge"}>
                    <span>Popular</span>
                </div>
            )}
            <div
                className={clsx(
                    "plan-card",
                    item.highlight ? "border-border-inverse" : "border-white"
                )}
            >
                <div
                    className={
                        "text-[13px] text-inverse font-bold uppercase tracking-wider"
                    }
                >
                    <span>{item.plan}</span>
                </div>
                <div
                    className={
                        "mt-[15px] min-h-[50px] text-[41px] text-primary leading-none"
                    }
                ></div>
                <div
                    className={
                        "mb-[20px] text-[30px] text-inverse font-bold leading-none"
                    }
                >
                    <span
                        aria-label={`Price ${item.price} dollars per ${item.period}`}
                    >
                        {item.price}
                        <b className={"text-primary"}>$</b>
                    </span>
                    <em
                        className={"ml-[15px] text-[16px] not-italic font-bold"}
                    >
                        {item.period}
                    </em>
                </div>
                <div className={"min-h-[145px] pb-[30px] opacity-80"}>
                    <p>{item.description}</p>
                </div>
                <div>
                    <ul>
                        {item.features.included.map((feature, index) => (
                            <li
                                key={`included-${feature}-${index}`}
                                className={
                                    "my-[5px] pl-[30px] list-none relative"
                                }
                            >
                                <CheckIcon
                                    className={
                                        "size-[16px] top-[4px] stroke-4 left-0 text-primary absolute"
                                    }
                                />
                                {feature}
                            </li>
                        ))}
                        {item.features.not_included.map((feature, index) => (
                            <li
                                key={`excluded-${feature}-${index}`}
                                className={
                                    "my-[5px] pl-[30px] list-none relative"
                                }
                            >
                                <em
                                    className={
                                        "text-[#b3b3b3] not-italic line-through"
                                    }
                                >
                                    {feature}
                                </em>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link
                    href={"/"}
                    className={
                        "w-full mt-[30px] z-2 secondary-button inline-flex justify-center"
                    }
                    aria-label={`Start ${item.plan} plan`}
                    prefetch
                >
                    <span className={"relative z-2"}>Start Project</span>
                </Link>
                <div className={"card-pattern"}></div>
            </div>
        </div>
    );
};

PlanCard.displayName = "PlanCard";

export default PlanCard;
