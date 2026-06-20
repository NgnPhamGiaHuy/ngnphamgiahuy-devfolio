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
    /** Real section id for the href anchor (falls back to a slug of text). */
    sectionId?: string;
    /** Whether this is the section currently in view (scroll-spy). */
    active?: boolean;
}

export interface ThemeToggleProps {
    className?: string;
}
