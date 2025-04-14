import { GenerateDestinations } from './destinations';

const LeftNavigationBar = () => {
    return (
        <div
            data-cy='navigation-left'
            className='hidden md:flex min-w-64 w-64 justify-center'
        >
            <div className='flex flex-col gap-2 mt-24 -ml-4 w-auto fixed top-0'>
                <GenerateDestinations />
            </div>
        </div>
    );
};

export default LeftNavigationBar;
