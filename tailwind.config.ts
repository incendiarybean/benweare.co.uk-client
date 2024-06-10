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
            },
            animation: {
                fadeIn: 'fadeIn 1s ease-in-out',
            },
        },
    },
    plugins: [],
};
