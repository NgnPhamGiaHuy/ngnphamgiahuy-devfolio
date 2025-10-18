import React, { memo, useMemo } from "react";

import type { DecorativeLayerProps } from "@/types";

const DecorativeLayer: React.FC<DecorativeLayerProps> = memo(
    ({ width, height, top, right, bottom, left }) => {
        const style: React.CSSProperties = useMemo(
            () => ({
                width,
                height,
                top,
                right,
                bottom,
                left,
            }),
            [width, height, top, right, bottom, left]
        );

        return (
            <span
                className={"pat-background"}
                style={style}
                role={"presentation"}
                aria-hidden={"true"}
            />
        );
    }
);

DecorativeLayer.displayName = "DecorativeLayer";

export default DecorativeLayer;
