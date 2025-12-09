import { z } from "zod";

import SectionConfigItemSchema from "@/schemas/setting/section-config-item.schema";

const MapConfigItemSchema = SectionConfigItemSchema.extend({
    embedUrl: z.string().optional(),
    height: z.number().optional(),
});

export default MapConfigItemSchema;
