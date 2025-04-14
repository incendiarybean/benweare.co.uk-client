import { ArrowComponent, ErrorComponent, ImageLoader } from '@components';
import type { CardProps, Loading, NewsArticle } from '@common/types';
import { prefetchArticleImages, sleep } from '@common/utils';
import { useEffect, useState } from 'react';

import CardSkeleton from './card-skeleton';
import { RightCornerArrow } from '@icons';

const Card = ({ endpoint, siteName }: CardProps) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<Loading>(false);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const getDetail = async () => {
            fetch(endpoint)
                .then((data) => data.json())
                .then(({ response }): NewsArticle => response.items[0])
                .then(async (article) => {
                    // Check if the article is a youtube link
                    if (article.img.includes('youtube')) {
                        setIsVideo(true);
                    } else {
                        await prefetchArticleImages(article);
                    }
                    setArticle(article);
                })
                .then(() => setLoaded(true))
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
        <div data-cy='card-component' className='px-1 md:px-6 my-2 w-auto'>
            <div className='animate-fadeIn text-left flex flex-col w-full items-center justify-center md:p-4 md:border border-slate-300 dark:border-zinc-600/20 rounded-sm shadow-inner'>
                {loaded === true && article && (
                    <div className='border border-slate-300 dark:border-zinc-600/30 w-full rounded-sm flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 shadow-sm'>
                        {isVideo ? (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${article.img.split('/')[
                                    article.img.split('/').length - 1
                                ]
                                    }`}
                                allow='autoplay; encrypted-media;'
                                allowFullScreen
                                title={`embedded YouTube video provided by ${siteName}`}
                                className='rounded-t w-full h-96 shadow-sm'
                            />
                        ) : (
                            <a
                                className='w-full'
                                href={article.img}
                                aria-label={`Open ${siteName} Image`}
                            >
                                <ImageLoader
                                    img={article.imgElement}
                                    alt={`${siteName} Image`}
                                    className='animate-fadeIn rounded-t w-full h-64 shadow-sm object-cover'
                                    loaderClassName='w-full h-64 p-2'
                                />
                            </a>
                        )}
                        <div className='article w-full p-3 flex flex-col h-auto overflow-auto'>
                            <div>
                                <div className='flex flex-wrap md:w-full items-center justify-between text-base text-blue-600 dark:text-sky-500'>
                                    <h2 className='sitename'>
                                        <RightCornerArrow />
                                        {siteName}
                                    </h2>
                                    <span>
                                        {new Date(
                                            article.date
                                        ).toLocaleDateString('en-UK')}
                                    </span>
                                </div>
                                <h1 className='title'>
                                    {article.title}
                                </h1>
                            </div>
                            <div className='flex flex-wrap justify-between items-center mb-2'>
                                <button
                                    className='min-w-fit default-link flex items-center gap-1'
                                    onClick={() => setShow(!show)}
                                >
                                    <span>Read the Article</span>
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
