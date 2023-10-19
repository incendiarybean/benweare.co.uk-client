import { BodyProps } from 'src/common/types';
import { Card, NewsCarousel } from 'src/components/';

const DashboardPage = ({ Icon, mobileMenu }: BodyProps) => {
    return (
        <div className='select-none items-center flex flex-col w-full'>
            <Card SiteName='NASA' Endpoint={'/api/news/nasa'} />
            <NewsCarousel
                Icon={Icon}
                Endpoint={'/api/news/pcgamer'}
                SiteName='PCGamer'
                Disabled={mobileMenu}
            />
            <NewsCarousel
                Icon={Icon}
                Endpoint={'/api/news/rockpapershotgun'}
                SiteName='Rock Paper Shotgun'
                Disabled={mobileMenu}
            />
            <NewsCarousel
                Icon={Icon}
                Endpoint={'/api/news/bbc'}
                SiteName='BBC'
                Disabled={mobileMenu}
            />
        </div>
    );
};

export default DashboardPage;
