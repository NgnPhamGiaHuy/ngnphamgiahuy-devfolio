import { z } from "zod";
import ProjectSchema from "@/schemas/content/project.schema";
import { faker } from "@faker-js/faker";
import { fakeSanityImage } from "@/infrastructure/persistence/mocks/factories/sanity";

type Project = z.infer<typeof ProjectSchema>;

const createProject = (): Project => {
    const data = {
        _id: faker.string.nanoid(),
        _type: "project",
        _createdAt: faker.date.past().toISOString(),
        _updatedAt: faker.date.recent().toISOString(),
        _rev: faker.string.uuid(),

        name: faker.commerce.productName(),

        category: faker.helpers.arrayElement(["Web", "Mobile", "AI", "Design"]),

        description: faker.lorem.paragraph(),

        image: faker.datatype.boolean()
            ? fakeSanityImage()
            : faker.internet.url(),

        link: faker.internet.url(),

        featured: faker.datatype.boolean(),

        order: faker.number.int({ min: 1, max: 50 }),
    };

    return ProjectSchema.parse(data);
};

export default createProject;
