import { version } from './package.json';

export default {
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    video: true,
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
    env: {
        VITE_APP_VERSION: process.env.VITE_APP_VERSION ?? version,
    },
};
