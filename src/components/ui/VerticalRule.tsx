// ============================================================
// Component: VerticalRule
// Purpose: Decorative vertical rule with customizable positioning and styling
// ============================================================

import React from "react";

import type { VerticalRuleProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * VerticalRule component renders a decorative vertical line.
 * Features customizable positioning, styling, and accessibility.
 *
 * @param props - Component props
 * @param props.top - Top position value
 * @param props.right - Right position value
 * @param props.bottom - Bottom position value
 * @param props.left - Left position value
 * @param props.width - Width of the rule
 * @param props.shadow - Shadow classes
 * @param props.showPattern - Whether to show decorative pattern
 * @param props.className - Additional CSS classes
 * @returns Vertical rule component
 */
const VerticalRule: React.FC<VerticalRuleProps> = ({
    top = "0",
    right = "0",
    bottom = "0",
    left = "0",
    width = "2px",
    shadow = "before:shadow-[var(--shadow-offset-md)] after:shadow-[var(--shadow-offset-md)]",
    showPattern = true,
    className = "",
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple regex test doesn't need memoization
    const normalizedWidth = /^\d+$/.test(width) ? `${width}px` : width;

    // Remove unnecessary useMemo - simple object creation doesn't need memoization
    const style: React.CSSProperties = {
        width: normalizedWidth,
        top,
        right,
        bottom,
        left,
        position: "absolute",
    };

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={`vertical-rule ${shadow} ${className}`}
            style={style}
            aria-hidden="true"
            data-testid="vertical-rule"
            {...props}
        >
            {showPattern && (
                <span
                    className="vertical-rule-pattern"
                    aria-hidden="true"
                    data-testid="vertical-rule-pattern"
                />
            )}
        </div>
    );
};

VerticalRule.displayName = "VerticalRule";

export default VerticalRule;
