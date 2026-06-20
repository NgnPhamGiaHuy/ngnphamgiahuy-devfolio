"use client";

const TYPING_SPEED = 60;
const PAUSE_AFTER_SECTION = 400;
const MIN_SECTION_DURATION = 800;

interface TextSection {
    id: string;
    text: string;
}

interface CharacterDelays {
    sectionDelay: number;
}

type TypingTimeline = Record<string, CharacterDelays>;

interface UseDynamicTextAnimationReturn {
    createTypingTimeline: (textSections: TextSection[]) => TypingTimeline;
    TYPING_SPEED: number;
    PAUSE_AFTER_SECTION: number;
}

const useDynamicTextAnimation = (): UseDynamicTextAnimationReturn => {
    const createTypingTimeline = (
        textSections: TextSection[]
    ): TypingTimeline => {
        let currentDelay = 0;
        const timeline: TypingTimeline = {};

        textSections.forEach((section) => {
            const { id, text } = section;

            timeline[id] = {
                sectionDelay: currentDelay,
            };

            const typingDuration = text.length * TYPING_SPEED;
            const nextSectionDelay =
                Math.max(MIN_SECTION_DURATION, typingDuration) +
                PAUSE_AFTER_SECTION;

            currentDelay += nextSectionDelay;
        });

        return timeline;
    };

    return {
        createTypingTimeline,
        TYPING_SPEED,
        PAUSE_AFTER_SECTION,
    };
};

export default useDynamicTextAnimation;
