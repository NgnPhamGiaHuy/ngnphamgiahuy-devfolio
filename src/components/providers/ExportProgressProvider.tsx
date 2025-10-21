"use client";

import React, { createContext, useContext, ReactNode } from "react";

import { useExportProgress } from "@/hooks";

interface ExportProgressContextType {
    isVisible: boolean;
    progress: number;
    message: string;
    startExport: (customMessage?: string) => () => void;
    completeExport: () => void;
    hideOverlay: () => void;
    setProgress: (progress: number) => void;
    setMessage: (message: string) => void;
}

const ExportProgressContext = createContext<
    ExportProgressContextType | undefined
>(undefined);

interface ExportProgressProviderProps {
    children: ReactNode;
}

export const ExportProgressProvider: React.FC<ExportProgressProviderProps> = ({
    children,
}) => {
    const progressState = useExportProgress();

    return (
        <ExportProgressContext.Provider value={progressState}>
            {children}
        </ExportProgressContext.Provider>
    );
};

export const useExportProgressContext = (): ExportProgressContextType => {
    const context = useContext(ExportProgressContext);
    if (context === undefined) {
        throw new Error(
            "useExportProgressContext must be used within an ExportProgressProvider"
        );
    }
    return context;
};

export default ExportProgressProvider;
