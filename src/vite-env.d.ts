/// <reference types="vite/client" />

declare const VITE_APP_VERSION: string;

interface ImportMeta {
    env: {
        VITE_APP_DOCS_URL: string;
    };
}
