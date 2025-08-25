import React from "react";
import { motion } from "framer-motion";

import StatCard from "@/components/ui/StatCard";

import { HeroLayerProps, StatInfo, HeroProfileBlockProps } from "@/types";

const HeroLayer: React.FC<HeroLayerProps> = ({ width, height, top, right, bottom, left }) => {
    const style: React.CSSProperties = { width, height, top, right, bottom, left };

    return (
        <span className={"hero-pattern-layer"} style={style} />
    );
};

const DEFAULT_PATTERN_LAYERS: HeroLayerProps[] = [
    { width: "226px", height: "226px", top: "75px", right: "40px", bottom: "0", left: "auto" },
    { width: "141px", height: "141px", top: "auto", right: "auto", bottom: "50px", left: "-110px" },
    { width: "141px", height: "141px", top: "auto", right: "-14px", bottom: "10px", left: "auto" }
];

const DEFAULT_STATS: StatInfo[] = [
    { value: "12", margin: "mt-[160px] ml-[100px]", label: "Years of Experience", highlight: "+" },
    { value: "330", margin: "mt-[-30px] ml-[520px]", label: "Completed Projects" }
];

const HeroProfileBlock: React.FC<HeroProfileBlockProps> = ({ className = "", profileImage = "/images/profile2.png", patternLayers = DEFAULT_PATTERN_LAYERS, stats = DEFAULT_STATS, variants = {}, initial = "", animate = "", transition = {} }) => {
    return (
        <motion.div
            className={`hero-profile-container ${className}`}
            variants={variants}
            initial={initial === "" ? undefined : initial}
            animate={animate === "" ? undefined : animate}
            transition={transition}
        >
            <img src={profileImage} alt={"profile"} className={"hero-profile-image"} />
            <span className={"avatar-circle"} />
            { patternLayers.map((layer, index) => (
                <HeroLayer key={`layer-${index}`} {...layer} />
            )) }
            <div className={"hero-stats-container"}>
                <ul>
                    { stats.map((stat, index) => (
                        <StatCard key={`stat-${index}`} value={stat.value} margin={stat.margin} label={stat.label} highlight={stat.highlight} />
                    )) }
                </ul>
            </div>
        </motion.div>
    );
};

export default HeroProfileBlock;
