import { SwipeHandler } from '@common/hooks/swipeHandler';
import type { CardProps, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { BackArrow, LeftArrow, RightArrow, RightCornerArrow } from '@icons';
import { createRef, useEffect, useState } from 'react';

const CardCarousel = ({ Endpoint, SiteName }: CardProps) => {
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
            className='card-carousel'
        >
            <div className='animate__animated animate__fadeIn animate__faster card-container'>
                {loaded && loaded !== 'Failed' && articles && (
                    <div className='wrapper'>
                        {articles.map(
                            (article, index) =>
                                index === currentPage && (
                                    <a
                                        key={`${article.url}-${article.id}`}
                                        href={article.url}
                                        rel='noreferrer'
                                        target='_blank'
                                        className='carousel-card'
                                    >
                                        <img
                                            alt={`${SiteName} Image: ${article.title}`}
                                            src={article.img}
                                            className='carousel-card-image'
                                        />

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
                                                        ).toLocaleDateString(
                                                            'en-UK'
                                                        )}
                                                    </span>
                                                </div>
                                                <p>{article.title}</p>
                                            </div>
                                        </div>
                                        <hr />
                                    </a>
                                )
                        )}

                        <div className='card-navigator'>
                            <div className='rotator'>
                                <button
                                    aria-label='Return to first Article'
                                    className='rotator-button-hidden'
                                    onClick={() => handleRotation(0)}
                                >
                                    <BackArrow />
                                </button>

                                <button
                                    aria-label={`Return to previous Article (Article ${
                                        currentPage - 1
                                    })`}
                                    className='rotator-button'
                                    onClick={() =>
                                        handleRotation(currentPage - 1)
                                    }
                                >
                                    <LeftArrow />
                                </button>

                                {articles.map((data, index) => (
                                    <button
                                        aria-label={`Move to next Article (Article ${
                                            currentPage + 1
                                        })`}
                                        key={`${data.url}-${data.id}-navigator`}
                                        onClick={() => handleRotation(index)}
                                        className={`pip ${
                                            index === currentPage
                                                ? 'pip-active'
                                                : 'pip-inactive'
                                        }`}
                                    />
                                ))}

                                <button
                                    aria-label='Next Article'
                                    className='rotator-button'
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

export default CardCarousel;
