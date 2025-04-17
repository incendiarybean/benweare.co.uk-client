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
            <div className='flex divide-x divide-zinc-700/70'>
                <LeftNavigationBar />
                <div className='w-full'>
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
