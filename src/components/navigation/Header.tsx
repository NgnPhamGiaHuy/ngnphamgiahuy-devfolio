"use client"

import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import Sidebar from "@/components/navigation/Sidebar";

const Header: React.FC = () => {
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
            <section className={"relative"}>
                <div className={"mx-auto flex max-lg:flex-wrap justify-between relative"}>
                    <div className={"min-h-[1px] flex relative"}>
                        <div className={"w-full flex flex-wrap items-center content-center relative"}>
                            <Link href={"/"}>
                                <span className={"text-2xl font-black uppercase dot-after"}>NgnPhm</span>
                            </Link>
                        </div>
                    </div>
                    <div className={"min-h-[1px] flex relative"}>
                        <div className={"w-full flex flex-wrap items-center content-center relative"}>
                            <div className={"mr-10 icon-button"} onClick={toggleDarkMode}>
                                { isDarkMode ? <SunIcon className="w-7 h-7" /> : <MoonIcon className="w-7 h-7" /> }
                            </div>
                            <div className={"w-[28px] h-[30px] top-0 right-0 relative z-3 cursor-pointer"} onClick={toggleMenu}>
                                <span className={clsx(isMenuOpen ? "top-[14px] -rotate-45" : "top-[8px]", "left-0 w-full h-[2px] bg-black block transition-all duration-500 absolute")}></span>
                                <span className={clsx(isMenuOpen ? "top-[14px] rotate-45" : "bottom-[8px]", "left-0 w-full h-[2px] bg-black block transition-all duration-500 absolute")}></span>
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
