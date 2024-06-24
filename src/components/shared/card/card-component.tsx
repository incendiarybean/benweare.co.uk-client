import { ArrowComponent, ErrorComponent } from '@components';
import type { CardProps, Loading, NewsArticle } from '@common/types';
import { ImageIcon, RightCornerArrow } from '@icons';
import { useEffect, useState } from 'react';

import CardSkeleton from './card-skeleton';
import { sleep } from '@common/utils';

const Card = ({ endpoint, siteName }: CardProps) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<Loading>(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    /**
     * A function to pre-load an image from the provided article.
     * @param article - The news articles to get the image from.
     * @returns {void} - Simply preloads and tells the page to load the image.
     */
    const preloadImage = (article: NewsArticle) => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = article.img;
        article.imgElement = img;
    };

    useEffect(() => {
        const getDetail = async () => {
            fetch(endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    const article = response.items[0];
                    setArticle(article);
                    if (!article.img.includes('youtube')) {
                        preloadImage(article);
                    } else {
                        setIsVideo(true);
                    }
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getDetail);
                });
        };

        getDetail();
    }, [endpoint, siteName]);

    if (loaded === 'Failed') {
        return <ErrorComponent feedName={siteName} />;
    }

    return (
        <div className='px-1 md:px-6 my-2 w-auto'>
            <div className='animate-fadeIn text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                {loaded === true && article && (
                    <div className='border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 shadow'>
                        {isVideo ? (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${
                                    article.img.split('/')[
                                        article.img.split('/').length - 1
                                    ]
                                }`}
                                allow='autoplay; encrypted-media;'
                                allowFullScreen
                                title={`embedded YouTube video provided by ${siteName}`}
                                className='rounded-t w-full h-96 shadow'
                            />
                        ) : (
                            <>
                                {imageLoaded ? (
                                    <a
                                        className='w-full'
                                        href={article.img}
                                        aria-label={`Open ${siteName} Image`}
                                    >
                                        <img
                                            alt={`${siteName} Image`}
                                            src={
                                                article.imgElement?.src ??
                                                article.img
                                            }
                                            className='animate-fadeIn rounded-t w-full h-64 shadow object-cover'
                                        />
                                    </a>
                                ) : (
                                    <div className='w-full p-2'>
                                        <div className='animate-pulse bg-slate-300 dark:bg-zinc-800 rounded-t w-full h-60 shadow rounded flex items-center justify-center text-slate-100 dark:text-zinc-900'>
                                            <ImageIcon />
                                        </div>
                                    </div>
                                )}
                            </>
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
                {loaded === false && <CardSkeleton />}
            </div>
        </div>
    );
};

export default Card;
