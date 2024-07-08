import { useEffect, useState } from 'react';

import { ImageIcon } from '@icons';
import type { Loading } from '@common/types';

const ImageLoader = ({
    img,
    alt,
    className,
    loaderClassName,
}: {
    /** Image element, does not require to be defined on-load. */
    img?: HTMLImageElement;
    /** Alt text for the image. */
    alt?: string;
    /** ClassName to supply the image wrapper. */
    className?: string;
    /** ClassName to supply to the loading wrapper. */
    loaderClassName?: string;
}) => {
    const [loaded, setLoaded] = useState<Loading>(false);

    useEffect(() => {
        // The image onLoad is being handled here as non-interactive elements should not have event handlers.
        if (!img?.complete) {
            setLoaded(false);
        }

        if (img) {
            img.onload = () => setLoaded(true);
            img.onerror = () => setLoaded('Failed');

            if (img.complete) {
                setLoaded(true);
            }
        }
    }, [img]);

    if (loaded === 'Failed') {
        return (
            <div className={loaderClassName}>
                <div
                    data-cy='image-loader-failed'
                    className='rounded w-full bg-slate-300 dark:bg-zinc-800 h-full flex flex-col items-center justify-center text-red-600 dark:text-red-500'
                >
                    <ImageIcon />
                    <span className='text-xs uppercase mt-2'>
                        Image failed to load
                    </span>
                </div>
            </div>
        );
    }

    return (
        <>
            {loaded ? (
                <img
                    data-cy='image-loader-loaded'
                    alt={alt}
                    src={img?.src}
                    className={className}
                />
            ) : (
                <div data-cy='image-loader-loading' className={loaderClassName}>
                    <div className='animate-pulse rounded w-full bg-slate-300 dark:bg-zinc-800 h-full flex items-center justify-center text-slate-100 dark:text-zinc-900'>
                        <ImageIcon />
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageLoader;
