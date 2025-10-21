"use client";

import React, { useMemo } from "react";

import type { ExportContentProps } from "@/types";

const ExportContent: React.FC<ExportContentProps> = ({
    children,
    className = "",
}) => {
    const contentClassName = useMemo(
        () => `flex-full h-full ${className}`,
        [className]
    );

    return (
        <div className={contentClassName}>
            <div className="p-[5px] flex-wrap-start h-full">
                <div
                    className="w-full relative z-2 h-full flex flex-col justify-center"
                    role="region"
                    aria-label="Export content area"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

ExportContent.displayName = "ExportContent";

export default ExportContent;
