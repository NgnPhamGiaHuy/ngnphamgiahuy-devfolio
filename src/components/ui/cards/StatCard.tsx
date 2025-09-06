import React from "react";

import { StatCardProps } from "@/types/common.types";

const StatCard: React.FC<StatCardProps> = ({ value, label, highlight, className = "", width = "250px", height = "82px", margin = "m-0" }) => {
    const style: React.CSSProperties = { width, height };

    const labelWords = label.split(" ");
    const hasMultipleWords = labelWords.length > 1;
    const labelFirstPart = hasMultipleWords ? labelWords.slice(0, -1).join(" ") : "";
    const labelHighlight = hasMultipleWords ? labelWords.slice(-1)[0] : label;

    return (
        <div style={style} className={`${margin} stat-card ${className}`}>
            <span className={"stat-value"}>
                {value}
                {highlight && <strong className={"stat-highlight"}>&nbsp;{highlight}</strong>}
            </span>
            <span className={"stat-label"}>
                {hasMultipleWords ? (
                    <>
                        {labelFirstPart} <br />
                        <strong className={"stat-label-highlight"}>
                            {labelHighlight}
                        </strong>
                    </>
                ) : (
                    <strong className={"stat-label-highlight"}>{labelHighlight}</strong>
                )}
            </span>
        </div>
    );
};

export default StatCard;
