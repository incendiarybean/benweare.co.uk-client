import { GenerateDestinations } from './navigation-links';

const LeftNavigationBar = () => {
    return (
        <div
            data-cy='navigation-left'
            className='flex-1 ml-10 min-w-[12rem] min-h-screen h-full hidden md:flex justify-end sticky top-0'
        >
            <div className='flex flex-col gap-2 mt-22 -ml-4 w-auto z-50 min-w-52'>
                <GenerateDestinations />
            </div>
        </div>
    );
};

export default LeftNavigationBar;
