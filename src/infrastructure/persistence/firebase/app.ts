// ============================================================
// Module: Firebase client SDK (lazy, build-safe singleton)
// Purpose: Initialize Firebase only when configured. All config is
//          NEXT_PUBLIC_* — public by design; authorization lives in
//          Security Rules, not in key secrecy.
// ============================================================
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Soft check used by the read layer to decide whether to hit Firestore or
 * fall back to the static mock dataset. Keeping this a boolean (not a throw)
 * is what makes `npm run build`/local dev work without any Firebase env.
 */
export const firebaseConfigured = (): boolean =>
    Boolean(
        firebaseConfig.apiKey &&
            firebaseConfig.projectId &&
            firebaseConfig.appId
    );

let _app: FirebaseApp | null = null;

const getFirebaseApp = (): FirebaseApp => {
    if (!firebaseConfigured()) {
        throw new Error(
            "Firebase is not configured — NEXT_PUBLIC_FIREBASE_* env vars are missing."
        );
    }
    if (!_app) {
        _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    }
    return _app;
};

export const getFirebaseAuth = (): Auth => getAuth(getFirebaseApp());
export const getDb = (): Firestore => getFirestore(getFirebaseApp());
export const getFirebaseStorage = (): FirebaseStorage =>
    getStorage(getFirebaseApp());
