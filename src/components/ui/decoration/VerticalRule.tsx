import React, { useMemo } from "react";

import type { VerticalRuleProps } from "@/types";

const VerticalRule: React.FC<VerticalRuleProps> = ({
    top = "0",
    right = "0",
    bottom = "0",
    left = "0",
    width = "2px",
    shadow = "before:shadow-[var(--shadow-offset-md)] after:shadow-[var(--shadow-offset-md)]",
    showPattern = true,
    className = "",
}: VerticalRuleProps) => {
    const normalizedWidth = useMemo(
        () => (/^\d+$/.test(width) ? `${width}px` : width),
        [width]
    );

    const style: React.CSSProperties = useMemo(
        () => ({
            width: normalizedWidth,
            top,
            right,
            bottom,
            left,
            position: "absolute",
        }),
        [normalizedWidth, top, right, bottom, left]
    );

    return (
        <div
            className={`vertical-rule ${shadow} ${className}`}
            style={style}
            aria-hidden={"true"}
        >
            {showPattern && (
                <span
                    className={"vertical-rule-pattern"}
                    aria-hidden={"true"}
                ></span>
            )}
        </div>
    );
};

VerticalRule.displayName = "VerticalRule";

export default VerticalRule;
