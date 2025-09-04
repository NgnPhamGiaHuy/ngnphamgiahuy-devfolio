import React, { memo, useMemo } from "react";

import { HeroLayerProps } from "@/types";

const HeroLayer: React.FC<HeroLayerProps> = memo(({ width, height, top, right, bottom, left }) => {
    const style: React.CSSProperties = useMemo(() => ({
        width, height, top, right, bottom, left
    }), [width, height, top, right, bottom, left]);

    return (
        <span
            className={"hero-pattern-layer"}
            style={style}
            role={"presentation"}
            aria-hidden={"true"}
        />
    );
});

HeroLayer.displayName = "HeroLayer";

export default HeroLayer;
