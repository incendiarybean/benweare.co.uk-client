import DesktopNav from './device/desktop-orientation';
import MobileNav from './device/mobile-orientation';

const NavigationBar = () => {
    return (
        <div
            data-cy='navigation-top'
            className='max-w-screen sticky top-0 z-40 w-full backdrop-blur-xl sm:backdrop-blur-sm flex-none border-b border-sky-500/20 dark:border-sky-400/20 bg-transparent flex justify-between py-4 px-2 md:px-6 items-center'
        >
            <MobileNav />
            <div className='mx-4 md:mx-0 flex items-center justify-between md:justify-start w-full'>
                <a
                    className='link mr-3 flex-none w-auto overflow-hidden md:w-auto'
                    href='/'
                    aria-label="Ben's Information Page (benweare.co.uk)"
                >
                    <span className='font-normal tracking-wide py-1 px-2 border border-sky-600 dark:border-sky-400/20 rounded-sm'>
                        benweare.co.uk
                    </span>
                </a>
                <span
                    data-cy='version-number'
                    className='ml-3 text-sm leading-5 text-white md:text-sky-600 dark:text-sky-200 bg-sky-600/90 md:bg-sky-300/30 dark:bg-sky-500/20 rounded-full py-1 px-3 items-center'
                >
                    v{VITE_APP_VERSION}
                </span>
            </div>
            <DesktopNav />
        </div>
    );
};

export default NavigationBar;
