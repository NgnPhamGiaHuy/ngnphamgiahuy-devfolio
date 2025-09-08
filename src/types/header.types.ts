export type HeaderState = "absolute" | "fixed" | "animating-in" | "animating-out";

export interface HeaderProps {
    logo?: string;
    className?: string;
}

export interface HeaderLogoProps {
    logo: string;
    className?: string;
}

export interface HeaderMenuToggleProps {
    isMenuOpen: boolean;
    onToggle: () => void;
    className?: string;
}

export interface HeaderThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
    className?: string;
}
