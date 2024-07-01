import { NavLink } from 'react-router-dom';
import { NewsList } from '@components';
import { RightCornerArrow } from '@icons';
import { useEffect } from 'react';

const NewsFeedPage = () => {
    useEffect(() => window.scroll(0, 0));

    return (
        <div id='news-feed' className='select-none flex flex-col'>
            <NewsList endpoint='/api/news/articles' expanded filterable />
            <div className='px-1 md:px-6 my-2 w-auto'>
                <div className='animate-fadeIn flex flex-col w-full items-center justify-center p-4 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                    <NavLink
                        to='/dashboard'
                        className='flex items-center mt-1 default-link'
                        aria-label='Dashboard Page'
                    >
                        <RightCornerArrow />

                        <p>Back to Dashboard</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NewsFeedPage;
