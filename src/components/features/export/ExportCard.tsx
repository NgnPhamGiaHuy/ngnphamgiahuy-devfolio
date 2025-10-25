// ============================================================
// Component: ExportCard
// Purpose: Card component for displaying export category information
// ============================================================

"use client";

import React from "react";

// ============================================================
// Constants
// ============================================================

/** Default card spacing */
const CARD_SPACING = "mt-[15px]";

/** Default card classes */
const CARD_BASE_CLASSES = "card relative overflow-hidden";

// ============================================================
// Types
// ============================================================

/** Props interface for ExportCard component */
interface ExportCardProps {
    /** Category name for the card */
    category: string;
    /** Icon class name for the card */
    icon: string;
    /** Card title */
    title: string;
    /** Card description */
    description: string;
    /** Child components to render */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportCard component provides a structured card layout for export categories.
 * Features semantic HTML structure, accessibility support, and flexible content areas.
 *
 * @param props - Component props
 * @returns JSX element representing the export card
 *
 * @example
 * ```tsx
 * <ExportCard
 *   category="Portfolio"
 *   icon="fas fa-briefcase"
 *   title="Project Data"
 *   description="Export all project information"
 * >
 *   <CustomCheckbox id="projects" label="Include Projects" />
 * </ExportCard>
 * ```
 */
const ExportCard: React.FC<ExportCardProps> = ({
    category,
    icon,
    title,
    description,
    children,
    className = "",
}) => {
    // ============================================================
    // Computed Values
    // ============================================================

    // Generate unique ID for accessibility
    const cardId = category.toLowerCase().replace(/\s+/g, "-");
    const titleId = `${cardId}-title`;

    // Build card classes
    const cardClassName = `${CARD_BASE_CLASSES}${className}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={cardClassName}
            role="article"
            aria-labelledby={titleId}
            data-testid={`export-card-${cardId}`}
        >
            {/* Card inner content */}
            <div className="card-inner flex flex-col">
                {/* Header section */}
                <div className="flex-shrink-0">
                    <div className="card-category">{category}</div>
                    <div className="card-icon" aria-hidden="true">
                        <i className={icon}></i>
                    </div>
                    <h3 id={titleId} className="card-title">
                        {title}
                    </h3>
                </div>

                {/* Content section */}
                <div className="flex-1 flex flex-col justify-between">
                    <p className="card-description">{description}</p>
                    <div className={CARD_SPACING}>{children}</div>
                </div>
            </div>

            {/* Decorative pattern */}
            <div className="card-pattern" aria-hidden="true"></div>
        </div>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportCard.displayName = "ExportCard";

export default ExportCard;
