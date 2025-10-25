// ============================================================
// Hook: useCategoryFilter
// Purpose: Manages category filtering for portfolio items with performance optimization
// ============================================================

"use client";

import { useMemo, useState } from "react";

// ============================================================
// Types
// ============================================================

/**
 * Base portfolio item interface
 */
interface PortfolioItem {
    category: string;
}

/**
 * Return type for useCategoryFilter hook
 */
interface UseCategoryFilterReturn<T extends PortfolioItem> {
    /** Available categories including "All" */
    categories: string[];
    /** Currently active category */
    activeCategory: string;
    /** Filtered portfolio items based on active category */
    filteredPortfolios: T[];
    /** Handler to change active category */
    handleCategoryChange: (category: string) => void;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for filtering portfolio items by category.
 * Provides category management with performance optimization for large datasets.
 *
 * @param portfolioItems - Array of portfolio items to filter
 * @returns Object containing categories, active category, filtered items, and handler
 *
 * @example
 * ```tsx
 * const { categories, activeCategory, filteredPortfolios, handleCategoryChange } =
 *   useCategoryFilter(portfolioItems);
 *
 * return (
 *   <div>
 *     {categories.map(category => (
 *       <button
 *         key={category}
 *         onClick={() => handleCategoryChange(category)}
 *         className={activeCategory === category ? 'active' : ''}
 *       >
 *         {category}
 *       </button>
 *     ))}
 *     {filteredPortfolios.map(item => (
 *       <PortfolioCard key={item.id} item={item} />
 *     ))}
 *   </div>
 * );
 * ```
 */
const useCategoryFilter = <T extends PortfolioItem>(
    portfolioItems: T[] = []
): UseCategoryFilterReturn<T> => {
    // ============================================================
    // State
    // ============================================================

    const [activeCategory, setActiveCategory] = useState<string>("All");

    // ============================================================
    // Computed Values
    // ============================================================

    // Extract unique categories from portfolio items
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(portfolioItems.map((item) => item.category))
        );
        return ["All", ...uniqueCategories];
    }, [portfolioItems]);

    // Filter portfolio items based on active category
    const filteredPortfolios = useMemo(() => {
        if (activeCategory === "All") {
            return portfolioItems;
        }
        return portfolioItems.filter(
            (item) => item.category === activeCategory
        );
    }, [activeCategory, portfolioItems]);

    // ============================================================
    // Event Handlers
    // ============================================================

    const handleCategoryChange = (category: string): void => {
        setActiveCategory(category);
    };

    // ============================================================
    // Return
    // ============================================================

    return {
        categories,
        activeCategory,
        filteredPortfolios,
        handleCategoryChange,
    };
};

export default useCategoryFilter;
