import { ImageIcon } from '@icons';

const NewsReelSkeleton = () => {
    return (
        <div
            data-cy='news-reel-skeleton'
            className='flex gap-4 max-h-130 shadow-inner'
        >
            {[...Array(4)].map((_item, index) => (
                <div
                    key={`news-reel-skeleton-item-${index}`}
                    className='article snap-center snap-proximity rounded-lg flex flex-col default-border default-bg shadow min-w-90 transition-all overflow-hidden'
                >
                    <div className='animate-pulse bg-slate-300 dark:bg-zinc-800 rounded-t-lg xl:rounded-r-none xl:rounded-l-lg shadow-sm flex items-center justify-center text-slate-100 dark:text-zinc-900 h-60 w-full'>
                        <ImageIcon />
                    </div>
                    <div className='shadow-inner p-4 flex flex-col justify-between w-full h-50'>
                        <div className='w-full flex flex-col gap-3'>
                            <div className='flex flex-wrap justify-between text-base text-blue-600 dark:text-sky-500'>
                                <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 rounded-full h-4 w-24' />
                                <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20  rounded-full h-4 w-24' />
                            </div>
                            <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20  rounded-full h-6 w-full' />
                            <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20  rounded-full h-6 w-full' />
                            <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20  rounded-full h-6 w-full' />
                        </div>

                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20  rounded-full h-4 w-24' />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsReelSkeleton;
