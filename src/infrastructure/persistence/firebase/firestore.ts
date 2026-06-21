// ============================================================
// Module: Firestore read adapter
// Purpose: Read documents and re-attach the base fields (_id from doc id,
//          _type from collection) before validating with the SAME Zod schema
//          the components consume — the zero-transformation contract.
//          Per-doc parse failures are skipped + logged, never fatal (R4).
// ============================================================
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    type QueryConstraint,
} from "firebase/firestore";
import type { ZodType } from "zod";

import { getDb } from "./app";

/**
 * Read a singleton/document by (collection, id). Injects _id + _type, then
 * parses. Returns null when the document does not exist.
 */
export const readDoc = async <T>(
    collectionName: string,
    docId: string,
    type: string,
    schema: ZodType<T>
): Promise<T | null> => {
    const snap = await getDoc(doc(getDb(), collectionName, docId));
    if (!snap.exists()) return null;
    return schema.parse({ _id: snap.id, _type: type, ...snap.data() });
};

/**
 * Read a whole collection. Each doc is parsed independently; a malformed doc
 * is skipped (logged) so one bad record never blanks the whole collection.
 */
export const readCollection = async <T>(
    collectionName: string,
    type: string,
    schema: ZodType<T>,
    constraints: QueryConstraint[] = []
): Promise<T[]> => {
    const snap = await getDocs(
        query(collection(getDb(), collectionName), ...constraints)
    );

    const results: T[] = [];
    for (const d of snap.docs) {
        try {
            results.push(schema.parse({ _id: d.id, _type: type, ...d.data() }));
        } catch (error) {
            console.error(
                `[firestore] skipping malformed ${collectionName}/${d.id}`,
                error
            );
        }
    }
    return results;
};

// ---- Lenient readers for the ADMIN editors ----
// The control center must be able to OPEN a partially-invalid document in order
// to FIX it, so admin reads do NOT schema.parse — validation happens on save.

export const readDocRaw = async (
    collectionName: string,
    docId: string,
    type: string
): Promise<Record<string, unknown> | null> => {
    const snap = await getDoc(doc(getDb(), collectionName, docId));
    if (!snap.exists()) return null;
    return { _id: snap.id, _type: type, ...snap.data() };
};

export const readCollectionRaw = async (
    collectionName: string,
    type: string
): Promise<Record<string, unknown>[]> => {
    const snap = await getDocs(collection(getDb(), collectionName));
    return snap.docs.map((d) => ({ _id: d.id, _type: type, ...d.data() }));
};
