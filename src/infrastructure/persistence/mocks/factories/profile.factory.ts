import { z } from "zod";
import { faker } from "@faker-js/faker";

import ProfileSchema from "@/schemas/content/profile.schema";

type Profile = z.infer<typeof ProfileSchema>;

const createProfile = (): Profile => {
    const data = {
        _id: faker.string.uuid(),
        _type: "profile",
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: faker.string.uuid(),

        name: faker.person.fullName(),

        job_title: faker.person.jobTitle(),

        description: faker.lorem.paragraph(),

        location: faker.location.city(),

        email: faker.internet.email(),
        phone: faker.phone.number(),

        experience_years: faker.number.int({ min: 1, max: 20 }),

        profile_image: faker.image.avatar(),

        social_links: [
            {
                platform: "GitHub",
                url: "https://github.com",
                icon: "/icons/github.svg",
            },
        ],

        cv_link: "#",
    };

    return ProfileSchema.parse(data);
};

export default createProfile;
