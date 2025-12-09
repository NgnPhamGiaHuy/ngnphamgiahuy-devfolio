import { z } from "zod";
import { faker } from "@faker-js/faker";

import SkillSchema from "@/schemas/content/skill.schema";

type Skill = z.infer<typeof SkillSchema>;

const createSkill = (overrides: Partial<Skill> = {}): Skill => {
    const data = {
        _id: faker.string.nanoid(),
        _type: "skill",
        _createdAt: faker.date.past().toISOString(),
        _updatedAt: faker.date.recent().toISOString(),

        name: faker.helpers.arrayElement([
            "JavaScript",
            "TypeScript",
            "ReactJS",
            "Next.js",
            "Node.js",
            "Python",
            "MongoDB",
            "TailwindCSS",
            "Docker",
            "AWS",
            "CI/CD",
            "Git",
        ]),

        description: faker.lorem.sentences(2),

        experience_years: faker.number.int({ min: 1, max: 10 }),

        category: faker.helpers.arrayElement([
            "Frontend",
            "Backend",
            "DevOps",
            "Cloud",
            "Database",
            "Tools",
            undefined,
        ]),

        order: faker.number.int({ min: 1, max: 100 }),

        ...overrides,
    };

    return SkillSchema.parse(data);
};

export default createSkill;
