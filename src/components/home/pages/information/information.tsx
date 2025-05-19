import { ImageIcon, OpenLink } from '@icons';
import { useEffect, useState } from 'react';

import { ArrowComponent } from '@components';
import profile_image from '@common/images/profile-256.webp';

const InformationPage = () => {
    const [showKnowledgeList, setShowKnowledgeList] = useState<boolean>(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = profile_image;

        window.scroll(0, 0);
    }, []);

    return (
        <div
            data-cy='information-page'
            className='animate-fade-in flex flex-col p-10 w-full min-h-screen'
        >
            <div className='flex items-center justify-start gap-10 w-full p-10 rounded-lg default-border default-bg flex-col lg:flex-row min-w-content'>
                <div className='flex justify-center items-center'>
                    {imageLoaded ? (
                        <img
                            className='z-10 animate-fade-in w-full h-full max-w-64 max-h-64 rounded-lg shadow-sm default-border default-bg drop-shadow-sm drop-shadow-sky-400/40'
                            src={profile_image}
                            alt="Ben Weare, Benjamin Weare's mugshot"
                            loading='eager'
                        />
                    ) : (
                        <div className='animate-pulse min-w-fit w-64 h-64 rounded-lg shadow-sm border default-border default-bg flex items-center justify-center text-sky-700 dark:text-zinc-900'>
                            <ImageIcon />
                        </div>
                    )}
                </div>
                <div className='flex-1'>
                    <div className='text-left'>
                        <h1 className='text-2xl leading-loose'>Ben Weare</h1>
                        <h2 className='text-base font-medium -mt-2 mb-2 text-blue-500 dark:text-sky-500 uppercase'>
                            Gloucestershire, England
                        </h2>
                        <hr className='mb-4 mt-2' />
                        <p className='font-normal dark:font-light leading-relaxed'>
                            I&apos;m an aspiring Full-Stack Software Developer.
                            I work mostly with NodeJS and Python with hosting
                            using AWS infrastructure/Heroku.
                        </p>
                    </div>
                    <button
                        type='button'
                        className='group link cursor-pointer text-base mt-10 flex w-full'
                        onClick={() => setShowKnowledgeList(!showKnowledgeList)}
                    >
                        <hr className='w-full lg:w-5' />
                        <div className='-mt-3 min-w-fit px-2 uppercase flex gap-1 items-center'>
                            <p>Languages &amp; Experience</p>
                            <ArrowComponent upwardFacing={showKnowledgeList} />
                        </div>
                        <hr className='w-full' />
                    </button>
                </div>
            </div>
            <div
                hidden={!showKnowledgeList}
                className='list-container snap-proximity snap-y default-border default-bg rounded-sm shadow-xl overflow-y-auto max-h-full mt-4 animate-fade-in'
            >
                <div className='snap-start'>
                    <h3 className='uppercase default-bg pl-8 p-3 text-base text-black dark:text-white border-b dark:border-slate-600 shadow-inner'>
                        Services/Environments
                    </h3>
                    <div className='w-full flex flex-col items-center overflow-hidden text-base pb-4'>
                        <a
                            href='https://www.docker.com/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 link'
                        >
                            Docker
                            <OpenLink />
                        </a>

                        <a
                            href='https://aws.amazon.com/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            AWS CLI
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.heroku.com/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            HEROKU CLI
                            <OpenLink />
                        </a>

                        <a
                            href='https://microk8s.io/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            MicroK8s
                            <OpenLink />
                        </a>

                        <a
                            href='https://kubernetes.io/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            Kubernetes
                            <OpenLink />
                        </a>

                        <a
                            href='https://nodejs.org/en/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            NodeJS
                            <OpenLink />
                        </a>
                    </div>
                </div>
                <div className='snap-start'>
                    <p className='uppercase default-bg pl-8 p-3 text-base text-black dark:text-white border-b dark:border-slate-600 shadow-inner'>
                        Proficient Languages
                    </p>
                    <div className='w-full flex flex-col items-center overflow-hidden text-base pb-4'>
                        <a
                            href='https://www.typescriptlang.org/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 link'
                        >
                            TYPESCRIPT/JAVASCRIPT
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.python.org/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            PYTHON
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.php.net/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            PHP
                            <OpenLink />
                        </a>
                    </div>
                </div>
                <div className='snap-start'>
                    <p className='flex-col uppercase default-bg pl-8 p-3 text-base text-black dark:text-white border-b dark:border-slate-600 shadow-inner'>
                        Minor Language Experience
                    </p>
                    <div className='f w-full flex flex-col items-center overflow-hidden text-base pb-4'>
                        <a
                            href='https://docs.microsoft.com/en-us/cpp/?view=msvc-170'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 link'
                        >
                            C++
                            <OpenLink />
                        </a>

                        <a
                            href='https://docs.microsoft.com/en-us/dotnet/csharp/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            C#
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.rust-lang.org/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            Rust
                            <OpenLink />
                        </a>
                    </div>
                </div>
                <div className='snap-start'>
                    <p className='uppercase default-bg pl-8 p-3 text-base text-black dark:text-white border-b dark:border-slate-600 shadow-inner'>
                        Databases
                    </p>
                    <div className='w-full flex flex-col items-center overflow-hidden text-base pb-4'>
                        <a
                            href='https://www.mysql.com/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 link'
                        >
                            MySQL
                            <OpenLink />
                        </a>

                        <a
                            href='https://aws.amazon.com/dynamodb/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            DynamoDB
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.mongodb.com/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            MongoDB
                            <OpenLink />
                        </a>
                    </div>
                </div>
                <div className='snap-start'>
                    <p className='uppercase default-bg pl-8 p-3 text-base text-black dark:text-white border-b dark:border-slate-600 shadow-inner'>
                        JS Frameworks
                    </p>
                    <div className='w-full flex flex-col items-center overflow-hidden text-base pb-4'>
                        <a
                            href='https://www.npmjs.com/package/express'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 link'
                        >
                            Express
                            <OpenLink />
                        </a>

                        <a
                            href='https://reactjs.org/'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            React (Functional)
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.npmjs.com/package/tailwindcss'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            Tailwind
                            <OpenLink />
                        </a>

                        <a
                            href='https://www.npmjs.com/package/passport'
                            className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'
                        >
                            Passport
                            <OpenLink />
                        </a>

                        <p className='flex gap-2 items-center w-full py-2 pl-10 pr-3 border-t border-gray-100 dark:border-gray-600 link'>
                            Plus more!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationPage;
