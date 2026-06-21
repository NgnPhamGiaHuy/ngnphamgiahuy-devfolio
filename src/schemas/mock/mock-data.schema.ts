import { z } from "zod";

import ProfileSchema from "../content/profile.schema";
import SkillSchema from "../content/skill.schema";
import ProjectSchema from "../content/project.schema";
import EducationSchema from "../content/education.schema";
import ExperienceSchema from "../content/experience.schema";
import BlogPostSchema from "../content/blog-post.schema";

const MockDataSchema = z.object({
    logo: z.string(),
    profile: ProfileSchema,
    skills: z.array(SkillSchema),
    projects: z.array(ProjectSchema),
    education: z.array(EducationSchema),
    experience: z.array(ExperienceSchema),
    blogs: z.array(BlogPostSchema),
});

export type MockDataType = z.infer<typeof MockDataSchema>;

export default MockDataSchema;
