"use client"

import React from "react";
import Link from "next/link";

import type { PortfoliosSectionProps } from "@/types";

import { useCategoryFilter } from "@/hooks";
import { BackdropText, ProjectGrid, ProjectCategoryFilter, Wrapper } from "@/components";

const Portfolios: React.FC<PortfoliosSectionProps> = ({ id, projects, backgroundVariant = "gradientUp", maxItems, hideSeeMore = false, resetAnimationOnView }) => {
    const normalizedItems = projects.map(p => ({
        ...p,
        category: p.category ?? "Uncategorized",
    }));

    const { categories, activeCategory, filteredPortfolios, handleCategoryChange } = useCategoryFilter(normalizedItems);

    return (
        <Wrapper id={id} title={"Portfolio"} subtitle={"My Cases"} backgroundVariant={backgroundVariant} hasBodyPadding={false} verticalRulePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"flex-full"}>
                <div className={"p-[10px] flex-wrap-start"}>
                    <div className={"w-full mb-[20px] relative"}>
                        <div className={"portfolios-inner-container"}>
                            <ProjectCategoryFilter categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                            <ProjectGrid maxItems={maxItems} portfolios={filteredPortfolios} />
                            {!hideSeeMore && projects.length > 5 && (
                                <div className={"mt-[70px] max-lg:mt-[50px] text-center relative z-2"}>
                                    <Link href={`/${id}`}>
                                        <span className={"primary-button"}>
                                            View More
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <BackdropText text={"Portfolio"} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Portfolios;