import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";
import MapConfigItemSchema from "../setting/map-config-item.schema";
import SectionConfigItemSchema from "../setting/section-config-item.schema";

const SettingsSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("settings"),
        logo: z.string(),
        // Active COMMIT HISTORY sections
        hero: SectionConfigItemSchema,
        projects: SectionConfigItemSchema,
        skills: SectionConfigItemSchema,
        now: SectionConfigItemSchema,
        contact: SectionConfigItemSchema,
        // Legacy/optional sections (kept for backward-compatible documents)
        services: SectionConfigItemSchema.optional(),
        portfolios: SectionConfigItemSchema.optional(),
        resume: SectionConfigItemSchema.optional(),
        certificates: SectionConfigItemSchema.optional(),
        testimonials: SectionConfigItemSchema.optional(),
        pricing: SectionConfigItemSchema.optional(),
        blog: SectionConfigItemSchema.optional(),
        map: MapConfigItemSchema.optional(),
    })
);

export type SettingsType = z.infer<typeof SettingsSchema>;

export default SettingsSchema;
