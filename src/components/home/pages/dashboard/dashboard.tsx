import { Card, NewsCarousel } from '@components';

const DashboardPage = () => {
    return (
        <div className='select-none items-center flex flex-col w-full pb-3'>
            <Card SiteName='NASA' Endpoint={'/api/news/nasa'} />
            <NewsCarousel Endpoint={'/api/news/pcgamer'} SiteName='PCGamer' />
            <NewsCarousel
                Endpoint={'/api/news/rockpapershotgun'}
                SiteName='Rock Paper Shotgun'
            />
            <NewsCarousel Endpoint={'/api/news/bbc'} SiteName='BBC' />
        </div>
    );
};

export default DashboardPage;
