import { GitHub, Newspaper, Npm } from 'src/components/shared/icons';

const DesktopNav = () => {
    return (
        <div className='hidden md:flex items-center'>
            <ul className='flex gap-4 items-center'>
                <li>
                    <a
                        className='icon-link'
                        href='https://benweare.co.uk/api/docs'
                    >
                        <span className='sr-only'>API Documentation</span>
                        <Newspaper />
                    </a>
                </li>
                <li>
                    <a
                        className='icon-link'
                        href='https://www.npmjs.com/~incendiarybean'
                    >
                        <span className='sr-only'>IncendiaryBean's NPM</span>
                        <Npm />
                    </a>
                </li>
                <li>
                    <a
                        className='icon-link'
                        href='https://github.com/incendiarybean'
                    >
                        <span className='sr-only'>IncendiaryBean's Github</span>
                        <GitHub />
                    </a>
                </li>
            </ul>
        </div>
    );
};
export default DesktopNav;
