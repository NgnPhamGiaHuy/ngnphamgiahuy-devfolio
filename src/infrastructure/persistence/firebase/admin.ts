// ============================================================
// Module: Firebase Admin SDK (server-only, lazy singleton)
// Purpose: Trusted server-side Firestore access for write paths that must NOT
//          require a signed-in client — e.g. the public contact form. The Admin
//          SDK bypasses Security Rules, so `contacts/` stays client-unwritable
//          while the public form still works (preserves the "zero public writes"
//          invariant the rest of firestore.rules is built on).
//
// Credentials: FIREBASE_SERVICE_ACCOUNT — the service-account JSON, either raw
//          or base64-encoded (base64 recommended for single-line env vars).
//
// ⚠️  NEVER import this from a client component or the client firebase barrel —
//     firebase-admin must not ship to the browser.
// ============================================================
import {
    cert,
    getApp,
    getApps,
    initializeApp,
    type App,
    type ServiceAccount,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const RAW = process.env.FIREBASE_SERVICE_ACCOUNT;

/** Soft check (mirrors `firebaseConfigured`) so the build never throws. */
export const adminConfigured = (): boolean => Boolean(RAW && RAW.trim());

const parseServiceAccount = (raw: string): ServiceAccount => {
    const text = raw.trim().startsWith("{")
        ? raw
        : Buffer.from(raw, "base64").toString("utf8");
    return JSON.parse(text) as ServiceAccount;
};

let _app: App | null = null;

const getAdminApp = (): App => {
    if (!adminConfigured()) {
        throw new Error(
            "Firebase Admin is not configured — set FIREBASE_SERVICE_ACCOUNT."
        );
    }
    if (!_app) {
        _app = getApps().length
            ? getApp()
            : initializeApp({ credential: cert(parseServiceAccount(RAW!)) });
    }
    return _app;
};

export const getAdminDb = (): Firestore => getFirestore(getAdminApp());
