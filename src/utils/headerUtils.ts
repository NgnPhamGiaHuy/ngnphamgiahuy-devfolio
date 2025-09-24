import clsx from "clsx";

export type HeaderState = "absolute" | "fixed" | "animating-in" | "animating-out";

export const getHeaderClasses = (headerState: HeaderState): string => {
    const baseClasses = "header";

    switch (headerState) {
        case "absolute":
            return baseClasses;
        case "fixed":
            return clsx(baseClasses, "fixed!");
        case "animating-in":
            return clsx(baseClasses, "fixed!", "animate-in");
        case "animating-out":
            return clsx(baseClasses, "fixed!", "animate-out");
        default:
            return baseClasses;
    }
};
