import { GitHub, Newspaper, Npm } from '@icons';

const FooterComponent = () => {
    return (
        <footer className='bg-white dark:bg-zinc-900/70 p-4 py-8 border-t border-sky-900/10 dark:border-sky-300/10 w-full flex justify-around'>
            <div className='flex flex-col'>
                <ul className='md:hidden flex justify-around'>
                    <li>
                        <a
                            className='px-2 block dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                            href='https://benweare.co.uk/api/docs'
                        >
                            <span className='sr-only'>API Documentation</span>
                            <Newspaper />
                        </a>
                    </li>
                    <li>
                        <a
                            className='px-2 block dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                            href='https://www.npmjs.com/~incendiarybean'
                        >
                            <span className='sr-only'>
                                IncendiaryBean's NPM
                            </span>
                            <Npm />
                        </a>
                    </li>
                    <li>
                        <a
                            className='px-2 block dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                            href='https://github.com/incendiarybean'
                        >
                            <span className='sr-only'>
                                IncendiaryBean's Github
                            </span>
                            <GitHub />
                        </a>
                    </li>
                </ul>

                <ul className='flex gap-2 justify-around my-2'>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://steamcommunity.com/id/IncendiaryBean/'
                            className='my-1 text-sm dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                        >
                            Steam
                        </a>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://discordapp.com/users/Beanerino#0454'
                            className='my-1 text-sm dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                        >
                            Discord
                        </a>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://www.instagram.com/ben.weare/'
                            className='my-1 text-sm dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                        >
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://open.spotify.com/user/incendiarybean'
                            className='my-1 text-sm dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                        >
                            Spotify
                        </a>
                    </li>
                </ul>

                <div className='w-full flex justify-center items-center'>
                    <span className='text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 items-center'>
                        <strong className='font-semibold'>
                            benweare.co.uk
                        </strong>
                    </span>
                    <span className='ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 items-center'>
                        <strong className='font-semibold'>
                            v{VITE_APP_VERSION}
                        </strong>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
