"use client"

import React from "react";
import Link from "next/link";

import { data } from "@/data/data";
import { Project } from "@/types/sanity.types";
import type { ProjectLike } from "@/types/portfolio.types";

import usePortfolioFilter from "@/hooks/usePortfolioFilter";
import Wrapper from "@/components/sections/wrapper/Wrapper";
import BackgroundText from "@/components/ui/BackgroundText";
import PortfolioGrid from "@/components/sections/work/PortfolioGrid";
import PortfolioFilter from "@/components/sections/work/PortfolioFilter";

interface WorkProps {
    resetAnimationOnView?: boolean;
    projects?: Project[];
}

const Work: React.FC<WorkProps> = ({ resetAnimationOnView, projects = [] }) => {
    const projectItems: ProjectLike[] = (projects && projects.length > 0)
        ? (projects as ProjectLike[])
        : (data.portfolios as ProjectLike[]);

    const normalizedItems = projectItems.map(p => ({
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

export default Work;