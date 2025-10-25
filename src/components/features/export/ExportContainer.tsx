// ============================================================
// Component: ExportContainer
// Purpose: Main container component for export page layout
// ============================================================

"use client";

import React from "react";

// ============================================================
// Constants
// ============================================================

/** Default container classes */
const CONTAINER_BASE_CLASSES = "min-h-screen relative";

// ============================================================
// Types
// ============================================================

/** Props interface for ExportContainer component */
interface ExportContainerProps {
    /** Child components to render */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportContainer component provides the main layout container for export pages.
 * Features semantic HTML structure and accessibility support.
 *
 * @param props - Component props
 * @returns JSX element representing the export container
 *
 * @example
 * ```tsx
 * <ExportContainer className="bg-gray-50">
 *   <ExportContent>
 *     <ExportGrid />
 *   </ExportContent>
 * </ExportContainer>
 * ```
 */
const ExportContainer: React.FC<ExportContainerProps> = ({
    children,
    className = "",
}) => {
    // ============================================================
    // Computed Values
    // ============================================================

    const containerClassName = `${CONTAINER_BASE_CLASSES} ${className}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={containerClassName}
            role="main"
            aria-label="Export page container"
            data-testid="export-container"
        >
            {children}
        </div>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportContainer.displayName = "ExportContainer";

export default ExportContainer;
