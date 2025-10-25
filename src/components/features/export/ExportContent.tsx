// ============================================================
// Component: ExportContent
// Purpose: Content wrapper component for export page layout
// ============================================================

"use client";

import React from "react";

// ============================================================
// Constants
// ============================================================

/** Default content wrapper classes */
const CONTENT_WRAPPER_CLASSES = "flex-full h-full";

/** Default inner container classes */
const INNER_CONTAINER_CLASSES = "p-[5px] flex-wrap-start h-full";

/** Default content area classes */
const CONTENT_AREA_CLASSES =
    "w-full relative z-2 h-full flex flex-col justify-center";

// ============================================================
// Types
// ============================================================

/** Props interface for ExportContent component */
interface ExportContentProps {
    /** Child components to render */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportContent component provides a content wrapper for export page layout.
 * Features flexible layout structure and accessibility support.
 *
 * @param props - Component props
 * @returns JSX element representing the export content wrapper
 *
 * @example
 * ```tsx
 * <ExportContent className="bg-white">
 *   <ExportGrid>
 *     <ExportCard />
 *   </ExportGrid>
 * </ExportContent>
 * ```
 */
const ExportContent: React.FC<ExportContentProps> = ({
    children,
    className = "",
}) => {
    // ============================================================
    // Computed Values
    // ============================================================

    const contentClassName = `${CONTENT_WRAPPER_CLASSES} ${className}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className={contentClassName}>
            <div className={INNER_CONTAINER_CLASSES}>
                <div
                    className={CONTENT_AREA_CLASSES}
                    role="region"
                    aria-label="Export content area"
                    data-testid="export-content"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportContent.displayName = "ExportContent";

export default ExportContent;
