import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";
import MapConfigItemSchema from "../setting/map-config-item.schema";
import SectionConfigItemSchema from "../setting/section-config-item.schema";

const SettingsSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("settings"),
        logo: z.string(),
        hero: SectionConfigItemSchema,
        services: SectionConfigItemSchema,
        skills: SectionConfigItemSchema,
        portfolios: SectionConfigItemSchema,
        resume: SectionConfigItemSchema,
        certificates: SectionConfigItemSchema,
        testimonials: SectionConfigItemSchema,
        pricing: SectionConfigItemSchema,
        blog: SectionConfigItemSchema,
        contact: SectionConfigItemSchema,
        map: MapConfigItemSchema,
    })
);

export type SettingsType = z.infer<typeof SettingsSchema>;

export default SettingsSchema;
