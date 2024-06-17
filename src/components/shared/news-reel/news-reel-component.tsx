import type { CardProps, Loading, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { createRef, useEffect, useState } from 'react';

import { ErrorComponent } from '@components';
import NewsReelImageLoader from './news-reel-image-loader';
import NewsReelNavigator from './news-reel-navigator';
import NewsReelSkeleton from './news-reel-skeleton';
import { RightCornerArrow } from '@icons';
import { SwipeHandler } from '@common/hooks/swipeHandler';

const NewsCarousel = ({ endpoint, siteName }: CardProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loaded, setLoaded] = useState<Loading>(false);

    const handleRotation = (index: number) => {
        if (index === articles.length) {
            return setCurrentPage(0);
        }
        if (index < 0) {
            return setCurrentPage(articles.length - 1);
        }
        setCurrentPage(index);
    };

    const swipeAction = (direction: boolean) => {
        if (direction) {
            return handleRotation(currentPage + 1);
        }
        return handleRotation(currentPage - 1);
    };

    const preloadImages = (data: NewsArticle[]): NewsArticle[] =>
        data.map((article) => {
            const img = new Image();
            img.src = article.img;
            article.imgElement = img;
            return article;
        });

    useEffect(() => {
        const getNews = async () => {
            fetch(endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    const slicedArticles = response.items.slice(0, 30);
                    const preloadedArticles = preloadImages(slicedArticles);
                    setArticles(preloadedArticles);
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
            id={`${siteName}-news`}
            className='px-1 md:px-6 my-2 w-auto'
        >
            <div className='animate-fadeIn flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                {loaded === true && articles && (
                    <div className='relative w-full border lg:border-none border-slate-300 dark:border-zinc-600/20 rounded shadow lg:shadow-none'>
                        <a
                            href={articles[currentPage].url}
                            rel='noreferrer'
                            target='_blank'
                            className='relative flex w-full rounded-t lg:rounded lg:shadow lg:hover:shadow-md flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 lg:border border-slate-300 dark:border-zinc-600/30'
                        >
                            <NewsReelImageLoader
                                article={articles[currentPage]}
                                siteName={siteName}
                            />
                            <div className='w-full p-4 flex flex-col justify-between text-left h-36 md:h-40 xl:h-60 overflow-hidden'>
                                <div>
                                    <div className='flex flex-wrap md:w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500'>
                                        <h2 className='min-w-fit -mx-1 flex items-center font-bold uppercase'>
                                            <RightCornerArrow />
                                            {siteName}
                                        </h2>
                                        <span>
                                            {new Date(
                                                articles[currentPage].date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <p className='text-lg xl:text-xl font-bold leading-normal line-clamp-3 xl:line-clamp-none'>
                                        {articles[currentPage].title}
                                    </p>
                                </div>
                            </div>
                            <hr className='lg:hidden border-zinc-200 dark:border-zinc-800 w-2/3 self-center' />
                        </a>
                        <NewsReelNavigator
                            {...{ handleRotation, currentPage, articles }}
                        />
                    </div>
                )}
                {loaded === false && <NewsReelSkeleton />}
            </div>
        </div>
    );
};

export default NewsCarousel;
