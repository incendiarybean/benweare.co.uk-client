import { useEffect, useState } from 'react';

import { ImageIcon } from '@icons';
import { NewsArticle } from '@common/types';

const NewsReelImageLoader = ({
    siteName,
    article,
}: {
    /** Name of the site */
    siteName: string;
    /** Article to display image from */
    article: NewsArticle;
}) => {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        // The image onLoad is being handled here as non-interactive elements should not have event handlers.
        const { imgElement } = article;
        if (!imgElement?.complete) {
            setImageLoaded(false);
        }

        if (imgElement) {
            imgElement.onload = () => setImageLoaded(true);

            if (imgElement.complete) {
                setImageLoaded(true);
            }
        }
    }, [article]);

    return (
        <>
            {imageLoaded ? (
                <img
                    alt={`${siteName} Image: ${article.title}`}
                    src={article.imgElement?.src ?? article.img}
                    className='animate-fadeIn w-full min-w-[50%] xl:w-96 h-60 object-cover shadow rounded-t xl:rounded-tr-none xl:rounded-l'
                />
            ) : (
                <div className='flex p-2 w-full min-w-[50%] xl:w-96 h-60 shadow rounded-t xl:rounded-tr-none xl:rounded-l'>
                    <div className='animate-pulse rounded w-full bg-slate-300 dark:bg-zinc-800 h-full flex items-center justify-center text-slate-100 dark:text-zinc-900'>
                        <ImageIcon />
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsReelImageLoader;
