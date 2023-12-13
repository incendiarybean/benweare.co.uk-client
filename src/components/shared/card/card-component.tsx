import type { CardProps, NewsArticle } from '@common/types';
import { sleep } from '@common/utils';
import { ArrowComponent, ErrorComponent, Loader } from '@components';
import { useEffect, useState } from 'react';
import { RightCornerArrow } from 'src/components/shared/icons';

const Card = ({ Endpoint, SiteName }: CardProps) => {
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
        <div className='card'>
            <div className='animate__animated animate__fadeIn animate__faster card-container'>
                {loaded && article && (
                    <div className='wrapper'>
                        {article.url.includes('youtube') ? (
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${
                                    article.url.split('/')[
                                        article.url.split('/').length - 1
                                    ]
                                }`}
                                allow='autoplay; encrypted-media;'
                                allowFullScreen
                                title='Embedded YouTube video provided by ${SiteName}'
                                className='video-card'
                            />
                        ) : (
                            <a
                                className='w-full'
                                href={article.url}
                                aria-label={`Open ${SiteName} Image`}
                            >
                                <img
                                    alt={`${SiteName} Image`}
                                    src={article.url}
                                    className='image-card'
                                />
                            </a>
                        )}

                        <div className='content'>
                            <div className='content-inner'>
                                <div className='content-title'>
                                    <h2>
                                        <RightCornerArrow />
                                        {SiteName}
                                    </h2>
                                    <span>
                                        {new Date(
                                            article.date
                                        ).toLocaleDateString('en-UK')}
                                    </span>
                                </div>
                                <p>{article.title}</p>
                            </div>
                            <div className='flex flex-wrap justify-between items-center mb-2'>
                                <button onClick={() => setShow(!show)}>
                                    <p>Read the Article</p>
                                    <ArrowComponent display={show} />
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
                {loaded === 'Failed' && <ErrorComponent feedName={SiteName} />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default Card;
