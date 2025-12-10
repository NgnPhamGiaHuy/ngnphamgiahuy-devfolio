import { z } from "zod";
import { faker } from "@faker-js/faker";

import CertificateSchema from "@/schemas/content/certificate.schema";
import { fakeSanityImage } from "@/infrastructure/persistence/mocks/factories/sanity";

type Certificate = z.infer<typeof CertificateSchema>;

const createCertificate = (): Certificate => {
    const data = {
        _id: faker.string.uuid(),
        _type: "certificate",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),

        title: faker.lorem.words(3),
        issuer: faker.company.name(),
        issueDate: faker.date.past().toISOString(),

        expiryDate: faker.datatype.boolean()
            ? faker.date.future().toISOString()
            : undefined,

        credentialId: faker.datatype.boolean()
            ? faker.string.alphanumeric(10).toUpperCase()
            : undefined,

        credentialUrl: faker.datatype.boolean()
            ? faker.internet.url()
            : undefined,

        description: faker.datatype.boolean()
            ? faker.lorem.paragraph()
            : undefined,

        image: faker.datatype.boolean()
            ? fakeSanityImage()
            : faker.internet.url(),

        category: faker.helpers.arrayElement([
            "Cybersecurity",
            "Cloud",
            "Frontend",
            "Backend",
            "AI",
            "Design",
            "Management",
        ]),

        order: faker.number.int({ min: 1, max: 99 }),
    };

    return CertificateSchema.parse(data);
};

export default createCertificate;
