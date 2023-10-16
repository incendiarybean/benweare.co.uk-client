import { ErrorComponent, Loader } from '@components';
import { createRef, useEffect, useState } from 'react';
import { SwipeHandler } from 'src/common/hooks/swipeHandler';
import { NewsArticle, NewsCarousel } from 'src/common/types';
import { sleep } from 'src/common/utils';
import IO from 'src/common/utils/socket';

const NewsReel = ({ Icon, Endpoint, SiteName, Disabled }: NewsCarousel) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [articleChanged, setArticleChanged] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [articlePage, setArticlePage] = useState<number>(0);

    const handleRotation = (index: number) => {
        setArticleChanged(true);
        if (index === articles.length) {
            return setArticlePage(0);
        }
        if (index < 0) {
            return setArticlePage(articles.length - 1);
        }
        setArticlePage(index);
    };

    const swipeAction = (direction: any) => {
        if (direction) {
            return handleRotation(articlePage + 1);
        }
        return handleRotation(articlePage - 1);
    };

    const generateClassName = (index: number) => {
        const display = index === articlePage ? 'flex ' : 'hidden ';
        const allowClick = Disabled ? 'pointer-events-none ' : '';
        const animateFirstRenderOnly =
            index === 0 && !articleChanged
                ? 'animate__animated animate__fadeIn animate__faster '
                : '';

        return `${display}${allowClick}${animateFirstRenderOnly}`;
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
            className='px-2 md:px-6 my-3 w-full'
        >
            <div className='text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded === true && articles && (
                    <div className='w-full'>
                        {articles.map((data, index) => (
                            <a
                                key={`${data.url}-${data.id}`}
                                href={data.url}
                                rel='noreferrer'
                                target='_blank'
                                className={`${generateClassName(
                                    index
                                )}w-full rounded flex-col xl:flex-row bg-white dark:bg-zinc-900/70 shadow-md transition-all duration-100 md:hover:scale-95`}
                            >
                                <div className='flex-grow'>
                                    <div
                                        className='w-full md:w-full xl:w-96 h-64 shadow bg-cover rounded-t xl:rounded-none xl:rounded-l'
                                        style={{
                                            backgroundImage: `url(${data.img})`,
                                        }}
                                    />
                                </div>

                                <div className='w-full xl:w-1/2 p-3 flex flex-col justify-between h-40 xl:h-64 overflow-auto'>
                                    <div>
                                        <div className='flex flex-col md:w-full text-xs text-left'>
                                            <span className='text-sky-900 dark:text-sky-300'>
                                                {new Date(
                                                    data.date
                                                ).toLocaleDateString('en-UK')}
                                            </span>
                                            <h2 className='text-sky-900 dark:text-sky-400 font-bold uppercase text-md'>
                                                News Article
                                            </h2>
                                        </div>
                                        <p className='text-left text-sm md:text-lg xl:text-xl font-bold leading-normal '>
                                            {data.title}
                                        </p>
                                    </div>
                                    <p className='flex text-left text-xs md:text-sm text-sky-900 dark:text-sky-400 font-bold leading-normal items-center'>
                                        <Icon.RightCornerArrow />
                                        {SiteName}
                                    </p>
                                </div>
                            </a>
                        ))}
                        <div className='lg:px-4 w-full mt-2'>
                            <div className='flex justify-center'>
                                <div className='bg-white dark:bg-zinc-900/70 rounded shadow-md flex w-full lg:w-1/2 p-2 justify-between h-12 lg:h-fit items-center'>
                                    <button
                                        aria-label='Previous Article'
                                        className='border-slate-500 dark:border-slate-100 hover:text-sky-500 dark:hover:text-sky-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded duration-150 hover:scale-105 active:scale-95'
                                        onClick={() =>
                                            handleRotation(articlePage - 1)
                                        }
                                    >
                                        <Icon.LeftArrow />
                                    </button>
                                    {loaded &&
                                        articles.map((data, index) => (
                                            <button
                                                aria-label={`Article ${index}`}
                                                key={`${data.url}-${data.id}-navigator`}
                                                onClick={() =>
                                                    handleRotation(index)
                                                }
                                                className={`transition-all self-center duration-150 hover:scale-150 active:scale-125 ease-in-out rounded xl:p-1 ${
                                                    index === articlePage
                                                        ? 'bg-sky-400 w-3 h-3'
                                                        : 'bg-zinc-400 w-2 h-2'
                                                } shadow`}
                                            />
                                        ))}
                                    <button
                                        aria-label='Next Article'
                                        className='border-slate-500 dark:border-slate-100 hover:text-sky-500 dark:hover:text-sky-400 border hover:border-blue-500 dark:hover:border-blue-400 w-6 h-6 rounded duration-150 hover:scale-105 active:scale-95'
                                        onClick={() =>
                                            handleRotation(articlePage + 1)
                                        }
                                    >
                                        <Icon.RightArrow />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {loaded === 'Failed' && <ErrorComponent />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsReel;
