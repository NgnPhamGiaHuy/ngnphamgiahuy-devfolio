import { z } from "zod";
import { faker } from "@faker-js/faker";

import SanityImageSchema from "@/schemas/base/sanity-image.schema";

export function fakeSanityImage(): z.infer<typeof SanityImageSchema> {
    return {
        _type: "image",
        asset: {
            _ref: faker.string.uuid(),
            _type: "reference",
        },
        alt: faker.lorem.sentence(),
    };
}
