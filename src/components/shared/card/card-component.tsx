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
                <div className='animate-fade-in rounded-lg w-full flex flex-col xl:flex-row default-border default-bg shadow'>
                    {isVideo ? (
                        <div className='w-full xl:max-w-1/3 rounded-t-lg xl:rounded-r-none xl:rounded-l-lg'>
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${
                                    article.img.split('/')[
                                        article.img.split('/').length - 1
                                    ]
                                }`}
                                allow='autoplay; encrypted-media;'
                                allowFullScreen
                                title={`embedded YouTube video provided by ${siteName}`}
                                className='animate-fade-in object-cover w-full max-w-full h-full'
                            />
                        </div>
                    ) : (
                        <div
                            className='w-full xl:max-w-1/3'
                            aria-label={`Open ${siteName} Image`}
                        >
                            <ImageLoader
                                img={article.imgElement}
                                alt={`${siteName} Image`}
                                className='saturate-100 brightness-125 animate-fade-in object-cover w-full max-w-full h-full max-h-120 xl:max-h-full rounded-t-lg xl:rounded-r-none xl:rounded-l-lg'
                                loaderClassName='animate-fade-in object-cover w-full max-w-full h-full max-h-120 xl:max-h-full rounded-t-lg xl:rounded-r-none xl:rounded-l-lg'
                            />
                        </div>
                    )}
                    <div className='animate-fade-in p-4 xl:p-6 flex flex-col justify-between min-h-full w-full'>
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
                            <div>
                                <h1 className='heading'>{article.title}</h1>
                                <p className='text-justify mt-2 rounded-lg text-wrap font-thin'>
                                    {article.description}
                                </p>
                            </div>
                        </div>

                        <a
                            className='link mt-4 flex items-center gap-2'
                            href={article.url}
                            rel='noreferrer'
                            target='_blank'
                        >
                            {isVideo
                                ? 'Watch on Youtube'
                                : 'See the whole image '}
                            <OpenLink />
                        </a>
                    </div>
                </div>
            )}
            {loaded === false && <CardSkeleton />}
        </div>
    );
};

export default Card;
