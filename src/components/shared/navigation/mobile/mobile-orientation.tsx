import { createRef, useState } from "react";
import { ExternalClickHandler } from "src/common/hooks/externalClickHandler";
import {
    CrossIcon,
    DocsIcon,
    GitHubIcon,
    MenuIcon,
} from "src/components/shared/icons/icons";

const MobileNav = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);

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
                <MenuIcon />
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
                        <div className="flex justify-between items-center pt-2 pb-1 border-b border-zinc-800 mr-2">
                            <h1 className="uppercase leading-wide font-bold">
                                Menu
                            </h1>
                            <button
                                onClick={() => setSettingsOpen(false)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <CrossIcon />
                            </button>
                        </div>
                        <a
                            className="my-1 px-2 hover:text-sky-500 dark:hover:text-sky-400 flex items-center"
                            href="https://benweare.co.uk/api/docs"
                        >
                            <DocsIcon />
                            <span className="ml-2">API Docs</span>
                        </a>
                        <a
                            className="my-1 px-2 hover:text-sky-500 dark:hover:text-sky-400 flex"
                            href="https://github.com/incendiarybean/isaac-achievement-hunter"
                        >
                            <GitHubIcon />
                            <span className="ml-2">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
