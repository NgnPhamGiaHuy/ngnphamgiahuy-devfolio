// ============================================================
// Module: Firebase Storage write adapter (client-side)
// Purpose: Image upload, replace, and delete. All ops run in the browser as
//          the signed-in owner — the request carries a verified ID token and
//          storage.rules isAdmin() gate passes.
// ============================================================
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

import { getFirebaseStorage } from "./app";

const ALLOWED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
] as const;

const ALLOWED_FILE_TYPES = [
    ...ALLOWED_IMAGE_TYPES,
    "application/pdf",
] as const;

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export class ImageUploadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ImageUploadError";
    }
}

export const validateImageFile = (file: File): void => {
    if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
        throw new ImageUploadError(
            `Unsupported format. Use PNG, JPEG, WEBP, or AVIF.`
        );
    }
    if (file.size > MAX_BYTES) {
        throw new ImageUploadError(`File exceeds 5 MB limit.`);
    }
};

export const validateFile = (
    file: File,
    allowed: readonly string[] = ALLOWED_FILE_TYPES
): void => {
    if (!allowed.includes(file.type)) {
        const labels = allowed.map((t) => t.split("/")[1].toUpperCase()).join(", ");
        throw new ImageUploadError(`Unsupported format. Allowed: ${labels}.`);
    }
    if (file.size > MAX_BYTES) {
        throw new ImageUploadError(`File exceeds 5 MB limit.`);
    }
};

export const sanitizeFileName = (name: string): string =>
    name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9._-]/g, "")
        .replace(/^-+|-+$/g, "");

/**
 * Upload any allowed file to Firebase Storage at `${storagePath}/${sanitizedName}`.
 * Returns url, path, fileName, and fileSize for Firestore metadata storage.
 */
export const uploadFile = (
    storagePath: string,
    file: File,
    onProgress?: (pct: number) => void
): Promise<{ url: string; path: string; fileName: string; fileSize: number }> =>
    new Promise((resolve, reject) => {
        const fileName = sanitizeFileName(file.name);
        const fullPath = `${storagePath}/${fileName}`;
        const storageRef = ref(getFirebaseStorage(), fullPath);
        const task = uploadBytesResumable(storageRef, file, {
            contentType: file.type,
        });

        task.on(
            "state_changed",
            (snap) => {
                onProgress?.(
                    Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                );
            },
            (err) => reject(new ImageUploadError(err.message)),
            async () => {
                try {
                    const url = await getDownloadURL(task.snapshot.ref);
                    resolve({ url, path: fullPath, fileName, fileSize: file.size });
                } catch (err) {
                    reject(err);
                }
            }
        );
    });

/**
 * Upload a file to Firebase Storage at `${storagePath}/${sanitizedName}`.
 * `onProgress` fires with 0–100 as bytes transfer.
 * Returns the public download URL and the full storage path (for later delete).
 */
export const uploadImageFile = (
    storagePath: string,
    file: File,
    onProgress?: (pct: number) => void
): Promise<{ url: string; path: string; fileName: string }> =>
    new Promise((resolve, reject) => {
        const fileName = sanitizeFileName(file.name);
        const fullPath = `${storagePath}/${fileName}`;
        const storageRef = ref(getFirebaseStorage(), fullPath);
        const task = uploadBytesResumable(storageRef, file, {
            contentType: file.type,
        });

        task.on(
            "state_changed",
            (snap) => {
                onProgress?.(
                    Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                );
            },
            (err) => reject(new ImageUploadError(err.message)),
            async () => {
                try {
                    const url = await getDownloadURL(task.snapshot.ref);
                    resolve({ url, path: fullPath, fileName });
                } catch (err) {
                    reject(err);
                }
            }
        );
    });

/**
 * Delete a file from Firebase Storage by its full path.
 * Silent on 404 (file already gone — still counts as success).
 */
export const deleteStorageFile = async (path: string): Promise<void> => {
    if (!path) return;
    try {
        await deleteObject(ref(getFirebaseStorage(), path));
    } catch {
        // already deleted or doesn't exist — safe to ignore
    }
};
