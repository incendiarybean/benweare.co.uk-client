import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarProps } from "src/common/types";
import DesktopNav from "./desktop/desktop-orientation";
import MobileNav from "./mobile/mobile-orientation";

export const NavigationBar = () => {
    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur-xl sm:backdrop-blur flex-none transition-colors duration-500 md:z-50 md:border-b md:border-sky-500/20 dark:border-sky-100/10 supports-backdrop-blur:bg-white/60 bg-transparent">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-sky-900/10 px-8 md:border-0 dark:border-sky-300/10 mx-0">
                    <div className="z-40 flex justify-between items-center w-full">
                        <a
                            className="mr-3 flex-none w-auto overflow-hidden md:w-auto"
                            href="/"
                        >
                            <span className="py-1 px-2 border border-sky-400/80 dark:border-sky-400/20 rounded-md text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-600">
                                benweare.co.uk
                            </span>
                        </a>
                        <span className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 hidden md:flex items-center">
                            <strong className="font-semibold">
                                v{process.env.REACT_APP_VERSION}
                            </strong>
                        </span>
                        <DesktopNav />
                        <MobileNav />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const LeftNavigationBar = ({ Icon }: NavbarProps) => {
    const [activePageNumber, setActivePageNumber] = useState<number>(0);

    const handlePageNavigation = (pageNumber: number) => {
        setActivePageNumber(pageNumber);
    };

    const setActiveRoute = (route: string) => {
        if (route === "/") {
            setActivePageNumber(1);
        } else setActivePageNumber(0);
    };

    useEffect(() => {
        setActiveRoute(window.location.pathname);
    }, []);

    return (
        <div className="md:pl-2 md:mx-4 hidden sm:flex justify-end sm:w-1/4 z-10 md:h-screen min-w-[12rem]">
            <div className=" shadow md:shadow-none select-none group fixed top-0 w-full md:w-48 md:mt-28">
                <div className={`z-10 absolute sm:min-w-fit md:grid md:gap-2 `}>
                    <Link
                        to="/dashboard"
                        className={`transition-bg ease-in-out duration-100 ${
                            activePageNumber === 0
                                ? "text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 font-semibold leading-tight shadow-md"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm"
                        } w-full md:w-48 h-12 flex items-center md:rounded-md`}
                        onClick={() => handlePageNavigation(0)}
                    >
                        <div className="p-3">
                            <Icon.Home />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm">
                            Dashboard
                        </p>
                    </Link>

                    <Link
                        to="/"
                        className={`transition-bg ease-in-out duration-100 ${
                            activePageNumber === 1
                                ? "text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 font-semibold leading-tight shadow-md"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm"
                        } w-full md:w-48 h-12 flex items-center md:rounded-md`}
                        onClick={() => handlePageNavigation(1)}
                    >
                        <div className="p-3">
                            <Icon.Info />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm">
                            About
                        </p>
                    </Link>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.npmjs.com/~incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Packages />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            Packages
                        </p>
                    </a>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.OpenBox />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            GitHub
                        </p>
                    </a>

                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://hub.docker.com/u/incendiarybean"
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Box />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            Docker
                        </p>
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="/api/docs"
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded-md"
                    >
                        <div className="p-3">
                            <Icon.Newspaper />
                        </div>

                        <p className="overflow-hidden md:ml-2 mt-1 text-sm font-medium">
                            Documentation
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export const RightNavigationBar = () => {
    return (
        <div className="hidden lg:flex justify-start md:pl-2 md:mr-4 w-full md:w-1/4 sticky top-0 z-10 md:h-screen  min-w-[12rem]">
            <div className="md:w-48 fixed top-0">
                <div className="p-2 md:w-48 text-left h-auto mt-28">
                    <h1 className="px-2 text-xs uppercase border-b border-slate-500 dark:border-slate-100">
                        external links
                    </h1>
                    <div className="ml-2 flex flex-col">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://steamcommunity.com/id/IncendiaryBean/"
                            className="my-1 px-2 text-sm text-blue-700 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 hover:scale-105"
                        >
                            Steam
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://discordapp.com/users/Beanerino#0454"
                            className="my-1 px-2 text-sm text-blue-700 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 hover:scale-105"
                        >
                            Discord
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/ben.weare/"
                            className="my-1 px-2 text-sm text-blue-700 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 hover:scale-105"
                        >
                            Instagram
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://open.spotify.com/user/incendiarybean"
                            className="my-1 px-2 text-sm text-blue-700 dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 hover:scale-105"
                        >
                            Spotify
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
