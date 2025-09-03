import { useCallback, useEffect, useRef, useState } from "react";

import { HeaderState } from "@/config/header.config";

export const useHeaderScroll = () => {
    const lastScrollY = useRef<number>(0);

    const [headerState, setHeaderState] = useState<HeaderState>("absolute");

    const handleAnimationEnd = useCallback((): void => {
        if (headerState === "animating-in") {
            setHeaderState("fixed");
        } else if (headerState === "animating-out") {
            setHeaderState("absolute");
        }
    }, [headerState]);

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollY = window.scrollY;

            lastScrollY.current = currentScrollY;

            if (headerState === "animating-in" || headerState === "animating-out") {
                return;
            }

            if (currentScrollY > 50) {
                if (headerState === "absolute") {
                    setHeaderState("animating-in");
                }
            } else if (currentScrollY <= 50) {
                if (headerState === "fixed") {
                    setHeaderState("animating-out");
                }
            }
        };

        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledHandleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, [headerState]);

    return { headerState, handleAnimationEnd };
};
