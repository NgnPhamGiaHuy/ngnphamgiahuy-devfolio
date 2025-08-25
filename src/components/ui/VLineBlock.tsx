import React from "react";

import { VLineBlockProps } from "@/types";

const VLineBlock: React.FC<VLineBlockProps> = ({ left = "0", top = "0", bottom = "0", width = "2px", shadow = "before:shadow-[5px_5px_0_rgb(0_0_0/0.2)] after:shadow-[5px_5px_0_rgb(0_0_0/0.2)]", showPattern = true, className = "" }) => {
    const style: React.CSSProperties = { width, left, top, bottom, position: "absolute" };

    return (
        <div className={`vline-block ${shadow} ${className}`} style={style}>
            { showPattern && (
                <span className={"vline-pattern"}></span>
            ) }
        </div>
    );
};

export default VLineBlock;
