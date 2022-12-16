const RightNavigationBar = () => {
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
                            className="my-1 px-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-600 hover:scale-105"
                        >
                            Steam
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://discordapp.com/users/Beanerino#0454"
                            className="my-1 px-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-600 hover:scale-105"
                        >
                            Discord
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/ben.weare/"
                            className="my-1 px-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-600 hover:scale-105"
                        >
                            Instagram
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://open.spotify.com/user/incendiarybean"
                            className="my-1 px-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-600 hover:scale-105"
                        >
                            Spotify
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightNavigationBar;
