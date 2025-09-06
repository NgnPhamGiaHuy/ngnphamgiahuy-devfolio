// -----------------------------------------------------------------------------
// Header-related Types
// -----------------------------------------------------------------------------

/**
 * Possible states for the header component
 */
export type HeaderState = "absolute" | "fixed" | "animating-in" | "animating-out";

/**
 * Props for the Header component
 */
export interface HeaderProps {
    className?: string;
}

/**
 * Props for the HeaderLogo component
 */
export interface HeaderLogoProps {
    logo: string;
    className?: string;
}

/**
 * Props for the HeaderMenuToggle component
 */
export interface HeaderMenuToggleProps {
    isMenuOpen: boolean;
    onToggle: () => void;
    className?: string;
}

/**
 * Props for the HeaderThemeToggle component
 */
export interface HeaderThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
    className?: string;
}
