import React, { useMemo } from "react";

import type { BackdropTextProps } from "@/types";

const BackdropText: React.FC<BackdropTextProps> = ({
    text,
    top = "",
    right = "",
    bottom = "0",
    left = "0",
    className = "",
}) => {
    const positionStyle: React.CSSProperties = useMemo(
        () => ({ top, right, bottom, left }),
        [top, right, bottom, left]
    );

    return (
        <div
            className={"w-full absolute z-1"}
            style={positionStyle}
            aria-hidden={"true"}
        >
            <div>
                <div
                    className={`w-[200%] top-[-50px] -left-1/2 text-[350px] max-md:text-[150px] max-lg:text-[250px] text-center font-bold font-["Caveat"] whitespace-nowrap leading-[1px] opacity-2 pointer-events-none relative ${className}`}
                >
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
};

BackdropText.displayName = "BackdropText";

export default BackdropText;
