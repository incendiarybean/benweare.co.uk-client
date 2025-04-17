import { Card, ErrorComponent, ImageLoader } from '@components';
import type { CardProps, Loading, NewsArticle } from '@common/types';
import { IO, prefetchArticleImages, sleep } from '@common/utils';
import { OpenLink, RightCornerArrow } from '@icons';
import { createRef, useEffect, useState } from 'react';

import NewsReelNavigator from './news-reel-navigator';
import NewsReelSkeleton from './news-reel-skeleton';
import { SwipeHandler } from '@common/hooks/swipeHandler';

const NewsReel = ({ endpoint, siteName }: CardProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loaded, setLoaded] = useState<Loading>(false);

    if (!endpoint) {
        throw new Error('Endpoint is required for the News Reel component.');
    }

    /**
     * A function to move to the previous/next article in the articles list.
     * @param index - The current article index, used to find the previous/next article in the queue.
     * @returns {void} - Updates which article is currently showing.
     */
    const handleRotation = (index: number) => {
        if (index === articles.length) {
            return setCurrentPage(0);
        }
        if (index < 0) {
            return setCurrentPage(articles.length - 1);
        }
        setCurrentPage(index);
    };

    /**
     * The function that handles swipe gestures on the reel.
     * @param direction - The direction of the swipe gesture.
     * @returns {void} - Moves the reel forward/back depending on gesture.
     */
    const swipeAction = (direction: boolean) => {
        if (direction) {
            return handleRotation(currentPage + 1);
        }
        return handleRotation(currentPage - 1);
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

    const navigationElement = createRef<HTMLDivElement>();
    SwipeHandler(navigationElement, swipeAction);

    if (loaded === 'Failed') {
        return <ErrorComponent feedName={siteName} />;
    }

    return (
        <div
            ref={navigationElement}
            data-cy={`${siteName}-news`}
            className='animate-fade-in max-w-full overflow-auto default-border p-4 rounded-lg flex gap-4 snap-x min-w-xl relative'
        >
            {loaded === true &&
                articles &&
                articles.map((article) => (
                    <div
                        key={`${article.id}`}
                        className='article snap-center h-full max-h-90 rounded-lg flex flex-col default-border default-bg shadow min-h-fit'
                    >
                        <ImageLoader
                            img={article.imgElement}
                            alt={`${siteName} Image`}
                            className='saturate-100 brightness-110 hover:brightness-125 animate-fade-in object-cover'
                            loaderClassName='' //h-90 max-w-90
                        />

                        <div className='shadow-inner p-10 flex flex-col justify-between min-w-xl h-48 overflow-ellipsis'>
                            <div>
                                <div className='flex flex-wrap md:w-full justify-between text-base text-blue-600 dark:text-sky-500'>
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
                                <h1 className=''>{article.title}</h1>
                            </div>

                            <a className='link mt-4 flex items-center gap-1 text-normal'>
                                Read the article <OpenLink />
                            </a>
                        </div>
                    </div>
                ))}

            {/*  <div className='relative w-full border lg:border-none border-slate-300 dark:border-zinc-600/20 rounded-sm shadow-sm lg:shadow-none'>
                        <div
                            data-cy='article-page-pip'
                            className='tracking-wider md:hidden m-2 p-1 px-3 text-base absolute top-0 right-0 rounded-full bg-slate-100 dark:bg-zinc-900 z-20'
                        >
                            {currentPage + 1}/{articles.length}
                        </div>
                        <a
                            href={articles[currentPage].url}
                            rel='noreferrer'
                            target='_blank'
                            className='article relative flex w-full rounded-t lg:rounded-sm lg:shadow-sm lg:hover:shadow-md flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 lg:border border-slate-300 dark:border-zinc-600/30'
                        >
                            <ImageLoader
                                img={articles[currentPage].imgElement}
                                alt={`${siteName} Image: ${articles[currentPage].title}`}
                                className='animate-fade-in w-full min-w-[50%] xl:w-96 h-60 object-cover shadow-sm rounded-t xl:rounded-tr-none xl:rounded-l'
                                loaderClassName='flex p-2 w-full min-w-[50%] xl:w-96 h-60 shadow-sm rounded-t xl:rounded-tr-none xl:rounded-l'
                            />
                            <div className='w-full p-4 flex flex-col justify-between text-left h-36 md:h-40 xl:h-60 overflow-hidden'>
                                <div>
                                    <div className='flex flex-wrap md:w-full items-center justify-between text-sm text-blue-600 dark:text-sky-500'>
                                        <h2 className='sitename'>
                                            <RightCornerArrow />
                                            {siteName}
                                        </h2>
                                        <span>
                                            {new Date(
                                                articles[currentPage].date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <h1 className='title'>
                                        {articles[currentPage].title}
                                    </h1>
                                </div>
                            </div>
                            <hr className='lg:hidden border-zinc-200 dark:border-zinc-800 w-2/3 self-center' />
                        </a>
                        <NewsReelNavigator
                            {...{ handleRotation, currentPage, articles }}
                        />
                    </div>*/}

            {loaded === false && <NewsReelSkeleton />}
        </div>
    );
};

export default NewsReel;
