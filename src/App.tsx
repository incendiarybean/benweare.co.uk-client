import '@common/utils/socket';
import 'react-toastify/dist/ReactToastify.css';

import {
    Footer,
    LeftNavigationBar,
    NavigationBar,
    RightNavigationBar,
} from '@components';
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
        <div>
            <ToastContainer />
            <div className='min-h-screen flex flex-col select-none'>
                <NavigationBar />
                <div className='flex-1 flex flex-row min-w-[16rem]'>
                    <LeftNavigationBar />
                    <div className='flex flex-col w-full md:max-w-4xl px-2 md:px-0 md:border-l lg:border-r border-slate-300 dark:border-zinc-600/20'>
                        <Outlet />
                    </div>
                    <RightNavigationBar />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
