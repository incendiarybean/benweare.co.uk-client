import { ImageLoader } from '@components';

const NewsListSkeleton = ({ expanded }: { expanded: boolean | undefined }) => {
    if (!expanded) {
        return (
            <div data-cy='news-list-skeleton' className=''>
                <div className='animate-fade-in text-left flex flex-col w-full justify-center h-80 default-border rounded-lg relative shadow-inner'>
                    <h2 className='uppercase absolute top-0 left-0 px-2 ml-2 -mt-2 text-sm bg-white/40 dark:bg-zinc-900 backdrop-blur-md rounded-lg'>
                        Loading
                    </h2>
                    <div className='border md:border-none border-slate-300 dark:border-zinc-600/30 rounded-sm overflow-auto px-2 md:px-4 shadow-inner h-full'>
                        <div className='mt-6 flex flex-col'>
                            <div className='flex flex-col gap-4 pb-4'>
                                {[...Array(9)].map((_item, index) => (
                                    <div
                                        className='flex gap-2'
                                        key={`news-list-skeleton-item-${index}`}
                                    >
                                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 rounded-full h-4 w-4'></span>
                                        <span
                                            className={`animate-pulse bg-blue-100 dark:bg-sky-600/20 ${index % 2 ? 'w-3/5' : 'w-4/5'} h-4 rounded-full`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            data-cy='news-list-skeleton'
            className='animate-fade-in text-left flex flex-col w-full justify-center px-10 h-auto relative'
        >
            <div className='overflow-clip'>
                <div className={`my-4 flex flex-col gap-4`}>
                    {[...Array(9)].map((_item, index) => (
                        <span
                            key={`news-list-skeleton-item-${index}`}
                            className='text-base default-bg default-border flex flex-col items-start rounded-lg p-4 shadow-inner'
                        >
                            <div className='flex gap-4 w-full'>
                                <ImageLoader
                                    img={undefined}
                                    className='h-24 w-24 rounded-lg object-cover'
                                    loaderClassName='h-24 w-24 rounded-lg'
                                />
                                <div className='flex flex-1 flex-col gap-2'>
                                    <div className='flex flex-wrap w-full items-center justify-between text-sm text-blue-600 dark:text-sky-500'>
                                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 rounded-full h-4 w-24' />
                                        <span className='animate-pulse bg-blue-100 dark:bg-sky-600/20 rounded-full h-4 w-24' />
                                    </div>
                                    <span
                                        className={`animate-pulse bg-blue-100 dark:bg-sky-600/20 ${index % 2 ? 'w-3/5' : 'w-4/5'} h-4 rounded-full`}
                                    />
                                </div>
                            </div>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsListSkeleton;
