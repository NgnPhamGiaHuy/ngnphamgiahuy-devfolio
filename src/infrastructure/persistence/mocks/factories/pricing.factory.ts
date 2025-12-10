import { z } from "zod";
import { faker } from "@faker-js/faker";

import PricingSchema from "@/schemas/content/pricing.schema";

type Pricing = z.infer<typeof PricingSchema>;

const createPricing = (): Pricing => {
    const data = {
        _id: faker.string.uuid(),
        _type: "pricing",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),

        plan: faker.helpers.arrayElement([
            "Starter",
            "Basic",
            "Professional",
            "Enterprise",
        ]),

        price: faker.helpers.arrayElement(["$9", "$19", "$49", "$99"]),

        period: faker.helpers.arrayElement(["monthly", "yearly"]),

        description: faker.lorem.sentence(),

        features: {
            included: faker.helpers.arrayElements(
                [
                    "24/7 Support",
                    "Unlimited Projects",
                    "Custom Domain",
                    "Analytics Dashboard",
                    "User Management",
                    "API Access",
                ],
                faker.number.int({ min: 2, max: 5 })
            ),
            not_included: faker.helpers.arrayElements(
                [
                    "Priority Support",
                    "Advanced Reporting",
                    "Dedicated Manager",
                    "White Labeling",
                ],
                faker.number.int({ min: 1, max: 4 })
            ),
        },

        highlight: faker.datatype.boolean(),

        order: faker.number.int({ min: 1, max: 10 }),
    };

    return PricingSchema.parse(data);
};

export default createPricing;
