import '@common/utils/socket';
import 'react-toastify/dist/ReactToastify.css';

import { Footer, LeftNavigationBar, NavigationBar } from '@components';
import { ToastContainer, toast } from 'react-toastify';

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
            toast.dark('👋 Welcome!', {
                position: 'bottom-left',
                draggable: true,
            });
        } else {
            toast('👋 Welcome!', { position: 'bottom-left', draggable: true });
        }
    }, []);

    return (
        <div className='max-w-screen'>
            <ToastContainer />
            <NavigationBar />
            <div className='min-h-screen flex'>
                <LeftNavigationBar />
                <div className='w-full overflow-auto md:max-w-7xl border-l border-r border-zinc-300 dark:border-zinc-700/70 mt-12'>
                    <Outlet />
                    <Footer />
                </div>
                <div className='flex-1 hidden xl:flex justify-start md:mx-4 min-w-[12rem]'></div>
            </div>
        </div>
    );
};

export default App;
