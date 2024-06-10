import type { NewsArticle } from '@common/types';
import { RightCornerArrow } from '@icons';

const NewsReelCard = ({
    siteName,
    article,
}: {
    /** Name of the site */
    siteName: string;
    /** Article to display */
    article: NewsArticle;
}) => {
    return (
        <a
            key={`${article.url}-${article.id}`}
            href={article.url}
            rel='noreferrer'
            target='_blank'
            className='relative flex w-full rounded-t lg:rounded lg:shadow lg:hover:shadow-md flex-col xl:flex-row bg-slate-100 dark:bg-zinc-900 lg:border border-slate-300 dark:border-zinc-600/30'
        >
            <img
                alt={`${siteName} Image: ${article.title}`}
                src={article.imgElement?.src ?? article.img}
                className='animate-fadeIn w-full min-w-[50%] xl:w-96 h-60 object-cover shadow rounded-t xl:rounded-tr-none xl:rounded-l'
            />
            <div className='w-full p-4 flex flex-col justify-between text-left h-36 md:h-40 xl:h-60 overflow-hidden'>
                <div>
                    <div className='flex flex-wrap md:w-full items-center justify-between text-xs text-blue-600 dark:text-sky-500'>
                        <h2 className='min-w-fit -mx-1 flex items-center font-bold uppercase'>
                            <RightCornerArrow />
                            {siteName}
                        </h2>
                        <span>
                            {new Date(article.date).toLocaleDateString('en-UK')}
                        </span>
                    </div>
                    <p className='text-lg xl:text-xl font-bold leading-normal line-clamp-3 xl:line-clamp-none'>
                        {article.title}
                    </p>
                </div>
            </div>
            <hr className='lg:hidden border-zinc-200 dark:border-zinc-800 w-2/3 self-center' />
        </a>
    );
};

export default NewsReelCard;
