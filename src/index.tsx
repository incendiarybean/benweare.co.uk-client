import './index.css';

import { DashboardPage, DocumentationPage, InformationPage } from '@components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />,
            },
            {
                path: '/documentation',
                element: <DocumentationPage />,
            },
            {
                path: '/information',
                element: <InformationPage />,
            },
            {
                index: true,
                element: <InformationPage />,
            },
            {
                path: '*',
                element: <InformationPage />,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
