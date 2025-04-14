import { HTMLAttributeAnchorTarget } from 'react';

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

export type DestinationChild = {
    /** The name of the link - e.g Dashboard */
    label: string;
    /** The destination path - e.g. /dashboard */
    destination: string;
    /** The HTMLAttributeAnchorTarget - e.g. __blank */
    target?: HTMLAttributeAnchorTarget;
    /** Required by target __blank */
    rel?: string;
};

export type Destinations = {
    /** An object with a key indicating the label of the collection of links - e.g. Dashboard */
    [key: string]: {
        /** The JSX icon element to annotate the label. */
        Icon: () => JSX.Element;
        /** The destination path - e.g. /dashboard */
        destination?: string;
        /** Child links. */
        children?: DestinationChild[];
    };
};
