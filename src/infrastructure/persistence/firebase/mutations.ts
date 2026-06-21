// ============================================================
// Module: Firestore write adapter (client-side)
// Purpose: Writes run in the BROWSER as the signed-in owner so the request
//          carries a verified auth token and the Security Rules `isAdmin()`
//          gate passes. (Server Actions would be unauthenticated -> denied.)
//          The base fields (_id/_type) are stripped — they live in the path.
// ============================================================
import {
    addDoc,
    collection,
    deleteDoc as fbDeleteDoc,
    doc,
    setDoc,
    writeBatch,
} from "firebase/firestore";

import { getDb } from "./app";

const stripBase = <T extends Record<string, unknown>>(data: T) => {
    const { _id, _type, ...body } = data as Record<string, unknown>;
    void _id;
    void _type;
    return body;
};

// Firestore rejects `undefined` field values — omit them at the write boundary.
// Recurses into plain objects; leaves arrays untouched (array items are fine).
const stripUndefined = (
    obj: Record<string, unknown>
): Record<string, unknown> =>
    Object.fromEntries(
        Object.entries(obj)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => [
                k,
                v !== null &&
                typeof v === "object" &&
                !Array.isArray(v)
                    ? stripUndefined(v as Record<string, unknown>)
                    : v,
            ])
    );

const prepare = (data: Record<string, unknown>) =>
    stripUndefined(stripBase(data));

/** Overwrite (or create) a document at a known id. */
export const saveDoc = async (
    collectionName: string,
    docId: string,
    data: Record<string, unknown>
): Promise<void> => {
    await setDoc(doc(getDb(), collectionName, docId), prepare(data));
};

/** Create a document with an auto-generated id; returns the new id. */
export const createDoc = async (
    collectionName: string,
    data: Record<string, unknown>
): Promise<string> => {
    const ref = await addDoc(
        collection(getDb(), collectionName),
        prepare(data)
    );
    return ref.id;
};

export const removeDoc = async (
    collectionName: string,
    docId: string
): Promise<void> => {
    await fbDeleteDoc(doc(getDb(), collectionName, docId));
};

/** Persist a new `order` for several docs in one batch (drag/up-down reorder). */
export const saveOrder = async (
    collectionName: string,
    ordered: { _id: string }[]
): Promise<void> => {
    const batch = writeBatch(getDb());
    ordered.forEach((item, index) => {
        batch.update(doc(getDb(), collectionName, item._id), { order: index });
    });
    await batch.commit();
};
