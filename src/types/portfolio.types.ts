import { Portfolio } from "@/data/data";

// -----------------------------------------------------------------------------
// Portfolio-related Types
// -----------------------------------------------------------------------------
export interface ContentCardProps {
    item: {
        category: string;
        title: string;
        description: string;
    };
    index: number;
}

export interface PortfolioCardProps {
    portfolio: {
        name: string;
        category: string;
        description: string;
        image: string;
        link: string;
    };
    index: number;
}

export interface PortfolioFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export interface PortfolioGridProps {
    portfolios: Portfolio[];
}
