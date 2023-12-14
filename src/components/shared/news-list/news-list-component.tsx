import type { CardProps, Loading, NewsArticle } from '@common/types';
import { IO, sleep } from '@common/utils';
import { ErrorComponent, Loader } from '@components';
import { useEffect, useState } from 'react';
import { RightCornerArrow } from 'src/components/shared/icons';

const NewsList = ({ endpoint, siteName }: CardProps) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loaded, setLoaded] = useState<Loading>(false);

    useEffect(() => {
        const getNews = async () => {
            fetch(endpoint)
                .then((data) => data.json())
                .then(({ response }) => {
                    setArticles(response.items);
                    setLoaded(true);
                })
                .catch(() => {
                    setLoaded('Failed');
                    sleep(5000).then(getNews);
                });
        };

        IO.on('RELOAD_NEWS', () => getNews());

        getNews();
    }, [endpoint, siteName]);

    return (
        <div id={`${siteName}-news`} className='px-1 md:px-6 mt-3 my-2 w-auto'>
            <div className='animate__animated animate__fadeIn animate__faster text-left flex flex-col w-full justify-center md:border border-slate-300 dark:border-zinc-600/20 rounded h-auto md:h-64 relative'>
                <h2 className='uppercase absolute top-0 left-0 px-2 ml-2 -mt-2 text-xs bg-zinc-200 dark:bg-zinc-800 rounded z-10'>
                    {siteName}
                </h2>
                <div className='border md:border-none border-slate-300 dark:border-zinc-600/30 rounded overflow-auto px-2 shadow-inner'>
                    {loaded && articles && (
                        <div className='my-3 flex flex-col gap-2'>
                            {articles.map((data) => (
                                <a
                                    key={`${data.url}-${data.id}`}
                                    href={data.url}
                                    rel='noreferrer'
                                    target='_blank'
                                    className='text-base default-link flex items-center '
                                >
                                    <span>
                                        <RightCornerArrow />
                                    </span>
                                    {data.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                {loaded === 'Failed' && <ErrorComponent feedName={siteName} />}
                {loaded === false && <Loader />}
            </div>
        </div>
    );
};

export default NewsList;
