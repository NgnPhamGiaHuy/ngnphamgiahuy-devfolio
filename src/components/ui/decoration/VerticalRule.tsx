import React from "react";

import { VerticalRuleProps } from "@/types";

const VerticalRule: React.FC<VerticalRuleProps> = ({ top = "0", right = "0", bottom = "0", left = "0", width = "2px", shadow = "before:shadow-[var(--shadow-offset-md)] after:shadow-[var(--shadow-offset-md)]", showPattern = true, className = "" }) => {
    const style: React.CSSProperties = { width, top, right, bottom, left, position: "absolute" };

    return (
        <div className={`vertical-rule ${shadow} ${className}`} style={style}>
            {showPattern && (
                <span className={"vertical-rule-pattern"}></span>
            )}
        </div>
    );
};

export default VerticalRule;
