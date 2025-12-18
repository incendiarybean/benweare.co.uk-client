import { Dashboard, Info, Packages, Share } from '@icons';
import { DestinationChild, Destinations } from '@common/types';

import { NavLink } from 'react-router';

export const GenerateDestinations = () => {
    const external = { target: '__blank', rel: 'noreferrer' };

    const destinations: Destinations = {
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
                    destination:
                        'https://steamcommunity.com/id/IncendiaryBean/',
                    ...external,
                },
                {
                    label: 'Discord',
                    destination: 'https://discordapp.com/users/Beanerino#0454',
                    ...external,
                },
            ],
        },
        'Who Am I?': {
            destination: '/',
            Icon: Info,
        },
    };

    const activeChildDestination = (children?: DestinationChild[]) =>
        children?.some(
            ({ destination }) => destination === window.location.pathname
        );

    return Object.entries(destinations).map(
        ([label, { destination, Icon, children }]) => (
            <div key={label} className='mb-3'>
                {destination ? (
                    <NavLink
                        to={destination}
                        className={({ isActive }) =>
                            `${isActive || activeChildDestination(children) ? 'text-sky-600 dark:text-sky-300' : 'text-slate-700 dark:text-zinc-400 hover:text-black  dark:hover:text-white'}  active:dark:text-sky-400 dark:hover:text-white flex gap-2 items-center `
                        }
                    >
                        <Icon /> {label}
                    </NavLink>
                ) : (
                    <span className='text-slate-700 dark:text-zinc-400 flex gap-2 items-center'>
                        <Icon /> {label}
                    </span>
                )}

                {children &&
                    children.map(({ label, destination, target, rel }) => (
                        <NavLink
                            key={label}
                            className={({ isActive }) =>
                                `${isActive ? 'text-sky-600 dark:text-sky-300 border-l-2' : 'text-slate-700 dark:text-zinc-400 hover:text-black dark:hover:text-white'} active:text-sky-700 active:dark:text-sky-400 flex gap-2 items-center ml-3 pl-5 border-l border-current hover:border-l-2`
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
};
