import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";
import SanityImageSchema from "@/schemas/base/sanity-image.schema";
import SeoFieldsSchema from "@/schemas/base/seo-fields.schema";

const ProfileSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("profile"),
        name: z.string(),
        job_title: z.string(),
        description: z.string(),
        location: z.string(),
        email: z.email(),
        phone: z.string(),
        experience_years: z.number(),
        profile_image: z.union([SanityImageSchema, z.string()]),
        social_links: z.array(
            z.object({
                platform: z.string(),
                url: z.url(),
                icon: z.union([SanityImageSchema, z.string()]),
            })
        ),
        cv_link: z.string().optional(),
    })
);

export default ProfileSchema;
