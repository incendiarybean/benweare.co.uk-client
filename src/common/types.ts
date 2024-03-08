/* TYPES FOR CLIENT */
export type NewsArticle = {
    id: number;
    title: string;
    url: string;
    description?: string;
    img: string;
    date: string;
    name: string;
};

export type CardProps = {
    /** The website that the articles are fetched from. */
    siteName: string;

    /** The endpoint to fetch articles from. */
    endpoint: string;
};

export type FeedProps = {
    /** The endpoint to fetch articles from. */
    endpoint: string;
};

export type Loading = boolean | 'Failed';
