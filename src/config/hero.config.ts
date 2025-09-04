import { HeroLayerProps, StatInfo } from "@/types";

export const DEFAULT_PATTERN_LAYERS: HeroLayerProps[] = [
    { width: "226px", height: "226px", top: "75px", right: "40px", bottom: "0", left: "auto" },
    { width: "141px", height: "141px", top: "auto", right: "auto", bottom: "50px", left: "-110px" },
    { width: "141px", height: "141px", top: "auto", right: "-14px", bottom: "10px", left: "auto" }
];

export const DEFAULT_STATS: StatInfo[] = [
    { value: "12", margin: "mt-[160px] ml-[100px]", label: "Years of Experience", highlight: "+" },
    { value: "330", margin: "mt-[-30px] ml-[520px]", label: "Completed Projects" }
];


