export interface DecorativeLayerProps {
    width?: string;
    height?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export interface ProfileVisualProps {
    className?: string;
    profileImage?: string;
    patternLayers?: DecorativeLayerProps[];
    stats?: StatInfo[];
    variants?: any;
    initial?: boolean | string | Record<string, any>;
    animate?: boolean | string | Record<string, any>;
    transition?: any;
}

export interface StatInfo {
    value: string;
    label: string;
    highlight?: string;
    margin: string;
}
