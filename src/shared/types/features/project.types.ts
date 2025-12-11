import type { ProjectType } from "@/schemas";

export interface ProjectCardProps {
    index: number;
    portfolio: ProjectType;
}

export interface ProjectGridProps {
    maxItems?: number;
    portfolios: ProjectType[];
}

export interface ProjectCategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}
