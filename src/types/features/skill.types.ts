import type { Variants } from "framer-motion";

import { Skill } from "../sanity.types";

export interface SkillCardProps {
    item: Skill;
    variants?: Variants;
    prefersReducedMotion?: boolean;
}