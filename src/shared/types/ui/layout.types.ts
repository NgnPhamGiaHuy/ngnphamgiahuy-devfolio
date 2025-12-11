import type { ProfileType, SectionConfigItemType } from "@/schemas";

export interface SidebarProps {
    profile: ProfileType;
    isMenuOpen: boolean;
    enabledSections?: SectionConfigItemType[];
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
