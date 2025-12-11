import { z } from "zod";

import ProfileSchema from "../content/profile.schema";
import ServiceSchema from "../content/service.schema";
import SkillSchema from "../content/skill.schema";
import ProjectSchema from "../content/project.schema";
import EducationSchema from "../content/education.schema";
import ExperienceSchema from "../content/experience.schema";
import TestimonialSchema from "../content/testimonial.schema";
import PricingSchema from "../content/pricing.schema";
import BlogPostSchema from "../content/blog-post.schema";
import CertificateSchema from "../content/certificate.schema";

const MockDataSchema = z.object({
    logo: z.string(),
    profile: ProfileSchema,
    services: z.array(ServiceSchema),
    skills: z.array(SkillSchema),
    projects: z.array(ProjectSchema),
    education: z.array(EducationSchema),
    experience: z.array(ExperienceSchema),
    testimonials: z.array(TestimonialSchema),
    pricing: z.array(PricingSchema),
    blogs: z.array(BlogPostSchema),
    certificates: z.array(CertificateSchema),
});

export type MockDataType = z.infer<typeof MockDataSchema>;

export default MockDataSchema;
