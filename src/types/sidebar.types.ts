// -----------------------------------------------------------------------------
// Sidebar-related Types
// -----------------------------------------------------------------------------

export interface SidebarMenuItemProps {
    text: string;
    index: number;
    sidebarEntered: boolean;
    prefersReducedMotion: boolean;
    href?: string;
    onClick?: () => void;
}

export interface SidebarProps {
    isMenuOpen: boolean;
    onMenuItemClick?: () => void;
}
