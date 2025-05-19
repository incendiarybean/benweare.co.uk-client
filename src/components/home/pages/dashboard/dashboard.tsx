import { Card, NewsList, NewsReel } from '@components';

import { useEffect } from 'react';

const DashboardPage = () => {
    useEffect(() => window.scroll(0, 0));

    return (
        <div
            data-cy='dashboard-page'
            className='w-full overflow-auto md:max-w-7xl p-4 lg:p-10 flex flex-col gap-4 md:gap-10 max-w-full py-8 min-h-screen'
        >
            <Card siteName='NASA' endpoint='/api/news/nasa' />
            <NewsReel siteName='PCGamer' endpoint='/api/news/pcgamer' />
            <NewsList
                endpoint='/api/news/the_register'
                siteName='The Register'
                limit={30}
            />
            <NewsReel
                siteName='Rock Paper Shotgun'
                endpoint='/api/news/rock_paper_shotgun'
            />
            <NewsList
                endpoint='/api/news/ars_technica'
                siteName='Ars Technica'
            />
            <NewsReel siteName='BBC News' endpoint='/api/news/bbc' />
        </div>
    );
};

export default DashboardPage;
