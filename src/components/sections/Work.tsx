"use client"

import React from "react";
import Link from "next/link";

import usePortfolioFilter from "@/hooks/usePortfolioFilter";
import Wrapper from "@/components/sections/wrapper/Wrapper";
import BackgroundText from "@/components/ui/BackgroundText";
import PortfolioFilter from "@/components/sections/work/PortfolioFilter";
import PortfolioGrid from "@/components/sections/work/PortfolioGrid";

import { data } from "@/data/data";

const Work: React.FC = () => {
    const { portfolios } = data;
    const { categories, activeCategory, filteredPortfolios, handleCategoryChange } = usePortfolioFilter(portfolios);

    return (
        <Wrapper title={"Portfolio"} subtitle={"My Cases"} background={"gradientUp"} hasSectionBodyPadding={false} vlinePosition={"right"}>
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
