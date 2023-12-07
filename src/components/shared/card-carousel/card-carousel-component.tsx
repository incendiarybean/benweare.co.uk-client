import { SwipeHandler } from '@common/hooks/swipeHandler';
import type { CardProps, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { createRef, useEffect, useState } from 'react';
import CardCarouselButtons from './card-carousel-buttons';
import ImageCardCarouselComponent from './image-card-carousel-component';

const CardCarousel = ({ Endpoint, SiteName }: CardProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [articlePage, setArticlePage] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean | string>(false);

    const handleRotation = (index: number) => {
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
    };

    const swipeAction = (direction: boolean) => {
        if (direction) {
            return handleRotation(articlePage + 1);
        }
        return handleRotation(articlePage - 1);
    };

    const preloadImages = (data: NewsArticle[]) =>
        data.forEach((article) => {
            const img = new Image();
            img.src = article.img;
            setLoaded(true);
        });

    useEffect(() => {
        const getNews = async () => {
            fetch(Endpoint)
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
    }, [Endpoint, SiteName]);

    const navigationElement = createRef<HTMLDivElement>();
    SwipeHandler(navigationElement, swipeAction);

    return (
        <div
            ref={navigationElement}
            id={`${SiteName}-news`}
            className='px-1 md:px-6 my-2 w-full'
        >
            <div className='text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded && articles && (
                    <div className='animate__animated animate__fadeIn animate__faster w-full border xl:border-none border-slate-300 dark:border-zinc-600/30 rounded shadow-md xl:shadow-none'>
                        {articles.map(
                            (article, index) =>
                                index === articlePage && (
                                    <ImageCardCarouselComponent
                                        key={article.title}
                                        SiteName={SiteName}
                                        article={article}
                                    />
                                )
                        )}
                        <CardCarouselButtons
                            handleRotation={handleRotation}
                            currentPage={articlePage}
                            articles={articles}
                        />
                    </div>
                )}
                {loaded === 'Failed' && <ErrorComponent feedName={SiteName} />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default CardCarousel;
