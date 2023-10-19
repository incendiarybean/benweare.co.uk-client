import { NewsArticle, NewsCard } from '@common/types';
import { sleep } from '@common/utils';
import { ArrowComponent, ErrorComponent, Icon, Loader } from '@components';
import { useEffect, useState } from 'react';

const Card = ({ Endpoint, SiteName }: NewsCard) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [loaded, setLoaded] = useState<boolean | string>(false);
    const [show, setShow] = useState<boolean>(false);

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
        <div className='px-1 md:px-6 my-3 w-full'>
            <div className='text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded'>
                {loaded === true &&
                    article &&
                    (!article.url.includes('youtube.com') ? (
                        <div className='animate__animated animate__fadeIn animate__faster border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row bg-white dark:bg-zinc-900/70 shadow-md'>
                            <a
                                className='hover:bg-blue-400 h-auto w-auto'
                                href={article.url}
                                aria-label='Open NASA Image of the Day'
                            >
                                <img
                                    alt='NASA Image of the Day'
                                    src={article.url}
                                    className='rounded-t w-full h-64 shadow-sm object-cover'
                                />
                            </a>

                            <div className='w-full p-3 flex flex-col h-auto overflow-auto'>
                                <div>
                                    <div className='flex md:w-full text-xs text-left items-center justify-between text-blue-600 dark:text-sky-500'>
                                        <h2 className='-mx-1 flex items-center font-bold uppercase text-md'>
                                            <span>
                                                <Icon.RightCornerArrow />
                                            </span>
                                            {SiteName}
                                        </h2>
                                        <span className='mr-2'>
                                            {new Date(
                                                article.date
                                            ).toLocaleDateString('en-UK')}
                                        </span>
                                    </div>
                                    <p className='text-left text-sm md:text-lg xl:text-xl font-bold leading-normal flex '>
                                        {article.title}
                                    </p>
                                </div>
                                <div className='flex mb-2'>
                                    <button
                                        className='group text-blue-500 dark:text-sky-400 hover:text-blue-700 hover:dark:text-sky-600 flex'
                                        onClick={() => setShow(!show)}
                                    >
                                        <div className='min-w-fit text-xs uppercase flex flex-row items-center'>
                                            <p>Read the Article</p>{' '}
                                            <ArrowComponent display={show} />
                                        </div>
                                    </button>
                                </div>
                                {show && (
                                    <p className=''>{article.description}</p>
                                )}
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
                                        <h2 className='text-center text-xs mt-1 mb-2 text-blue-600 dark:text-sky-400 font-bold uppercase'>
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
