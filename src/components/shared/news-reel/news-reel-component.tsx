import { SwipeHandler } from '@common/hooks/swipeHandler';
import type { CardProps, Loading, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { createRef, useEffect, useState } from 'react';
import NewsReelCard from './news-reel-card';
import NewsReelNavigator from './news-reel-navigator';

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

    const preloadImages = (data: NewsArticle[]) =>
        data.forEach((article) => {
            const img = new Image();
            img.src = article.img;
            setLoaded(true);
        });

    useEffect(() => {
        const getNews = async () => {
            fetch(endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticles(response.items);
                    preloadImages(response.items);
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

    return (
        <div
            ref={navigationElement}
            id={`${siteName}-news`}
            className='px-1 md:px-6 my-2 w-auto'
        >
            <div className='animate__animated animate__fadeIn animate__faster flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded && loaded !== 'Failed' && articles && (
                    <div className='w-full border lg:border-none border-slate-300 dark:border-zinc-600/20 rounded shadow lg:shadow-none'>
                        {articles.map(
                            (article, index) =>
                                index === currentPage && (
                                    <NewsReelCard
                                        key={article.url}
                                        {...{
                                            siteName,
                                            article,
                                            maxArticles: articles.length,
                                            currentPage,
                                        }}
                                    />
                                )
                        )}
                        <NewsReelNavigator
                            {...{ handleRotation, currentPage, articles }}
                        />
                    </div>
                )}
                {loaded === 'Failed' && <ErrorComponent feedName={siteName} />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsCarousel;
