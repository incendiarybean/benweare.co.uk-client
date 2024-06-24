import type { NewsArticle } from '@common/types';

/**
 * A function to create a timed delay.
 * @param ms - Milliseconds to delay for.
 * @returns {Promise<any>} - A resolved promise when the timer ends.
 */
export const sleep = (ms: number): Promise<any> =>
    new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A function to pre-fetch images from provided article(s).
 * @param articles - The news article(s) to get the image(s) from.
 * @returns {NewsArticle[]} - The article(s) with the pre-loaded image(s) attached.
 */
export const prefetchArticleImages = async (
    articles: NewsArticle[] | NewsArticle
): Promise<NewsArticle[]> =>
    new Promise((resolve) => {
        if (!Array.isArray(articles)) {
            articles = [articles];
        }
        return resolve(
            articles.map((article) => {
                const img = new Image();
                img.src = article.img;
                article.imgElement = img;
                return article;
            })
        );
    });

/**
 * The export than contains the intialised socker connection.
 */
export { default as IO } from './socket';
