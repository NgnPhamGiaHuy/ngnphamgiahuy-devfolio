"use client"

import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import Sidebar from "@/components/navigation/Sidebar";

import data from "@/data/data.json";

const Header: React.FC = () => {
    const { logo } = data;

    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(systemPrefersDark);
            document.documentElement.classList.toggle("dark", systemPrefersDark);
        }
    }, []);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsSticky(window.scrollY > 50)
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const toggleDarkMode = (): void => {
        const newDarkMode = !isDarkMode;

        setIsDarkMode(newDarkMode);

        document.documentElement.classList.toggle("dark", newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    };

    const toggleMenu = (): void => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className={clsx("header", isSticky && "sticky animate-in")}>
            <section className={"header-section"}>
                <div className={"header-container"}>
                    <div className={"header-side"}>
                        <div className={"header-content"}>
                            <Link href={"/"}>
                                <span className={"header-logo"}>{ logo }</span>
                            </Link>
                        </div>
                    </div>
                    <div className={"header-side"}>
                        <div className={"header-content"}>
                            <div className={"header-toggle-theme"} onClick={toggleDarkMode}>
                                { isDarkMode ? <SunIcon className={"w-7 h-7"} /> : <MoonIcon className={"w-7 h-7"} /> }
                            </div>
                            <div className={"header-toggle-menu"} onClick={toggleMenu}>
                                <span className={clsx("header-menu-bar", isMenuOpen ? "header-menu-top-active" : "header-menu-top")}></span>
                                <span className={clsx("header-menu-bar", isMenuOpen ? "header-menu-bottom-active" : "header-menu-bottom")}></span>
                            </div>
                            <Sidebar isMenuOpen={isMenuOpen} />
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;
