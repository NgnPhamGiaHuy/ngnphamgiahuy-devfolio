import React from "react";

import { BackgroundTextProps } from "@/types";

const BackgroundText: React.FC<BackgroundTextProps> = ({ text, top = "", right = "", bottom = "0", left = "0", className = "" }) => {
    const positionStyle: React.CSSProperties = { top, right, bottom, left };

    return (
        <div className={"w-full absolute z-1"} style={positionStyle}>
            <div>
                <div className={`w-[200%] top-[-50px] -left-1/2 text-[350px] max-md:text-[150px] max-lg:text-[250px] text-[rgba(0,0,0,.02)] text-center font-bold font-['Caveat'] whitespace-nowrap leading-[1px] pointer-events-none relative ${className}`}>
                    <span>
                        { text }
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BackgroundText;
