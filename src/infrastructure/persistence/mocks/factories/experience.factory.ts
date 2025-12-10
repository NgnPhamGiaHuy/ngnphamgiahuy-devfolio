import { z } from "zod";
import { faker } from "@faker-js/faker";

import ExperienceSchema from "@/schemas/content/experience.schema";

type Experience = z.infer<typeof ExperienceSchema>;

const createExperience = (): Experience => {
    const data = {
        _id: faker.string.uuid(),
        _type: "experience",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),

        title: faker.helpers.arrayElement([
            "Frontend Developer",
            "Backend Developer",
            "Full-Stack Engineer",
            "Software Engineer",
            "Junior Web Developer",
            "Cybersecurity Intern",
            "UI Engineer",
        ]),

        company: faker.company.name(),

        description: faker.lorem.paragraph(),

        year: `${faker.number.int({ min: 2018, max: 2025 })}`,

        order: faker.number.int({ min: 1, max: 20 }),
    };

    return ExperienceSchema.parse(data);
};

export default createExperience;
