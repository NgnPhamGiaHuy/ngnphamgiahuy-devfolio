// ============================================================
// Use-case: GetPortfolioData
// Purpose: Return the portfolio content in the EXACT `CompleteMockData` shape
//          the public components consume — sourced from Firestore when
//          configured, falling back to the static mock dataset otherwise OR
//          on any read failure (bad rules, quota, network, parse). The site
//          never renders blank.
// ============================================================
import { cache } from "react";
import { where } from "firebase/firestore";

import type { CompleteMockData } from "@/infrastructure/persistence/mocks";
import { createMockData } from "@/infrastructure/persistence/mocks";
import {
    COLLECTIONS,
    SINGLETON_IDS,
    firebaseConfigured,
    readCollection,
    readDoc,
} from "@/infrastructure/persistence/firebase";

import ProfileSchema from "@/schemas/content/profile.schema";
import SettingsSchema from "@/schemas/setting/settings.schema";
import EducationSchema from "@/schemas/content/education.schema";
import ExperienceSchema from "@/schemas/content/experience.schema";
import SkillSchema from "@/schemas/content/skill.schema";
import ProjectSchema from "@/schemas/content/project.schema";

const byOrder = <T extends { order?: number }>(a: T, b: T): number =>
    (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);

const fetchFromFirestore = async (): Promise<CompleteMockData> => {
    const [profile, settings, education, experience, skills, projects] =
        await Promise.all([
            readDoc(
                COLLECTIONS.profile,
                SINGLETON_IDS.profile,
                "profile",
                ProfileSchema
            ),
            readDoc(
                COLLECTIONS.settings,
                SINGLETON_IDS.settings,
                "settings",
                SettingsSchema
            ),
            readCollection(COLLECTIONS.education, "education", EducationSchema),
            readCollection(
                COLLECTIONS.experience,
                "experience",
                ExperienceSchema
            ),
            readCollection(COLLECTIONS.skills, "skill", SkillSchema),
            // Draft gate: the read rule requires `published == true` for
            // unauthenticated reads, so the query MUST filter on it — a getDocs
            // that could return a draft is rejected wholesale by Firestore.
            readCollection(COLLECTIONS.projects, "project", ProjectSchema, [
                where("published", "==", true),
            ]),
        ]);

    if (!profile || !settings) {
        throw new Error(
            "Firestore is missing the profile/settings singletons."
        );
    }

    return {
        logo: settings.logo,
        profile,
        skills: [...skills].sort(byOrder),
        projects: [...projects].sort(byOrder),
        education: [...education].sort(byOrder),
        experience: [...experience].sort(byOrder),
        blogs: [],
        settings,
    };
};

const load = async (): Promise<CompleteMockData> => {
    if (!firebaseConfigured()) return createMockData();

    try {
        return await fetchFromFirestore();
    } catch (error) {
        console.error(
            "[getPortfolioData] Firestore read failed — serving static fallback.",
            error
        );
        return createMockData();
    }
};

/** Memoized per-request so multiple section builders share one fetch. */
export const getPortfolioData = cache(load);
