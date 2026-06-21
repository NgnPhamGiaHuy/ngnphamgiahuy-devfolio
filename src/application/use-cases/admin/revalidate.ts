"use server";

// ============================================================
// Server Action: revalidatePublic
// Purpose: Bust the ISR cache for the public routes after a client-side write,
//          so edits appear immediately instead of waiting out `revalidate=300`.
//          No Firestore access here — just cache invalidation, so it needs no
//          auth (the write itself was already gated by Security Rules).
// ============================================================
import { revalidatePath } from "next/cache";

export async function revalidatePublic(): Promise<void> {
    revalidatePath("/");
    revalidatePath("/portfolios");
    revalidatePath("/blog", "layout");
}
