import { WarningCircle } from '@icons';

const ErrorComponent = ({
    feedName,
}: {
    /** The name of the failing feed */
    feedName: string;
}) => {
    return (
        <div className='w-full h-12 flex items-center'>
            <div className='w-full px-4 mb-2 p-2 items-center flex justify-around'>
                <div className='bg-slate-100 dark:bg-zinc-900 rounded-full shadow flex justify-around gap-1 p-1 px-2 items-center text-xs md:text-sm'>
                    <span className='text-red-500 flex items-center gap-1'>
                        <WarningCircle />
                        <h2>ERROR:</h2>
                    </span>
                    {feedName} component has failed to load.
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
