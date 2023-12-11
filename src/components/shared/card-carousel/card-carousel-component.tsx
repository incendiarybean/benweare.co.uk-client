import { SwipeHandler } from '@common/hooks/swipeHandler';
import type { CardProps, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { RightCornerArrow } from '@icons';
import { createRef, useEffect, useState } from 'react';
import CardCarouselButtons from './card-carousel-buttons';

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
                    <div className='animate__animated animate__fadeIn animate__faster w-full border xl:border-none border-slate-300 dark:border-zinc-600/30 rounded shadow xl:shadow-none'>
                        {articles.map(
                            (article, index) =>
                                index === articlePage && (
                                    <a
                                        key={`${article.url}-${article.id}`}
                                        href={article.url}
                                        rel='noreferrer'
                                        target='_blank'
                                        className={`${
                                            index === articlePage
                                                ? 'flex'
                                                : 'hidden'
                                        } w-full rounded-t xl:rounded xl:shadow hover:shadow-md flex-col xl:flex-row bg-white dark:bg-zinc-900 xl:border border-slate-300 dark:border-zinc-600/30`}
                                    >
                                        <div className='flex-grow'>
                                            <img
                                                alt={`${SiteName} Image: ${article.title}`}
                                                src={article.img}
                                                className='w-full md:w-full xl:w-96 h-60 xl:h-60 object-cover shadow rounded-t xl:rounded-tr-none xl:rounded-l'
                                            />
                                        </div>

                                        <div className='w-full xl:w-1/2 p-3 flex flex-col justify-between text-left h-36 md:h-40 xl:h-60 overflow-auto'>
                                            <div>
                                                <div className='flex md:w-full text-xs items-center justify-between text-blue-600 dark:text-sky-500'>
                                                    <h2 className='-mx-1 flex items-center font-bold uppercase text-base'>
                                                        <span>
                                                            <RightCornerArrow />
                                                        </span>
                                                        {SiteName}
                                                    </h2>
                                                    <span className='mr-2'>
                                                        {new Date(
                                                            article.date
                                                        ).toLocaleDateString(
                                                            'en-UK'
                                                        )}
                                                    </span>
                                                </div>
                                                <p className='text-base md:text-lg xl:text-xl font-bold leading-normal flex'>
                                                    {article.title}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
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
