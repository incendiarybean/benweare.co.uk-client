import {
    LeftArrow,
    LeftCircleArrow,
    LeftDoubleArrow,
    RightArrow,
    RightCircleArrow,
    RightDoubleArrow,
} from '@icons';

import type { NewsArticle } from '@common/types';

const NewsReelNavigator = ({
    handleRotation,
    currentPage,
    articles,
}: {
    /** The state function that sets the current article number */
    handleRotation: React.Dispatch<number>;
    /** The current article number */
    currentPage: number;
    /** The articles to calculate the number of pips required on the navigator */
    articles: NewsArticle[];
}) => {
    console.log(articles.length)
    return (
        <div className='w-full lg:mt-2 flex justify-center'>
            <div className='hidden bg-white dark:bg-zinc-900 rounded-b lg:rounded md:flex gap-2 md:gap-0 w-full lg:w-2/3 p-3 justify-between h-12 items-center lg:shadow lg:border border-slate-300 dark:border-zinc-600/30'>
                {articles.length >= 30 &&
                    <button
                        aria-label={`Return to the first Article`}
                        className='w-full carousel-button'
                        onClick={() => handleRotation(0)}
                    >
                        <LeftDoubleArrow />
                    </button>
                }

                <button
                    aria-label={`Return to previous Article (Article ${currentPage - 1})`}
                    className='w-full carousel-button ml-2'
                    onClick={() => handleRotation(currentPage - 1)}
                >
                    <LeftArrow />
                </button>

                <div className='w-full flex justify-around'>
                    {articles.length < 30 && articles.map((data, index) => (
                        <button
                            aria-label={`Move to a selected Article (Article ${index + 1})`}
                            key={`${data.url}-${data.id}-navigator`}
                            onClick={() => handleRotation(index)}
                            className={`carousel-pip ${index === currentPage ? 'active' : 'inactive'}`}
                        />
                    ))}
                    {articles.length >= 30 &&
                        <>
                            {articles.map((data, index) => (
                                (index < currentPage + 5 && index !== articles.length - 1) &&
                                <button
                                    hidden={index < currentPage - 5}
                                    aria-label={`Move to a selected Article (Article ${index + 1})`}
                                    key={`${data.url}-${data.id}-navigator`}
                                    onClick={() => handleRotation(index)}
                                    className={`${index === currentPage ? 'text-sky-400' : 'text-zinc-400'} hover:text-sky-500 dark:hover:text-sky-400`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            {currentPage + 6 <= articles.length &&
                                <span>...</span>
                            }
                            <button
                                aria-label={`Move to a selected Article (Article ${articles.length - 1})`}
                                key={`${articles[articles.length - 1].url}-${articles[articles.length - 1].id}-navigator`}
                                onClick={() => handleRotation(articles.length - 1)}
                                className={`${articles.length - 1 === currentPage ? 'text-sky-400' : 'text-zinc-400'} hover:text-sky-500 dark:hover:text-sky-400`}
                            >
                                {articles.length}
                            </button>

                        </>
                    }
                </div>

                <button
                    aria-label={`Move to next Article (Article ${currentPage + 1})`}
                    className='w-full carousel-button mr-2'
                    onClick={() => handleRotation(currentPage + 1)}
                >
                    <RightArrow />
                </button>

                {articles.length >= 30 &&
                    <button
                        aria-label={`Move to the last Article`}
                        className='w-full carousel-button'
                        onClick={() => handleRotation(articles.length - 1)}
                    >
                        <RightDoubleArrow />
                    </button>
                }
            </div>
            <div className='md:hidden bg-white dark:bg-zinc-900 rounded-b flex w-full p-3 justify-between h-12 items-center'>
                <button
                    aria-label={`Return to previous Article (Article ${currentPage - 1})`}
                    className='md:hidden default-link w-auto min-w-fit flex justify-start items-center gap-1'
                    onClick={() => handleRotation(currentPage - 1)}
                >
                    <LeftCircleArrow /> Previous
                </button>

                <button
                    aria-label={`Move to next Article (Article ${currentPage + 1})`}
                    className='md:hidden default-link w-auto min-w-fit flex justify-end items-center gap-1'
                    onClick={() => handleRotation(currentPage + 1)}
                >
                    Next <RightCircleArrow />
                </button>
            </div>
        </div>
    );
};

export default NewsReelNavigator;
