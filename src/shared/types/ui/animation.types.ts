export interface AnimatedTextProps {
    text: string;
    baseDelay?: number;
    className?: string;
    containerClassName?: string;
    staggerDelay?: number;
    ease?: string;
    duration?: number;
}

export interface BackdropTextProps {
    text: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    className?: string;
}
