import { RightCornerArrow } from '@icons';

const RightNavigationBar = () => {
    return (
        <div className='flex-1 hidden lg:flex justify-start md:mx-4 min-w-[12rem]'>
            <div className='p-2 w-48 mt-28 fixed top-0'>
                <h1 className='px-2 text-xs uppercase border-b border-slate-500 dark:border-slate-100'>
                    external links
                </h1>
                <div className='ml-2 flex flex-col'>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://steamcommunity.com/id/IncendiaryBean/'
                        className='flex items-center mt-1 default-link'
                    >
                        <RightCornerArrow />
                        Steam
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://discordapp.com/users/Beanerino#0454'
                        className='flex items-center mt-1 default-link'
                    >
                        <RightCornerArrow />
                        Discord
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://www.instagram.com/ben.weare/'
                        className='flex items-center mt-1 default-link'
                    >
                        <RightCornerArrow />
                        Instagram
                    </a>
                    <a
                        target='_blank'
                        rel='noreferrer'
                        href='https://open.spotify.com/user/incendiarybean'
                        className='flex items-center mt-1 default-link'
                    >
                        <RightCornerArrow />
                        Spotify
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RightNavigationBar;
