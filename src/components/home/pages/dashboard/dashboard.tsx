import { Card, NewsList, NewsReel } from '@components';

import { NavLink } from 'react-router-dom';
import { RightCornerArrow } from '@icons';
import { useEffect } from 'react';

const DashboardPage = () => {
    useEffect(() => window.scroll(0, 0));

    return (
        <div
            data-cy='dashboard-page'
            className='select-none flex flex-col py-2'
        >
            <Card siteName='NASA' endpoint='/api/news/nasa' />
            <NewsList
                endpoint='/api/news/the_register'
                siteName='The Register'
                limit={30}
            />
            <NewsReel endpoint='/api/news/pcgamer' siteName='PCGamer' />
            <NewsReel
                endpoint='/api/news/rock_paper_shotgun'
                siteName='Rock Paper Shotgun'
            />
            <NewsList
                endpoint='/api/news/ars_technica'
                siteName='Ars Technica'
            />
            <NewsReel endpoint='/api/news/bbc' siteName='BBC' />
            <div className='px-1 md:px-6 my-2 w-auto'>
                <div className='animate-fadeIn flex flex-col w-full items-center justify-center p-4 border border-slate-300 dark:border-zinc-600/20 rounded-sm shadow-inner'>
                    <NavLink
                        to='/news-feed'
                        className='flex items-center mt-1 default-link'
                        aria-label='News Stream Page'
                    >
                        <RightCornerArrow />

                        <p>View All News</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
