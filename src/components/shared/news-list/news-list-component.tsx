import { ArrowComponent, ErrorComponent } from '@components';
import { CircleCheck, CircleCross, RightCornerArrow } from '@icons';
import { IO, sleep } from '@common/utils';
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
                .then(({ response }) => {
                    const splitArticles = response.items.slice(
                        0,
                        limit ?? response.items.length
                    );
                    setArticles(splitArticles);
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
        <div
            data-cy={`${siteName ?? 'all'}-news`}
            className='px-1 md:px-6 mt-3 my-2 w-auto'
        >
            {filterable && (
                <div className='mb-4'>
                    <div className='mb-4 animate-fadeIn flex flex-col w-full p-2 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                        <span className='text-xs text-sky-500 dark:text-sky-500 rounded text-center'>
                            Last Updated:{' '}
                            {lastUpdated?.toLocaleTimeString('EN-UK')}
                        </span>
                    </div>
                    <div
                        data-cy={`${siteName ?? 'all'}-news-filters`}
                        className='animate-fadeIn flex flex-col w-full p-2 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'
                    >
                        <div className='px-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between'>
                            <button
                                type='button'
                                onClick={() => setFiltersOpen(!filtersOpen)}
                                className='default-link flex items-center'
                            >
                                Included Outlets
                                <ArrowComponent upwardFacing={filtersOpen} />
                            </button>
                            <button
                                type='button'
                                aria-label={`Change the sorting of news to ${
                                    sort === 'ASC' ? 'descending' : 'ascending'
                                } in date order (newest first)`}
                                onClick={() =>
                                    setSort(sort === 'ASC' ? 'DESC' : 'ASC')
                                }
                                className='default-link flex items-center'
                            >
                                Sort {sort}
                                <ArrowComponent upwardFacing={sort === 'ASC'} />
                            </button>
                        </div>
                        <div
                            data-cy={`${siteName ?? 'all'}-news-outlet-filters`}
                            className='mt-2 w-full sm:w-auto border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner p-2'
                            hidden={!filtersOpen}
                        >
                            {outlets &&
                                Object.keys(outlets).map((value: string) => (
                                    <button
                                        type='button'
                                        onClick={() =>
                                            setOutlets({
                                                ...outlets,
                                                [value]: {
                                                    enabled:
                                                        !outlets[value].enabled,
                                                },
                                            })
                                        }
                                        className={`ml-1 flex gap-1 text-sm ${
                                            outlets[value].enabled
                                                ? 'text-green-500 hover:text-red-600'
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
                                ))}
                        </div>
                    </div>
                </div>
            )}
            {loaded === true && (
                <div
                    className={`animate-fadeIn text-left flex flex-col w-full justify-center md:border border-slate-300 dark:border-zinc-600/20 rounded h-64 ${
                        expanded && 'h-auto'
                    } relative`}
                >
                    <h2 className='uppercase absolute top-0 left-0 px-2 ml-2 -mt-2 text-xs bg-zinc-200 dark:bg-zinc-800 rounded z-10'>
                        {siteName}
                    </h2>
                    <div className='border md:border-none border-slate-300 dark:border-zinc-600/30 rounded overflow-auto px-2 md:px-4 shadow-inner'>
                        <div
                            data-cy={`${siteName ?? 'all'}-news-items`}
                            className={`my-3 flex flex-col ${
                                !expanded ? 'gap-2 md:gap-1' : 'gap-2'
                            }`}
                        >
                            {filteredArticles.map((data) =>
                                !expanded ? (
                                    <a
                                        key={`${data.url}-${data.id}`}
                                        href={data.url}
                                        rel='noreferrer'
                                        target='_blank'
                                        className='text-base default-link flex items-center'
                                    >
                                        <span>
                                            <RightCornerArrow />
                                        </span>
                                        {data.title}
                                    </a>
                                ) : (
                                    <a
                                        key={`${data.url}-${data.id}`}
                                        href={data.url}
                                        rel='noreferrer'
                                        target='_blank'
                                        className='text-base default-link flex flex-col items-start border border-slate-300 dark:border-zinc-600/20 rounded p-2 shadow-inner'
                                    >
                                        <div className='flex flex-wrap w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500'>
                                            <h2 className='min-w-fit flex items-center font-bold uppercase'>
                                                <RightCornerArrow />
                                                {data.name.replaceAll('_', ' ')}
                                            </h2>
                                            <span>
                                                {new Date(
                                                    data.date
                                                ).toLocaleString('EN-UK')}
                                            </span>
                                        </div>
                                        <h1 className='text-sm mx-1'>
                                            {data.title}
                                        </h1>
                                    </a>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
            {loaded === false && <NewsListSkeleton />}
        </div>
    );
};

export default NewsList;
