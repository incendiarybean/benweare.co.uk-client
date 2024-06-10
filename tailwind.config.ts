export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                width: 'width',
                height: 'height',
                bg: 'background-color',
            },
            height: {
                88: '22rem',
                120: '30rem',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 100 },
                },
                slideInLeft: {
                    '0%': {
                        transform: 'translate3d(-100%, 0, 0)',
                        visibility: 'visible',
                    },
                    '100%': { transform: 'translate3d(0, 0, 0)' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.2s ease-in-out',
                slideInLeft: 'slideInLeft 0.2s ease-in-out',
            },
        },
    },
    plugins: [],
};
