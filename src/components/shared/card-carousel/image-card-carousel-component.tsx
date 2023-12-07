import { NewsArticle } from '@common/types';
import { RightCornerArrow } from '@icons';

const ImageCardCarouselComponent = ({
    SiteName,
    article,
}: {
    SiteName: string;
    article: NewsArticle;
}) => {
    return (
        <div className='relative xl:border border-slate-300 dark:border-zinc-600/30 w-full rounded flex-col xl:flex-row xl:shadow-md'>
            <a
                className='hover:bg-blue-400'
                href={article.url}
                aria-label={`Open the ${SiteName} article image.`}
            >
                <img
                    alt={`${SiteName} Article Image.`}
                    src={article.img}
                    className='rounded w-full h-88 xl:shadow-sm object-cover'
                />

                <div className='absolute bottom-0 bg-white dark:bg-zinc-900 w-full p-3 flex flex-col xl:rounded-b'>
                    <div className='flex md:w-full text-xs text-left items-center justify-between text-blue-600 dark:text-sky-500'>
                        <h2 className='-mx-1 flex items-center font-bold uppercase text-md'>
                            <span>
                                <RightCornerArrow />
                            </span>
                            {SiteName}
                        </h2>
                        <span className='mr-2'>
                            {new Date(article.date).toLocaleDateString('en-UK')}
                        </span>
                    </div>
                    <p className='min-h-[5rem] max-h-[5rem] text-left text-sm md:text-lg xl:text-xl font-bold leading-normal'>
                        {article.title}
                    </p>
                </div>
            </a>
        </div>
    );
};

export default ImageCardCarouselComponent;
