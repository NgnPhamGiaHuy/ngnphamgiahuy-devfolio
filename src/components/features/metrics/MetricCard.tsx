import React from "react";

import type { MetricCardProps } from "@/types";

const MetricCard: React.FC<MetricCardProps> = ({ value, label, highlight, className = "", width = "250px", height = "82px", margin = "m-0" }) => {
    const style: React.CSSProperties = { width, height };

    const labelWords = label.split(" ");
    const hasMultipleWords = labelWords.length > 1;
    const labelFirstPart = hasMultipleWords ? labelWords.slice(0, -1).join(" ") : "";
    const labelHighlight = hasMultipleWords ? labelWords.slice(-1)[0] : label;

    return (
        <div style={style} className={`${margin} px-[20px] text-inverse bg-card-inverse rounded-[82px] shadow-[var(--shadow-offset-md)] flex-center border-2-inverse ${className}`}>
            <span className={"w-1/2 text-[37px] text-center font-bold leading-5 uppercase block"}>
                {value}
                {highlight && <strong className={"top-[-4px] text-primary font-bold relative"}>&nbsp;{highlight}</strong>}
            </span>
            <span className={"w-1/2 text-[13px] text-left font-bold tracking-wider leading-5 uppercase block"}>
                {hasMultipleWords ? (
                    <>
                        {labelFirstPart} <br />
                        <strong className={"text-primary font-bold relative"}>
                            {labelHighlight}
                        </strong>
                    </>
                ) : (
                    <strong className={"text-primary font-bold relative"}>{labelHighlight}</strong>
                )}
            </span>
        </div>
    );
};

export default MetricCard;
