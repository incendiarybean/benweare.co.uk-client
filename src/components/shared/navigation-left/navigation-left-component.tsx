import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarProps } from "src/common/types";

const LeftNavigationBar = ({ Icon }: NavbarProps) => {
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
                        } w-full md:w-48 h-12 flex items-center md:rounded`}
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
                        } w-full md:w-48 h-12 flex items-center md:rounded`}
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
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded"
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
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded"
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
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded"
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
                        className="transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded"
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

export default LeftNavigationBar;
