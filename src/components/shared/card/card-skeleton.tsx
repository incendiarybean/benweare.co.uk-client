const CardSkeleton = () => {
    return (
        <div className='animate-fadeIn border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 shadow'>
            <div className='w-full p-2'>
                <div className='bg-slate-300 dark:bg-zinc-800 rounded-t w-full h-60 shadow animate-pulse rounded' />
            </div>

            <div className='w-full p-3 flex flex-col h-auto overflow-auto'>
                <div>
                    <div className='flex flex-wrap md:w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500'>
                        <div className='flex items-center w-1/2'>
                            <span className='bg-slate-300 dark:bg-zinc-800 w-full h-4 rounded-full animate-pulse' />
                        </div>
                        <div className='min-w-fit flex items-center'>
                            <span className='bg-slate-300 dark:bg-zinc-800 w-24 h-4 rounded-full animate-pulse' />
                        </div>
                    </div>
                    <div className='bg-slate-300 dark:bg-zinc-800 w-full h-6 animate-pulse rounded-full mt-2' />
                </div>
                <div className='mb-2 w-full flex'>
                    <span className='bg-slate-300 dark:bg-zinc-800 w-24 h-4 animate-pulse rounded-full mt-2' />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
