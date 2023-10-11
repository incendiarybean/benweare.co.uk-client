import { ExternalClickHandler } from '@common/hooks/externalClickHandler';
import { animateCSS } from '@common/utils';
import { Icon } from '@components';
import { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MobileNav = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [activePageNumber, setActivePageNumber] = useState<number>(0);

    const handlePageNavigation = (pageNumber: number) => {
        setActivePageNumber(pageNumber);
    };

    const setActiveRoute = (route: string) => {
        if (route === '/') {
            setActivePageNumber(1);
        } else setActivePageNumber(0);
    };

    useEffect(() => {
        setActiveRoute(window.location.pathname);
    }, []);

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    const openSettings = (open = !settingsOpen) => {
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
                onClick={() => openSettings()}
                type='button'
                className='border border-zinc-500 rounded-md w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
            >
                <span className='sr-only'>Navigation</span>
                <Icon.Burger />
            </button>
            <div
                hidden={!settingsOpen}
                className='animate-fadeIn absolute top-0 left-0 w-full h-screen bg-zinc-500 bg-opacity-30'
            >
                <div className='popin-settings flex justify-start w-full h-full'>
                    <div
                        ref={accountElement}
                        className='bg-zinc-900 shadow w-10/12 p-2 flex flex-col rounded-r-xl border-r border-zinc-600'
                    >
                        <div className='flex justify-between items-center pt-2 pb-1 border-b border-zinc-500 mx-2'>
                            <h1 className='uppercase leading-wide font-bold mt-2'>
                                Menu
                            </h1>
                            <button
                                onClick={() => openSettings(false)}
                                className='hover:bg-zinc-500 rounded-md text-zinc-800 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                            >
                                <span className='sr-only'>
                                    Close Navigation
                                </span>
                                <Icon.Cross />
                            </button>
                        </div>
                        <div className='space-y-2 mx-2'>
                            <Link
                                to='/dashboard'
                                className={`${
                                    activePageNumber === 0
                                        ? 'bg-zinc-800 border-l-4 border-sky-400'
                                        : 'hover:text-sky-400'
                                } mt-2 w-full md:w-48 h-10 flex items-center rounded-r-xl`}
                                onClick={() => handlePageNavigation(0)}
                            >
                                <div className='p-2 text-zinc-500'>
                                    <Icon.Home />
                                </div>

                                <p className='overflow-hidden md:ml-2 text-md'>
                                    Dashboard
                                </p>
                            </Link>

                            <Link
                                to='/'
                                className={`${
                                    activePageNumber === 1
                                        ? 'bg-zinc-800 border-l-4 border-sky-400'
                                        : 'hover:text-sky-400'
                                } mt-2 w-full md:w-48 h-10 flex items-center rounded-r-xl`}
                                onClick={() => handlePageNavigation(1)}
                            >
                                <div className='p-2 text-zinc-500'>
                                    <Icon.Info />
                                </div>

                                <p className='overflow-hidden md:ml-2 text-md'>
                                    About
                                </p>
                            </Link>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://www.npmjs.com/~incendiarybean'
                                className='w-full md:w-48 h-11 flex items-center hover:text-sky-400'
                            >
                                <div className='p-2 text-zinc-500'>
                                    <Icon.Packages />
                                </div>

                                <p className='overflow-hidden md:ml-2 text-md font-medium'>
                                    Packages
                                </p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/incendiarybean'
                                className='w-full md:w-48 h-11 flex items-center hover:text-sky-400'
                            >
                                <div className='p-2 text-zinc-500'>
                                    <Icon.OpenBox />
                                </div>

                                <p className='overflow-hidden md:ml-2 text-md font-medium'>
                                    GitHub
                                </p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://hub.docker.com/u/incendiarybean'
                                className='w-full md:w-48 h-11 flex items-center hover:text-sky-400'
                            >
                                <div className='p-2 text-zinc-500'>
                                    <Icon.Box />
                                </div>

                                <p className='overflow-hidden md:ml-2 text-md font-medium'>
                                    Docker
                                </p>
                            </a>
                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='/api/docs'
                                className='w-full md:w-48 h-11 flex items-center hover:text-sky-400'
                            >
                                <div className='p-2 text-zinc-500'>
                                    <Icon.Newspaper />
                                </div>

                                <p className='p-1 overflow-hidden md:ml-2 text-md font-medium'>
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
