import { ArrowComponent, ErrorComponent, Loader } from '@components';
import type { FeedProps, Loading, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { RightCornerArrow } from '@icons';

const NewsList = ({ endpoint }: FeedProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loaded, setLoaded] = useState<Loading>(false);

    type SortType = 'ASC' | 'DESC';
    const [sort, setSort] = useState<SortType>('DESC');

    useEffect(() => {
        const getNews = async () => {
            fetch(endpoint + `?sort=${sort}`)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticles(response);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getNews);
                });
        };

        IO.on('RELOAD_NEWS', () => getNews());

        getNews();
    }, [endpoint, sort]);

    return (
        <div id='all-news' className='px-1 md:px-6 mt-3 my-2 w-auto'>
            <div
                className='my-2 w-auto'
            >
                <div className='animate__animated animate__fadeIn animate__faster flex w-full p-4 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
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
            </div>
            {loaded && articles && (
                <div
                    className='my-4 w-auto'
                >
                    <div className='animate__animated animate__fadeIn animate__faster flex flex-col w-full p-4 border border-slate-300 dark:border-zinc-600/20 rounded md:shadow-inner gap-2'>

                        {articles.map((data) => (
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
                        ))}
                    </div>
                </div>
            )}
            {loaded === 'Failed' && <ErrorComponent feedName='All News Feed' />}
            {loaded === false && <Loader />}
            <div className='my-4 animate__animated animate__fadeIn animate__faster flex flex-col w-full items-center justify-center p-4 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                <NavLink to='/dashboard'
                    className='flex items-center mt-1 default-link'
                    aria-label='News Stream Page'>

                    <RightCornerArrow />

                    <p>Back to Dashboard</p>
                </NavLink>
            </div >
        </div>
    );
};

export default NewsList;
