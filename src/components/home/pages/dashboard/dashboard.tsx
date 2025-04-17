import { Card, NewsList } from '@components';

import { useEffect } from 'react';

const DashboardPage = () => {
    useEffect(() => window.scroll(0, 0));

    return (
        <div className='p-10 flex flex-col gap-10 w-full'>
            <Card siteName='NASA' endpoint='/api/news/nasa' />
            <NewsList
                endpoint='/api/news/the_register'
                siteName='The Register'
                limit={30}
            />
            <NewsList
                endpoint='/api/news/ars_technica'
                siteName='Ars Technica'
            />
        </div>
    );
};

export default DashboardPage;
