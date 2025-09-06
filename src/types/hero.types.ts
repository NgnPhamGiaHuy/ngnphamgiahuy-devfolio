// -----------------------------------------------------------------------------
// Hero Section Types
// -----------------------------------------------------------------------------

/**
 * Props for the HeroLayer component
 */
export interface HeroLayerProps {
    width?: string;
    height?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

/**
 * Props for the HeroProfileBlock component
 */
export interface HeroProfileBlockProps {
    className?: string;
    profileImage?: string;
    patternLayers?: HeroLayerProps[];
    stats?: StatInfo[];
    variants?: any;
    initial?: boolean | string | Record<string, any>;
    animate?: boolean | string | Record<string, any>;
    transition?: any;
}

/**
 * Structure for stat information displayed in the hero section
 */
export interface StatInfo {
    value: string;
    label: string;
    highlight?: string;
    margin: string;
}
