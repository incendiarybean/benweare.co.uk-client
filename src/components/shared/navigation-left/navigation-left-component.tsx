import { NavLink } from 'react-router-dom';
import {
    Box,
    Home,
    Info,
    Newspaper,
    OpenBox,
    Packages,
} from 'src/components/shared/icons';

const LeftNavigationBar = () => {
    return (
        <div className='navigation navigation-left'>
            <div className='navigation-left-wrapper'>
                <NavLink
                    to='/dashboard'
                    className={({ isActive }) =>
                        `internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                >
                    <Home />

                    <p className='menu-item'>Dashboard</p>
                </NavLink>

                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        `internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                >
                    <Info />

                    <p className='menu-item'>About</p>
                </NavLink>

                <NavLink
                    to='/documentation'
                    className={({ isActive }) =>
                        `internal-link ${isActive ? 'active' : 'inactive'}`
                    }
                >
                    <Newspaper />

                    <p className='menu-item'>Documentation</p>
                </NavLink>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://www.npmjs.com/~incendiarybean'
                    className='external-link'
                >
                    <Packages />

                    <p className='menu-item'>Packages</p>
                </a>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://github.com/incendiarybean'
                    className='external-link'
                >
                    <OpenBox />

                    <p className='menu-item'>GitHub</p>
                </a>

                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://hub.docker.com/u/incendiarybean'
                    className='external-link'
                >
                    <Box />

                    <p className='menu-item'>Docker</p>
                </a>
            </div>
        </div>
    );
};

export default LeftNavigationBar;
