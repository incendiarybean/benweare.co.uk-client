import { ArrowComponent, ErrorComponent, ImageLoader } from '@components';
import { CircleCheck, CircleCross, ImageIcon, RightCornerArrow } from '@icons';
import { IO, prefetchArticleImages, sleep } from '@common/utils';
import type { ListProps, Loading, NewsArticle } from '@common/types';
import { useEffect, useState } from 'react';

import NewsListSkeleton from './news-list-skeleton';

const NewsList = ({
    endpoint,
    siteName,
    limit,
    expanded,
    filterable,
}: ListProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
    const [outlets, setOutlets] = useState<{
        [key: string]: { enabled: boolean };
    }>();
    const [loaded, setLoaded] = useState<Loading>(false);
    const [lastUpdated, setLastUpdated] = useState<Date>();

    type SortType = 'ASC' | 'DESC';
    const [sort, setSort] = useState<SortType>('DESC');

    const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

    useEffect(() => {
        const getOutlets = (articles: NewsArticle[]) => {
            const outletList = articles.map(({ name }) => name);
            const outlets = [...new Set(outletList)];
            setOutlets(
                outlets.reduce((a, v) => ({ ...a, [v]: { enabled: true } }), {})
            );
        };

        const getNews = async () => {
            fetch(endpoint + `?sort=${sort}`)
                .then((data) => data.json())
                .then(async ({ response }) => {
                    const splitArticles = response.items.slice(
                        0,
                        limit ?? response.items.length
                    );
                    setArticles(splitArticles);

                    if (expanded) {
                        await prefetchArticleImages(splitArticles);
                    }

                    setFilteredArticles(splitArticles);
                    if (!outlets) {
                        getOutlets(splitArticles);
                    }
                    setLoaded(true);
                    setLastUpdated(new Date());
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getNews);
                });
        };

        IO.on('RELOAD_NEWS', () => getNews());

        getNews();
    }, [endpoint, siteName, sort]);

    useEffect(() => {
        const configureFilters = (articles: NewsArticle[]) => {
            setFilteredArticles(
                articles.filter(({ name }) => outlets?.[name].enabled)
            );
        };
        configureFilters(articles);
    }, [outlets]);
    if (loaded === 'Failed') {
        return <ErrorComponent feedName={siteName ?? 'News-List'} />;
    }

    return (
        <div data-cy={`${siteName ?? 'all'}-news`}>
            {filterable && (
                <div className='p-4 flex flex-col max-w-screen sticky top-0 z-40 w-full backdrop-blur-xl  flex-none bg-white/60 dark:bg-zinc-900/60 border-b border-sky-500/20 dark:border-sky-400/20'>
                    <div className='mb-4 animate-fade-in flex flex-col w-full p-2 default-border rounded-lg shadow-inner'>
                        <span className='text-sm text-sky-600 dark:text-sky-500 rounded-lg text-center'>
                            Last Updated:{' '}
                            {lastUpdated?.toLocaleTimeString('EN-UK')}
                        </span>
                    </div>
                    <div
                        data-cy={`${siteName ?? 'all'}-news-filters`}
                        className='animate-fade-in flex flex-col w-full p-2 default-border rounded-lg shadow-inner'
                    >
                        <div className='px-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between'>
                            <button
                                type='button'
                                onClick={() => setFiltersOpen(!filtersOpen)}
                                className='link flex items-center'
                            >
                                Filters
                                <ArrowComponent upwardFacing={filtersOpen} />
                            </button>
                        </div>
                        <div
                            data-cy={`${siteName ?? 'all'}-news-outlet-filters`}
                            className='w-full sm:w-auto rounded-lg flex flex-col gap-2 default-bg p-4'
                            hidden={!filtersOpen}
                        >
                            <div className='default-border rounded-lg p-2 shadow-inner'>
                                Outlet Selection:
                                {outlets &&
                                    Object.keys(outlets).map(
                                        (value: string) => (
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    setOutlets({
                                                        ...outlets,
                                                        [value]: {
                                                            enabled:
                                                                !outlets[value]
                                                                    .enabled,
                                                        },
                                                    })
                                                }
                                                className={`ml-2 flex gap-1 text-base ${
                                                    outlets[value].enabled
                                                        ? 'text-green-600 hover:text-red-600'
                                                        : 'text-red-500 hover:text-green-700'
                                                }  items-center`}
                                                key={value}
                                                aria-label={`${
                                                    outlets[value].enabled
                                                        ? 'Exclude'
                                                        : 'Include'
                                                } News outlet: ${value} in the list.`}
                                            >
                                                <span>
                                                    {outlets[value].enabled ? (
                                                        <CircleCheck />
                                                    ) : (
                                                        <CircleCross />
                                                    )}
                                                </span>
                                                <span>
                                                    {value.replaceAll('_', ' ')}
                                                </span>
                                            </button>
                                        )
                                    )}
                            </div>
                            <div className='default-border rounded-lg p-2 shadow-inner'>
                                <label htmlFor='sort-button'>
                                    Sort Direction:
                                </label>
                                <button
                                    id='sort-button'
                                    type='button'
                                    aria-label={`Change the sorting of news to ${
                                        sort === 'ASC'
                                            ? 'descending'
                                            : 'ascending'
                                    } in date order (newest first)`}
                                    onClick={() =>
                                        setSort(sort === 'ASC' ? 'DESC' : 'ASC')
                                    }
                                    className='ml-2 link flex items-center'
                                >
                                    Sort {sort}
                                    <ArrowComponent
                                        upwardFacing={sort === 'ASC'}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loaded === false && <NewsListSkeleton expanded={expanded} />}
            {loaded === true && !expanded && (
                <div className='animate-fade-in text-left flex flex-col w-full justify-center h-80 default-border rounded-lg relative shadow-inner'>
                    <h2 className='uppercase absolute top-0 left-0 px-2 ml-2 -mt-2 text-sm bg-white/40 dark:bg-zinc-900 backdrop-blur-md rounded-lg'>
                        {siteName}
                    </h2>
                    <div className='overflow-auto'>
                        <div
                            data-cy={`${siteName ?? 'all'}-news-items`}
                            className={`my-3 flex flex-col gap-2 ml-4`}
                        >
                            {filteredArticles.map(({ id, url, title }) => (
                                <a
                                    key={`${url}-${id}`}
                                    href={url}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='text-base link flex items-center'
                                >
                                    <span>
                                        <RightCornerArrow />
                                    </span>
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {loaded === true && expanded && (
                <div className='animate-fade-in text-left flex flex-col w-full justify-center px-10 h-auto relative'>
                    <h2 className='uppercase absolute top-0 left-0 px-2 ml-2 -mt-2 text-sm default-bg rounded-lg z-10'>
                        {siteName}
                    </h2>
                    <div className='overflow-auto'>
                        <div
                            data-cy={`${siteName ?? 'all'}-news-items`}
                            className={`my-3 flex flex-col gap-4`}
                        >
                            {filteredArticles.map(
                                ({
                                    date,
                                    id,
                                    url,
                                    title,
                                    img,
                                    imgElement,
                                    name,
                                }) => (
                                    <a
                                        key={`${url}-${id}`}
                                        href={url}
                                        rel='noreferrer'
                                        target='_blank'
                                        className='text-base default-bg hover default-border flex flex-col items-start rounded-lg p-4 shadow-inner'
                                    >
                                        <div className='flex gap-4 w-full'>
                                            {img && imgElement ? (
                                                <ImageLoader
                                                    img={imgElement}
                                                    className='h-24 w-24 rounded-lg object-cover'
                                                    loaderClassName='h-24 w-24 rounded-lg'
                                                />
                                            ) : (
                                                <div className='h-24 w-24 default-border rounded-lg flex justify-center items-center'>
                                                    <ImageIcon />
                                                </div>
                                            )}
                                            <div className='flex flex-1 flex-col'>
                                                <div className='flex flex-wrap w-full items-center justify-between text-sm text-blue-600 dark:text-sky-500'>
                                                    <h2 className='min-w-fit flex items-center  uppercase'>
                                                        <RightCornerArrow />
                                                        {name.replaceAll(
                                                            '_',
                                                            ' '
                                                        )}
                                                    </h2>
                                                    <span>
                                                        {new Date(
                                                            date
                                                        ).toLocaleString(
                                                            'EN-UK'
                                                        )}
                                                    </span>
                                                </div>
                                                <h1 className='text-base mx-1'>
                                                    {title}
                                                </h1>
                                            </div>
                                        </div>
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsList;
