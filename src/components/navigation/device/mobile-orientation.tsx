import { Burger, Cross } from '@icons';
import { createRef, useState } from 'react';

import { ExternalClickHandler } from '@common/hooks/externalClickHandler';
import { Footer } from '@components';
import { GenerateDestinations } from '../navigation-links';

const MobileNav = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    const openNavigation = (open = !settingsOpen) => {
        if (open) {
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
                className='transparent-none text-sky-600 border border-sky-600 rounded-md w-8 h-8 flex items-center justify-center hover:text-sky-600 dark:text-slate-400 dark:hover:text-slate-300'
            >
                <span className='sr-only'>Navigation</span>
                <Burger />
            </button>
            <div
                hidden={!settingsOpen}
                className='absolute top-0 left-0 bg-white/10 bg-opacity-30 backdrop-blur-xl w-full'
            >
                <div className='animate-slide-in-left w-full h-screen'>
                    <div className='popin-settings flex justify-start h-full'>
                        <div
                            ref={accountElement}
                            className='h-full w-10/12 bg-zinc-100 dark:bg-zinc-900 shadow p-2 flex flex-col justify-between rounded-r-xl border-r border-zinc-400 dark:border-zinc-600 overflow-y-auto'
                        >
                            <div className='flex flex-col gap-2 p-4'>
                                <div className='flex justify-between items-center pt-2 pb-1 mb-2 border-b border-zinc-500'>
                                    <h1 className='uppercase leading-wide  mt-2'>
                                        Menu
                                    </h1>
                                    <button
                                        onClick={() => openNavigation(false)}
                                        className='hover:bg-zinc-300 dark:hover:bg-zinc-500 rounded-md text-zinc-800 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300'
                                    >
                                        <span className='sr-only'>
                                            Close Navigation
                                        </span>
                                        <Cross />
                                    </button>
                                </div>
                                <GenerateDestinations />
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
