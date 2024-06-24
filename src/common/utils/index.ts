/**
 * A function to create a timed delay.
 * @param ms - Milliseconds to delay for.
 * @returns {Promise<any>} - A resolved promise when the timer ends.
 */
export const sleep = (ms: number): Promise<any> =>
    new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The export than contains the intialised socker connection.
 */
export { default as IO } from './socket';
