import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";
import SanityImageSchema from "../base/sanity-image.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";

const ProfileSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("profile"),
        name: z.string(),
        job_title: z.string(),
        description: z.string(),
        location: z.string(),
        email: z.email(),
        phone: z.string().optional(),
        experience_years: z.number(),
        profile_image: z.union([SanityImageSchema, z.string()]),
        social_links: z.array(
            z.object({
                platform: z.string(),
                url: z.string(),
                icon: z.union([SanityImageSchema, z.string()]),
            })
        ),
        cv_link: z.string().optional(),
    })
);

export type ProfileType = z.infer<typeof ProfileSchema>;

export default ProfileSchema;
