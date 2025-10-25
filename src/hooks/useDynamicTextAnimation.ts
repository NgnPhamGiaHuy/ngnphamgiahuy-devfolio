// ============================================================
// Hook: useDynamicTextAnimation
// Purpose: Generates typing animation timelines for text sections
// ============================================================

"use client";

// ============================================================
// Constants
// ============================================================

/** Typing speed in milliseconds per character */
const TYPING_SPEED = 60;

/** Pause duration after each section in milliseconds */
const PAUSE_AFTER_SECTION = 400;

/** Minimum duration for each section in milliseconds */
const MIN_SECTION_DURATION = 800;

// ============================================================
// Types
// ============================================================

/**
 * Text section interface
 */
interface TextSection {
    id: string;
    text: string;
}

/**
 * Character delay information
 */
interface CharacterDelays {
    sectionDelay: number;
    charDelays: number[];
}

/**
 * Typing timeline structure
 */
type TypingTimeline = Record<string, CharacterDelays>;

/**
 * Return type for useDynamicTextAnimation hook
 */
interface UseDynamicTextAnimationReturn {
    /** Generate typing timeline for text sections */
    createTypingTimeline: (textSections: TextSection[]) => TypingTimeline;
    /** Typing speed constant */
    TYPING_SPEED: number;
    /** Pause after section constant */
    PAUSE_AFTER_SECTION: number;
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for generating typing animation timelines.
 * Creates precise timing data for character-by-character text animations.
 *
 * @returns Object containing timeline generator and animation constants
 *
 * @example
 * ```tsx
 * const { createTypingTimeline, TYPING_SPEED } = useDynamicTextAnimation();
 *
 * const timeline = createTypingTimeline([
 *   { id: 'greeting', text: 'Hello' },
 *   { id: 'name', text: 'World' }
 * ]);
 *
 * // timeline.greeting.charDelays = [0, 60, 120, 180, 240]
 * // timeline.name.charDelays = [800, 860, 920, 980, 1040]
 * ```
 */
const useDynamicTextAnimation = (): UseDynamicTextAnimationReturn => {
    // ============================================================
    // Timeline Generator
    // ============================================================

    /**
     * Creates a typing timeline for multiple text sections.
     * Calculates precise delays for each character in each section.
     *
     * @param textSections - Array of text sections with id and text
     * @returns Timeline object with section delays and character delays
     */
    const createTypingTimeline = (
        textSections: TextSection[]
    ): TypingTimeline => {
        let currentDelay = 0;
        const timeline: TypingTimeline = {};

        textSections.forEach((section) => {
            const { id, text } = section;

            // Initialize section timeline
            timeline[id] = {
                sectionDelay: currentDelay,
                charDelays: [],
            };

            // Calculate character delays for this section
            for (let i = 0; i < text.length; i++) {
                timeline[id].charDelays.push(currentDelay + i * TYPING_SPEED);
            }

            // Calculate next section delay
            const typingDuration = text.length * TYPING_SPEED;
            const nextSectionDelay =
                Math.max(MIN_SECTION_DURATION, typingDuration) +
                PAUSE_AFTER_SECTION;

            currentDelay += nextSectionDelay;
        });

        return timeline;
    };

    // ============================================================
    // Return
    // ============================================================

    return {
        createTypingTimeline,
        TYPING_SPEED,
        PAUSE_AFTER_SECTION,
    };
};

export default useDynamicTextAnimation;
