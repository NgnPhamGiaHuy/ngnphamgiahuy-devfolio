import { z } from "zod";
import { faker } from "@faker-js/faker";

import EducationSchema from "@/schemas/content/education.schema";

type Education = z.infer<typeof EducationSchema>;

const createEducation = (): Education => {
    const data = {
        _id: faker.string.uuid(),
        _type: "education",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),

        year: faker.date.past().getFullYear().toString(),
        degree: faker.helpers.arrayElement([
            "Bachelor of Science in Computer Science",
            "Bachelor of Information Technology",
            "Software Engineering",
            "Cybersecurity",
            "AI Engineering",
            "Frontend Engineering Bootcamp",
        ]),

        institution: faker.company.name(),

        description: faker.lorem.paragraph(),

        order: faker.number.int({ min: 1, max: 20 }),
    };

    return EducationSchema.parse(data);
};

export default createEducation;
