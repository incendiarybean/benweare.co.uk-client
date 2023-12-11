import { ExternalClickHandler } from '@common/hooks/externalClickHandler';
import { animateCSS } from '@common/utils';
import { Footer } from '@components';
import { createRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Burger,
    Cross,
    Home,
    Info,
    Newspaper,
    OpenBox,
    Packages,
} from 'src/components/shared/icons';

const MobileNav = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    const openNavigation = (open = !settingsOpen) => {
        if (open) {
            animateCSS('.popin-settings', 'slideInLeft');
            setSettingsOpen(open);
        } else {
            setSettingsOpen(false);
        }
    };

    return (
        <div className='ml-2 -my-1 md:hidden'>
            <button
                onClick={() => openNavigation()}
                type='button'
                className='border border-zinc-500 rounded-md w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
            >
                <span className='sr-only'>Navigation</span>
                <Burger />
            </button>
            <div
                hidden={!settingsOpen}
                className='absolute top-0 left-0 w-full h-screen bg-zinc-500 bg-opacity-30'
            >
                <div
                    ref={accountElement}
                    className='popin-settings h-full w-full sm:w-10/12 bg-zinc-200 dark:bg-zinc-900 shadow p-2 flex flex-col justify-between rounded-r-xl border-r border-zinc-400 dark:border-zinc-600 overflow-y-auto'
                >
                    <div className='space-y-2 mx-2'>
                        <div className='flex justify-between items-center pt-2 pb-1 border-b border-zinc-500'>
                            <h1 className='uppercase leading-wide font-bold mt-2'>
                                Menu
                            </h1>
                            <button
                                onClick={() => openNavigation(false)}
                                className='hover:bg-zinc-300 hover:dark:bg-zinc-500 rounded-md text-zinc-800 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                            >
                                <span className='sr-only'>
                                    Close Navigation
                                </span>
                                <Cross />
                            </button>
                        </div>

                        <NavLink
                            to='/dashboard'
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? 'bg-zinc-300 dark:bg-zinc-800'
                                        : 'hover:text-sky-400'
                                } mt-2 w-full h-10 flex gap-2 items-center rounded-xl px-2`
                            }
                        >
                            <Home />

                            <p className='mt-1 overflow-hidden text-base'>
                                Dashboard
                            </p>
                        </NavLink>

                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? 'bg-zinc-300 dark:bg-zinc-800'
                                        : 'hover:text-sky-400'
                                } mt-2 w-full h-10 flex gap-2 items-center rounded-xl px-2`
                            }
                        >
                            <Info />

                            <p className='mt-1 overflow-hidden text-base'>
                                About
                            </p>
                        </NavLink>

                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://www.npmjs.com/~incendiarybean'
                            className='w-full h-10 flex gap-2 items-center hover:text-sky-400 px-2'
                        >
                            <Packages />

                            <p className='mt-1 overflow-hidden text-base'>
                                Packages
                            </p>
                        </a>

                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://github.com/incendiarybean'
                            className='w-full h-10 flex gap-2 items-center hover:text-sky-400 px-2'
                        >
                            <OpenBox />

                            <p className='mt-1 overflow-hidden text-base'>
                                GitHub
                            </p>
                        </a>

                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='https://hub.docker.com/u/incendiarybean'
                            className='w-full h-10 flex gap-2 items-center hover:text-sky-400 px-2'
                        >
                            <Box />

                            <p className='mt-1 overflow-hidden text-base'>
                                Docker
                            </p>
                        </a>

                        <a
                            target='_blank'
                            rel='noreferrer'
                            href='/api/docs'
                            className='w-full h-10 flex gap-2 items-center hover:text-sky-400 px-2'
                        >
                            <Newspaper />

                            <p className='mt-1 overflow-hidden text-base'>
                                Documentation
                            </p>
                        </a>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
