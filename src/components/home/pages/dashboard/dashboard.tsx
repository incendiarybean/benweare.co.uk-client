import { Card, CardCarousel } from '@components';

const DashboardPage = () => {
    return (
        <div className='select-none flex flex-col py-2'>
            <Card SiteName='NASA' Endpoint={'/api/news/nasa'} />
            <CardCarousel Endpoint={'/api/news/pcgamer'} SiteName='PCGamer' />
            <CardCarousel
                Endpoint={'/api/news/rockpapershotgun'}
                SiteName='Rock Paper Shotgun'
            />
            <CardCarousel Endpoint={'/api/news/bbc'} SiteName='BBC' />
        </div>
    );
};

export default DashboardPage;
