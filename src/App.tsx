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
        <div className='min-h-screen flex flex-col'>
            <ToastContainer />
            <NavigationBar />
            <div className='min-h-screen flex flex-row min-w-[16rem] divide-sky-300/20 divide-x'>
                <LeftNavigationBar />
                <div className='flex flex-col w-full border-slate-300 dark:border-stone-900'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default App;
