import { ImageIcon } from '@icons';

const CardSkeleton = () => {
    return (
        <div
            data-cy='card-skeleton'
            className='animate-fade-in rounded-lg w-full flex flex-col xl:flex-row default-border default-bg shadow overflow-hidden'
        >
            <div className='animate-pulse bg-slate-300 dark:bg-zinc-800 rounded-t-lg xl:rounded-r-none xl:rounded-l-lg shadow-sm flex items-center justify-center text-slate-100 dark:text-zinc-900 h-120 w-full max-w-full xl:min-w-sm xl:max-w-1/3 max-h-120'>
                <ImageIcon />
            </div>
            <div className='shadow-inner p-10 flex flex-col justify-between min-h-full w-full'>
                <div className='w-full'>
                    <div className='flex flex-wrap md:w-full items-center justify-between text-base text-blue-600 dark:text-sky-500'>
                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 w-24 h-6 rounded-full' />
                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 w-24 h-6 rounded-full' />
                    </div>
                    <div className='mt-4 flex flex-col gap-4 w-full'>
                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 w-64 h-6 rounded-full' />
                        <div className='flex flex-col gap-3 pb-4 w-full'>
                            {[...Array(3)].map((_item, index) => (
                                <div
                                    className='flex gap-2'
                                    key={`news-list-skeleton-item-${index}`}
                                >
                                    <span
                                        className={`animate-pulse bg-blue-100 dark:bg-sky-600/20 ${index % 2 ? 'w-4/5' : 'w-full'} h-6 rounded-full`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='h-4 w-full flex gap-1'>
                    <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 w-48 h-6 rounded-full' />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
