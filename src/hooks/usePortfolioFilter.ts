import { useMemo, useState } from "react";

import { Portfolio } from "@/data/data";

const usePortfolioFilter = (portfolios: Portfolio[]) => {
    const categories = useMemo(() => {
        const unique = Array.from(new Set(portfolios.map(p => p.category)));
        return ["All", ...unique];
    }, [portfolios]);

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPortfolios = useMemo(() => {
        if (activeCategory === "All") return portfolios;
        return portfolios.filter(p => p.category === activeCategory);
    }, [activeCategory, portfolios]);

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
    };

    return { categories, activeCategory, filteredPortfolios, handleCategoryChange };
};

export default usePortfolioFilter;