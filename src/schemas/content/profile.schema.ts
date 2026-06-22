import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";
import { ImageFieldSchema } from "../base/stored-image.schema";
import { FileFieldSchema, IconFieldSchema } from "../base/stored-file.schema";

const ProfileSchema = DocumentBaseSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("profile"),
        name: z.string(),
        job_title: z.string(),
        description: z.string(),
        location: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        experience_years: z.number(),
        profile_image: ImageFieldSchema,
        social_links: z.array(
            z.object({
                platform: z.string(),
                url: z.string(),
                icon: IconFieldSchema,
            })
        ),
        resume: FileFieldSchema.optional(),
    })
);

export type ProfileType = z.infer<typeof ProfileSchema>;

export default ProfileSchema;
