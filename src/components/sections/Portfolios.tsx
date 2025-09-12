"use client"

import Link from "next/link";
import React, { useMemo } from "react";

import { data } from "@/data";
import { Project } from "@/types";
import { usePortfolioFilter } from "@/hooks";
import { Wrapper, BackgroundText, PortfolioGrid, PortfolioFilter } from "@/components";

interface WorkProps {
    projects?: Project[];
    resetAnimationOnView?: boolean;
}

const Portfolios: React.FC<WorkProps> = ({ resetAnimationOnView, projects }) => {
    const projectsData = useMemo(() => projects?.length ? projects : data.projects ,[projects]);

    const normalizedItems = projectsData.map(p => ({
        ...p,
        category: p.category ?? "Uncategorized",
    }));

    const { categories, activeCategory, filteredPortfolios, handleCategoryChange } = usePortfolioFilter(normalizedItems);

    return (
        <Wrapper title={"Portfolio"} subtitle={"My Cases"} background={"gradientUp"} hasSectionBodyPadding={false} vlinePosition={"right"} resetAnimationOnView={resetAnimationOnView}>
            <div className={"work-section-wrapper"}>
                <div className={"work-content-wrapper"}>
                    <div className={"work-main-container"}>
                        <div className={"work-inner-container"}>
                            <PortfolioFilter categories={categories} activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                            <PortfolioGrid portfolios={filteredPortfolios} />
                            <div className={"mt-[70px] max-lg:mt-[50px] text-center relative z-2"}>
                                <Link href={"/"}>
                                    <span className={"primary-button"}>
                                        View More
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <BackgroundText text={"Portfolio"} />
                </div>
            </div>
        </Wrapper>
    );
};

export default Portfolios;