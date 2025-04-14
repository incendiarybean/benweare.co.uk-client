import { VITE_APP_DOCS_URL } from '@common/constants';
import { useEffect } from 'react';

const DocumentationPage = () => {
    useEffect(() => window.scroll(0, 0));

    return (
        <div
            data-cy='documentation-page'
            className='select-none w-full p-4 px-6 flex flex-col flex-1'
        >
            <iframe
                className='flex-1 w-full rounded-sm'
                title='API Documentation'
                src={VITE_APP_DOCS_URL ?? '/api/docs'}
            />
        </div>
    );
};

export default DocumentationPage;
