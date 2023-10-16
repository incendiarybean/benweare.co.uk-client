import { NewsArticle, NewsCard } from '@common/types';
import { sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { useEffect, useState } from 'react';

const Card = ({ Endpoint, SiteName }: NewsCard) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [loaded, setLoaded] = useState<boolean | string>(false);

    useEffect(() => {
        const getDetail = async () => {
            fetch(Endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticle(response.items[0]);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getDetail);
                });
        };

        getDetail();
    }, [Endpoint, SiteName]);

    return (
        <div className='px-2 md:px-6 my-3 w-full'>
            <div className='text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded === true &&
                    article &&
                    (!article.url.includes('youtube.com') ? (
                        <div
                            className={`animate__animated animate__fadeIn animate__faster w-full rounded flex-col xl:flex-row bg-white dark:bg-zinc-900/70 shadow-md`}
                        >
                            <div
                                className='rounded-t w-full h-52 shadow-sm bg-cover'
                                style={{
                                    backgroundImage: `url(${article.url})`,
                                }}
                            />

                            <div className='w-full p-3 flex flex-col justify-between h-auto md:h-28 overflow-auto lg:h-auto'>
                                <h1 className='text-left text-sm xl:text-lg font-bold leading-normal'>
                                    {article.title}
                                </h1>
                                <p className='text-sm'>{article.description}</p>

                                <div className='flex mt-4'>
                                    <button
                                        onClick={() =>
                                            window.open(article.url, '_blank')
                                        }
                                        className='transition-all duration-100 text-center p-2 rounded text-white w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-md hover:from-blue-800 hover:to-blue-600'
                                    >
                                        View Full-Size
                                    </button>
                                    <div className='flex flex-col ml-4 w-1/2'>
                                        <h2 className='text-center text-xs mt-1 mb-2 text-sky-900 dark:text-sky-400 font-bold uppercase'>
                                            {SiteName} Article
                                        </h2>

                                        <span className='self-center text-xs text-sky-800 dark:text-sky-300 -mt-2'>
                                            {new Date(
                                                article.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <a
                            href={article.url}
                            rel='noreferrer'
                            target='_blank'
                            className={`animate__animated animate__fadeIn animate__faster w-full rounded flex-col xl:flex-row bg-white dark:bg-zinc-900/70 shadow-md`}
                        >
                            <div>
                                <iframe
                                    className='rounded-t w-full h-96 shadow-sm'
                                    src={`https://www.youtube.com/embed/${
                                        article.url.split('/')[
                                            article.url.split('/').length - 1
                                        ]
                                    }`}
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                    title='Embedded youtube'
                                />
                            </div>

                            <div className='w-full p-3 flex flex-col justify-between h-auto md:h-28 overflow-auto lg:h-auto'>
                                <h1 className='text-left text-sm xl:text-lg font-bold leading-normal'>
                                    {article.title}
                                </h1>
                                <p className='text-sm'>{article.description}</p>

                                <div className='flex mt-4'>
                                    <button
                                        onClick={() =>
                                            window.open(article.url, '_blank')
                                        }
                                        className='transition-all duration-100 text-center p-2 rounded text-white w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-md hover:from-blue-800 hover:to-blue-600'
                                    >
                                        View on YouTube
                                    </button>
                                    <div className='flex flex-col ml-4 w-1/2'>
                                        <h2 className='text-center text-xs mt-1 mb-2 text-sky-900 dark:text-sky-400 font-bold uppercase'>
                                            {SiteName} Article
                                        </h2>

                                        <span className='self-center text-xs text-sky-800 dark:text-sky-300 -mt-2'>
                                            {new Date(
                                                article.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                {loaded === 'Failed' && <ErrorComponent />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default Card;
