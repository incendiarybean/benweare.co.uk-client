import { ArrowComponent, ErrorComponent, Loader } from '@components';
import { IO, sleep } from '@common/utils';
import type { ListProps, Loading, NewsArticle } from '@common/types';
import { useEffect, useState } from 'react';

import { RightCornerArrow } from '@icons';

const NewsList = ({ endpoint, siteName, limit, expanded, filterable }: ListProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loaded, setLoaded] = useState<Loading>(false);
    const [lastUpdated, setLastUpdated] = useState<Date>();

    type SortType = 'ASC' | 'DESC';
    const [sort, setSort] = useState<SortType>('DESC');

    useEffect(() => {
        const getNews = async () => {
            fetch(endpoint + `?sort=${sort}`)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticles(response.items.slice(0, limit ?? response.items.length));
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

    return (
        <div id={`${siteName ?? 'all'}-news`} className='px-1 md:px-6 mt-3 my-2 w-auto'>
            {filterable && <div className='mb-4'>
                <div className='animate__animated animate__fadeIn animate__faster flex flex-col w-full p-4 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                    <span className='text-xs text-blue-600 dark:text-sky-500'>Last Updated: {lastUpdated?.toLocaleTimeString("EN-UK")}</span>
                    <button
                        aria-label={`Change the sorting of news to ${sort === 'ASC' ? 'descending' : 'ascending'} in date order (newest first)`}
                        onClick={() => setSort(sort === 'ASC' ? 'DESC' : 'ASC')}
                        className='default-link flex items-center'
                    >
                        Sort {sort}
                        <ArrowComponent
                            container={false}
                            upwardFacing={sort === 'ASC'}
                        />
                    </button>
                </div>
            </div>}
            <div className={`animate__animated animate__fadeIn animate__faster text-left flex flex-col w-full justify-center md:border border-slate-300 dark:border-zinc-600/20 rounded h-auto ${!expanded && 'md:h-64'} relative`}>
                <h2 className='uppercase absolute top-0 left-0 px-2 ml-2 -mt-2 text-xs bg-zinc-200 dark:bg-zinc-800 rounded z-10'>
                    {siteName}
                </h2>
                <div className='border md:border-none border-slate-300 dark:border-zinc-600/30 rounded overflow-auto px-2 md:px-4 shadow-inner'>
                    {loaded && articles && (
                        <div className={`my-3 flex flex-col ${!expanded ? 'gap-2 md:gap-1' : 'gap-4'}`}>
                            {articles.map((data) => !expanded ? (
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
                                    className='text-base default-link flex flex-col items-start border border-slate-300 dark:border-zinc-600/20 rounded p-4'
                                >
                                    <div className='flex flex-wrap w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500'>
                                        <h2 className='min-w-fit flex items-center font-bold uppercase'>
                                            <RightCornerArrow />{data.name.replaceAll("_", " ")}
                                        </h2>
                                        <span>
                                            {new Date(data.date).toLocaleString("EN-UK")}
                                        </span>
                                    </div>
                                    <h1 className='text-sm mx-1'>{data.title}</h1>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                {loaded === 'Failed' && <ErrorComponent feedName={siteName ?? 'all'} />}
                {loaded === false && <Loader />}
            </div>
        </div >
    );
};

export default NewsList;
