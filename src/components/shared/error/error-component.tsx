import type { ErrorComponentProps } from '@common/types';

const ErrorComponent = ({ err }: ErrorComponentProps) => {
    return (
        <div className='w-full h-12 flex items-center'>
            <div className='w-full px-4 mb-2 p-2 items-center flex justify-around'>
                <div className='text-white bg-red-500 dark:bg-red-500/60 rounded-full shadow-md flex justify-around p-1 px-2 items-center'>
                    <svg
                        strokeWidth='1.3'
                        height='24'
                        viewBox='0 0 21 21'
                        width='24'
                        xmlns='https://www.w3.org/2000/svg'
                    >
                        <g fill='none' fillRule='evenodd'>
                            <circle
                                cx='10.5'
                                cy='10.5'
                                r='8'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='m10.5 11.5v-5'
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <circle
                                cx='10.5'
                                cy='14.5'
                                fill='currentColor'
                                r='1'
                            />
                        </g>
                    </svg>
                    <p className='mx-1 text-sm md:text-md'>
                        ERROR: {err.feedName} component has failed to load.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ErrorComponent;
