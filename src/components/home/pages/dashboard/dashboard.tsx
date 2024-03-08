import { Card, NewsCarousel, NewsList } from '@components';

import { NavLink } from 'react-router-dom';
import { RightCornerArrow } from '@icons';

const DashboardPage = () => {
    return (
        <div className='select-none flex flex-col py-2'>
            <Card siteName='NASA' endpoint='/api/news/nasa' />
            <NewsList
                endpoint='/api/news/the_register'
                siteName='The Register'
            />
            <NewsCarousel endpoint='/api/news/pcgamer' siteName='PCGamer' />
            <NewsCarousel
                endpoint='/api/news/rock_paper_shotgun'
                siteName='Rock Paper Shotgun'
            />
            <NewsCarousel endpoint='/api/news/bbc' siteName='BBC' />
            <div
                className='px-1 md:px-6 my-2 w-auto'
            >
                <div className='animate__animated animate__fadeIn animate__faster flex flex-col w-full items-center justify-center p-4 border border-slate-300 dark:border-zinc-600/20 rounded shadow-inner'>
                    <NavLink to='/dashboard/news-stream'
                        className='flex items-center mt-1 default-link'
                        aria-label='News Stream Page'>

                        <RightCornerArrow />

                        <p>View All News</p>
                    </NavLink>
                </div >
            </div >
        </div >
    );
};

export default DashboardPage;
