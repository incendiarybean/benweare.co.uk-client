import { NewsArticle } from '@common/types';
import { LeftArrow, RightArrow } from '@icons';

const CardCarouselButtons = ({
    handleRotation,
    currentPage,
    articles,
}: {
    handleRotation: React.Dispatch<number>;
    currentPage: number;
    articles: NewsArticle[];
}) => {
    return (
        <div className='w-full xl:mt-2'>
            <div className='flex justify-center'>
                <div className='bg-white dark:bg-zinc-900 rounded-b xl:rounded flex w-full xl:w-1/2 p-2 justify-between h-12 lg:h-fit items-center xl:shadow xl:border border-slate-300 dark:border-zinc-600/30'>
                    <button
                        aria-label='Previous Article'
                        className='border-slate-500 dark:border-slate-100 hover:text-sky-500 dark:hover:text-sky-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded duration-150 hover:scale-105 active:scale-95'
                        onClick={() => handleRotation(currentPage - 1)}
                    >
                        <LeftArrow />
                    </button>

                    {articles.map((data, index) => (
                        <button
                            aria-label={`Article ${index}`}
                            key={`${data.url}-${data.id}-navigator`}
                            onClick={() => handleRotation(index)}
                            className={`transition-all self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded xl:p-1 ${
                                index === currentPage
                                    ? 'bg-sky-400 w-3 h-3'
                                    : 'bg-zinc-400 w-2 h-2'
                            } shadow`}
                        />
                    ))}

                    <button
                        aria-label='Next Article'
                        className='border-slate-500 dark:border-slate-100 hover:text-sky-500 dark:hover:text-sky-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded duration-150 hover:scale-105 active:scale-95'
                        onClick={() => handleRotation(currentPage + 1)}
                    >
                        <RightArrow />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardCarouselButtons;
