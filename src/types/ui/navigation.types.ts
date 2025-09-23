export interface BrandLinkProps {
    logo: string;
    className?: string;
}

export interface MenuToggleProps {
    isMenuOpen: boolean;
    onToggle: () => void;
    className?: string;
}

export interface NavItemProps {
    text: string;
    index: number;
    sidebarEntered: boolean;
    prefersReducedMotion: boolean;
}

export interface ThemeToggleProps {
    className?: string;
}