import { Dashboard, Info, Packages, Share } from '@icons';

import { HTMLAttributeAnchorTarget } from 'react';
import { NavLink } from 'react-router-dom';

type DestinationChild = {
    label: string;
    destination: string;
    target?: HTMLAttributeAnchorTarget;
    rel?: string;
};

type Destinations = {
    [key: string]: {
        Icon: () => JSX.Element;
        destination?: string;
        children?: DestinationChild[];
    };
};

const external = { target: '__blank', rel: 'noreferrer' };
const destinations: Destinations = {
    'Who Am I?': {
        destination: '/',
        Icon: Info,
    },
    Dashboard: {
        destination: '/dashboard',
        Icon: Dashboard,
        children: [
            { label: 'Overview', destination: '/dashboard' },
            { label: 'News Feed', destination: '/news-feed' },
            { label: 'Documentation', destination: '/documentation' },
        ],
    },
    Packages: {
        Icon: Packages,
        children: [
            {
                label: 'GitHub',
                destination: 'https://github.com/incendiarybean',
                ...external,
            },
            {
                label: 'NPM',
                destination: 'https://www.npmjs.com/~incendiarybean',
                ...external,
            },
        ],
    },
    'Other Links': {
        Icon: Share,
        children: [
            {
                label: 'Spotify',
                destination: 'https://open.spotify.com/user/incendiarybean',
                ...external,
            },
            {
                label: 'Steam',
                destination: 'https://steamcommunity.com/id/IncendiaryBean/',
                ...external,
            },
            {
                label: 'Discord',
                destination: 'https://discordapp.com/users/Beanerino#0454',
                ...external,
            },
        ],
    },
};

const activeChildDestination = (children?: DestinationChild[]) =>
    children?.some(
        ({ destination }) => destination === window.location.pathname
    );

export const GenerateDestinations = () =>
    Object.entries(destinations).map(
        ([label, { destination, Icon, children }]) => (
            <div key={label} className='mb-3'>
                {destination ? (
                    <NavLink
                        to={destination}
                        className={({ isActive }) =>
                            `${isActive || activeChildDestination(children) ? 'text-sky-600 dark:text-sky-300' : 'text-slate-500 dark:text-gray-400 hover:text-black  dark:hover:text-white'} hover:text-black  dark:hover:text-white flex gap-2 items-center `
                        }
                    >
                        <Icon /> {label}
                    </NavLink>
                ) : (
                    <span className='text-slate-500 dark:text-gray-400 flex gap-2 items-center'>
                        <Icon /> {label}
                    </span>
                )}

                {children &&
                    children.map(({ label, destination, target, rel }) => (
                        <NavLink
                            key={label}
                            className={({ isActive }) =>
                                `${isActive ? 'text-sky-600 dark:text-sky-300 border-l-2' : 'text-slate-500 dark:text-gray-400 hover:text-black  dark:hover:text-white'}  flex gap-2 items-center ml-3 pl-5 border-l border-current hover:border-l-2`
                            }
                            to={destination}
                            target={target}
                            rel={rel}
                        >
                            {label}
                        </NavLink>
                    ))}
            </div>
        )
    );
