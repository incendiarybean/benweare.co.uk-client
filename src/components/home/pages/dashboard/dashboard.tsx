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
            <hr className='border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none' />
            <hr className='border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none' />
            <NewsCarousel
                Icon={Icon}
                Endpoint={'/api/news/rockpapershotgun'}
                SiteName='Rock Paper Shotgun'
                Disabled={mobileMenu}
            />
            <hr className='border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none' />
            <NewsCarousel
                Icon={Icon}
                Endpoint={'/api/news/bbc'}
                SiteName='BBC'
                Disabled={mobileMenu}
            />
            <hr className='border-b border-slate-300 dark:border-slate-600 w-2/3 self-center lg:border-none' />
        </div>
    );
};

export default DashboardPage;
