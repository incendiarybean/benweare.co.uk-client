import type { CardProps, Loading, NewsArticle } from '@common/types';
import { ErrorComponent, ImageLoader } from '@components';
import { OpenLink, RightCornerArrow } from '@icons';
import { prefetchArticleImages, sleep } from '@common/utils';
import { useEffect, useState } from 'react';

import CardSkeleton from './card-skeleton';

const Card = ({ endpoint, siteName }: CardProps) => {
    const [article, setArticle] = useState<NewsArticle>();
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<Loading>(false);

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
        <div data-cy='card-component' className='article animate-fade-in'>
            {loaded === true && article && (
                <div className='rounded-lg w-full flex flex-col xl:flex-row default-border default-bg shadow overflow-hidden'>
                    {isVideo ? (
                        <div className='w-full'>
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${
                                    article.img.split('/')[
                                        article.img.split('/').length - 1
                                    ]
                                }`}
                                allow='autoplay; encrypted-media;'
                                allowFullScreen
                                title={`embedded YouTube video provided by ${siteName}`}
                                className='animate-fade-in rounded-t-lg xl:rounded-l-lg object-cover w-full xl:min-w-sm h-full max-w-full'
                            />
                        </div>
                    ) : (
                        <a
                            className='w-full rounded-t-lg xl:rounded-r-none xl:rounded-l-lg'
                            href={article.img}
                            aria-label={`Open ${siteName} Image`}
                        >
                            <ImageLoader
                                img={article.imgElement}
                                alt={`${siteName} Image`}
                                className='saturate-100 brightness-110 hover:brightness-125 animate-fade-in object-cover w-full xl:min-w-sm h-full max-w-full'
                                loaderClassName='w-full xl:min-w-sm h-full max-w-full'
                            />
                        </a>
                    )}
                    <div className='shadow-inner p-10 flex flex-col justify-between min-h-full'>
                        <div>
                            <div className='flex flex-wrap md:w-full items-center justify-between text-base text-blue-600 dark:text-sky-500'>
                                <h2 className='sitename'>
                                    <RightCornerArrow />
                                    {siteName}
                                </h2>
                                <span>
                                    {new Date(article.date).toLocaleDateString(
                                        'en-UK'
                                    )}
                                </span>
                            </div>
                            <div className='mt-4'>
                                <h1 className='heading'>{article.title}</h1>
                                <p className='text-justify mt-2 rounded-lg text-wrap font-thin'>
                                    {article.description}
                                </p>
                            </div>
                        </div>
                        {isVideo ? (
                            <a
                                className='link mt-4 flex items-center gap-2'
                                href={article.url}
                                rel='noreferrer'
                                target='_blank'
                            >
                                Watch on Youtube <OpenLink />
                            </a>
                        ) : (
                            <a className='link mt-4 flex items-center gap-1 text-normal'>
                                See the whole image <OpenLink />
                            </a>
                        )}
                    </div>
                </div>
            )}
            {loaded === false && <CardSkeleton />}
        </div>
    );
};

export default Card;
