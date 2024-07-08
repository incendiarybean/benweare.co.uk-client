import DesktopNav from './device/desktop-orientation';
import MobileNav from './device/mobile-orientation';

const NavigationBar = () => {
    return (
        <div
            id='navigation-top'
            className='sticky top-0 z-40 w-full backdrop-blur-xl sm:backdrop-blur flex-none md:border-b md:border-sky-500/20 dark:border-sky-100/10 bg-transparent'
        >
            <div className='py-4 border-b border-sky-900/10 px-2 md:px-6 md:border-0 dark:border-sky-300/10 flex justify-between items-center'>
                <MobileNav />
                <div className='mx-4 md:mx-0 flex items-center justify-between md:justify-start w-full'>
                    <a
                        className='mr-3 flex-none w-auto overflow-hidden md:w-auto'
                        href='/'
                        aria-label="Ben's Information Page (benweare.co.uk)"
                    >
                        <span className='py-1 px-2 border border-sky-500 dark:border-sky-400/20 rounded text-sky-500 dark:text-sky-400 hover:text-blue-600 dark:hover:text-sky-600'>
                            benweare.co.uk
                        </span>
                    </a>
                    <span className='ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 items-center'>
                        <strong className='font-semibold'>
                            v{VITE_APP_VERSION}
                        </strong>
                    </span>
                </div>
                <DesktopNav />
            </div>
        </div>
    );
};

export default NavigationBar;
