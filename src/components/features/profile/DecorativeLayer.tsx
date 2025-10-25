// ============================================================
// Component: DecorativeLayer
// Purpose: Decorative background pattern layer with positioning
// ============================================================

import React from "react";

import type { DecorativeLayerProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * DecorativeLayer component renders a decorative background pattern layer.
 * Features configurable positioning and dimensions for visual effects.
 *
 * @param props - Component props
 * @param props.width - Layer width
 * @param props.height - Layer height
 * @param props.top - Top position
 * @param props.right - Right position
 * @param props.bottom - Bottom position
 * @param props.left - Left position
 * @returns Decorative layer component
 */
const DecorativeLayer: React.FC<DecorativeLayerProps> = ({
    width,
    height,
    top,
    right,
    bottom,
    left,
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const style: React.CSSProperties = {
        width,
        height,
        top,
        right,
        bottom,
        left,
    };

    // ============================================================
    // Render
    // ============================================================

    return (
        <span
            className="pat-background"
            style={style}
            role="presentation"
            aria-hidden="true"
            data-testid="decorative-layer"
            {...props}
        />
    );
};

DecorativeLayer.displayName = "DecorativeLayer";

export default DecorativeLayer;
