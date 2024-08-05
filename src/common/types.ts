export type NewsArticle = {
    /* Article ID - https://benweare.co.uk/api/news/articles/{id} */
    id: number;

    /* Article title */
    title: string;

    /* Link to Article */
    url: string;

    /* Article description */
    description?: string;

    /* Article image source */
    img: string;

    /* Article image as an element */
    imgElement?: HTMLImageElement;

    /* Article published date */
    date: string;

    /* Article's site name  */
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
