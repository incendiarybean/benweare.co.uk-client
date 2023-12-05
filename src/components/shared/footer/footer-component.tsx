import { Info } from '@icons';

const FooterComponent = () => {
    return (
        <footer className='bg-white dark:bg-zinc-900/70 p-4 border-t border-sky-900/10 dark:border-sky-300/10 w-full'>
            <h2 className='text-sm underline flex items-center gap-1 mb-1 leading-relaxed w-full'>
                <Info />
                Disclaimer:
            </h2>
            <div className='px-1 text-sm w-full'>
                <p>
                    This website does not use any Cookies or tracking data;
                    though some of the links to websites provided may request
                    Cookie access.
                </p>
                <p>
                    This website is for non-commercial use, all associated
                    articles and related data is owned by the content providers;
                    I am not affiliated with any sites/content owners. All
                    content should redirect you to the appropriate sites and
                    have labels to indicate the content provider. I solely
                    collect - titles, images, dates and URLs of articles for
                    personal usage.
                </p>
            </div>
        </footer>
    );
};

export default FooterComponent;
