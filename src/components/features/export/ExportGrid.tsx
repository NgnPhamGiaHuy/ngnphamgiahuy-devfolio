// ============================================================
// Component: ExportGrid
// Purpose: Grid layout component for export options
// ============================================================

"use client";

import React from "react";

// ============================================================
// Constants
// ============================================================

/** Default grid layout classes */
const GRID_BASE_CLASSES = `
    grid grid-cols-1 lg:grid-cols-2 
    gap-[20px] max-md:gap-[15px]
`;

// ============================================================
// Types
// ============================================================

/** Props interface for ExportGrid component */
interface ExportGridProps {
    /** Child components to render */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Component
// ============================================================

/**
 * ExportGrid component provides a responsive grid layout for export options.
 * Features responsive design, accessibility support, and flexible content areas.
 *
 * @param props - Component props
 * @returns JSX element representing the export grid
 *
 * @example
 * ```tsx
 * <ExportGrid className="custom-grid-styles">
 *   <ExportCard />
 *   <ExportCard />
 * </ExportGrid>
 * ```
 */
const ExportGrid: React.FC<ExportGridProps> = ({
    children,
    className = "",
}) => {
    // ============================================================
    // Computed Values
    // ============================================================

    const gridClassName = `${GRID_BASE_CLASSES} ${className}`;

    // ============================================================
    // Render
    // ============================================================

    return (
        <div
            className={gridClassName}
            role="grid"
            aria-label="Export options grid"
            data-testid="export-grid"
        >
            {children}
        </div>
    );
};

// ============================================================
// Component Metadata
// ============================================================

ExportGrid.displayName = "ExportGrid";

export default ExportGrid;
