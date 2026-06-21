"use client";

// ============================================================
// Component: LoginScreen
// Purpose: Owner sign-in — Google (single CTA) + Email/Password. A successful
//          sign-in is NOT access; AdminGate re-evaluates the allowlist after
//          onAuthStateChanged flips. No redirect here.
// ============================================================
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuth } from "@/components/providers/AuthProvider";
import FormInput from "@/components/ui/FormInput";
import SubmitButton from "@/components/ui/SubmitButton";
import FormStatus from "@/components/ui/FormStatus";
import AdminShell from "./AdminShell";

const loginSchema = z.object({
    email: z.email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginScreen: React.FC = () => {
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

    const onEmail = handleSubmit(async ({ email, password }) => {
        setError(null);
        try {
            await signInWithEmail(email, password);
        } catch {
            setError("Sign-in failed. Check your email and password.");
        }
    });

    const onGoogle = async () => {
        setError(null);
        try {
            await signInWithGoogle();
        } catch {
            setError("Google sign-in failed or was cancelled.");
        }
    };

    return (
        <AdminShell>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-tight text-[var(--color-ink)]">
                Sign in
            </h1>
            <p className="mt-2 mb-6 text-sm text-[var(--color-body)]">
                Owner access only.
            </p>

            <button
                type="button"
                onClick={onGoogle}
                className="w-full mb-5"
                data-testid="google-signin"
            >
                <span className="primary-button w-full justify-center">
                    Continue with Google
                </span>
            </button>

            <div className="mb-5 flex items-center gap-3 text-xs text-[var(--color-muted)]">
                <span className="h-px flex-1 bg-[var(--color-hairline)]" />
                or
                <span className="h-px flex-1 bg-[var(--color-hairline)]" />
            </div>

            <form onSubmit={onEmail} noValidate>
                <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    registration={register("email")}
                    error={errors.email?.message}
                />
                <FormInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register("password")}
                    error={errors.password?.message}
                />
                <div className="mt-4">
                    <SubmitButton isSubmitting={isSubmitting} label="Sign in" />
                </div>
            </form>

            {error && (
                <div className="mt-4">
                    <FormStatus submitStatus={{ type: "error", message: error }} />
                </div>
            )}
        </AdminShell>
    );
};

LoginScreen.displayName = "LoginScreen";

export default LoginScreen;
