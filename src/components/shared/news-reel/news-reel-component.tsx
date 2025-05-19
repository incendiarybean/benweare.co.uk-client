import type { CardProps, Loading, NewsArticle } from '@common/types';
import { ErrorComponent, ImageLoader } from '@components';
import { IO, prefetchArticleImages, sleep } from '@common/utils';
import { LeftArrow, OpenLink, RightArrow, RightCornerArrow } from '@icons';
import { createRef, useEffect, useState } from 'react';

import NewsReelSkeleton from './news-reel-skeleton';

const NewsReel = ({ endpoint, siteName }: CardProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loaded, setLoaded] = useState<Loading>(false);

    const navigationElement = createRef<HTMLDivElement>();

    /**
     * A function to move to the previous/next article in the articles list.
     * @param {number} index - The current article index, used to find the previous/next article in the queue.
     * @returns {void} - Updates which article is currently showing.
     */
    const handleRotation = async (
        direction: '-' | '+' = '+'
    ): Promise<void> => {
        if (navigationElement.current) {
            let index = currentIndex;

            // Recursively find either next non-visible or previous non-visible element
            const nextElement = (elements: HTMLCollection) =>
                new Promise((resolve) =>
                    new IntersectionObserver((entries, observer) => {
                        entries.forEach((entry) => {
                            observer.disconnect();
                            return resolve(entry.intersectionRatio === 1);
                        });
                    }).observe(elements[index])
                ).then((visible) => {
                    if (!visible) {
                        elements[index].scrollIntoView({
                            block: 'nearest',
                            inline: 'center',
                            behavior: 'smooth',
                        });

                        setCurrentIndex(index);
                    } else {
                        index = direction === '+' ? index + 1 : index - 1;

                        if (index < 0) {
                            index = articles.length - 1;
                        }

                        if (index === articles.length) {
                            index = 0;
                        }

                        nextElement(elements);
                    }
                });

            nextElement(navigationElement.current.children);
        }
    };

    useEffect(() => {
        const getNews = async () => {
            fetch(endpoint)
                .then((data) => data.json())
                .then(({ response }): NewsArticle[] =>
                    response.items.slice(0, 30)
                )
                .then(
                    async (slicedArticles) =>
                        await prefetchArticleImages(slicedArticles)
                )
                .then((prefetchedArticles) => {
                    setArticles(prefetchedArticles);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getNews);
                });
        };

        IO.on('RELOAD_NEWS', () => getNews());

        getNews();
    }, [endpoint, siteName]);

    if (loaded === 'Failed') {
        return <ErrorComponent feedName={siteName} />;
    }

    return (
        <div data-cy={`${siteName}-news`} className='relative'>
            {loaded === true && (
                <div className='hidden md:flex w-full z-10 absolute justify-between h-full pointer-events-none'>
                    <div className='-ml-3 h-full flex flex-col justify-center pointer-events-auto'>
                        <button
                            type='button'
                            className='cursor-pointer scale-125 border default-border bg-white/40 dark:bg-zinc-900/10 hover:dark:border-sky-400 backdrop-blur-md rounded-lg h-24 flex items-center active:scale-120 hover:scale-130 transition-all'
                            onClick={() => handleRotation('-')}
                        >
                            <LeftArrow />
                        </button>
                    </div>
                    <div className='-mr-3 h-full flex flex-col justify-center pointer-events-auto'>
                        <button
                            type='button'
                            className='cursor-pointer scale-125 border default-border bg-white/40 dark:bg-zinc-900/10 hover:dark:border-sky-400 backdrop-blur-md rounded-lg h-24 flex items-center active:scale-120 hover:scale-130 transition-all'
                            onClick={() => handleRotation()}
                        >
                            <RightArrow />
                        </button>
                    </div>
                </div>
            )}
            <div
                ref={navigationElement}
                className='animate-fade-in max-w-full overflow-x-scroll default-border p-6 rounded-lg flex gap-4 snap-x relative max-h-130 shadow-inner'
            >
                {loaded === true &&
                    articles &&
                    articles.map((article) => (
                        <a
                            key={`${article.id}`}
                            href={article.url}
                            target='__blank'
                            rel='noreferrer'
                            data-article-id={`${article.id}`}
                            className='group article snap-center snap-proximity rounded-lg flex flex-col default-border default-bg shadow min-w-70 md:min-w-80 lg:min-w-90 w-full hover:cursor-pointer hover:scale-99 transition-all overflow-hidden'
                        >
                            <ImageLoader
                                img={article.imgElement}
                                alt={`${siteName} Image`}
                                className='group-hover:brightness-110 animate-fade-in object-cover w-full h-60 rounded-t-md'
                                loaderClassName='h-60'
                            />

                            <div className='shadow-inner p-4 flex flex-col justify-between w-full h-50'>
                                <div className='overflow-ellipsis w-full'>
                                    <div className='flex flex-wrap md:w-full justify-between text-sm md:text-base text-blue-600 dark:text-sky-500'>
                                        <h2 className='sitename'>
                                            <RightCornerArrow />
                                            {siteName}
                                        </h2>
                                        <span className='ml-4'>
                                            {new Date(
                                                article.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <h1 className='overflow-ellipsis line-clamp-5 md:line-clamp-4 text-sm md:text-base'>
                                        {article.title}
                                    </h1>
                                </div>

                                <span className='link group-hover:text-blue-700 dark:group-hover:text-sky-300 mt-4 flex items-center gap-1 text-normal'>
                                    Read the article <OpenLink />
                                </span>
                            </div>
                        </a>
                    ))}
                {loaded === false && <NewsReelSkeleton />}
            </div>
        </div>
    );
};

export default NewsReel;
