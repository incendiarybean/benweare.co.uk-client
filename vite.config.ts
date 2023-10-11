import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigpaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigpaths()],
    server: {
        port: 3000,
        proxy: {
            '/api/': 'http://localhost:8080/',
        },
    },
    build: {
        minify: 'esbuild',
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]',
            },
        },
    },
});
