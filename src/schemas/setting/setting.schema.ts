import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";
import SeoFieldsSchema from "@/schemas/base/seo-fields.schema";
import MapConfigItemSchema from "@/schemas/setting/map-config-item.schema";
import SectionConfigItemSchema from "@/schemas/setting/section-config-item.schema";

const SettingSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: "settings",
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

export default SettingSchema;
