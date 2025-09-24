"use client"

import { useCallback, useState } from "react";

const useMenuState = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = useCallback((): void => {
        setIsMenuOpen((prev) => !prev);
    }, []);

    const closeMenu = useCallback((): void => {
        setIsMenuOpen(false);
    }, []);

    const openMenu = useCallback((): void => {
        setIsMenuOpen(true);
    }, []);

    return { isMenuOpen, toggleMenu, closeMenu, openMenu };
};

export default useMenuState;