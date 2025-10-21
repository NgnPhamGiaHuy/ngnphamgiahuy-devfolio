"use client";

import React, { useMemo } from "react";

import type { ExportContainerProps } from "@/types";

const ExportContainer: React.FC<ExportContainerProps> = ({
    children,
    className = "",
}) => {
    const containerClassName = useMemo(
        () => `min-h-screen relative ${className}`,
        [className]
    );

    return (
        <div
            className={containerClassName}
            role="main"
            aria-label="Export page container"
        >
            {children}
        </div>
    );
};

ExportContainer.displayName = "ExportContainer";

export default ExportContainer;
