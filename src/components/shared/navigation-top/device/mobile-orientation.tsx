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
        <div className='mobile-orientation'>
            <button
                onClick={() => openNavigation()}
                type='button'
                className='burger-menu-icon'
            >
                <span className='sr-only'>Navigation</span>
                <Burger />
            </button>
            <div hidden={!settingsOpen} className='mobile-menu-wrapper'>
                <div className='popin-settings mobile-menu-flex'>
                    <div ref={accountElement} className='mobile-menu'>
                        <div className='space-y-2 mx-2'>
                            <div className='flex justify-between items-center pt-2 pb-1 border-b border-zinc-500'>
                                <h1 className='uppercase leading-wide font-bold mt-2'>
                                    Menu
                                </h1>
                                <button
                                    onClick={() => openNavigation(false)}
                                    className='close-menu-icon'
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
                                    `internal-link ${
                                        isActive ? 'active' : 'inactive'
                                    }`
                                }
                            >
                                <Home />

                                <p className='menu-item'>Dashboard</p>
                            </NavLink>

                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    `internal-link ${
                                        isActive ? 'active' : 'inactive'
                                    }`
                                }
                            >
                                <Info />

                                <p className='menu-item'>About</p>
                            </NavLink>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://www.npmjs.com/~incendiarybean'
                                className='external-link'
                            >
                                <Packages />

                                <p className='menu-item'>Packages</p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/incendiarybean'
                                className='external-link'
                            >
                                <OpenBox />

                                <p className='menu-item'>GitHub</p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='https://hub.docker.com/u/incendiarybean'
                                className='external-link'
                            >
                                <Box />

                                <p className='menu-item'>Docker</p>
                            </a>

                            <a
                                target='_blank'
                                rel='noreferrer'
                                href='/api/docs'
                                className='external-link'
                            >
                                <Newspaper />

                                <p className='menu-item'>Documentation</p>
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
