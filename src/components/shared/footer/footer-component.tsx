import { Docs, GitHub, Npm } from '@icons';

const FooterComponent = () => {
    return (
        <footer className='p-4 py-8 flex justify-around border-t border-slate-300 dark:border-sky-100/10'>
            <div className='flex flex-col'>
                <ul className='flex justify-around'>
                    <li>
                        <a
                            className='icon-link'
                            href='https://benweare.co.uk/api/docs'
                            aria-label='API Documentation Page'
                        >
                            <span className='sr-only'>API Documentation</span>
                            <Docs />
                        </a>
                    </li>
                    <li>
                        <a
                            className='icon-link'
                            href='https://www.npmjs.com/~incendiarybean'
                            aria-label="Ben's NPM Page"
                        >
                            <span className='sr-only'>
                                IncendiaryBean's NPM
                            </span>
                            <Npm />
                        </a>
                    </li>
                    <li>
                        <a
                            className='icon-link'
                            href='https://github.com/incendiarybean'
                            aria-label="Ben's GitHub Page"
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
                            className='footer-link'
                            aria-label="Ben's Steam Page"
                        >
                            Steam
                        </a>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://discordapp.com/users/Beanerino#0454'
                            className='footer-link'
                            aria-label="Ben's Discord"
                        >
                            Discord
                        </a>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://www.instagram.com/ben.weare/'
                            className='footer-link'
                            aria-label="Ben's Instagram Page"
                        >
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://open.spotify.com/user/incendiarybean'
                            className='footer-link'
                            aria-label="Ben's Spotify Page"
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
                        <strong
                            data-cy='version-number'
                            className='font-semibold'
                        >
                            v{import.meta.env.VITE_APP_VERSION}
                        </strong>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
