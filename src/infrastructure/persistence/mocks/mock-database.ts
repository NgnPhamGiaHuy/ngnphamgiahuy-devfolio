import { z } from "zod";
import { createMany, createMock } from "./mock-factory";
import MockDataSchema from "@/schemas/mock/mock-data.schema";

type MockDataType = z.infer<typeof MockDataSchema>;

export function createMockDatabase(): MockDataType {
    return {
        profile: createMock("profile"),
        services: createMany("service", 6),
        skills: createMany("skill", 8),
        projects: createMany("project", 6),
        experience: createMany("experience", 4),
        education: createMany("education", 3),
        certificates: createMany("certificate", 4),
        testimonials: createMany("testimonial", 4),
        pricing: createMany("pricing", 3),
        blogs: createMany("blogPost", 6),
    };
}
