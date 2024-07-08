import customViteConfig from './vite.config.ts';
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
            viteConfig: customViteConfig,
        },
    },
    env: {
        VITE_APP_VERSION: version,
    },
};
