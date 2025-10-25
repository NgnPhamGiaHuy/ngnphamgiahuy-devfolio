// ============================================================
// Component: Portfolios
// Purpose: Display portfolio projects with category filtering and grid layout
// ============================================================

"use client";

import Link from "next/link";
import React from "react";

import type { PortfoliosSectionProps } from "@/types";

import useCategoryFilter from "./hooks/useCategoryFilter";
import {
    BackdropText,
    ProjectGrid,
    ProjectCategoryFilter,
    Wrapper,
} from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * Portfolios component renders a section displaying portfolio projects.
 * Features category filtering, responsive grid layout, and optional "See More" link.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.projects - Array of project data
 * @param props.backgroundVariant - Background variant for the section
 * @param props.maxItems - Maximum number of items to display
 * @param props.hideSeeMore - Whether to hide the "See More" link
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Portfolios section component
 */
const Portfolios: React.FC<PortfoliosSectionProps> = ({
    id,
    projects,
    backgroundVariant = "gradientUp",
    maxItems,
    hideSeeMore = false,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const normalizedItems = projects.map((p) => ({
        ...p,
        category: p.category ?? "Uncategorized",
    }));

    const {
        categories,
        activeCategory,
        filteredPortfolios,
        handleCategoryChange,
    } = useCategoryFilter(normalizedItems);

    const showSeeMore = !hideSeeMore && projects.length > 5;

    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Portfolio"
            subtitle="My Cases"
            backgroundVariant={backgroundVariant}
            hasBodyPadding={false}
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className="flex-full">
                <div className="p-[10px] flex-wrap-start">
                    <div
                        className="w-full mb-[20px] relative"
                        data-testid="portfolios-container"
                    >
                        <div className="portfolios-inner-container">
                            {/* Category Filter */}
                            <ProjectCategoryFilter
                                categories={categories}
                                activeCategory={activeCategory}
                                onCategoryChange={handleCategoryChange}
                                data-testid="category-filter"
                            />

                            {/* Project Grid */}
                            <ProjectGrid
                                maxItems={maxItems}
                                portfolios={filteredPortfolios}
                                data-testid="project-grid"
                            />

                            {/* See More Link */}
                            {showSeeMore && (
                                <div className="mt-[70px] max-lg:mt-[50px] text-center relative z-2">
                                    <Link
                                        href={`/${id}`}
                                        aria-label={`View more projects in ${id}`}
                                        prefetch={false}
                                        className="inline-block"
                                    >
                                        <span
                                            className="primary-button"
                                            data-testid="view-more-button"
                                        >
                                            View More
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Decorative backdrop text */}
                    <BackdropText text="Portfolio" />
                </div>
            </div>
        </Wrapper>
    );
};

Portfolios.displayName = "Portfolios";

export default Portfolios;
