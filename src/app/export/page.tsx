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

const ExportPageContent = () => {
    const { isVisible, progress, message } = useExportProgressContext();

    return (
        <>
            <ExportContainer>
                <ExportWrapper {...EXPORT_PAGE_CONFIG.WRAPPER}>
                    <ExportContent>
                        <ExportGrid>
                            <ExportCard {...EXPORT_CARDS.QUICK_EXPORT}>
                                <ExportButton
                                    variant="primary"
                                    className="w-full"
                                />
                            </ExportCard>
                            <ExportCard {...EXPORT_CARDS.ADVANCED_EXPORT}>
                                <ExportPanel />
                            </ExportCard>
                        </ExportGrid>
                    </ExportContent>
                </ExportWrapper>
            </ExportContainer>

            <ExportProgressOverlay
                isVisible={isVisible}
                progress={progress}
                message={message}
            />
        </>
    );
};

const ExportPage = () => {
    return (
        <ExportProgressProvider>
            <ExportPageContent />
        </ExportProgressProvider>
    );
};

export default ExportPage;
