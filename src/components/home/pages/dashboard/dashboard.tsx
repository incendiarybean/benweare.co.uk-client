import { Card, NewsCarousel, NewsList } from '@components';

const DashboardPage = () => {
    return (
        <div className='select-none flex flex-col py-2'>
            <Card siteName='NASA' endpoint='/api/news/nasa' />
            <NewsList
                endpoint='/api/news/theregister'
                siteName='The Register'
            />
            <NewsCarousel endpoint='/api/news/pcgamer' siteName='PCGamer' />
            <NewsCarousel
                endpoint='/api/news/rockpapershotgun'
                siteName='Rock Paper Shotgun'
            />
            <NewsCarousel endpoint='/api/news/bbc' siteName='BBC' />
        </div>
    );
};

export default DashboardPage;
