import { NewsList } from '@components';
import { useEffect } from 'react';

const NewsFeedPage = () => {
    useEffect(() => window.scroll(0, 0));

    return (
        <div data-cy='news-feed-page' className='select-none'>
            <NewsList endpoint='/api/news/articles' expanded filterable />
        </div>
    );
};

export default NewsFeedPage;
