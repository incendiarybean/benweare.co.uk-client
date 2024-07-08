import { WarningCircle } from '@icons';

const ErrorComponent = ({
    feedName,
}: {
    /** The name of the failing feed */
    feedName?: string;
}) => {
    return (
        <div
            data-cy='error-component'
            className='w-full h-12 flex items-center'
        >
            <div className='w-full px-1 md:px-6 my-2 p-2'>
                <div className='w-full bg-slate-100 dark:bg-zinc-900 rounded shadow flex justify-start gap-1 p-1 pl-2 pr-4 items-center text-xs md:text-sm'>
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
