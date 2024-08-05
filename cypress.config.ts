import { version } from './package.json';

export default {
    e2e: {},
    video: true,
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
    env: {
        VITE_APP_VERSION: version,
    },
};
