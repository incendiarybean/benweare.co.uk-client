import { Icon } from 'src/components';

const DesktopNav = () => {
    return (
        <div className='hidden md:flex items-center ml-auto'>
            <nav className='text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200'>
                <ul className='flex space-x-4'>
                    <li>
                        <a
                            className='px-2 block dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                            href='https://benweare.co.uk/api/docs'
                        >
                            <span className='sr-only'>API Documentation</span>
                            <Icon.Newspaper />
                        </a>
                    </li>
                    <li className='flex items-center'>
                        <a
                            className='px-2 block dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                            href='https://www.npmjs.com/~incendiarybean'
                        >
                            <span className='sr-only'>
                                IncendiaryBean's NPM
                            </span>
                            <Icon.Npm />
                        </a>
                    </li>
                    <li className='flex items-center'>
                        <a
                            className='px-2 block dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-500'
                            href='https://github.com/incendiarybean'
                        >
                            <span className='sr-only'>
                                IncendiaryBean's Github
                            </span>
                            <Icon.GitHub />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default DesktopNav;
