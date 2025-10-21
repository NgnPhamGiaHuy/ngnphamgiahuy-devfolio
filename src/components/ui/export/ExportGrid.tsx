"use client";

import React, { useMemo } from "react";

import type { ExportGridProps } from "@/types";

const ExportGrid: React.FC<ExportGridProps> = ({
    children,
    className = "",
}) => {
    const gridClassName = useMemo(
        () =>
            `grid grid-cols-1 lg:grid-cols-2 gap-[20px] max-md:gap-[15px] ${className}`,
        [className]
    );

    return (
        <div
            className={gridClassName}
            role="grid"
            aria-label="Export options grid"
        >
            {children}
        </div>
    );
};

ExportGrid.displayName = "ExportGrid";

export default ExportGrid;
