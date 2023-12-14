import { VITE_APP_DOCS_URL } from '@common/constants';

const DocumentationPage = () => {
    return (
        <div className='select-none w-full p-4 px-6 flex flex-col flex-1'>
            <iframe
                className='flex-1 w-full rounded'
                title='API Documentation'
                src={VITE_APP_DOCS_URL ?? '/api/docs'}
            />
        </div>
    );
};

export default DocumentationPage;
