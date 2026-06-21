// ============================================================
// One-shot migration: createMockData() -> Firestore.
//
// Run locally:  npm run seed         (uses .env.local)
//   Requires NEXT_PUBLIC_FIREBASE_* + SEED_OWNER_EMAIL + SEED_OWNER_PASSWORD.
//   The owner account must be on the firestore.rules allowlist.
//
// Safety:
//   - Idempotent: deterministic doc ids (setDoc overwrites, never duplicates).
//   - REFUSES to run against non-empty collections unless SEED_FORCE=1
//     (a re-run would clobber live admin edits with stale seed values).
//   - Pre-flights slug uniqueness + dependsOn referential integrity.
// ============================================================
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    setDoc,
    writeBatch,
} from "firebase/firestore";

import { createMockData } from "@/infrastructure/persistence/mocks";

const required = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env var: ${key}`);
    return value;
};

const firebaseConfig = {
    apiKey: required("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: required("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: required("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: required("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: required("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: required("NEXT_PUBLIC_FIREBASE_APP_ID"),
};

const FORCE = process.env.SEED_FORCE === "1";

/** Strip the base fields — they become the collection/doc-id, never stored. */
const strip = <T extends { _id: string; _type: string }>(d: T) => {
    const { _id, _type, ...body } = d;
    void _id;
    void _type;
    return body;
};

const slugOf = (p: { slug?: string; _id?: string }, i: number): string =>
    p.slug ?? p._id ?? `project-${i}`;

const main = async (): Promise<void> => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    await signInWithEmailAndPassword(
        auth,
        required("SEED_OWNER_EMAIL"),
        required("SEED_OWNER_PASSWORD")
    );
    console.log(`✓ Signed in as owner (uid: ${auth.currentUser?.uid})`);

    const data = createMockData();

    // ---- Pre-flight: slug uniqueness + dependsOn integrity ----
    const slugs = data.projects.map((p, i) => slugOf(p, i));
    const slugSet = new Set(slugs);
    if (slugSet.size !== slugs.length) {
        throw new Error("Pre-flight failed: duplicate project slugs.");
    }
    for (const p of data.projects) {
        for (const dep of p.dependsOn ?? []) {
            if (!slugSet.has(dep)) {
                throw new Error(
                    `Pre-flight failed: project "${p.slug}" dependsOn "${dep}" which is not a known slug.`
                );
            }
        }
    }
    console.log(`✓ Pre-flight passed (${slugs.length} projects).`);

    // ---- Non-empty guard ----
    const targets = [
        "profile",
        "settings",
        "education",
        "experience",
        "skills",
        "projects",
    ];
    if (!FORCE) {
        for (const name of targets) {
            const snap = await getDocs(collection(db, name));
            if (!snap.empty) {
                throw new Error(
                    `Collection "${name}" is not empty (${snap.size} docs). ` +
                        `Re-seeding would overwrite live data. Set SEED_FORCE=1 to override.`
                );
            }
        }
        console.log("✓ All target collections empty — safe to seed.");
    } else {
        console.warn("⚠ SEED_FORCE=1 — overwriting existing documents.");
    }

    // ---- Singletons ----
    await setDoc(doc(db, "profile", "main"), strip(data.profile));
    await setDoc(doc(db, "settings", "site"), strip(data.settings));

    // ---- Collections (deterministic ids -> idempotent) ----
    const batch = writeBatch(db);
    data.education.forEach((e) =>
        batch.set(doc(db, "education", e._id), strip(e))
    );
    data.experience.forEach((x) =>
        batch.set(doc(db, "experience", x._id), strip(x))
    );
    data.skills.forEach((s) => batch.set(doc(db, "skills", s._id), strip(s)));
    data.projects.forEach((p, i) => {
        const id = slugOf(p, i);
        batch.set(doc(db, "projects", id), {
            ...strip(p),
            slug: id,
            order: p.order ?? i,
            published: true,
        });
    });
    await batch.commit();

    console.log(
        `✓ Seeded: profile, settings, ${data.education.length} education, ` +
            `${data.experience.length} experience, ${data.skills.length} skills, ` +
            `${data.projects.length} projects. (blog deferred — no source content)`
    );

    await signOut(auth);
    console.log("✓ Done.");
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("✗ Seed failed:", error);
        process.exit(1);
    });
