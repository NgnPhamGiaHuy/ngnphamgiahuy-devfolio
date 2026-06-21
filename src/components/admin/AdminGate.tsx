"use client";

// ============================================================
// Component: AdminGate
// Purpose: Render the right subtree for each auth state. No router redirect —
//          the gate swaps the subtree and the URL stays put.
//   loading      -> splash (avoids login flash on refresh)
//   unconfigured -> setup notice (Firebase env not set)
//   signed-out   -> LoginScreen
//   signed-in, not allowed -> AccessDenied
//   signed-in, allowed     -> children
// ============================================================
import React from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import AccessDenied from "./AccessDenied";
import LoginScreen from "./LoginScreen";
import StatusScreen from "./StatusScreen";

const AdminGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { status, isAdmin } = useAuth();

    if (status === "loading") {
        return (
            <StatusScreen
                eyebrow="control center"
                title="Loading…"
                message="Checking your session."
            />
        );
    }

    if (status === "unconfigured") {
        return (
            <StatusScreen
                eyebrow="setup required"
                title="Firebase not configured"
                message="Set the NEXT_PUBLIC_FIREBASE_* env vars (see .env.example) to enable the control center."
            />
        );
    }

    if (status === "signed-out") return <LoginScreen />;

    if (!isAdmin) return <AccessDenied />;

    return <>{children}</>;
};

AdminGate.displayName = "AdminGate";

export default AdminGate;
