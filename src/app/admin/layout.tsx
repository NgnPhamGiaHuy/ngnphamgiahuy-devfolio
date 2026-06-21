import React from "react";
import type { Metadata } from "next";

import AuthProvider from "@/components/providers/AuthProvider";
import { AdminChrome, AdminGate } from "@/components/admin";

// Admin is private — keep it out of search indexes. Inherits fonts + theme
// from RootLayout; deliberately renders NO PageChrome.
export const metadata: Metadata = {
    title: "Control Center",
    robots: { index: false, follow: false },
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
    <AuthProvider>
        <AdminGate>
            <AdminChrome>{children}</AdminChrome>
        </AdminGate>
    </AuthProvider>
);

export default AdminLayout;
