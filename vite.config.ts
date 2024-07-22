import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigpaths from 'vite-tsconfig-paths';
import { version } from './package.json';

export default defineConfig({
    plugins: [
        react(),
        tsconfigpaths(),
        VitePWA({
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            workbox: {
                skipWaiting: true,
                navigateFallbackDenylist: [/.*\/api\/docs/],
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp}'],
                runtimeCaching: [
                    {
                        urlPattern: ({ url: { pathname } }) =>
                            pathname.includes('/api/news'),
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 100,
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === 'image',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 100,
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
            manifestFilename: 'manifest.json',
            manifest: {
                short_name: "Benjamin (Ben) Weare's web page",
                name: "Benjamin (Ben) Weare's web page",
                start_url: '.',
                display: 'standalone',
                theme_color: '#000000',
                background_color: '#ffffff',
                icons: [
                    {
                        src: 'favicon.png',
                        sizes: '32x32',
                        type: 'png',
                    },
                    {
                        src: 'favicon.ico',
                        sizes: '32x32',
                        type: 'image/x-icon',
                    },
                ],
            },
        }),
    ],
    server: {
        port: 3000,
        proxy: {
            '/api/': 'https://dev.benweare.co.uk',
            '/socket.io/': 'https://dev.benweare.co.uk',
        },
    },
    define: {
        VITE_APP_VERSION: JSON.stringify(version),
    },
    optimizeDeps: {
        include: ['react-dom/client', 'react-toastify'],
    },
    build: {
        outDir: './build',
        minify: 'esbuild',
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
            external: ['**/*.cy.tsx'],
        },
    },
});
