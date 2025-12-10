import { z } from "zod";
import { faker } from "@faker-js/faker";

import ServiceSchema from "@/schemas/content/service.schema";

type Service = z.infer<typeof ServiceSchema>;

const createService = (): Service => {
    const data = {
        _id: faker.string.nanoid(),
        _type: "service",
        _createdAt: faker.date.past().toISOString(),
        _updatedAt: faker.date.recent().toISOString(),
        _rev: faker.string.uuid(),

        icon: faker.helpers.arrayElement([
            "lucide:code",
            "lucide:palette",
            "lucide:sparkle",
            "lucide:terminal",
            "lucide:layout-dashboard",
            undefined,
        ]),

        title: faker.commerce.productName(),

        category: faker.helpers.arrayElement([
            "Web Development",
            "UI/UX Design",
            "Branding",
            "Automation",
            "AI Integration",
        ]),

        description: faker.lorem.sentences(2),

        order: faker.number.int({ min: 1, max: 50 }),
    };

    return ServiceSchema.parse(data);
};

export default createService;
