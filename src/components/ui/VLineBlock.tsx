import React from "react";

interface VLineBlockProps {
    left?: string;
    top?: string;
    bottom?: string;
    width?: string;
    showPattern?: boolean;
    className?: string;
}

const VLineBlock: React.FC<VLineBlockProps> = ({
    left = "0",
    top = "0",
    bottom = "0",
    width = "2px",
    showPattern = true,
    className = ""
}) => {
    return (
        <div className={`bg-black pointer-events-none absolute z-3 circle-before circle-after ${className}`} style={{ width, left, top, bottom, position: "absolute" }}>
            { showPattern && (
                <span className={"w-[226px] h-[226px] top-[-188px] bottom-auto left-[-168px] bg-[url('/images/pat-1.png')] bg-no-repeat bg-contain block absolute"}></span>
            ) }
        </div>
    );
};

export default VLineBlock;
