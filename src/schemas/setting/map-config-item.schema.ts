import { z } from "zod";

import SectionConfigItemSchema from "../setting/section-config-item.schema";

const MapConfigItemSchema = SectionConfigItemSchema.extend({
    embedUrl: z.string().optional(),
    height: z.number().optional(),
});

export type MapConfigItemType = z.infer<typeof MapConfigItemSchema>;

export default MapConfigItemSchema;
