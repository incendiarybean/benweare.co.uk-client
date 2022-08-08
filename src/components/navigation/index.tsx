import React, { useEffect, useState, createRef } from "react";
import { Link } from "react-router-dom";
import { NavbarProps } from "@lib/types";
import { ExternalClickHandler } from "src/hooks/externalClickHandler";

function Component({ Icon, mobileMenu, setMobileMenu }: NavbarProps) {
    const [activePageNumber, setActivePageNumber] = useState(0);

    const handlePageNavigation = (pageNumber: number) => {
        setActivePageNumber(pageNumber);
        if (mobileMenu) {
            setMobileMenu(false);
        }
    };

    useEffect(() => {
        const currentPage = window.location.pathname;
        switch (currentPage) {
            case "/":
                setActivePageNumber(1);
                break;
            default:
                break;
        }
    }, []);

    const navigationElement = createRef<HTMLDivElement>();
    ExternalClickHandler(navigationElement, setMobileMenu);

    return (
        <div
            ref={navigationElement}
            className="select-none group relative xl:sticky top-0 w-full xl:w-auto bg-white xl:h-screen xl:shadow-md"
        >
            <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="xl:hidden hover:shadow-inner w-full h-12 flex items-center border-b"
            >
                <div className="p-3">
                    <Icon.Burger />
                </div>

                <p className="transition-width ease-in-out duration-500 xl:w-0 overflow-hidden ml-2 text-sm font-normal uppercase">
                    Menu
                </p>
            </button>
            <div
                className={`z-20 absolute xl:relative text-left bg-white xl:transition-width ease-in-out duration-150 w-full xl:w-12 xl:group-hover:w-52 ${
                    mobileMenu ? "" : "hidden"
                } xl:grid grid-cols-1 grid-rows-5 divide-y shadow-lg xl:shadow-none`}
            >
                <Link
                    to="/dashboard"
                    className={`${
                        activePageNumber === 0
                            ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-slate-100 hover:text-white"
                            : "hover:bg-slate-100"
                    } hover:shadow-inner w-full h-12 flex items-center`}
                    onClick={() => handlePageNavigation(0)}
                >
                    <div className="p-3">
                        <Icon.Home />
                    </div>

                    <p className="transition-width ease-in-out duration-500 xl:w-0 overflow-hidden ml-2 mt-1 group-hover:w-full text-sm font-medium">
                        Dashboard
                    </p>
                </Link>

                <Link
                    to="/"
                    className={`${
                        activePageNumber === 1
                            ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-slate-100 hover:text-white"
                            : "hover:bg-slate-100"
                    } hover:shadow-inner w-full h-12 flex items-center`}
                    onClick={() => handlePageNavigation(1)}
                >
                    <div className="p-3">
                        <Icon.Info />
                    </div>

                    <p className="transition-width ease-in-out duration-500 xl:w-0 overflow-hidden ml-2 mt-1 group-hover:w-full text-sm font-medium">
                        About
                    </p>
                </Link>

                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.npmjs.com/~incendiarybean"
                    className="hover:bg-slate-100 hover:shadow-inner w-full h-12 flex items-center"
                >
                    <div className="p-3">
                        <Icon.Packages />
                    </div>

                    <p className="transition-width ease-in-out duration-500 xl:w-0 overflow-hidden ml-2 mt-1 group-hover:w-full text-sm font-medium">
                        Packages
                    </p>
                </a>

                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/incendiarybean"
                    className="hover:bg-slate-100 hover:shadow-inner w-full h-12 flex items-center"
                >
                    <div className="p-3">
                        <Icon.OpenBox />
                    </div>

                    <p className="transition-width ease-in-out duration-500 xl:w-0 overflow-hidden ml-2 mt-1 group-hover:w-full text-sm font-medium">
                        GitHub
                    </p>
                </a>

                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://hub.docker.com/u/incendiarybean"
                    className="hover:bg-slate-100 hover:shadow-inner w-full h-12 flex items-center"
                >
                    <div className="p-3">
                        <Icon.Box />
                    </div>

                    <p className="transition-width ease-in-out duration-500 xl:w-0 overflow-hidden ml-2 mt-1 group-hover:w-full text-sm font-medium">
                        Docker
                    </p>
                </a>
            </div>
        </div>
    );
}

export default Component;
