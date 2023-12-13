/* TYPES FOR CLIENT */
export type NewsArticle = {
    id: number;
    title: string;
    url: string;
    description?: string;
    img: string;
    date: string;
};

export type CardProps = {
    /** The website that the articles are fetched from. */
    SiteName: string;

    /** The endpoint to fetch articles from. */
    Endpoint: string;
};

export type ErrorComponentProps = {
    feedName: string;
};

export type ArrowComponentProps = {
    display: boolean;
};
