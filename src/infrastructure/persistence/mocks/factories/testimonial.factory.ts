import { z } from "zod";
import { faker } from "@faker-js/faker";

import TestimonialSchema from "@/schemas/content/testimonial.schema";
import { fakeSanityImage } from "@/infrastructure/persistence/mocks/factories/sanity";

type Testimonial = z.infer<typeof TestimonialSchema>;

const createTestimonial = (
    overrides: Partial<Testimonial> = {}
): Testimonial => {
    const data = {
        _id: faker.string.nanoid(),
        _type: "testimonial",
        _createdAt: faker.date.past().toISOString(),
        _updatedAt: faker.date.recent().toISOString(),

        name: faker.person.fullName(),

        position: faker.person.jobTitle(),

        quote: faker.lorem.paragraph(),

        image: faker.datatype.boolean() ? fakeSanityImage() : faker.image.url(),

        order: faker.number.int({ min: 1, max: 50 }),

        ...overrides,
    };

    return TestimonialSchema.parse(data);
};

export default createTestimonial;
