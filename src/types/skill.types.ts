import type { Variants } from "framer-motion";

import { Skill } from "./sanity.types";

export interface SkillSectionProps {
    skills?: Skill[] | null;
    resetAnimationOnView?: boolean;
}

export interface SkillCardProps {
    item: Skill;
    variants?: Variants;
    prefersReducedMotion?: boolean;
}