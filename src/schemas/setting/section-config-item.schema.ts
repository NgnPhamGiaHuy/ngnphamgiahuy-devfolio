import { z } from "zod";

const SectionConfigItemSchema = z.object({
    id: z.string().optional(),
    enabled: z.boolean(),
    resetAnimationOnView: z.boolean().optional(),
    verticalRuleDirection: z.enum(["left", "right"]).optional(),
});

export type SectionConfigItemType = z.infer<typeof SectionConfigItemSchema>;

export default SectionConfigItemSchema;
