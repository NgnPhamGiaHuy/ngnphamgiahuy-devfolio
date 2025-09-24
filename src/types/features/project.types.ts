import { Project } from "@/types";

export interface ProjectCardProps {
    index: number;
    portfolio: Project;
}

export interface ProjectGridProps {
    maxItems?: number;
    portfolios: Project[];
}

export interface ProjectCategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}