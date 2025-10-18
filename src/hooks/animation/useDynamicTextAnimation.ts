"use client";

const useDynamicTextAnimation = () => {
    const TYPING_SPEED = 60;
    const PAUSE_AFTER_SECTION = 400;
    const MIN_SECTION_DURATION = 800;

    const createTypingTimeline = (
        textSections: Array<{ id: string; text: string }>
    ) => {
        let currentDelay = 0;
        const timeline: Record<
            string,
            { sectionDelay: number; charDelays: number[] }
        > = {};

        textSections.forEach((section) => {
            const { id, text } = section;

            timeline[id] = {
                sectionDelay: currentDelay,
                charDelays: [],
            };

            for (let i = 0; i < text.length; i++) {
                timeline[id].charDelays.push(currentDelay + i * TYPING_SPEED);
            }

            const typingDuration = text.length * TYPING_SPEED;
            const nextSectionDelay =
                Math.max(MIN_SECTION_DURATION, typingDuration) +
                PAUSE_AFTER_SECTION;

            currentDelay += nextSectionDelay;
        });

        return timeline;
    };

    return { createTypingTimeline, TYPING_SPEED, PAUSE_AFTER_SECTION };
};

export default useDynamicTextAnimation;
