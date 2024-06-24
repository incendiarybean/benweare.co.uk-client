import { useEffect, useState } from 'react';

import { ArrowComponent } from '@components';
import { ImageIcon } from '@icons';
import profile_image from '@common/images/profile-256.webp';

const InformationPage = () => {
    const [showKnowledgeList, setShowKnowledgeList] = useState<boolean>(false);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    /**
     * A function to pre-load an image from the provided source.
     * @returns {void} - Simply preloads and tells the page to load the image.
     */
    const preloadImage = () => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.src = profile_image;
    };

    useEffect(() => {
        preloadImage();
        window.scroll(0, 0);
    }, []);

    return (
        <div>
            <div className='animate-fadeIn flex flex-col px-2 md:px-6 my-3'>
                <div className='flex flex-col w-full bg-slate-100 dark:bg-zinc-900/70 rounded shadow p-10 mt-28'>
                    <div>
                        <div className='flex justify-center items-center mb-5'>
                            {imageLoaded ? (
                                <img
                                    className='animate-fadeIn min-w-fit w-64 h-64 -mt-32 rounded-full shadow border-8 border-white dark:border-zinc-900/60'
                                    src={profile_image}
                                    alt="Ben Weare, Benjamin Weare's mugshot"
                                    loading='eager'
                                />
                            ) : (
                                <div className='animate-pulse min-w-fit w-64 h-64 -mt-32 rounded-full shadow border-8 border-white dark:border-zinc-900/60 bg-slate-300 dark:bg-zinc-800 flex items-center justify-center text-slate-100 dark:text-zinc-900'>
                                    <ImageIcon />
                                </div>
                            )}
                        </div>
                        <div className='text-center'>
                            <h1 className='text-2xl font-semibold leading-loose'>
                                Ben Weare
                            </h1>
                            <h2 className='text-sm -mt-2 mb-2 text-sky-600 dark:text-sky-400 font-bold uppercase'>
                                Gloucestershire, England
                            </h2>
                            <hr className='mb-4 mt-2' />
                            <p className='font-light leading-relaxed'>
                                I'm an aspiring Full-Stack Software Developer. I
                                work mostly with NodeJS and Python with hosting
                                using AWS infrastructure/Heroku.
                            </p>
                        </div>
                        <button
                            className='group default-link text-sm mt-10 flex w-full'
                            onClick={() =>
                                setShowKnowledgeList(!showKnowledgeList)
                            }
                        >
                            <hr className='w-full' />
                            <div className='-mt-3 min-w-fit px-2 uppercase flex gap-1 items-center'>
                                <p>Languages &amp; Experience</p>
                                <ArrowComponent
                                    upwardFacing={showKnowledgeList}
                                />
                            </div>
                            <hr className='w-full' />
                        </button>
                    </div>
                </div>
                <div
                    hidden={!showKnowledgeList}
                    className='list-container animate-fadeIn'
                >
                    <div className='snap-start'>
                        <h3 className='heading'>Services/Environments</h3>
                        <div className='list-wrapper'>
                            <a
                                href='https://www.docker.com/'
                                className='list first-item'
                            >
                                Docker
                            </a>

                            <a
                                href='https://aws.amazon.com/'
                                className='list item'
                            >
                                AWS CLI
                            </a>

                            <a
                                href='https://www.heroku.com/'
                                className='list item'
                            >
                                HEROKU CLI
                            </a>

                            <a
                                href='https://microk8s.io/'
                                className='list item'
                            >
                                MicroK8s
                            </a>

                            <a
                                href='https://kubernetes.io/'
                                className='list item'
                            >
                                Kubernetes
                            </a>

                            <a
                                href='https://nodejs.org/en/'
                                className='list item'
                            >
                                NodeJS
                            </a>
                        </div>
                    </div>
                    <div className='snap-start'>
                        <p className='heading'>Proficient Languages</p>
                        <div className='list-wrapper'>
                            <a
                                href='https://www.typescriptlang.org/'
                                className='list first-item'
                            >
                                TYPESCRIPT/JAVASCRIPT
                            </a>

                            <a
                                href='https://www.python.org/'
                                className='list item'
                            >
                                PYTHON
                            </a>

                            <a
                                href='https://www.php.net/'
                                className='list item'
                            >
                                PHP
                            </a>
                        </div>
                    </div>
                    <div className='snap-start'>
                        <p className='heading'>Minor Language Experience</p>
                        <div className='list-wrapper'>
                            <a
                                href='https://docs.microsoft.com/en-us/cpp/?view=msvc-170'
                                className='list first-item'
                            >
                                C++
                            </a>

                            <a
                                href='https://docs.microsoft.com/en-us/dotnet/csharp/'
                                className='list item'
                            >
                                C#
                            </a>

                            <a
                                href='https://www.rust-lang.org/'
                                className='list item'
                            >
                                Rust
                            </a>
                        </div>
                    </div>
                    <div className='snap-start'>
                        <p className='heading'>Databases</p>
                        <div className='list-wrapper'>
                            <a
                                href='https://www.mysql.com/'
                                className='list first-item'
                            >
                                MySQL
                            </a>

                            <a
                                href='https://aws.amazon.com/dynamodb/'
                                className='list item'
                            >
                                DynamoDB
                            </a>

                            <a
                                href='https://www.mongodb.com/'
                                className='list item'
                            >
                                MongoDB
                            </a>
                        </div>
                    </div>
                    <div className='snap-start'>
                        <p className='heading'>JS Frameworks</p>
                        <div className='list-wrapper'>
                            <a
                                href='https://www.npmjs.com/package/express'
                                className='list first-item'
                            >
                                Express
                            </a>

                            <a
                                href='https://reactjs.org/'
                                className='list item'
                            >
                                React (Functional)
                            </a>

                            <a
                                href='https://www.npmjs.com/package/tailwindcss'
                                className='list item'
                            >
                                Tailwind
                            </a>

                            <a
                                href='https://www.npmjs.com/package/passport'
                                className='list item'
                            >
                                Passport
                            </a>

                            <p className='list item'>Plus more!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationPage;
