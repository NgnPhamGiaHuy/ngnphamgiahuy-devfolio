// ============================================================
// Utility: Header State Management
// Purpose: Header styling utilities with state-based class generation
// ============================================================

import clsx from "clsx";

// ============================================================
// Constants
// ============================================================

const BASE_HEADER_CLASSES = "header";

const HEADER_STATE_CLASSES = {
    absolute: "",
    fixed: "fixed!",
    "animating-in": "fixed! animate-in",
    "animating-out": "fixed! animate-out",
} as const;

// ============================================================
// Types
// ============================================================

export type HeaderState = keyof typeof HEADER_STATE_CLASSES;

// ============================================================
// Utility Functions
// ============================================================

export const getHeaderClasses = (headerState: HeaderState): string => {
    const stateClasses = HEADER_STATE_CLASSES[headerState];
    return clsx(BASE_HEADER_CLASSES, stateClasses);
};

export const isValidHeaderState = (state: string): state is HeaderState => {
    return state in HEADER_STATE_CLASSES;
};

export const getAllHeaderStates = (): HeaderState[] => {
    return Object.keys(HEADER_STATE_CLASSES) as HeaderState[];
};
