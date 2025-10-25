// ============================================================
// Component: MetricCard
// Purpose: Display statistical metrics with animated values and labels
// ============================================================

import React from "react";

// ============================================================
// Component Definition
// ============================================================

/**
 * MetricCard component renders a statistical metric with value and label.
 * Features responsive design, customizable styling, and proper accessibility.
 *
 * @param props - Component props
 * @param props.value - The metric value to display
 * @param props.label - The metric label/description
 * @param props.highlight - Optional highlight text (e.g., "+", "%")
 * @param props.className - Additional CSS classes
 * @param props.width - Card width (default: "250px")
 * @param props.height - Card height (default: "82px")
 * @param props.margin - Margin classes (default: "m-0")
 * @returns Metric card component
 */

/**
 * Props interface for MetricCard component.
 * Defines the configuration options for displaying statistical metrics.
 */
export interface MetricCardProps {
    /** The metric value to display (e.g., "150", "99%", "25+") */
    value: string;
    /** The metric label/description (e.g., "Projects Completed", "Happy Clients") */
    label: string;
    /** Optional highlight text appended to value (e.g., "+", "%", "K") */
    highlight?: string;
    /** Additional CSS classes for custom styling */
    className?: string;
    /** Card width in CSS units (default: "250px") */
    width?: string;
    /** Card height in CSS units (default: "82px") */
    height?: string;
    /** Margin classes for spacing (default: "m-0") */
    margin?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
    value,
    label,
    highlight,
    className = "",
    width = "250px",
    height = "82px",
    margin = "m-0",
    ...props
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Process label for multi-word display
    const labelWords = label.split(" ");
    const hasMultipleWords = labelWords.length > 1;
    const labelFirstPart = hasMultipleWords
        ? labelWords.slice(0, -1).join(" ")
        : "";
    const labelHighlight = hasMultipleWords ? labelWords.slice(-1)[0] : label;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            style={{ width, height }}
            className={`${margin} px-[20px] text-inverse bg-card-inverse rounded-[82px] shadow-[var(--shadow-offset-md)] flex-center border-2-inverse ${className}`}
            role="img"
            aria-label={`${value}${highlight || ""} ${label}`}
            data-testid="metric-card"
            {...props}
        >
            {/* Metric Value */}
            <div className="w-1/2 text-[37px] text-center font-bold leading-5 uppercase block">
                <span data-testid="metric-value">{value}</span>
                {highlight && (
                    <strong className="top-[-4px] text-primary font-bold relative">
                        &nbsp;{highlight}
                    </strong>
                )}
            </div>

            {/* Metric Label */}
            <div className="w-1/2 text-[13px] text-left font-bold tracking-wider leading-5 uppercase block">
                {hasMultipleWords ? (
                    <>
                        <span data-testid="metric-label-first">
                            {labelFirstPart}
                        </span>
                        <br />
                        <strong className="text-primary font-bold relative">
                            {labelHighlight}
                        </strong>
                    </>
                ) : (
                    <strong className="text-primary font-bold relative">
                        {labelHighlight}
                    </strong>
                )}
            </div>
        </div>
    );
};

MetricCard.displayName = "MetricCard";

export default MetricCard;
