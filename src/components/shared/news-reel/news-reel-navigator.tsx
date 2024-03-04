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
                <button
                    aria-label={`Return to previous Article (Article ${currentPage - 1})`}
                    className='w-full carousel-button'
                    onClick={() => handleRotation(currentPage - 1)}
                >
                    <LeftArrow />
                </button>

                {articles.map((data, index) => (
                    index < 30 &&
                    <button
                        aria-label={`Move to a selected Article (Article ${index + 1})`}
                        key={`${data.url}-${data.id}-navigator`}
                        onClick={() => handleRotation(index)}
                        className={`carousel-pip ${index === currentPage ? 'active' : 'inactive'}`}
                    />
                ))}

                <button
                    aria-label={`Move to next Article (Article ${currentPage + 1})`}
                    className='w-full carousel-button'
                    onClick={() => handleRotation(currentPage + 1)}
                >
                    <RightArrow />
                </button>
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
