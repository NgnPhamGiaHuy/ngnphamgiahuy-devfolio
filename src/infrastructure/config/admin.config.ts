// ============================================================
// Module: Admin allowlist config
// Purpose: The ONLY users allowed into the control center. This is a CLIENT
//          copy used for UX gating only — the real enforcement lives in
//          firestore.rules / storage.rules `allowlist()`. Keep them in sync.
//          A successful Firebase sign-in is NOT access; membership here (and
//          in the rules) is.
// ============================================================
export const ADMIN_UIDS: readonly string[] = (
    process.env.NEXT_PUBLIC_ADMIN_UIDS ?? ""
)
    .split(",")
    .map((uid) => uid.trim())
    .filter(Boolean);

export const isAdminUid = (uid: string | null | undefined): boolean =>
    !!uid && ADMIN_UIDS.includes(uid);
