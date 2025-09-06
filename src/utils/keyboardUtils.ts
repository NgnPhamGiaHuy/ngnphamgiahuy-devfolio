import React, { useCallback } from "react";

/**
 * Creates a keyboard event handler that triggers a callback when Enter or Space is pressed.
 * This is commonly used for making div elements accessible via keyboard navigation.
 * 
 * @param callback - The function to call when Enter or Space is pressed
 * @returns A memoized keyboard event handler
 */
export const useKeyboardHandler = (callback: () => void) => {
    return useCallback((event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            callback();
        }
    }, [callback]);
};
