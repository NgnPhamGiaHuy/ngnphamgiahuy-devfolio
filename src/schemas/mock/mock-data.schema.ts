import { z } from "zod";

import ProfileSchema from "@/schemas/content/profile.schema";
import ServiceSchema from "@/schemas/content/service.schema";
import SkillSchema from "@/schemas/content/skill.schema";
import ProjectSchema from "@/schemas/content/project.schema";
import EducationSchema from "@/schemas/content/education.schema";
import ExperienceSchema from "@/schemas/content/experience.schema";
import TestimonialSchema from "@/schemas/content/testimonial.schema";
import PricingSchema from "@/schemas/content/pricing.schema";
import BlogPostSchema from "@/schemas/content/blog-post.schema";
import CertificateSchema from "@/schemas/content/certificate.schema";

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

export default MockDataSchema;
