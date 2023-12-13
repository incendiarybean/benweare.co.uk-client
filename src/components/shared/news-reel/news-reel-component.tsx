import { SwipeHandler } from '@common/hooks/swipeHandler';
import type { CardProps, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { BackArrow, LeftArrow, RightArrow, RightCornerArrow } from '@icons';
import { createRef, useEffect, useState } from 'react';

const NewsCarousel = ({ Endpoint, SiteName }: CardProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean | string>(false);

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
            className='px-1 md:px-6 my-2 w-auto'
        >
            <div className='animate__animated animate__fadeIn animate__faster flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded && loaded !== 'Failed' && articles && (
                    <div className='w-full border lg:border-none border-slate-300 dark:border-zinc-600/20 rounded shadow lg:shadow-none'>
                        {articles.map(
                            (article, index) =>
                                index === currentPage && (
                                    <a
                                        key={`${article.url}-${article.id}`}
                                        href={article.url}
                                        rel='noreferrer'
                                        target='_blank'
                                        className='relative flex w-full rounded-t lg:rounded lg:shadow lg:hover:shadow-md flex-col xl:flex-row bg-white dark:bg-zinc-900 lg:border border-slate-300 dark:border-zinc-600/30'
                                    >
                                        <span className='tracking-wider text-blue-600 dark:text-sky-500 md:hidden m-2 px-3 text-sm absolute top-0 right-0 rounded-full bg-zinc-900/80'>
                                            {currentPage + 1}/{articles.length}
                                        </span>

                                        <img
                                            alt={`${SiteName} Image: ${article.title}`}
                                            src={article.img}
                                            className='w-full min-w-[50%] xl:w-96 h-60 object-cover shadow rounded-t xl:rounded-tr-none xl:rounded-l'
                                        />

                                        <div className='w-full p-4 flex flex-col justify-between text-left h-36 md:h-40 xl:h-60 overflow-hidden'>
                                            <div>
                                                <div className='flex flex-wrap md:w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500'>
                                                    <h2 className='min-w-fit -mx-1 flex items-center font-bold uppercase'>
                                                        <RightCornerArrow />
                                                        {SiteName}
                                                    </h2>
                                                    <span>
                                                        {new Date(
                                                            article.date
                                                        ).toLocaleDateString(
                                                            'en-UK'
                                                        )}
                                                    </span>
                                                </div>
                                                <p className='text-lg xl:text-xl font-bold leading-normal line-clamp-3 xl:line-clamp-none'>
                                                    {article.title}
                                                </p>
                                            </div>
                                        </div>
                                        <hr className='lg:hidden border-zinc-200 dark:border-zinc-800 w-2/3 self-center' />
                                    </a>
                                )
                        )}

                        <div className='w-full lg:mt-2 flex justify-center'>
                            <div className='bg-white dark:bg-zinc-900 rounded-b lg:rounded flex gap-3 md:gap-0 w-full lg:w-2/3 xl:w-1/2 p-4 md:p-2 justify-between h-12 items-center lg:shadow lg:border border-slate-300 dark:border-zinc-600/30'>
                                <button
                                    aria-label='Return to first Article'
                                    className='w-24 carousel-button md:hidden'
                                    onClick={() => handleRotation(0)}
                                >
                                    <BackArrow />
                                </button>

                                <button
                                    aria-label={`Return to previous Article (Article ${
                                        currentPage - 1
                                    })`}
                                    className='w-full carousel-button'
                                    onClick={() =>
                                        handleRotation(currentPage - 1)
                                    }
                                >
                                    <LeftArrow />
                                </button>

                                {articles.map((data, index) => (
                                    <button
                                        aria-label={`Move to a selected Article (Article ${
                                            index + 1
                                        })`}
                                        key={`${data.url}-${data.id}-navigator`}
                                        onClick={() => handleRotation(index)}
                                        className={`carousel-pip ${
                                            index === currentPage
                                                ? 'active'
                                                : 'inactive'
                                        }`}
                                    />
                                ))}

                                <button
                                    aria-label={`Move to next Article (Article ${
                                        currentPage + 1
                                    })`}
                                    className='w-full carousel-button'
                                    onClick={() =>
                                        handleRotation(currentPage + 1)
                                    }
                                >
                                    <RightArrow />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {loaded === 'Failed' && <ErrorComponent feedName={SiteName} />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsCarousel;
