import { Project } from "@/types";

export interface ProjectCardProps {
    index: number;
    portfolio: Project;
}

export interface ProjectGridProps {
    portfolios: Project[];
}

export interface ProjectCategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}