import { z } from "zod";

import ProfileSchema from "@/schemas/content/profile.schema";
import ProjectSchema from "@/schemas/content/project.schema";
import SkillSchema from "@/schemas/content/skill.schema";
import EducationSchema from "@/schemas/content/education.schema";
import ExperienceSchema from "@/schemas/content/experience.schema";
import MockDataSchema from "@/schemas/mock/mock-data.schema";
import SettingsSchema from "@/schemas/setting/settings.schema";
import {
    REAL_EDUCATION,
    REAL_EXPERIENCE,
    REAL_PROFILE,
    REAL_PROJECTS,
    REAL_SKILLS,
} from "@/infrastructure/persistence/content/portfolio-content";


const CompleteMockDataSchema = MockDataSchema.extend({
    settings: SettingsSchema,
});

export type CompleteMockData = z.infer<typeof CompleteMockDataSchema>;
/** Kept for call-site compatibility; the fallback is static and ignores options. */
export type CreateMockDataOptions = Record<string, never>;

const LOGO = "NGUYENHUY";
const PLACEHOLDER_IMAGE = "/images/profile2.png";

const doc = (type: string, id: string) => ({ _id: id, _type: type });

const section = (id: string) => ({ id, enabled: true, resetAnimationOnView: false });

let _cache: CompleteMockData | null = null;

const build = (): CompleteMockData => {
    const profile = ProfileSchema.parse({
        ...doc("profile", "profile-main"),
        profile_image: PLACEHOLDER_IMAGE,
        social_links: [
            {
                platform: "GitHub",
                url: "https://github.com/ngnphamgiahuy",
                icon: "/icons/github.svg",
            },
        ],
        cv_link: "#",
        ...REAL_PROFILE,
        _type: "profile",
    });

    const skills = REAL_SKILLS.map((s, i) =>
        SkillSchema.parse({ ...doc("skill", s._id ?? `skill-${i}`), ...s, _type: "skill" })
    );

    const projects = REAL_PROJECTS.map((p, i) =>
        ProjectSchema.parse({
            ...doc("project", p._id ?? `project-${i}`),
            image: PLACEHOLDER_IMAGE,
            ...p,
            _type: "project",
        })
    );

    const education = REAL_EDUCATION.map((e, i) =>
        EducationSchema.parse({
            ...doc("education", e._id ?? `edu-${i}`),
            ...e,
            _type: "education",
        })
    );

    const experience = REAL_EXPERIENCE.map((x, i) =>
        ExperienceSchema.parse({
            ...doc("experience", x._id ?? `exp-${i}`),
            ...x,
            _type: "experience",
        })
    );

    const settings = SettingsSchema.parse({
        ...doc("settings", "settings-main"),
        _type: "settings",
        metaTitle: `${REAL_PROFILE.name ?? "Portfolio"} — ${REAL_PROFILE.job_title ?? ""}`.trim(),
        metaDescription: REAL_PROFILE.description ?? "",
        logo: LOGO,
        hero: section("hero"),
        projects: section("projects"),
        skills: section("skills"),
        now: section("now"),
        contact: section("contact"),
        blog: section("blog"),
    });

    return CompleteMockDataSchema.parse({
        logo: LOGO,
        profile,
        services: [],
        skills,
        projects,
        education,
        experience,
        testimonials: [],
        pricing: [],
        blogs: [],
        certificates: [],
        settings,
    });
};

export const createMockData = (
    _options: CreateMockDataOptions = {}
): CompleteMockData => {
    if (!_cache) _cache = build();
    return _cache;
};

export default createMockData;
