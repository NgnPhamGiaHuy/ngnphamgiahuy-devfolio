import clsx from "clsx";

const BASE_HEADER_CLASSES = "header";

const HEADER_STATE_CLASSES = {
    absolute: "",
    fixed: "fixed!",
    "animating-in": "fixed! animate-in",
    "animating-out": "fixed! animate-out",
} as const;

export type HeaderState = keyof typeof HEADER_STATE_CLASSES;

export const getHeaderClasses = (headerState: HeaderState): string => {
    const stateClasses = HEADER_STATE_CLASSES[headerState];

    return clsx(BASE_HEADER_CLASSES, stateClasses);
};
