import { Project } from "./sanity.types";

export interface ContentCardProps {
    item: {
        category: string;
        title: string;
        description: string;
    };
    index: number;
}

export interface PortfolioGridProps {
    portfolios: Project[];
}

export interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}
