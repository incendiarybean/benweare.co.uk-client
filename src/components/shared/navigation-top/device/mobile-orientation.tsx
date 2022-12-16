import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalClickHandler } from "src/common/hooks/externalClickHandler";
import { Icon } from "src/components";

const MobileNav = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
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

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    return (
        <div className="ml-2 -my-1 md:hidden">
            <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                type="button"
                className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            >
                <span className="sr-only">Navigation</span>
                <Icon.Menu />
            </button>
            <div
                hidden={!settingsOpen}
                className="animate-fadeIn absolute top-0 left-0 w-full h-screen bg-zinc-900 bg-opacity-70"
            >
                <div className="flex justify-end w-full h-full">
                    <div
                        ref={accountElement}
                        className="bg-zinc-900 shadow w-3/4 p-2 flex flex-col"
                    >
                        <div className="flex justify-between items-center pt-2 pb-1 border-b border-zinc-800 mx-5">
                            <h1 className="uppercase leading-wide font-bold">
                                Menu
                            </h1>
                            <button
                                onClick={() => setSettingsOpen(false)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Icon.Cross />
                            </button>
                        </div>
                        <div className="mx-6">
                            <Link
                                to="/dashboard"
                                className={`${
                                    activePageNumber === 0
                                        ? "text-sky-400 hover:text-sky-600"
                                        : "hover:text-sky-400"
                                } w-full md:w-48 h-12 flex items-center`}
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
                                className={`${
                                    activePageNumber === 1
                                        ? "text-sky-400 hover:text-sky-600"
                                        : "hover:text-sky-400"
                                } w-full md:w-48 h-12 flex items-center`}
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
                                className="w-full md:w-48 h-12 flex items-center hover:text-sky-400"
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
                                className="w-full md:w-48 h-12 flex items-center hover:text-sky-400"
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
                                className="w-full md:w-48 h-12 flex items-center hover:text-sky-400"
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
                                className="w-full md:w-48 h-12 flex items-center hover:text-sky-400"
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
            </div>
        </div>
    );
};

export default MobileNav;
