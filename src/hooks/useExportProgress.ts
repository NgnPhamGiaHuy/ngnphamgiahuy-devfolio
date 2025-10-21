import { useState } from "react";

const useExportProgress = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("Exporting your data...");

    const startExport = (customMessage?: string) => {
        setIsVisible(true);
        setProgress(0);
        setMessage(customMessage || "Exporting your data...");

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 200);

        return () => clearInterval(interval);
    };

    const completeExport = () => {
        setProgress(100);
        setTimeout(() => {
            setIsVisible(false);
            setProgress(0);
        }, 1500);
    };

    const hideOverlay = () => {
        setIsVisible(false);
        setProgress(0);
    };

    return {
        isVisible,
        progress,
        message,
        startExport,
        completeExport,
        hideOverlay,
        setProgress,
        setMessage,
    };
};

export default useExportProgress;
