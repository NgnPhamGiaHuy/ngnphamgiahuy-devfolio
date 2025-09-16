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
    href?: string;
    onClick?: () => void;
}

export interface ThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
    className?: string;
}