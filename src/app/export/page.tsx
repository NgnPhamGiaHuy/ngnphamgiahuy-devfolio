// ============================================================
// Page: Export
// Purpose: Data export page with progress tracking and user controls
// ============================================================

"use client";

import React from "react";

import {
    ExportWrapper,
    ExportCard,
    ExportGrid,
    ExportContainer,
    ExportContent,
    ExportButton,
    ExportPanel,
    ExportProgressOverlay,
    ExportProgressProvider,
    useExportProgressContext,
} from "@/components";
import { EXPORT_CARDS, EXPORT_PAGE_CONFIG } from "@/config";

// ============================================================
// Constants
// ============================================================

/** Export button configuration */
const EXPORT_BUTTON_CONFIG = {
    VARIANT: "primary" as const,
    CLASS_NAME: "w-full",
} as const;

// ============================================================
// Types
// ============================================================

/** Props interface for ExportPageContent component */
interface ExportPageContentProps {
    /** Additional CSS classes */
    className?: string;
}

// ============================================================
// Components
// ============================================================

/**
 * ExportPageContent component renders the main export interface.
 * Features progress tracking, export controls, and responsive layout.
 *
 * @param props - Component props
 * @returns JSX element representing the export page content
 *
 * @example
 * ```tsx
 * <ExportPageContent className="custom-styles" />
 * ```
 */
const ExportPageContent: React.FC<ExportPageContentProps> = ({
    className = "",
}) => {
    // ============================================================
    // Hooks
    // ============================================================

    const { isVisible, progress, message } = useExportProgressContext();

    // ============================================================
    // Render
    // ============================================================

    return (
        <div className={className}>
            {/* Main Export Interface */}
            <ExportContainer>
                <ExportWrapper {...EXPORT_PAGE_CONFIG.WRAPPER}>
                    <ExportContent>
                        <ExportGrid>
                            {/* Quick Export Card */}
                            <ExportCard {...EXPORT_CARDS.QUICK_EXPORT}>
                                <ExportButton
                                    variant={EXPORT_BUTTON_CONFIG.VARIANT}
                                    className={EXPORT_BUTTON_CONFIG.CLASS_NAME}
                                />
                            </ExportCard>

                            {/* Advanced Export Card */}
                            <ExportCard {...EXPORT_CARDS.ADVANCED_EXPORT}>
                                <ExportPanel />
                            </ExportCard>
                        </ExportGrid>
                    </ExportContent>
                </ExportWrapper>
            </ExportContainer>

            {/* Progress Overlay */}
            <ExportProgressOverlay
                isVisible={isVisible}
                progress={progress}
                message={message}
            />
        </div>
    );
};

/**
 * ExportPage component provides the main export page with context provider.
 * Wraps the export interface with necessary context for state management.
 *
 * @returns JSX element representing the complete export page
 *
 * @example
 * ```tsx
 * // This page is automatically rendered at /export route
 * // Provides export functionality with progress tracking
 * ```
 */
const ExportPage: React.FC = () => {
    // ============================================================
    // Render
    // ============================================================

    return (
        <ExportProgressProvider>
            <ExportPageContent />
        </ExportProgressProvider>
    );
};

// ============================================================
// Page Metadata
// ============================================================

ExportPageContent.displayName = "ExportPageContent";
ExportPage.displayName = "ExportPage";

export default ExportPage;
