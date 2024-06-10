const CardSkeleton = () => {
    return (
        <div className='animate-fadeIn border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 shadow'>
            <div className='w-full p-2'>
                <div className='animate-pulse bg-slate-300 dark:bg-zinc-800 rounded-t w-full h-60 shadow rounded' />
            </div>
            <div className='w-full p-3 flex flex-col h-auto overflow-auto'>
                <div>
                    <div className='flex flex-wrap md:w-full items-center justify-between'>
                        <span className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-1/2 h-4 rounded-full' />
                        <span className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-24 h-4 rounded-full' />
                    </div>
                    <div className='animate-pulse bg-slate-300 dark:bg-zinc-800 w-full h-6 rounded-full mt-2' />
                </div>
                <span className='animate-pulse mb-2 bg-slate-300 dark:bg-zinc-800 w-24 h-4 rounded-full mt-2' />
            </div>
        </div>
    );
};

export default CardSkeleton;
