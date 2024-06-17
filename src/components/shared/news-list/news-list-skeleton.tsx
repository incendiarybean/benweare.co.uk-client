const NewsListSkeleton = () => {
    return (
        <div className='animate-fadeIn flex flex-col w-full justify-center md:border border-slate-300 dark:border-zinc-600/20 rounded h-auto md:h-64 relative'>
            <div className='absolute top-0 left-0 px-2 ml-2 -mt-2 bg-zinc-200 dark:bg-zinc-800 rounded z-10'>
                <div className='animate-pulse bg-slate-300 dark:bg-zinc-700 rounded-full w-24 h-5' />
            </div>
            <div className='border md:border-none border-slate-300 dark:border-zinc-600/30 rounded overflow-auto px-2 md:px-4 shadow-inner h-full'>
                <div className='mt-5 flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        {[...Array(9)].map((_item, index) => (
                            <div
                                className='flex gap-2'
                                key={`news-list-skeleton-item-${index}`}
                            >
                                <span className='animate-pulse bg-slate-300 dark:bg-zinc-700 rounded-full h-4 w-4'></span>
                                <span
                                    className={`animate-pulse bg-slate-300 dark:bg-zinc-700 ${index % 2 ? 'w-3/5' : 'w-4/5'} h-4 rounded-full`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsListSkeleton;
