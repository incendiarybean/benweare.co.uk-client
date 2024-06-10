const NewsReelSkeleton = () => {
    return (
        <div className='animate-fadeIn relative flex w-full rounded lg:shadow flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 lg:border border-slate-300 dark:border-zinc-600/30'>
            <div className='flex p-2 w-full min-w-[50%] xl:w-96 h-60 shadow rounded-t xl:rounded-tr-none xl:rounded-l'>
                <span className='rounded w-full bg-slate-300 dark:bg-zinc-800 animate-pulse h-full' />
            </div>
            <div className='w-full p-4 flex flex-col justify-between text-left h-40 xl:h-60'>
                <div>
                    <div className='flex flex-wrap md:w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500 mt-2'>
                        <div className='flex items-center w-1/2'>
                            <span className='bg-slate-300 dark:bg-zinc-800 w-full h-4 rounded-full animate-pulse' />
                        </div>
                        <div className='min-w-fit flex items-center'>
                            <span className='bg-slate-300 dark:bg-zinc-800 w-24 h-4 rounded-full animate-pulse' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-2 mt-2'>
                        <span className='bg-slate-300 dark:bg-zinc-800 w-full h-6 rounded-full animate-pulse' />
                        <span className='bg-slate-300 dark:bg-zinc-800 w-full h-6 rounded-full animate-pulse' />
                        <span className='w-1/2 bg-slate-300 dark:bg-zinc-800 h-6 rounded-full animate-pulse' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsReelSkeleton;
