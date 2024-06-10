/* TYPES FOR CLIENT */
export type NewsArticle = {
    id: number;
    title: string;
    url: string;
    description?: string;
    img: string;
    imgElement?: HTMLImageElement;
    date: string;
    name: string;
};

export type CardProps = {
    /** The website that the articles are fetched from. */
    siteName: string;

    /** The endpoint to fetch articles from. */
    endpoint: string;
};

export type ListProps = {
    /** The website that the articles are fetched from. */
    siteName?: string;

    /** The endpoint to fetch articles from. */
    endpoint: string;

    /** The limit of articles to display. */
    limit?: number;

    /** Whether to display expanded details */
    expanded?: boolean;

    /** Whether to show the filter bar */
    filterable?: boolean;
};

export type FeedProps = {
    /** The endpoint to fetch articles from. */
    endpoint: string;
};

export type Loading = boolean | 'Failed';
