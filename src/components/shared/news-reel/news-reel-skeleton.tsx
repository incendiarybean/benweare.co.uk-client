import { ImageIcon } from '@icons';

const NewsReelSkeleton = () => {
    return (
        <div
            data-cy='news-reel-skeleton'
            className='animate-fade-in relative flex w-full rounded-sm lg:shadow-sm flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 lg:border border-slate-300 dark:border-zinc-600/30'
        >
            <div className='flex p-2 w-full min-w-[50%] xl:w-96 h-60 shadow-sm rounded-t xl:rounded-tr-none xl:rounded-l'>
                <div className='animate-pulse rounded-sm w-full bg-slate-300 dark:bg-zinc-800 h-full flex items-center justify-center text-slate-100 dark:text-zinc-900'>
                    <ImageIcon />
                </div>
            </div>
            <div className='w-full p-4 flex flex-col justify-between h-40 xl:h-60'>
                <div>
                    <div className='flex flex-wrap md:w-full items-center justify-between mt-2'>
                        <span className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-1/2 h-4 rounded-full' />
                        <span className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-24 h-4 rounded-full' />
                    </div>
                    <div className='w-full flex flex-col gap-2 mt-2'>
                        <span className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-full h-6 rounded-full' />
                        <span className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-full h-6 rounded-full' />
                        <span className='animate-pulse w-1/2 bg-slate-300 dark:bg-zinc-800 h-6 rounded-full' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsReelSkeleton;
