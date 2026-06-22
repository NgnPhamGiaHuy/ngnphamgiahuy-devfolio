import type { ProfileType, SectionConfigItemType } from "@/schemas";

export interface NavMenuItem {
    id: string;
    label: string;
}

export interface SidebarProps {
    profile: ProfileType;
    isMenuOpen: boolean;
    /** Menu items + active id are lifted to SiteHeader (shared with desktop nav). */
    menuItems: NavMenuItem[];
    activeId: string | null;
    /** Called when the sidebar should close (backdrop click or ESC). */
    onClose: () => void;
}

export interface SiteHeaderProps {
    profile: ProfileType;
    logo?: string;
    className?: string;
    enabledSections?: SectionConfigItemType[];
}

export interface VerticalRuleProps {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    width?: string;
    shadow?: string;
    showPattern?: boolean;
    className?: string;
}
