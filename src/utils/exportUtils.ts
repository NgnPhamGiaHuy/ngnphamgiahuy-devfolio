export const getProgressStatusMessage = (progress: number): string => {
    if (progress < 30) return "Preparing export...";
    if (progress >= 30 && progress < 70) return "Processing data...";
    if (progress >= 70 && progress < 100) return "Finalizing export...";
    if (progress >= 100) return "Export complete!";
    return "Exporting your data...";
};

export const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getButtonClass = (variant: "primary" | "secondary"): string => {
    return variant === "secondary" ? "secondary-button" : "primary-button";
};

export const downloadJSON = (data: any, filename: string): void => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
