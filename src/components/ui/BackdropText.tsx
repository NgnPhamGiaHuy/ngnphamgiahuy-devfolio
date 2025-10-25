// ============================================================
// Component: BackdropText
// Purpose: Decorative backdrop text with customizable positioning
// ============================================================

import React from "react";

import type { BackdropTextProps } from "@/types";

// ============================================================
// Component Definition
// ============================================================

/**
 * BackdropText component renders decorative background text.
 * Features customizable positioning, responsive sizing, and accessibility.
 *
 * @param props - Component props
 * @param props.text - Text content to display
 * @param props.top - Top position value
 * @param props.right - Right position value
 * @param props.bottom - Bottom position value
 * @param props.left - Left position value
 * @param props.className - Additional CSS classes
 * @returns Backdrop text component
 */
const BackdropText: React.FC<BackdropTextProps> = ({
    text,
    top = "",
    right = "",
    bottom = "0",
    left = "0",
    className = "",
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple object creation doesn't need memoization
    const positionStyle: React.CSSProperties = { top, right, bottom, left };

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className="w-full absolute z-1"
            style={positionStyle}
            aria-hidden="true"
            data-testid="backdrop-text"
            {...props}
        >
            <div>
                <div
                    className={`w-[200%] top-[-50px] -left-1/2 text-[350px] max-md:text-[150px] max-lg:text-[250px] text-center font-bold font-["Caveat"] whitespace-nowrap leading-[1px] opacity-2 pointer-events-none relative ${className}`}
                >
                    <span data-testid="backdrop-text-content">{text}</span>
                </div>
            </div>
        </div>
    );
};

BackdropText.displayName = "BackdropText";

export default BackdropText;
