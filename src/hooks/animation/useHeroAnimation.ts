import { AnimationStage } from "@/types";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const useHeroAnimation = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const shouldAnimate = (stage: AnimationStage): boolean => {
        if (prefersReducedMotion) return true;

        return true;
    };

    return { prefersReducedMotion, shouldAnimate };
};

export default useHeroAnimation;