export interface ServiceCardProps {
    item: {
        category: string;
        title: string;
        description: string;
    };
    index: number;
    isActive?: boolean;
}
