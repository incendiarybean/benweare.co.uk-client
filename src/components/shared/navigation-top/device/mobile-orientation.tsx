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
                <div className='popin-settings flex justify-start h-full'>
                    <div
                        ref={accountElement}
                        className='h-full w-full sm:w-10/12 bg-zinc-200 dark:bg-zinc-900 shadow p-2 flex flex-col justify-between rounded-r-xl border-r border-zinc-400 dark:border-zinc-600 overflow-y-auto'
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
                                    `mobile-internal-link ${
                                        isActive ? 'active' : 'inactive'
                                    }`
                                }
                            >
                                <Home />

                                <p className='mobile-menu-item'>Dashboard</p>
                            </NavLink>

                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    `mobile-internal-link ${
                                        isActive ? 'active' : 'inactive'
                                    }`
                                }
                            >
                                <Info />

                                <p className='mobile-menu-item'>About</p>
                            </NavLink>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://www.npmjs.com/~incendiarybean'
                                className='mobile-external-link'
                            >
                                <Packages />

                                <p className='mobile-menu-item'>Packages</p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/incendiarybean'
                                className='mobile-external-link'
                            >
                                <OpenBox />

                                <p className='mobile-menu-item'>GitHub</p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://hub.docker.com/u/incendiarybean'
                                className='mobile-external-link'
                            >
                                <Box />

                                <p className='mobile-menu-item'>Docker</p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='/api/docs'
                                className='mobile-external-link'
                            >
                                <Newspaper />

                                <p className='mobile-menu-item'>
                                    Documentation
                                </p>
                            </a>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
