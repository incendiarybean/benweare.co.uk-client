import type { NavbarProps } from '@common/types';
import { Link } from 'react-router-dom';
import {
    Box,
    Home,
    Info,
    Newspaper,
    OpenBox,
    Packages,
} from 'src/components/shared/icons';

const LeftNavigationBar = ({ setActivePage, isActivePage }: NavbarProps) => {
    return (
        <div className='md:pl-2 md:mx-4 hidden sm:flex justify-end sm:w-1/4 z-10 md:h-screen min-w-[12rem]'>
            <div className=' shadow md:shadow-none select-none group fixed top-0 w-full md:w-48 md:mt-28'>
                <div className={`z-10 absolute sm:min-w-fit md:grid md:gap-2 `}>
                    <Link
                        to='/dashboard'
                        className={`transition-bg ease-in-out duration-100 ${
                            isActivePage('/dashboard')
                                ? 'text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 font-semibold leading-tight shadow-md'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm'
                        } w-full md:w-48 h-12 flex items-center md:rounded`}
                        onClick={() => setActivePage('/dashboard')}
                    >
                        <div className='p-3'>
                            <Home />
                        </div>

                        <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                            Dashboard
                        </p>
                    </Link>

                    <Link
                        to='/'
                        className={`transition-bg ease-in-out duration-100 ${
                            isActivePage('/')
                                ? 'text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 font-semibold leading-tight shadow-md'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm'
                        } w-full md:w-48 h-12 flex items-center md:rounded`}
                        onClick={() => setActivePage('/')}
                    >
                        <div className='p-3'>
                            <Info />
                        </div>

                        <p className='overflow-hidden md:ml-2 mt-1 text-sm'>
                            About
                        </p>
                    </Link>

                    <Link
                        to='/documentation'
                        className={`transition-bg ease-in-out duration-100 ${
                            isActivePage('/documentation')
                                ? 'text-white bg-sky-600/80 dark:bg-sky-400/10 hover:from-sky-600 hover:to-sky-800 font-semibold leading-tight shadow-md'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm'
                        } w-full md:w-48 h-12 flex items-center md:rounded`}
                        onClick={() => setActivePage('/documentation')}
                    >
                        <div className='p-3'>
                            <Newspaper />
                        </div>

                        <p className='overflow-hidden md:ml-2 mt-1 text-sm font-medium'>
                            Documentation
                        </p>
                    </Link>

                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://www.npmjs.com/~incendiarybean'
                        className='transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded'
                    >
                        <div className='p-3'>
                            <Packages />
                        </div>

                        <p className='overflow-hidden md:ml-2 mt-1 text-sm font-medium'>
                            Packages
                        </p>
                    </a>

                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://github.com/incendiarybean'
                        className='transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded'
                    >
                        <div className='p-3'>
                            <OpenBox />
                        </div>

                        <p className='overflow-hidden md:ml-2 mt-1 text-sm font-medium'>
                            GitHub
                        </p>
                    </a>

                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://hub.docker.com/u/incendiarybean'
                        className='transition-colors ease-in-out duration-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:shadow-sm w-full md:w-48 h-12 flex items-center md:rounded'
                    >
                        <div className='p-3'>
                            <Box />
                        </div>

                        <p className='overflow-hidden md:ml-2 mt-1 text-sm font-medium'>
                            Docker
                        </p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LeftNavigationBar;
