// ============================================================
// Utility: Header State Management
// Purpose: Header styling utilities with state-based class generation
// ============================================================

import clsx from "clsx";

// ============================================================
// Constants
// ============================================================

/** Base header CSS classes */
const BASE_HEADER_CLASSES = "header";

/** Header state-specific CSS classes */
const HEADER_STATE_CLASSES = {
    absolute: "",
    fixed: "fixed!",
    "animating-in": "fixed! animate-in",
    "animating-out": "fixed! animate-out",
} as const;

// ============================================================
// Types
// ============================================================

/** Header state options */
export type HeaderState = keyof typeof HEADER_STATE_CLASSES;

// ============================================================
// Utility Functions
// ============================================================

/**
 * Generates CSS classes for header based on its current state.
 * Provides consistent styling across different header states.
 *
 * @param headerState - Current header state
 * @returns Combined CSS classes string
 *
 * @example
 * ```typescript
 * // Basic usage
 * getHeaderClasses("fixed") // "header fixed!"
 *
 * // With animation states
 * getHeaderClasses("animating-in") // "header fixed! animate-in"
 * getHeaderClasses("animating-out") // "header fixed! animate-out"
 *
 * // Default state
 * getHeaderClasses("absolute") // "header"
 * ```
 */
export const getHeaderClasses = (headerState: HeaderState): string => {
    // Get state-specific classes
    const stateClasses = HEADER_STATE_CLASSES[headerState];

    // Combine base classes with state-specific classes
    return clsx(BASE_HEADER_CLASSES, stateClasses);
};

/**
 * Validates if a string is a valid header state.
 * Useful for runtime validation and error handling.
 *
 * @param state - String to validate
 * @returns True if valid header state, false otherwise
 *
 * @example
 * ```typescript
 * isValidHeaderState("fixed") // true
 * isValidHeaderState("invalid") // false
 * ```
 */
export const isValidHeaderState = (state: string): state is HeaderState => {
    return state in HEADER_STATE_CLASSES;
};

/**
 * Gets all available header states.
 * Useful for debugging and development tools.
 *
 * @returns Array of all valid header states
 *
 * @example
 * ```typescript
 * getAllHeaderStates() // ["absolute", "fixed", "animating-in", "animating-out"]
 * ```
 */
export const getAllHeaderStates = (): HeaderState[] => {
    return Object.keys(HEADER_STATE_CLASSES) as HeaderState[];
};
