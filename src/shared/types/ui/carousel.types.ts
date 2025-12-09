export interface ContentCarouselProps<T> {
    items: T[];
    spaceBetween?: number;
    renderItem: (item: T, index: number, isActive?: boolean) => React.ReactNode;
}
