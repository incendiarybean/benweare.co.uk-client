import { ArrowComponent, ErrorComponent, Loader } from '@components';
import type { CardProps, Loading, NewsArticle } from '@common/types';
import { useEffect, useState } from 'react';

import { RightCornerArrow } from '@icons';
import { sleep } from '@common/utils';

const Card = ({ endpoint, siteName }: CardProps) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [loaded, setLoaded] = useState<Loading>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getDetail = async () => {
            fetch(endpoint)
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
    }, [endpoint, siteName]);

    return (
        <div className='px-1 md:px-6 my-2 w-auto'>
            <div className='animate__animated animate__fadeIn animate__faster text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                {loaded === true && article && (
                    <div className='border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 shadow'>
                        {article.url.includes('youtube') ? (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${
                                    article.url.split('/')[
                                        article.url.split('/').length - 1
                                    ]
                                }`}
                                allow='autoplay; encrypted-media;'
                                allowFullScreen
                                title={`embedded YouTube video provided by ${siteName}`}
                                className='rounded-t w-full h-96 shadow'
                            />
                        ) : (
                            <a
                                className='w-full'
                                href={article.url}
                                aria-label={`Open ${siteName} Image`}
                            >
                                <img
                                    alt={`${siteName} Image`}
                                    src={article.url}
                                    className='animate__animated animate__fadeIn rounded-t w-full h-64 shadow object-cover'
                                />
                            </a>
                        )}

                        <div className='w-full p-3 flex flex-col h-auto overflow-auto'>
                            <div>
                                <div className='flex flex-wrap md:w-full items-center justify-between text-sm text-blue-600 dark:text-sky-500'>
                                    <h2 className='min-w-fit -mx-1 flex items-center font-bold uppercase'>
                                        <RightCornerArrow />
                                        {siteName}
                                    </h2>
                                    <span>
                                        {new Date(
                                            article.date
                                        ).toLocaleDateString('en-UK')}
                                    </span>
                                </div>
                                <p className='md:text-lg xl:text-xl font-bold leading-normal flex'>
                                    {article.title}
                                </p>
                            </div>
                            <div className='flex flex-wrap justify-between items-center mb-2'>
                                <button
                                    className='min-w-fit default-link flex items-center gap-1'
                                    onClick={() => setShow(!show)}
                                >
                                    <p>Read the Article</p>
                                    <ArrowComponent
                                        upwardFacing={show}
                                        container
                                    />
                                </button>
                                {article.url.includes('youtube') && (
                                    <a
                                        className='default-link'
                                        href={article.url}
                                        rel='noreferrer'
                                        target='_blank'
                                    >
                                        Watch on Youtube
                                    </a>
                                )}
                            </div>
                            {show && (
                                <p className='text-justify'>
                                    {article.description}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {loaded === 'Failed' && <ErrorComponent feedName={siteName} />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default Card;
