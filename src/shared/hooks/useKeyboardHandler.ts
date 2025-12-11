import React, { useCallback } from "react";

const TRIGGER_KEYS = ["Enter", " "] as const;

type TriggerKey = (typeof TRIGGER_KEYS)[number];

type UseKeyboardHandlerReturn = (event: React.KeyboardEvent) => void;

export const useKeyboardHandler = (
    callback: () => void
): UseKeyboardHandlerReturn => {
    const handleKeyboardEvent = useCallback(
        (event: React.KeyboardEvent): void => {
            if (TRIGGER_KEYS.includes(event.key as TriggerKey)) {
                event.preventDefault();
                callback();
            }
        },
        [callback]
    );

    return handleKeyboardEvent;
};

export default useKeyboardHandler;
