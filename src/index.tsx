import './index.css';

import { DashboardPage, DocumentationPage, InformationPage, NewsFeed } from '@components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

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
                path: '/dashboard/news-stream',
                element: <NewsFeed endpoint='/api/news/articles' />
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
