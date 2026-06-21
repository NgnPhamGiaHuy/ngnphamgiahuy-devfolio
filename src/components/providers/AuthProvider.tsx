"use client";

// ============================================================
// Component: AuthProvider
// Purpose: Subscribe to Firebase auth state and expose { user, status, isAdmin }
//          plus sign-in/out actions. Mounted ONLY inside the admin segment, so
//          Firebase Auth never ships in the public bundle.
// ============================================================
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
    type User,
} from "firebase/auth";

import {
    firebaseConfigured,
    getFirebaseAuth,
} from "@/infrastructure/persistence/firebase";
import { isAdminUid } from "@/infrastructure/config";

export type AuthStatus =
    | "loading"
    | "unconfigured"
    | "signed-out"
    | "signed-in";

interface AuthContextValue {
    user: User | null;
    status: AuthStatus;
    /** signed-in AND uid is on the allowlist */
    isAdmin: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<AuthStatus>("loading");

    useEffect(() => {
        if (!firebaseConfigured()) {
            setStatus("unconfigured");
            return;
        }
        // THE auth-state detector: fires on mount, sign-in, sign-out, refresh.
        const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (u) => {
            setUser(u);
            setStatus(u ? "signed-in" : "signed-out");
        });
        return unsubscribe;
    }, []);

    const signInWithGoogle = useCallback(async () => {
        await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
    }, []);

    const signInWithEmail = useCallback(
        async (email: string, password: string) => {
            await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
        },
        []
    );

    const signOut = useCallback(async () => {
        await firebaseSignOut(getFirebaseAuth());
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                status,
                isAdmin: status === "signed-in" && isAdminUid(user?.uid),
                signInWithGoogle,
                signInWithEmail,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.displayName = "AuthProvider";

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
    return ctx;
};

export default AuthProvider;
