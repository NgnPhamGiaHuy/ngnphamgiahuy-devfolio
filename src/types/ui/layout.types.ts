import type { Profile, SectionConfigItem } from "../sanity.types";

export interface SidebarProps {
    profile: Profile;
    isMenuOpen: boolean;
    enabledSections?: SectionConfigItem[];
}

export interface SiteHeaderProps {
    profile: Profile;
    logo?: string;
    className?: string;
    enabledSections?: SectionConfigItem[];
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
