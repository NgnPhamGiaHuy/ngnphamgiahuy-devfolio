"use client";

import React, { useMemo } from "react";

import type { ExportCardProps } from "@/types";

const ExportCard: React.FC<ExportCardProps> = ({
    category,
    icon,
    title,
    description,
    children,
    className = "",
}) => {
    const cardClassName = useMemo(
        () => `card relative overflow-hidden${className}`,
        [className]
    );

    return (
        <div
            className={cardClassName}
            role="article"
            aria-labelledby={`${category.toLowerCase().replace(/\s+/g, "-")}-title`}
        >
            <div className="card-inner flex flex-col">
                <div className="flex-shrink-0">
                    <div className="card-category">{category}</div>
                    <div className="card-icon" aria-hidden="true">
                        <i className={icon}></i>
                    </div>
                    <h3
                        id={`${category.toLowerCase().replace(/\s+/g, "-")}-title`}
                        className="card-title"
                    >
                        {title}
                    </h3>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <p className="card-description">{description}</p>
                    <div className="mt-[15px]">{children}</div>
                </div>
            </div>
            <div className="card-pattern" aria-hidden="true"></div>
        </div>
    );
};

ExportCard.displayName = "ExportCard";

export default ExportCard;
