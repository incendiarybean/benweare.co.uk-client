import { NavLink } from 'react-router-dom';
import {
    Box,
    Home,
    Info,
    Newspaper,
    OpenBox,
    Packages,
} from 'src/components/shared/icons';

const LeftNavigationBar = () => {
    return (
        <div className='md:flex-1 md:pl-2 md:mx-4 hidden md:flex justify-end z-10 min-w-[12rem]'>
            <div className='flex flex-col gap-2 w-48 mt-28 fixed top-0'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) =>
                        (isActive
                            ? 'text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 leading-loose shadow-md'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm') +
                        ' transition-bg ease-in-out duration-100 w-full h-12 flex items-center md:rounded p-3'
                    }
                >
                    <Home />

                    <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                        Dashboard
                    </p>
                </NavLink>

                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        (isActive
                            ? 'text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 leading-loose shadow-md'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm') +
                        ' transition-bg ease-in-out duration-100 w-full h-12 flex items-center md:rounded p-3'
                    }
                >
                    <Info />

                    <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                        About
                    </p>
                </NavLink>

                <NavLink
                    to='/documentation'
                    className={({ isActive }) =>
                        (isActive
                            ? 'text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 leading-loose shadow-md'
                            : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm') +
                        ' transition-bg ease-in-out duration-100 w-full h-12 flex items-center md:rounded p-3'
                    }
                >
                    <Newspaper />

                    <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                        Documentation
                    </p>
                </NavLink>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.npmjs.com/~incendiarybean'
                    className='transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full h-12 flex items-center md:rounded p-3'
                >
                    <Packages />

                    <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                        Packages
                    </p>
                </a>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://github.com/incendiarybean'
                    className='transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full h-12 flex items-center md:rounded p-3'
                >
                    <OpenBox />

                    <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                        GitHub
                    </p>
                </a>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://hub.docker.com/u/incendiarybean'
                    className='transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full h-12 flex items-center md:rounded p-3'
                >
                    <Box />

                    <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                        Docker
                    </p>
                </a>
            </div>
        </div>
    );
};

export default LeftNavigationBar;
