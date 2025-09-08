import { useMemo, useState } from "react";

type PortfolioItem = {
    category: string;
};

const usePortfolioFilter = <T extends PortfolioItem>(portfolioItems: T[] = []) => {
    const categories = useMemo(() => {
        const unique = Array.from(new Set(portfolioItems.map(p => p.category)));
        return ["All", ...unique];
    }, [portfolioItems]);

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPortfolios = useMemo(() => {
        if (activeCategory === "All") return portfolioItems;
        return portfolioItems.filter(p => p.category === activeCategory);
    }, [activeCategory, portfolioItems]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    return { categories, activeCategory, filteredPortfolios, handleCategoryChange };
};

export default usePortfolioFilter;