import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";

const ProfileSchema = DocumentBaseSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("profile"),
        name: z.string(),
        job_title: z.string(),
        description: z.string(),
        location: z.string(),
        email: z.email(),
        phone: z.string().optional(),
        experience_years: z.number(),
        profile_image: z.string(),
        social_links: z.array(
            z.object({
                platform: z.string(),
                url: z.string(),
                icon: z.string(),
            })
        ),
        cv_link: z.string().optional(),
    })
);

export type ProfileType = z.infer<typeof ProfileSchema>;

export default ProfileSchema;
