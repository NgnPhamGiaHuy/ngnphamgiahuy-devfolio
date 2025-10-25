// ============================================================
// Hook: useKeyboardHandler
// Purpose: Keyboard event handler for accessibility and user interaction
// ============================================================

import React, { useCallback } from "react";

// ============================================================
// Constants
// ============================================================

/** Keyboard keys that trigger the callback */
const TRIGGER_KEYS = ["Enter", " "] as const;

/** Type for trigger keys */
type TriggerKey = (typeof TRIGGER_KEYS)[number];

// ============================================================
// Types
// ============================================================

/** Return type for useKeyboardHandler hook */
type UseKeyboardHandlerReturn = (event: React.KeyboardEvent) => void;

// ============================================================
// Hook Implementation
// ============================================================

/**
 * Custom hook for handling keyboard events with accessibility support.
 * Provides a keyboard event handler that triggers on Enter and Space keys.
 *
 * @param callback - Function to call when trigger keys are pressed
 * @returns Keyboard event handler function
 *
 * @example
 * ```tsx
 * const handleKeyPress = useKeyboardHandler(() => {
 *   console.log('Enter or Space pressed');
 * });
 *
 * return (
 *   <div onKeyDown={handleKeyPress} tabIndex={0}>
 *     Clickable element
 *   </div>
 * );
 * ```
 */
export const useKeyboardHandler = (
    callback: () => void
): UseKeyboardHandlerReturn => {
    /**
     * Handles keyboard events and triggers callback for specific keys.
     * Prevents default behavior for trigger keys to avoid unwanted actions.
     *
     * @param event - Keyboard event object
     */
    const handleKeyboardEvent = useCallback(
        (event: React.KeyboardEvent): void => {
            // Check if pressed key is a trigger key
            if (TRIGGER_KEYS.includes(event.key as TriggerKey)) {
                event.preventDefault(); // Prevent default behavior
                callback(); // Execute the callback
            }
        },
        [callback]
    );

    return handleKeyboardEvent;
};
